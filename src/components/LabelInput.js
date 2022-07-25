import { useFormContext } from "react-hook-form";

const LabelInput = ({ label, type, defaultValue, validation, ...rest }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="login-input-container">
      <input
        {...register(label, validation)}
        defaultValue={defaultValue}
        placeholder={label}
        type={type}
        id={label}
        name={label}
        {...rest}
        className="login-input"
      />
      {errors[label] && (
        <p>
          {errors[label].message}
        </p>
      )}
    </div>
  );
};

export default LabelInput;
