import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface ImageUploadProps {
    label: string;
    name: string;
    onImageUpload: (file: File | null) => void;
    required?: boolean;
    disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    label,
    name,
    onImageUpload,
    required = false,
    disabled = false,
}) => {
    const { theme } = useTheme();
    const [preview, setPreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setPreview(URL.createObjectURL(file));
            onImageUpload(file);
        } else {
            setPreview(null);
            onImageUpload(null);
        }
    };

    return (
        <div className="image-upload mb-4">
            <label htmlFor={name} className={`block text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                {label}
            </label>
            <input
                id={name}
                name={name}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required={required}
                disabled={disabled}
                className={`mt-1 block w-full text-sm text-gray-900 border-gray-300 rounded-md cursor-pointer focus:outline-none ${
                    theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                }`}
            />
            {preview && (
                <div className="image-upload-preview mt-2">
                    <img src={preview} alt="Image preview" className="max-w-full h-auto rounded-md" />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
