import { FC } from "react";

interface DropdownProps {
  id: string;
  label: string;
  disabled?: boolean;
  currentValue: number | undefined;
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
        name={id}
        value={currentValue}
        className="drop-down"
        onChange={onChange}
        placeholder="لطفا یک مورد انتخاب نمایید"
        disabled={disabled}
      >
        <option selected disabled hidden>{
          disabled ? "لیست موارد خالی میباشد" : "لطفا یک مورد انتخاب نمایید"
        }</option>
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
