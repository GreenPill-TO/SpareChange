import classNames from "classnames";
import React from "react";

interface RadioGroupProps {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ label, name, options, selectedValue, onChange }) => {
  const radioClasses = classNames(
    "h-4 w-4 border-gray-300 focus:ring-indigo-500",
    "dark:bg-gray-800 dark:text-white bg-white text-gray-900"
  );

  const labelClasses = `block text-sm font-medium dark:text-white text-gray-700`;

  return (
    <div className="radio-group mb-4">
      <span className={labelClasses}>{label}</span>
      <div className="mt-2 space-y-2">
        {options.map((option) => (
          <label key={option.value} className={`inline-flex items-center ${labelClasses}`}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)}
              className={radioClasses}
            />
            <span className="ml-2">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
