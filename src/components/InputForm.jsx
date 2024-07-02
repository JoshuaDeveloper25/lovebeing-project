import { FaCheck } from "react-icons/fa6";

export const InputForm = ({
  inputType,
  inputLabel,
  inputName,
  inputPlaceholder,
  inputLabelClassName,
}) => {
  return (
    <label className={inputLabelClassName}>
      <span className="w-full inline-block text-start">{inputLabel}</span>
      <input
        className="form-input-focus form-input-normal"
        placeholder={inputPlaceholder}
        type={inputType}
        name={inputName}
      />
    </label>
  );
};
