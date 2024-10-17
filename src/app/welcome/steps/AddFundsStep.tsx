import AmountField from "@/components/form/form-fields/AmountField";
import PaymentForm from "@/components/form/form-fields/PaymentForm";
import React, { useEffect } from "react";

interface AddFundsStepProps {
  preferredDonationAmount: number;
  setPreferredDonationAmount: (value: number) => void;
  handleSubmitPayment: (paymentData: { cardNumber: string; expiryDate: string; cvv: string }) => void;
  setIsNextEnabled: (enabled: boolean) => void;
  nextStep: () => void;
}

const AddFundsStep: React.FC<AddFundsStepProps> = ({
  preferredDonationAmount,
  setPreferredDonationAmount,
  handleSubmitPayment,
  setIsNextEnabled,
}) => {
  useEffect(() => {
    // Enable the "Next" button if the preferredDonationAmount is not empty
    const isComplete = preferredDonationAmount !== 0;
    setIsNextEnabled(isComplete);
  }, [preferredDonationAmount, setIsNextEnabled]);

  return (
    <div className="add-funds-step">
      <h2 className="text-2xl font-bold">Fund Your Account</h2>
      <AmountField
        label="Amount to Add"
        name="amountToAdd"
        value={preferredDonationAmount}
        onChange={(e) => setPreferredDonationAmount(parseFloat(e.currentTarget.value))}
      />
      <PaymentForm onSubmit={handleSubmitPayment} />
    </div>
  );
};

export default AddFundsStep;
