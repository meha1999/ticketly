import { FC } from "react";

interface TextInputProps {
  id?: string;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFullWidthInput?: boolean;
}

const TextInput: FC<TextInputProps> = ({
  id,
  label,
  value,
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
        value={value}
        onChange={onChange}
        className={`input ${isFullWidthInput ? "full" : ""}`}
      />
    </div>
  );
};

export default TextInput;
