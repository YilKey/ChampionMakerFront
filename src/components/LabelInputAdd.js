import { useFormContext } from "react-hook-form";

const LabelInputAdd = ({ label, type, defaultValue, validation, ...rest }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
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
      {errors[label] && <p>{errors[label].message}</p>}
    </div>
  );
};

export default LabelInputAdd;
