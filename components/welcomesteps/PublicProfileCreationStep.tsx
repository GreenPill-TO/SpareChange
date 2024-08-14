import React from 'react';
import ImageUpload from '@/components/welcome/ImageUpload';
import TextArea from '@/components/welcome/TextArea';
import AddressField from '@/components/welcome/AddressField';
import Button from '@/components/welcome/Button';
import { useTheme } from '@/context/ThemeContext';

interface PublicProfileCreationStepProps {
    bio: string;
    address: string;
    profileImage: File | null;
    setBio: (value: string) => void;
    setAddress: (value: string) => void;
    handleImageUpload: (file: File | null) => void;
    nextStep: () => void;
}

const PublicProfileCreationStep: React.FC<PublicProfileCreationStepProps> = ({
    bio, address, profileImage, setBio, setAddress, handleImageUpload, nextStep
}) => {
    const { theme } = useTheme();

    return (
        <div className={`public-profile-creation-step ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <h2 className="text-2xl font-bold">Create Your Public Profile</h2>
            <ImageUpload
                label="Profile Picture"
                name="profilePicture"
                onImageUpload={handleImageUpload}
            />
            <TextArea
                label="Bio or Introduction"
                name="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
            />
            <AddressField
                label="Location (Optional)"
                name="location"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <Button label="Save Profile" onClick={nextStep} />
        </div>
    );
};

export default PublicProfileCreationStep;
