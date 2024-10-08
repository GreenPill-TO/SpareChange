import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface RadioGroupProps {
    label: string;
    name: string;
    options: { label: string; value: string }[];
    selectedValue: string;
    onChange: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
    label,
    name,
    options,
    selectedValue,
    onChange,
}) => {
    const { theme } = useTheme();

    const radioClasses = `h-4 w-4 border-gray-300 focus:ring-indigo-500 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    }`;

    const labelClasses = `block text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`;

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
