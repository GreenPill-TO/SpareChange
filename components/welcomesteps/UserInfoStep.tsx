import React from 'react';
import TextField from '@/components/welcome/TextField';
import Button from '@/components/welcome/Button';

interface UserInfoStepProps {
    fullName: string;
    phoneNumber: string;
    address: string;
    setFullName: (value: string) => void;
    setPhoneNumber: (value: string) => void;
    setAddress: (value: string) => void;
    nextStep: () => void;
}

const UserInfoStep: React.FC<UserInfoStepProps> = ({ fullName, phoneNumber, address, setFullName, setPhoneNumber, setAddress, nextStep }) => {
    return (
        <div className="user-info-step">
            <h2 className="text-2xl font-bold">Complete Your Profile</h2>
            <TextField
                label="Full Name"
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />
            <TextField
                label="Phone Number"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <TextField
                label="Address (Optional)"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <Button label="Continue" onClick={nextStep} />
        </div>
    );
};

export default UserInfoStep;
