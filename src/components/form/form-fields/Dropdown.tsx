import classNames from "classnames";
import React from "react";

interface DropdownProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  required?: boolean;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
}) => {
  const dropdownClasses = classNames(
    "mt-1 block w-full rounded-md border-gray-300 shadow-sm",
    "focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
    "dark:bg-gray-800 dark:text-white bg-white text-gray-900"
  );

  return (
    <div className="dropdown mb-4">
      <label htmlFor={name} className={`block text-sm font-medium dark:text-white text-gray-700`}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={dropdownClasses}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
