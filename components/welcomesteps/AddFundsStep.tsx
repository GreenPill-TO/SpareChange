import React from 'react';
import AmountField from '@/components/welcome/AmountField';
import PaymentForm from '@/components/welcome/PaymentForm';
import Button from '@/components/welcome/Button';
import { useTheme } from '@/context/ThemeContext';

interface AddFundsStepProps {
    preferredDonationAmount: string;
    setPreferredDonationAmount: (value: string) => void;
    handleSubmitPayment: (paymentData: { cardNumber: string; expiryDate: string; cvv: string }) => void;
}

const AddFundsStep: React.FC<AddFundsStepProps> = ({
    preferredDonationAmount, setPreferredDonationAmount, handleSubmitPayment
}) => {
    const { theme } = useTheme();

    return (
        <div className={`add-funds-step ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <h2 className="text-2xl font-bold">Fund Your Account</h2>
            <AmountField
                label="Amount to Add"
                name="amountToAdd"
                value={preferredDonationAmount}
                onChange={(e) => setPreferredDonationAmount(e.target.value)}
            />
            <PaymentForm onSubmit={handleSubmitPayment} />
        </div>
    );
};

export default AddFundsStep;
