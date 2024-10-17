import classNames from "classnames";
import React from "react";

interface AmountFieldProps {
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

const AmountField: React.FC<AmountFieldProps> = ({ label, name, value, onChange, placeholder = "", required = false, disabled = false }) => {
  const inputClasses = classNames(
    "mt-1 block w-full rounded-md border-gray-300 shadow-sm",
    "focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
    "dark:bg-gray-800 dark:text-white bg-white text-gray-900"
  );

  return (
    <div className="amount-field mb-4">
      <label htmlFor={name} className={`block text-sm font-medium dark:text-white text-gray-700`}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="number"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={inputClasses}
        min="0"
        step="0.01"
      />
    </div>
  );
};

export default AmountField;
