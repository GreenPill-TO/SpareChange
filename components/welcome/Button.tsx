import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface ButtonProps {
    label: string;
    onClick: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    type = 'button',
    disabled = false,
}) => {
    const { theme } = useTheme();

    const buttonClasses = `inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        theme === 'dark'
            ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'
            : 'bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-indigo-400'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={buttonClasses}
        >
            {label}
        </button>
    );
};

export default Button;
