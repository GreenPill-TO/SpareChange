import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface TextFieldProps {
    label: string;
    name: string;
    value: string;
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
    type = 'text',
    placeholder = '',
    required = false,
    disabled = false,
}) => {
    const { theme } = useTheme();

    const inputClasses = `mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    }`;

    return (
        <div className="text-field mb-4">
            <label htmlFor={name} className={`block text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
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
            />
        </div>
    );
};

export default TextField;
