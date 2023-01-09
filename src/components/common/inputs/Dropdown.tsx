import { FC } from "react";

interface DropdownProps {
  id: string;
  label: string;
  disabled?: boolean;
  currentValue: number;
  currentOptions: any[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown: FC<DropdownProps> = ({
  id,
  label,
  onChange,
  disabled,
  currentOptions,
  currentValue,
}) => {
  return (
    <div className="drop-down-wrapper">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <select
        id={id}
        value={currentValue}
        className="drop-down"
        onChange={onChange}
        name={id}
        disabled={disabled}
      >
        {currentOptions?.map((i) => (
          <option value={i.id} key={i.id}>
            {i.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
