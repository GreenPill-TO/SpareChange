import classNames from "classnames";
import React from "react";

interface TextAreaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  disabled = false,
  rows = 3,
}) => {
  const textareaClasses = classNames(
    "mt-1 block w-full rounded-md border-gray-300 shadow-sm",
    "focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
    "dark:bg-gray-700 dark:text-white bg-white text-gray-900"
  );

  return (
    <div className="text-area mb-4">
      <label htmlFor={name} className={`block text-sm font-medium dark:text-white text-gray-700`}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={textareaClasses}
      />
    </div>
  );
};

export default TextArea;
