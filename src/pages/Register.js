import { useCallback, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import LabelInput from "../components/LabelInput";
import { useRegister, useSession } from "../authContext/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import SidebarLeft from "../components/SideBarLeft";
import SidebarRight from "../components/SideBarRight";
import Footer from "../components/Footer";
import { TbArrowRight } from "react-icons/tb";

export default function Register() {
  const navigate = useNavigate();
  const { loading, error, isAuthed } = useSession();
  const register = useRegister();
  const methods = useForm();
  const { handleSubmit, reset, getValues } = methods;

  const handleRegister = useCallback(
    async ({ name, email, password }) => {
      const success = await register({
        name,
        email,
        password,
      });

      if (success) {
        navigate("/");
      }
    },
    [navigate, register]
  );

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const validationRules = useMemo(
    () => ({
      name: {
        required: true,
      },
      email: {
        required: true,
      },
      password: {
        required: true,
      },
      confirmPassword: {
        required: true,
        validate: {
          notIdentical: (value) => {
            const password = getValues("password");
            return password === value
              ? null
              : "Both passwords need to be identical";
          },
        },
      },
    }),
    [getValues]
  );

  if (isAuthed) {
    return navigate("/");
  }

  return (
    <div className="containerBody">
      <SidebarLeft />
      <div className="content">
        <FormProvider {...methods}>
          <div className="login-container">
            <div className="login-container-left">
              <h1>CHAMPION MAKER</h1>
              <h2>MAKE AN ACCOUNT</h2>
              <form
                className="login-from-container"
                onSubmit={handleSubmit(handleRegister)}
              >
                <LabelInput
                  label="name"
                  type="text"
                  defaultValue=""
                  data-cy="regis-name"
                  placeholder="username"
                  validation={validationRules.name}
                />

                <LabelInput
                  label="email"
                  type="email"
                  defaultValue=""
                  data-cy="regis-email"
                  placeholder="email"
                  validation={validationRules.email}
                />

                <LabelInput
                  label="password"
                  type="password"
                  data-cy="regis-password"
                  defaultValue=""
                  validation={validationRules.password}
                />

                <LabelInput
                  label="confirmPassword"
                  type="password"
                  data-cy="regis-password2"
                  defaultValue=""
                  validation={validationRules.confirmPassword}
                />

                <div className="login-button-container">
                  <button
                    data-cy="regis-clear"
                    type="button"
                    onClick={handleCancel}
                  >
                    clear fields
                  </button>
                  <div className="submit-con">
                    <button
                      data-cy="regis-submit"
                      type="submit"
                      disabled={loading}
                    >
                      <TbArrowRight className="login-next-icon" />
                    </button>
                  </div>
                  {error ? (
                    <p className="login-error">{JSON.stringify(error)}</p>
                  ) : null}
                </div>
              </form>
            </div>
            <div className="login-container-right">
              <Link data-cy="regis-exit" to={"/"}>
                X
              </Link>
            </div>
          </div>
        </FormProvider>
        <Footer />
      </div>
      <SidebarRight />
    </div>
  );
}
