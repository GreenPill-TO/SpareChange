import React from 'react';
import InfoBox from '@/components/welcome/InfoBox';
import Button from '@/components/welcome/Button';
import { useTheme } from '@/context/ThemeContext';

interface StorePaymentsStepProps {
    nextStep: () => void;
}

const StorePaymentsStep: React.FC<StorePaymentsStepProps> = ({ nextStep }) => {
    const { theme } = useTheme();

    return (
        <div className={`store-payments-step ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <h2 className="text-2xl font-bold">Set Up Your Payments</h2>
            <InfoBox message="Here's how your store can receive payments:" />
            <p>1. Set up your payment method.</p>
            <p>2. Receive payments from customers.</p>
            <p>3. Access funds whenever you need them.</p>
            <Button label="Continue" onClick={nextStep} />
        </div>
    );
};

export default StorePaymentsStep;
