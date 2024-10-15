import TextField from "@TCoin/components/form/form-fields/TextField";
import React, { useEffect, useState } from "react";

interface UserInfoStepProps {
  fullName: string;
  username: string;
  phoneNumber: string;
  email: string;
  setFullName: (value: string) => void;
  setUserName: (value: string) => void;
  setPhoneNumber: (value: string) => void;
  setEmail: (value: string) => void;
  setIsNextEnabled: (enabled: boolean) => void;
}

const UserInfoStep: React.FC<UserInfoStepProps> = ({
  fullName,
  username,
  phoneNumber,
  email,
  setFullName,
  setUserName,
  setPhoneNumber,
  setEmail,
  setIsNextEnabled,
}) => {
  const [authMethod, setAuthMethod] = useState<"email" | "phone" | null>(null);

  useEffect(() => {
    // Determine if user authenticated with email or phone
    const storedEmail = localStorage.getItem("auth_email");
    const storedPhone = localStorage.getItem("auth_phone");

    if (storedEmail) {
      setAuthMethod("email");
      setEmail(storedEmail);
    } else if (storedPhone) {
      setAuthMethod("phone");
      setPhoneNumber(storedPhone);
    }

    // Enable the "Next" button only if fullName and either phoneNumber or email are not empty
    const isComplete =
      fullName.trim() !== "" &&
      username.trim() !== "" &&
      ((authMethod === "email" && phoneNumber.trim() !== "") || (authMethod === "phone" && email.trim() !== ""));
    setIsNextEnabled(isComplete);
  }, [fullName, username, phoneNumber, email, setIsNextEnabled, authMethod]);

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="user-info-step">
      <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>
      <p className="mb-4 text-gray-600">
        Your full name will only be visible to users who have mutually connected with you. Your username will be publicly visible to all users.
      </p>
      <TextField label="Full Name" name="fullName" value={fullName} onChange={handleFullNameChange} />
      <TextField label="Username" name="username" value={username} onChange={handleUserNameChange} />
      {authMethod === "email" ? (
        <TextField label="Phone Number" name="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} />
      ) : (
        <TextField label="Email" name="email" value={email} onChange={handleEmailChange} />
      )}
    </div>
  );
};

export default UserInfoStep;
