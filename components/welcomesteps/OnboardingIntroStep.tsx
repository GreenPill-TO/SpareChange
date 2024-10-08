import React from 'react';
import InfoBox from '@/components/welcome/InfoBox';
import Button from '@/components/welcome/Button';
import IconList from '@/components/welcome/IconList';
import { useTheme } from '@/context/ThemeContext';
import { FaHeart, FaHandHoldingHeart, FaShoppingCart, FaRecycle } from 'react-icons/fa';

interface OnboardingIntroStepProps {
    nextStep: () => void;
}

const OnboardingIntroStep: React.FC<OnboardingIntroStepProps> = ({ nextStep }) => {
    const { theme } = useTheme();

    return (
        <div className={`onboarding-intro-step ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} p-6 space-y-6`}>
            <h2 className="text-2xl font-bold">Welcome to SpareChange!</h2>
            <InfoBox message="SpareChange helps you receive or give support within your community. Here's how it works:" />
            <IconList items={[
                { icon: FaHeart, text: "Support those in need" },
                { icon: FaHandHoldingHeart, text: "Receive help from your community" },
                { icon: FaShoppingCart, text: "Shop in stores using community currency" },
                { icon: FaRecycle, text: "Contribute to a circular economy when stores pay their employees with community currency" },
            ]} />
            <div className="flex justify-end mt-4">
                <Button label="Let's Get Started" onClick={nextStep} />
            </div>
        </div>
    );
};

export default OnboardingIntroStep;
