import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FormProvider, useForm } from "react-hook-form";
import LabelInputAdd from "../components/LabelInputAdd";
import { useCallback, useState } from "react";
import { addChampion } from "../api/useChampions";
import { useSession } from "../authContext/AuthProvider";
import { useQueryClient } from "react-query";

const validationRules = {
  name: {
    required: true,
  },
  disc: {
    required: true,
  },
  type: {
    required: true,
  },
};

const AddChampionBtn = () => {
  const methods = useForm();
  const { ready, user } = useSession();
  const { handleSubmit } = methods;
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const handleCreate = useCallback(
    async ({ name, disc, type }) => {
      try {
        if (ready) {
          const success = await addChampion(user.userName, {
            name,
            disc,
            type,
          });

          if (success.status === "201") {
            setError("Champion is made succesfully");
            queryClient.invalidateQueries("userChampions");
          } else {
            setError(success.error);
          }
        }
      } catch (error) {
        console.log("create fucked up");
      }
    },
    [queryClient, ready, user.userName]
  );
  return (
    <Popup
      trigger={
        <button data-cy="col-add" className="addBtn">
          +
        </button>
      }
    >
      {(close) => (
        <div className="addChampion-container">
          <div className="header">Create a new champion </div>
          <div className="content">
            <FormProvider {...methods}>
              <div>
                <div>
                  <form onSubmit={handleSubmit(handleCreate)}>
                    <LabelInputAdd
                      label="name"
                      type="text"
                      defaultValue=""
                      placeholder="name"
                      data-cy="col-name"
                      validation={validationRules.name}
                    />
                    <LabelInputAdd
                      label="disc"
                      type="text"
                      defaultValue=""
                      placeholder="disc"
                      data-cy="col-disc"
                      validation={validationRules.disc}
                    />
                    <LabelInputAdd
                      label="type"
                      type="text"
                      defaultValue=""
                      placeholder="type"
                      data-cy="col-type"
                      validation={validationRules.type}
                    />
                    <div>
                      {error ? (
                        <p data-cy="col-error" className="login-error">
                          {error}
                        </p>
                      ) : null}
                    </div>
                    <button data-cy="col-submit" type="submit">
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
              data-cy="col-close"
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

export default AddChampionBtn;
