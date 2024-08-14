"use client";

import { useEffect, useState } from "react";
import { NavbarUnauthenticated } from "@/components/Navbar";

// import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@/context/ThemeContext';

// Import all the step components
import UserInfoStep from '@/components/welcomesteps/UserInfoStep';
import OnboardingIntroStep from '@/components/welcomesteps/OnboardingIntroStep';
import PersonaSelectionStep from '@/components/welcomesteps/PersonaSelectionStep';
import PublicProfileCreationStep from '@/components/welcomesteps/PublicProfileCreationStep';
import ReceiveDonationsStep from '@/components/welcomesteps/ReceiveDonationsStep';
import StorePaymentsStep from '@/components/welcomesteps/StorePaymentsStep';
import StoreProfileStep from '@/components/welcomesteps/StoreProfileStep';
import DonationPreferencesStep from '@/components/welcomesteps/DonationPreferencesStep';
import AddFundsStep from '@/components/welcomesteps/AddFundsStep';
import FinalWelcomeStep from '@/components/welcomesteps/FinalWelcomeStep';

const WelcomeFlow: React.FC = () => {
    const router = useRouter();
    const [step, setStep] = useState<number>(1);
    const [persona, setPersona] = useState<string | null>(null);
    const { theme } = useTheme();

    const [fullName, setFullName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [preferredDonationAmount, setPreferredDonationAmount] = useState<string>('');
    const [selectedCauses, setSelectedCauses] = useState<string[]>([]);
    const [recurringDonation, setRecurringDonation] = useState<string>('');

    const nextStep = () => setStep(step + 1);
    const previousStep = () => setStep(step - 1);

    const handlePersonaSelection = (selectedPersona: string) => {
        setPersona(selectedPersona);
        if (selectedPersona === 'panhandler' || selectedPersona === 'waitress') {
            setStep(4);
        } else if (selectedPersona === 'store') {
            setStep(6);
        } else if (selectedPersona === 'donor') {
            setStep(8);
        }
    };

    const handleImageUpload = (file: File | null) => {
        setProfileImage(file);
    };

    const handleCheckboxChange = (value: string) => {
        setSelectedCauses((prev) =>
            prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
        );
    };

    const handleSubmitPayment = (paymentData: { cardNumber: string; expiryDate: string; cvv: string }) => {
        console.log('Payment data submitted:', paymentData);
        nextStep();
    };

    return (
        <div className={`welcome-flow-container ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            {step === 1 && (
                <UserInfoStep
                    fullName={fullName}
                    phoneNumber={phoneNumber}
                    address={address}
                    setFullName={setFullName}
                    setPhoneNumber={setPhoneNumber}
                    setAddress={setAddress}
                    nextStep={nextStep}
                />
            )}
            {step === 2 && <OnboardingIntroStep nextStep={nextStep} />}
            {step === 3 && (
                <PersonaSelectionStep
                    persona={persona}
                    handlePersonaSelection={handlePersonaSelection}
                />
            )}
            {step === 4 && (persona === 'panhandler' || persona === 'waitress') && (
                <PublicProfileCreationStep
                    bio={bio}
                    address={address}
                    profileImage={profileImage}
                    setBio={setBio}
                    setAddress={setAddress}
                    handleImageUpload={handleImageUpload}
                    nextStep={nextStep}
                />
            )}
            {step === 5 && (persona === 'panhandler' || persona === 'waitress') && (
                <ReceiveDonationsStep nextStep={nextStep} />
            )}
            {step === 6 && persona === 'store' && (
                <StorePaymentsStep nextStep={nextStep} />
            )}
            {step === 7 && persona === 'store' && (
                <StoreProfileStep
                    fullName={fullName}
                    phoneNumber={phoneNumber}
                    address={address}
                    setFullName={setFullName}
                    setPhoneNumber={setPhoneNumber}
                    setAddress={setAddress}
                    nextStep={nextStep}
                />
            )}
            {step === 8 && persona === 'donor' && (
                <DonationPreferencesStep
                    preferredDonationAmount={preferredDonationAmount}
                    selectedCauses={selectedCauses}
                    recurringDonation={recurringDonation}
                    setPreferredDonationAmount={setPreferredDonationAmount}
                    setSelectedCauses={setSelectedCauses}
                    setRecurringDonation={setRecurringDonation}
                    handleCheckboxChange={handleCheckboxChange}
                    nextStep={nextStep}
                />
            )}
            {step === 9 && persona === 'donor' && (
                <AddFundsStep
                    preferredDonationAmount={preferredDonationAmount}
                    setPreferredDonationAmount={setPreferredDonationAmount}
                    handleSubmitPayment={handleSubmitPayment}
                />
            )}
            {step === 10 && (
                <FinalWelcomeStep onDashboardRedirect={() => router.push('/dashboard')} />
            )}
        </div>
    );
};

export default WelcomeFlow;
