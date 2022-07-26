import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FormProvider, useForm } from "react-hook-form";
import LabelInputAdd from "./LabelInputAdd";
import { useCallback, useState } from "react";
import { updateChampion } from "../api/useChampions";
import { useSession } from "../authContext/AuthProvider";
import { useQueryClient } from "react-query";

const validationRules = {
  type: {
    required: true,
  },
  disc: {
    required: true,
  },
};

const UpdateChampionBtn = ({ champion }) => {
  const methods = useForm();
  const { user } = useSession();
  const { handleSubmit } = methods;
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const handleUpdate = useCallback(
    async ({ disc, type }) => {
      const success = await updateChampion(user.userName, champion, {
        disc,
        type,
      });

      if (success.rows === 1) {
        setError("Champion edited succesfully");
        queryClient.invalidateQueries("champion");
      } else {
        setError(success.error);
      }
    },
    [champion, queryClient, user.userName]
  );
  return (
    <Popup trigger={<button className="updateBtn">EDIT CHAMPION</button>}>
      {(close) => (
        <div className="addChampion-container">
          <div className="header">Edit your champion </div>
          <div className="content">
            <FormProvider {...methods}>
              <div>
                <div>
                  <form onSubmit={handleSubmit(handleUpdate)}>
                    <LabelInputAdd
                      label="disc"
                      type="text"
                      defaultValue=""
                      placeholder="disc"
                      data-cy="update-disc"
                      validation={validationRules.disc}
                    />
                    <LabelInputAdd
                      label="type"
                      type="text"
                      defaultValue=""
                      placeholder="type"
                      data-cy="update-type"
                      validation={validationRules.type}
                    />
                    <div>
                      {error ? <p className="login-error">{error}</p> : null}
                    </div>
                    <button type="submit" data-cy="update-submit">
                      submit
                    </button>
                  </form>
                </div>
              </div>
            </FormProvider>
          </div>
          <div className="actions">
            <button
              className="button"
              data-cy="update-close"
              onClick={() => {
                close();
              }}
            >
              close
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default UpdateChampionBtn;
