import React from 'react';
import InfoBox from '@/components/welcome/InfoBox';
import Button from '@/components/welcome/Button';
import { useTheme } from '@/context/ThemeContext';

interface FinalWelcomeStepProps {
    onDashboardRedirect: () => void;
}

const FinalWelcomeStep: React.FC<FinalWelcomeStepProps> = ({ onDashboardRedirect }) => {
    const { theme } = useTheme();

    return (
        <div className={`final-welcome-step ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <h2 className="text-2xl font-bold">You're All Set!</h2>
            <InfoBox message="Your account is ready to go. You can now start exploring, donating, or receiving support!" />
            <Button label="Go to Dashboard" onClick={onDashboardRedirect} />
        </div>
    );
};

export default FinalWelcomeStep;
