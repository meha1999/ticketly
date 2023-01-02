import { FC } from "react";

interface InputWithLabelProps {
  id?: string;
  label: string;
  name?: string;
  isFileInput?: boolean;
  onChange?: () => void;
  isFullWidthInput?: boolean;
}

const InputWithLabel: FC<InputWithLabelProps> = ({
  id,
  name,
  label,
  onChange,
  isFileInput,
  isFullWidthInput,
}) => {
  return (
    <>
      {isFileInput ? (
        <div className="file-input-wrapper">
          <label htmlFor={id} className="label">
            {label} :
          </label>
          <div className="input-part">
          <label className="file-input">
            <label htmlFor={id} className="file-input-label">+</label>
            <input id={id} name={name} type="file" onChange={onChange} />
          </label>
          </div>
        </div>
      ) : (
        <div className="input-label-wrap">
          <label htmlFor={id} className="label">
            {label}
          </label>
          <input
            id={id}
            name={name}
            onChange={onChange}
            className={`input ${isFullWidthInput ? "full" : ""}`}
          />
        </div>
      )}
    </>
  );
};

export default InputWithLabel;
