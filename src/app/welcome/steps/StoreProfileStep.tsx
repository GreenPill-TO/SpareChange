import AddressField from "@TCoin/components/form/form-fields/AddressField";
import Dropdown from "@TCoin/components/form/form-fields/Dropdown";
import TextField from "@TCoin/components/form/form-fields/TextField";
import React, { useEffect } from "react";

interface StoreProfileStepProps {
  fullName: string;
  phoneNumber: string;
  address: string;
  setFullName: (value: string) => void;
  setPhoneNumber: (value: string) => void;
  setAddress: (value: string) => void;
  setIsNextEnabled: (isEnabled: boolean) => void;
  nextStep: () => void;
}

const StoreProfileStep: React.FC<StoreProfileStepProps> = ({
  fullName,
  phoneNumber,
  address,
  setFullName,
  setPhoneNumber,
  setAddress,
  setIsNextEnabled,
}) => {
  useEffect(() => {
    // Enable the Continue button only if the required fields are filled out
    const isComplete = fullName.trim() !== "" && phoneNumber.trim() !== "";
    setIsNextEnabled(isComplete);
  }, [fullName, phoneNumber, setIsNextEnabled]);

  return (
    <div className={`store-profile-step dark:bg-gray-900 dark:text-whitebg-white text-gray-900 p-6 space-y-6`}>
      <h2 className="text-2xl font-bold">Profile Your Store</h2>
      <TextField label="Store Name" name="storeName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      <Dropdown
        label="Category"
        name="category"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        options={[
          { label: "Restaurant", value: "restaurant" },
          { label: "Retail", value: "retail" },
          { label: "Service", value: "service" },
        ]}
      />
      <AddressField label="Store Location" name="storeLocation" value={address} onChange={(e) => setAddress(e.target.value)} />
      <TextField label="Contact Information" name="contactInfo" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <TextField
        label="Max Tip/Donation Percentage"
        name="maxTip"
        value={fullName} // Replace with the appropriate state if this is a mistake
        onChange={(e) => setFullName(e.target.value)}
      />
    </div>
  );
};

export default StoreProfileStep;
