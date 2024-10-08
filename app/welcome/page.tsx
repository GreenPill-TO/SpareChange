"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from '@/context/ThemeContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getSupabaseClient } from "@/utils/supabase/client";

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

const supabase = getSupabaseClient(); // Initialize Supabase client

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
    const [username, setUserName] = useState<string>('');  
    const [email, setEmail] = useState<string>('');        
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [address, setAddress] = useState<string>('');    
    const [bio, setBio] = useState<string>('');
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [preferredDonationAmount, setPreferredDonationAmount] = useState<string>('');
    const [selectedCause, setSelectedCause] = useState<string>('');
    const [goodTip, setGoodTip] = useState<number | null>(null);
    const [normalTip, setNormalTip] = useState<number | null>(null);

    const [isNextEnabled, setIsNextEnabled] = useState<boolean>(false);

    // Function to load initial data from Supabase
    const loadInitialData = async () => {
        const { data: authData, error: authError } = await supabase.auth.getUser();

        if (authError || !authData?.user) {
            console.error('Error fetching user data from Supabase:', authError?.message);
            return;
        }

        const userId = authData.user.id;

        // Fetch current_step from Supabase
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('current_step')
            .eq('auth_user_id', userId)
            .single();

        if (userError || !userData) {
            console.error('Error fetching user data from Supabase:', userError?.message);
            return;
        }

        const currentStep = userData.current_step;

        // If the user is past step 1, fetch the full user record
        if (currentStep > 1) {
            const { data: fullUserData, error: fullUserError } = await supabase
                .from('users')
                .select('*')
                .eq('auth_user_id', userId)
                .single();

            if (fullUserError || !fullUserData) {
                console.error('Error fetching full user data from Supabase:', fullUserError?.message);
                return;
            }

            // Prepopulate the state with the fetched data
            setStep(currentStep);
            setFullName(fullUserData.full_name || '');
            setUserName(fullUserData.username || '');
            setEmail(fullUserData.email || '');
            setPhoneNumber(fullUserData.phone || '');
            setAddress(fullUserData.address || '');
            setBio(fullUserData.bio || '');
            setProfileImage(fullUserData.profile_image_url ? new File([], fullUserData.profile_image_url) : null);
            setPreferredDonationAmount(fullUserData.preferred_donation_amount ? fullUserData.preferred_donation_amount.toString() : '');
            setSelectedCause(fullUserData.selected_cause || '');
            setGoodTip(fullUserData.good_tip);
            setNormalTip(fullUserData.default_tip);
            setPersona(fullUserData.persona || null);
        } else {
            setStep(currentStep);
        }
    };

    useEffect(() => {
        loadInitialData(); // Load data on component mount
    }, []);

    const saveToLocalStorage = () => {
        const data = {
            step,
            fullName: fullName || null,
            username: username || null,
            email: email || null,
            phoneNumber: phoneNumber || null,
            address: address || null,
            bio: bio || null,
            profileImage: profileImage || null,
            preferredDonationAmount: preferredDonationAmount !== '' ? parseFloat(preferredDonationAmount) : null,
            selectedCause: selectedCause || null,
            goodTip: goodTip !== null ? goodTip : null,
            normalTip: normalTip !== null ? normalTip : null,
            persona,
        };
        localStorage.setItem('welcomeFlowData', JSON.stringify(data));
    };

    const syncToSupabase = async () => {
        const { data, error: userError } = await supabase.auth.getUser();

        if (userError || !data?.user) {
            console.error('Error fetching user data from Supabase:', userError?.message);
            return;
        }

        const userId = data.user.id;

        const userDataUpdate: { [key: string]: any } = {};

        if (step !== null) userDataUpdate.current_step = step;
        if (fullName) userDataUpdate.full_name = fullName;
        if (username) userDataUpdate.username = username;
        if (email) userDataUpdate.email = email;
        if (phoneNumber) userDataUpdate.phone = phoneNumber;
        if (address) userDataUpdate.address = address;
        if (bio) userDataUpdate.bio = bio;
        if (profileImage) {
            const profileImageUrl = URL.createObjectURL(profileImage);
            if (profileImageUrl !== data.user.user_metadata.profile_image_url) userDataUpdate.profile_image_url = profileImageUrl;
        }
        if (preferredDonationAmount !== '') userDataUpdate.preferred_donation_amount = parseFloat(preferredDonationAmount);
        if (selectedCause) userDataUpdate.selected_cause = selectedCause;
        if (goodTip !== null) userDataUpdate.good_tip = goodTip;
        if (normalTip !== null) userDataUpdate.default_tip = normalTip;
        if (persona) userDataUpdate.persona = persona;

        if (Object.keys(userDataUpdate).length > 0) {
            const { error } = await supabase
                .from('users')
                .update(userDataUpdate)
                .eq('auth_user_id', userId);

            if (error) {
                console.error('Error syncing user data to Supabase:', error.message);
            }
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
                                    username={username}            
                                    email={email}                  
                                    phoneNumber={phoneNumber}
                                    setFullName={setFullName}
                                    setUserName={setUserName}      
                                    setEmail={setEmail}            
                                    setPhoneNumber={setPhoneNumber}
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
                                            address={address}
                                            profileImage={profileImage}
                                            setBio={setBio}
                                            setAddress={setAddress}
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
                                            selectedCause={selectedCause}
                                            goodTip={goodTip}
                                            normalTip={normalTip}
                                            setPreferredDonationAmount={setPreferredDonationAmount}
                                            setSelectedCause={setSelectedCause}
                                            setGoodTip={setGoodTip}
                                            setNormalTip={setNormalTip}
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
                                            address={address}
                                            setFullName={setFullName}
                                            setPhoneNumber={setPhoneNumber}
                                            setAddress={setAddress}
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
