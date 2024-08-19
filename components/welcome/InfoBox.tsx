import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface InfoBoxProps {
    message: string;
    type?: 'info' | 'warning' | 'error' | 'success';
}

const InfoBox: React.FC<InfoBoxProps> = ({ message, type = 'info' }) => {
    const { theme } = useTheme();

    const baseClasses = 'p-4 rounded-md text-sm';
    
    const themeClasses = theme === 'dark' 
        ? 'bg-gray-800 border-gray-700 text-gray-300' 
        : 'bg-white border-gray-300 text-gray-900';
    
    const typeClasses = {
        info: theme === 'dark' ? 'border-blue-500 text-blue-400' : 'border-blue-300 text-blue-700',
        warning: theme === 'dark' ? 'border-yellow-500 text-yellow-400' : 'border-yellow-300 text-yellow-700',
        error: theme === 'dark' ? 'border-red-500 text-red-400' : 'border-red-300 text-red-700',
        success: theme === 'dark' ? 'border-green-500 text-green-400' : 'border-green-300 text-green-700',
    }[type];

    return (
        <div className={`${baseClasses} ${themeClasses} ${typeClasses} border`}>
            {message}
        </div>
    );
};

export default InfoBox;
