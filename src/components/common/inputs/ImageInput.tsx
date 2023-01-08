/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";

interface ImageInputProps {
  id?: string;
  label: string;
  image: File | null;
  inputColor?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageInput: FC<ImageInputProps> = ({
  id,
  label,
  image,
  onChange,
  inputColor,
}) => {
  return (
    <div className="image-input-wrapper">
      <label htmlFor={id} className="label">
        {label} :
      </label>
      <div className="input-part">
        <label className="image-input" htmlFor={id}>
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt={label}
              className="image"
            />
          )}
          <label
            htmlFor={id}
            className="image-input-label"
            style={{
              backgroundColor: inputColor,
              display: image ? "none" : "block",
            }}
          >
            +
          </label>
          <input
            id={id}
            name={id}
            type="file"
            onChange={onChange}
            accept="image/*"
          />
        </label>
      </div>
    </div>
  );
};

export default ImageInput;