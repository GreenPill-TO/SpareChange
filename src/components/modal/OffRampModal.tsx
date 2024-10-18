import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import InputField from "../ui/InputField";

interface OffRampProps {
  closeModal: () => void;
}

const OffRampModal = ({ closeModal }: OffRampProps) => {
  const [amount, setAmount] = useState(0);

  return (
    <div className="mt-2 p-0">
      <div className="space-y-4">
        <InputField
          label="Preferred Donation Amount (TCOIN)"
          name="preferredDonationAmount"
          type="number"
          value={amount}
          placeholder="Amount in TCOIN"
          fullWidth
          onChange={(e) => {
            setAmount(parseFloat(e.currentTarget.value));
          }}
        />
        <p>Estimated CAD: $0.00</p>
        <Input placeholder="Interac eTransfer email or phone" className="w-full" />
        <p className="text-sm text-gray-500">Note: The transfer will be completed within the next 24 hours.</p>
        <Button className="w-full">Convert and Transfer</Button>
      </div>
    </div>
  );
};

export { OffRampModal };
