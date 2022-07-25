import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import LabelInput from "../components/LabelInput";
import { useLogin, useSession } from "../authContext/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import SidebarLeft from "../components/SideBarLeft";
import SidebarRight from "../components/SideBarRight";
import Footer from "../components/Footer";
import { TbArrowRight } from "react-icons/tb";

const validationRules = {
  email: {
    required: true,
  },
  password: {
    required: true,
  },
};

export default function Login() {
  const navigate = useNavigate();
  const { loading, error, isAuthed } = useSession();
  const login = useLogin();
  const methods = useForm();
  const { reset, handleSubmit } = methods;

  useEffect(() => {
    if (isAuthed) {
      navigate("/");
    }
  }, [isAuthed, navigate]);

  const handleLogin = useCallback(
    async ({ email, password }) => {
      const success = await login(email, password);

      if (success) {
        navigate("/");
      }
    },
    [login, navigate]
  );

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <>
      <div className="containerBody">
        <SidebarLeft />
        <div className="content">
          <FormProvider {...methods}>
            <div className="login-container">
              <div className="login-container-left">
                <h1>CHAMPION MAKER</h1>
                <h2>LOG IN</h2>
                <form
                  onSubmit={handleSubmit(handleLogin)}
                  className="login-from-container"
                >
                  <LabelInput
                    label="email"
                    type="text"
                    defaultValue=""
                    placeholder="email"
                    data-cy="login-email"
                    validation={validationRules.email}
                  />
                  <LabelInput
                    label="password"
                    type="password"
                    defaultValue=""
                    data-cy="login-password"
                    validation={validationRules.password}
                  />
                  <div className="login-button-container">
                    <button
                      data-cy="login-clear"
                      type="button"
                      onClick={handleCancel}
                    >
                      clear fields
                    </button>
                    <div className="submit-con">
                      <button
                        data-cy="login-submit"
                        type="submit"
                        disabled={loading}
                      >
                        <TbArrowRight className="login-next-icon" />
                      </button>
                    </div>
                    {error ? <p className="login-error">{error}</p> : null}
                  </div>
                </form>
              </div>
              <div className="login-container-right">
                <Link data-cy="login-exit" to={"/"}>
                  X
                </Link>
              </div>
            </div>
          </FormProvider>
          <Footer />
        </div>
        <SidebarRight />
      </div>
    </>
  );
}
