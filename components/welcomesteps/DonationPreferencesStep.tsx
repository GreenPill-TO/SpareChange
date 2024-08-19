import React, { useEffect } from 'react';
import TextField from '@/components/welcome/TextField';
import CheckBoxGroup from '@/components/welcome/CheckBoxGroup';
import RadioGroup from '@/components/welcome/RadioGroup';
import { useTheme } from '@/context/ThemeContext';

interface DonationPreferencesStepProps {
    preferredDonationAmount: string;
    selectedCauses: string[];
    recurringDonation: string;
    setPreferredDonationAmount: (value: string) => void;
    setSelectedCauses: (value: string[]) => void;
    setRecurringDonation: (value: string) => void;
    handleCheckboxChange: (value: string) => void;
    setIsNextEnabled: (enabled: boolean) => void;
    nextStep: () => void;
}

const DonationPreferencesStep: React.FC<DonationPreferencesStepProps> = ({
    preferredDonationAmount,
    selectedCauses,
    recurringDonation,
    setPreferredDonationAmount,
    setSelectedCauses,
    setRecurringDonation,
    handleCheckboxChange,
    setIsNextEnabled,
}) => {
    const { theme } = useTheme();

    useEffect(() => {
        // Enable the "Next" button only if the required fields are filled
        const isComplete =
            preferredDonationAmount.trim() !== '' &&
            selectedCauses.length > 0 &&
            recurringDonation.trim() !== '';
        setIsNextEnabled(isComplete);
    }, [preferredDonationAmount, selectedCauses, recurringDonation, setIsNextEnabled]);

    return (
        <div className={`donation-preferences-step ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <h2 className="text-2xl font-bold">Customize Your Donations</h2>
            <TextField
                label="Preferred Donation Amount"
                name="preferredDonationAmount"
                value={preferredDonationAmount}
                onChange={(e) => setPreferredDonationAmount(e.target.value)}
            />
            <CheckBoxGroup
                label="Causes of Interest"
                name="causes"
                options={['Homelessness', 'Hunger', 'Education'].map(cause => ({ label: cause, value: cause }))}
                selectedValues={selectedCauses}
                onChange={handleCheckboxChange}
            />
            <RadioGroup
                label="Recurring Donations"
                name="recurringDonation"
                options={[
                    { label: 'Yes', value: 'yes' },
                    { label: 'No', value: 'no' }
                ]}
                selectedValue={recurringDonation}
                onChange={setRecurringDonation}
            />
        </div>
    );
};

export default DonationPreferencesStep;
