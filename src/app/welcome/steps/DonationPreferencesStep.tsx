import Dropdown from "@TCoin/components/form/form-fields/Dropdown";
import TextField from "@TCoin/components/form/form-fields/TextField";
import React, { useEffect } from "react";

interface DonationPreferencesStepProps {
  preferredDonationAmount: string; // Preferred donation amount in CAD
  normalTip: number | null; // Normal tip percentage
  goodTip: number | null; // Good tip percentage for excellent service
  selectedCause: string; // Selected cause from the dropdown
  setPreferredDonationAmount: (value: string) => void; // Setter for preferred donation amount
  setNormalTip: (value: number | null) => void;
  setGoodTip: (value: number | null) => void;
  setSelectedCause: (value: string) => void;
  setIsNextEnabled: (enabled: boolean) => void;
  nextStep: () => void;
}

const DonationPreferencesStep: React.FC<DonationPreferencesStepProps> = ({
  preferredDonationAmount,
  normalTip,
  goodTip,
  selectedCause,
  setPreferredDonationAmount,
  setNormalTip,
  setGoodTip,
  setSelectedCause,
  setIsNextEnabled,
}) => {
  useEffect(() => {
    // Enable the "Next" button only if all fields are filled
    const isComplete = preferredDonationAmount.trim() !== "" && normalTip !== null && goodTip !== null && selectedCause.trim() !== "";
    setIsNextEnabled(isComplete);
  }, [preferredDonationAmount, normalTip, goodTip, selectedCause, setIsNextEnabled]);

  const handleNormalTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNormalTip(value ? parseFloat(value) : null);
  };

  const handleGoodTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGoodTip(value ? parseFloat(value) : null);
  };

  return (
    <div className={`donation-preferences-step dark:text-white text-gray-900`}>
      <h2 className="text-2xl font-bold mb-4">Customize Your Donation Preferences</h2>
      <TextField
        label="Preferred Donation Amount (CAD)"
        name="preferredDonationAmount"
        value={preferredDonationAmount}
        placeholder="$5.00"
        onChange={(e) => setPreferredDonationAmount(e.target.value)}
      />
      <TextField
        label="Normal Tip Percentage"
        name="normalTip"
        value={normalTip !== null ? normalTip.toString() : ""}
        placeholder="15%"
        onChange={handleNormalTipChange}
      />
      <TextField
        label="Good Tip Percentage for Excellent Service"
        name="goodTip"
        value={goodTip !== null ? goodTip.toString() : ""}
        placeholder="25%"
        onChange={handleGoodTipChange}
      />
      <Dropdown
        label="Select Your Cause"
        name="selectedCause"
        value={selectedCause}
        onChange={(e) => setSelectedCause(e.target.value)}
        options={[
          { label: "Food Bank", value: "Food Bank" },
          { label: "Homelessness", value: "Homelessness" },
          { label: "Clothes", value: "Clothes" },
          { label: "Counselling", value: "Counselling" },
          { label: "Child services", value: "Child services" },
        ]}
      />
    </div>
  );
};

export default DonationPreferencesStep;
