import React from 'react';
import InfoBox from '@/components/welcome/InfoBox';
import Button from '@/components/welcome/Button';
import IconList from '@/components/welcome/IconList';
import { useTheme } from '@/context/ThemeContext';
// Importing the icons from react-icons or any other icon library you are using
import { FaHeart, FaHandHoldingHeart } from 'react-icons/fa';

interface OnboardingIntroStepProps {
    nextStep: () => void;
}

const OnboardingIntroStep: React.FC<OnboardingIntroStepProps> = ({ nextStep }) => {
    const { theme } = useTheme();

    return (
        <div className={`onboarding-intro-step ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <h2 className="text-2xl font-bold">Welcome to SpareChange!</h2>
            <InfoBox message="SpareChange helps you receive or give support within your community. Here's how it works:" />
            <IconList items={[
                { icon: FaHeart, text: "Support those in need" },
                { icon: FaHandHoldingHeart, text: "Receive help from your community" },
            ]} />
            <Button label="Let's Get Started" onClick={nextStep} />
        </div>
    );
};

export default OnboardingIntroStep;
