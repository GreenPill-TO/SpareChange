"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from '@/context/ThemeContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import supabase from '@/utils/supabaseClient';

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

const stepHeadings = [
    "Introduction",
    "Complete Your Profile",
    "Choose Your Persona",
    "Additional Details",
    "Finalize Setup",
    "You're All Set!"
];

const WelcomeFlow: React.FC = () => {
    const router = useRouter();
    const [step, setStep] = useState<number>(1);
    const [persona, setPersona] = useState<string | null>(null);
    const { theme } = useTheme();

    // State for user information
    const [fullName, setFullName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [username, setUserName] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [preferredDonationAmount, setPreferredDonationAmount] = useState<string>('');
    const [selectedCauses, setSelectedCauses] = useState<string[]>([]);
    const [recurringDonation, setRecurringDonation] = useState<string>('');
    const [profileImage, setProfileImage] = useState<File | null>(null);

    const [isNextEnabled, setIsNextEnabled] = useState<boolean>(false);

    const saveToLocalStorage = () => {
        const data = {
            step,
            fullName,
            phoneNumber,
            username,
            bio,
            preferredDonationAmount,
            selectedCauses,
            recurringDonation,
            profileImage,
            persona,
        };
        localStorage.setItem('welcomeFlowData', JSON.stringify(data));
    };

    const syncToSupabase = async () => {
        const data = {
            step,
            full_name: fullName,
            phone: phoneNumber,
            username,
            bio,
            preferred_donation_amount: preferredDonationAmount,
            selected_cause: selectedCauses,
            profile_image_url: profileImage ? URL.createObjectURL(profileImage) : null,
            persona,
        };

        // Save to Supabase (modify this to match your Supabase setup)
        const { error } = await supabase
            .from('users')
            .update(data)
            .eq('auth_user_id', supabase.auth.user()?.id);

        if (error) {
            console.error('Error syncing data to Supabase:', error.message);
        }
    };

    const nextStep = () => {
        saveToLocalStorage();
        syncToSupabase();
        setStep(step + 1);
    };

    const previousStep = () => setStep(step - 1);

    const handlePersonaSelection = (selectedPersona: string) => {
        setPersona(selectedPersona);
        setIsNextEnabled(true); // Enable the Continue button after persona selection
    };

    useEffect(() => {
        if (step === 1) {
            setIsNextEnabled(true); // Always enable Next button on the first step
        }
    }, [step]);

    return (
        <div
            className={`welcome-flow-container min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-magenta-500 to-indigo-500 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
        >
            <div className={`w-full max-w-4xl p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                {/* Carousel for Progress */}
                <div className="flex justify-center mb-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full mx-1 ${index + 1 === step ? 'bg-indigo-600' : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`}
                        ></div>
                    ))}
                </div>

                {/* Dynamic Heading */}
                <h2 className="text-2xl font-semibold text-center mb-8">
                    {stepHeadings[step - 1]}
                </h2>

                <TransitionGroup>
                    <CSSTransition key={step} classNames="slide" timeout={300}>
                        <div className="step-content">
                            {step === 1 && <OnboardingIntroStep nextStep={nextStep} />}
                            {step === 2 && (
                                <UserInfoStep
                                    fullName={fullName}
                                    phoneNumber={phoneNumber}
                                    username={username}
                                    setFullName={setFullName}
                                    setPhoneNumber={setPhoneNumber}
                                    setUserName={setUserName}
                                    setIsNextEnabled={setIsNextEnabled}
                                />
                            )}
                            {step === 3 && (
                                <PersonaSelectionStep
                                    persona={persona}
                                    handlePersonaSelection={handlePersonaSelection}
                                    setIsNextEnabled={setIsNextEnabled}
                                />
                            )}
                            {step === 4 && persona && (
                                <>
                                    {(persona === 'support-seeker' || persona === 'service-worker') && (
                                        <PublicProfileCreationStep
                                            bio={bio}
                                            username={username}
                                            profileImage={profileImage}
                                            setBio={setBio}
                                            setAddress={setUserName}
                                            handleImageUpload={setProfileImage}
                                            setIsNextEnabled={setIsNextEnabled}
                                            nextStep={nextStep}
                                        />
                                    )}
                                    {persona === 'store' && (
                                        <StorePaymentsStep 
                                          nextStep={nextStep} 
                                          setIsNextEnabled={setIsNextEnabled} 
                                        />
                                    )}
                                    {persona === 'donor' && (
                                        <DonationPreferencesStep
                                            preferredDonationAmount={preferredDonationAmount}
                                            selectedCauses={selectedCauses}
                                            recurringDonation={recurringDonation}
                                            setPreferredDonationAmount={setPreferredDonationAmount}
                                            setSelectedCauses={setSelectedCauses}
                                            setRecurringDonation={setRecurringDonation}
                                            handleCheckboxChange={() => {}}
                                            setIsNextEnabled={setIsNextEnabled}
                                            nextStep={nextStep}
                                        />
                                    )}
                                </>
                            )}
                            {step === 5 && persona && (
                                <>
                                    {(persona === 'support-seeker' || persona === 'service-worker') && (
                                        <ReceiveDonationsStep 
                                          nextStep={nextStep}
                                          setIsNextEnabled={setIsNextEnabled}
                                        />
                                    )}
                                    {persona === 'store' && (
                                        <StoreProfileStep
                                            fullName={fullName}
                                            phoneNumber={phoneNumber}
                                            username={username}
                                            setFullName={setFullName}
                                            setPhoneNumber={setPhoneNumber}
                                            setAddress={setUserName}
                                            nextStep={nextStep}
                                            setIsNextEnabled={setIsNextEnabled}
                                        />
                                    )}
                                    {persona === 'donor' && (
                                        <AddFundsStep
                                            preferredDonationAmount={preferredDonationAmount}
                                            setPreferredDonationAmount={setPreferredDonationAmount}
                                            handleSubmitPayment={() => {}}
                                            nextStep={nextStep}
                                            setIsNextEnabled={setIsNextEnabled}
                                        />
                                    )}
                                </>
                            )}
                            {step === 6 && (
                                <FinalWelcomeStep 
                                    onDashboardRedirect={() => {
                                        saveToLocalStorage();
                                        syncToSupabase();
                                        router.push('/dashboard');
                                    }} 
                                />
                            )}
                        </div>
                    </CSSTransition>
                </TransitionGroup>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    {step > 1 && step < 6 && (
                        <button onClick={previousStep} className="text-indigo-600">
                            Back
                        </button>
                    )}
                    {step < 6 && (
                        <button
                            onClick={nextStep}
                            className={`text-indigo-600 ${!isNextEnabled && 'opacity-50 cursor-not-allowed'}`}
                            disabled={!isNextEnabled}
                            style={{ marginLeft: 'auto' }}
                        >
                            Continue
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WelcomeFlow;
