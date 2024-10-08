import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface CheckBoxGroupProps {
    label: string;
    name: string;
    options: { label: string; value: string }[];
    selectedValues: string[];
    onChange: (value: string) => void;
}

const CheckBoxGroup: React.FC<CheckBoxGroupProps> = ({
    label,
    name,
    options,
    selectedValues,
    onChange,
}) => {
    const { theme } = useTheme();

    const checkboxClasses = `h-4 w-4 rounded border-gray-300 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    }`;

    const labelClasses = `block text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`;

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
