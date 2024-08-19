import React, { useState } from 'react';

interface ImageUploadProps {
    label: string;
    name: string;
    onImageUpload: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, name, onImageUpload }) => {
    const [preview, setPreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            onImageUpload(file);
        } else {
            setPreview(null);
            onImageUpload(null);
        }
    };

    return (
        <div className="image-upload">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type="file"
                id={name}
                name={name}
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full text-sm text-gray-900"
            />
            {preview && (
                <div className="mt-4">
                    <img
                        src={preview}
                        alt="Preview"
                        className="object-contain mx-auto"
                        style={{
                            maxHeight: '33vh', // Limit the height to one third of the viewport
                            maxWidth: '100%',   // Ensure the image doesn't exceed the width of the container
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
