import React, { useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface PersonaSelectionStepProps {
    persona: string | null;
    handlePersonaSelection: (value: string) => void;
    setIsNextEnabled: (enabled: boolean) => void;
}

const PersonaSelectionStep: React.FC<PersonaSelectionStepProps> = ({ persona, handlePersonaSelection, setIsNextEnabled }) => {
    const { theme } = useTheme();

    useEffect(() => {
        // Enable the next button if a persona is selected
        setIsNextEnabled(persona !== null);
    }, [persona, setIsNextEnabled]);

    return (
        <div className={`persona-selection-step ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} p-6 space-y-6`}>
            <h2 className="text-2xl font-bold mb-4">Choose your main reason for using SpareChange</h2>
            <div className="space-y-4">
                <label className="block">
                    <input
                        type="radio"
                        name="persona"
                        value="support-seeker"
                        checked={persona === 'support-seeker'}
                        onChange={(e) => handlePersonaSelection(e.target.value)}
                        className="mr-2"
                    />
                    I need some help from my community to make ends meet
                </label>
                <label className="block">
                    <input
                        type="radio"
                        name="persona"
                        value="service-worker"
                        checked={persona === 'service-worker'}
                        onChange={(e) => handlePersonaSelection(e.target.value)}
                        className="mr-2"
                    />
                    I work in the service industry and accept extra tips
                </label>
                <label className="block">
                    <input
                        type="radio"
                        name="persona"
                        value="donor"
                        checked={persona === 'donor'}
                        onChange={(e) => handlePersonaSelection(e.target.value)}
                        className="mr-2"
                    />
                    I'm here to help, would love to give tips or donations
                </label>
                <label className="block">
                    <input
                        type="radio"
                        name="persona"
                        value="store"
                        checked={persona === 'store'}
                        onChange={(e) => handlePersonaSelection(e.target.value)}
                        className="mr-2"
                    />
                    I run a business and want to support a circular economy + local charities by accepting SpareChange as payment.
                </label>
            </div>
        </div>
    );
};

export default PersonaSelectionStep;
