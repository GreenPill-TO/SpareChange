import classNames from "classnames";
import React from "react";
import { Input } from "./Input";
import { Label } from "./Label";

interface InputFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
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
      <Label htmlFor={name}>{label}</Label>
      <Input
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

export default InputField;
