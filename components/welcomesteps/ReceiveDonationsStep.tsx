import React from 'react';
import InfoBox from '@/components/welcome/InfoBox';
import Button from '@/components/welcome/Button';
import { useTheme } from '@/context/ThemeContext';

interface ReceiveDonationsStepProps {
    nextStep: () => void;
}

const ReceiveDonationsStep: React.FC<ReceiveDonationsStepProps> = ({ nextStep }) => {
    const { theme } = useTheme();

    return (
        <div className={`receive-donations-step ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <h2 className="text-2xl font-bold">Receive Donations & Tips</h2>
            <InfoBox message="Here's how you can receive donations and tips from generous supporters:" />
            <p>1. Share your profile link.</p>
            <p>2. Receive tips directly to your account.</p>
            <p>3. Withdraw funds at any time.</p>
            <Button label="Continue" onClick={nextStep} />
        </div>
    );
};

export default ReceiveDonationsStep;
