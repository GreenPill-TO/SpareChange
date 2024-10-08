import React from 'react';
import InfoBox from '@/components/welcome/InfoBox';
import Button from '@/components/welcome/Button';

interface FinalWelcomeStepProps {
    onDashboardRedirect: () => void;
}

const FinalWelcomeStep: React.FC<FinalWelcomeStepProps> = ({ onDashboardRedirect }) => {
    return (
        <div className="final-welcome-step">
            <h2 className="text-2xl font-bold">You're All Set!</h2>
            <InfoBox message="Your account is ready to go. You can now start exploring, donating, or receiving support!" />
            <Button label="Go to Dashboard" onClick={onDashboardRedirect} />
        </div>
    );
};

export default FinalWelcomeStep;
