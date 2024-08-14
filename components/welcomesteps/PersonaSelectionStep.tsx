import React from 'react';
import RadioGroup from '@/components/welcome/RadioGroup';
import Button from '@/components/welcome/Button';

interface PersonaSelectionStepProps {
    persona: string | null;
    handlePersonaSelection: (value: string) => void;
}

const PersonaSelectionStep: React.FC<PersonaSelectionStepProps> = ({ persona, handlePersonaSelection }) => {
    return (
        <div className="persona-selection-step">
            <h2 className="text-2xl font-bold">How Can We Assist You?</h2>
            <RadioGroup
                label="Choose your role"
                name="persona"
                options={[
                    { label: 'I need support', value: 'panhandler' },
                    { label: 'I’m here to support others', value: 'donor' },
                    { label: 'I want to engage my business', value: 'store' },
                ]}
                selectedValue={persona || ''}
                onChange={handlePersonaSelection}
            />
        </div>
    );
};

export default PersonaSelectionStep;
