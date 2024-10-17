import classNames from "classnames";
import React from "react";

interface TextFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  disabled = false,
}) => {
  const inputClasses = classNames(
    "mt-1 block w-full rounded-md shadow-sm",
    "focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50",
    "dark:bg-gray-700 dark:text-white dark:border-gray-600 bg-white text-gray-900 border-gray-300"
  );

  return (
    <div className="text-field mb-4">
      <label htmlFor={name} className={`block text-sm font-medium dark:text-white text-gray-700`}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={inputClasses}
        style={{ borderWidth: "1px" }}
      />
    </div>
  );
};

export default TextField;
