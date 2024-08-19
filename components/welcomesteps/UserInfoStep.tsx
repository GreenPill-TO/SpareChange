import React, { useEffect } from 'react';
import TextField from '@/components/welcome/TextField';

interface UserInfoStepProps {
    fullName: string;
    phoneNumber: string;
    address: string;
    setFullName: (value: string) => void;
    setPhoneNumber: (value: string) => void;
    setUserName: (value: string) => void;
    setIsNextEnabled: (enabled: boolean) => void;
}

const UserInfoStep: React.FC<UserInfoStepProps> = ({
    fullName,
    phoneNumber,
    address,
    setFullName,
    setPhoneNumber,
    setUserName: setAddress,
    setIsNextEnabled,
}) => {
    useEffect(() => {
        // Enable the "Next" button only if fullName and phoneNumber are not empty
        const isComplete = fullName.trim() !== '' && phoneNumber.trim() !== '';
        setIsNextEnabled(isComplete);
    }, [fullName, phoneNumber, setIsNextEnabled]);

    const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(e.target.value);
    };

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };

    return (
        <div className="user-info-step">
            <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>
            <TextField
                label="Full Name"
                name="fullName"
                value={fullName}
                onChange={handleFullNameChange}
            />
            <TextField
                label="Phone Number"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
            />
            <TextField
                label="Address (Optional)"
                name="address"
                value={address}
                onChange={handleAddressChange}
            />
        </div>
    );
};

export default UserInfoStep;
