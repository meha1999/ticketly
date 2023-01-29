import { FC } from "react";

interface TextInputProps {
  id?: string;
  label: string;
  value?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFullWidthInput?: boolean;
}

const TextInput: FC<TextInputProps> = ({
  id,
  label,
  value,
  type,
  onChange,
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
        type={type}
        value={value}
        onChange={onChange}
        className={`input ${isFullWidthInput ? "full" : ""}`}
      />
    </div>
  );
};

export default TextInput;
