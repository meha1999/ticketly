import { FC } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

interface TextInputProps {
  id?: string;
  label: string;
  value?: string;
  type?: string;
  isFullWidthInput?: boolean;
  showPassword?: boolean;
  maxLength?: number;
  setShowPassword?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: FC<TextInputProps> = ({
  id,
  label,
  value,
  type,
  maxLength,
  onChange,
  showPassword,
  setShowPassword,
  isFullWidthInput,
}) => {
  return (
    <div className="input-label-wrap">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        className={`input ${isFullWidthInput ? "full" : ""}`}
      />
      {type === "password" &&
        (showPassword ? (
          <BsEye onClick={() => setShowPassword!(false)} />
        ) : (
          <BsEyeSlash onClick={() => setShowPassword!(true)} />
        ))}
    </div>
  );
};

export default TextInput;
