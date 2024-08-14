import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface InfoBoxProps {
    message: string;
    type?: 'info' | 'warning' | 'error' | 'success';
}

const InfoBox: React.FC<InfoBoxProps> = ({ message, type = 'info' }) => {
    const { theme } = useTheme();

    const baseClasses = 'p-4 rounded-md text-sm';
    const themeClasses = theme === 'dark' ? 'text-white' : 'text-gray-900';
    const typeClasses = {
        info: 'bg-blue-100 text-blue-700',
        warning: 'bg-yellow-100 text-yellow-700',
        error: 'bg-red-100 text-red-700',
        success: 'bg-green-100 text-green-700',
    }[type];

    return (
        <div className={`${baseClasses} ${themeClasses} ${typeClasses}`}>
            {message}
        </div>
    );
};

export default InfoBox;
