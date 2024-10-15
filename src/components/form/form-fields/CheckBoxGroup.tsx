import classNames from "classnames";
import React from "react";

interface CheckBoxGroupProps {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  selectedValues: string[];
  onChange: (value: string) => void;
}

const CheckBoxGroup: React.FC<CheckBoxGroupProps> = ({ label, name, options, selectedValues, onChange }) => {
  const checkboxClasses = classNames(
    "h-4 w-4 rounded border-gray-300",
    "dark:bg-gray-800 dark:text-white",
    "bg-white text-gray-900"
  );

  const labelClasses = `block text-sm font-medium dark:text-white text-gray-700`;

  return (
    <div className="checkbox-group mb-4">
      <span className={labelClasses}>{label}</span>
      <div className="mt-2 space-y-2">
        {options.map((option) => (
          <label key={option.value} className={`inline-flex items-center ${labelClasses}`}>
            <input
              type="checkbox"
              name={name}
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={() => onChange(option.value)}
              className={checkboxClasses}
            />
            <span className="ml-2">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckBoxGroup;
