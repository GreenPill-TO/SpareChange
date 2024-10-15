"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

// Import all the step components
import { useAuth } from "@TCoin/api/hooks/useAuth";
import { updateCubidDataInSupabase } from "@TCoin/api/services/supabaseService";
import AddFundsStep from "@TCoin/app/welcome/steps/AddFundsStep";
import DonationPreferencesStep from "@TCoin/app/welcome/steps/DonationPreferencesStep";
import FinalWelcomeStep from "@TCoin/app/welcome/steps/FinalWelcomeStep";
import OnboardingIntroStep from "@TCoin/app/welcome/steps/OnboardingIntroStep";
import PersonaSelectionStep from "@TCoin/app/welcome/steps/PersonaSelectionStep";
import PublicProfileCreationStep from "@TCoin/app/welcome/steps/PublicProfileCreationStep";
import ReceiveDonationsStep from "@TCoin/app/welcome/steps/ReceiveDonationsStep";
import StorePaymentsStep from "@TCoin/app/welcome/steps/StorePaymentsStep";
import StoreProfileStep from "@TCoin/app/welcome/steps/StoreProfileStep";
import UserInfoStep from "@TCoin/app/welcome/steps/UserInfoStep";
import { TCubidData } from "@TCoin/types/cubid";
import classNames from "classnames";

const stepHeadings = ["Introduction", "Complete Your Profile", "Choose Your Persona", "Additional Details", "Finalize Setup", "You're All Set!"];

const WelcomeFlow: React.FC = () => {
  const router = useRouter();
  const { userData } = useAuth();

  const [userFormData, setUserFormData] = useState<TCubidData>({
    full_name: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    profile_image_url: null,
    preferred_donation_amount: 0,
    selected_cause: "",
    good_tip: 0,
    default_tip: 0,
    persona: null,
    current_step: 1,
  });

  const [isNextEnabled, setIsNextEnabled] = useState<boolean>(true);

  // Function to load initial data from Supabase
  const loadInitialData = async () => {
    const currentStep = userData?.cubidData?.current_step;

    // If the user is past step 1, fetch the full user record
    if (currentStep > 1) {
      // Prepopulate the state with the fetched data
      setUserFormData(JSON.parse(JSON.stringify(userData?.cubidData)));
    }
  };

  useEffect(() => {
    loadInitialData(); // Load data on component mount
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem("welcomeFlowData", JSON.stringify(userFormData));
  };

  const syncToSupabase = async () => {
    const cubidId = userData?.user?.cubid_id;

    const userDataUpdate: { [key: string]: any } = {
      ...userFormData,
      preferred_donation_amount: userFormData.preferred_donation_amount,
      profile_image_url: userFormData.profile_image_url ? URL.createObjectURL(userFormData.profile_image_url) : null,
    };

    if (Object.keys(userDataUpdate).length > 0) {
      const { error } = await updateCubidDataInSupabase(cubidId, userDataUpdate);

      if (error) {
        console.error("Error syncing user data to Supabase:", error.message);
      }
    }
  };

  const nextStep = useCallback(() => {
    saveToLocalStorage();
    syncToSupabase();
    setUserFormData({ ...userFormData, current_step: userFormData.current_step + 1 });
  }, [userFormData]);

  const previousStep = useCallback(() => {
    setUserFormData({ ...userFormData, current_step: userFormData.current_step - 1 });
  }, [userFormData]);

  const handlePersonaSelection = useCallback(
    (selectedPersona: string) => {
      setUserFormData({ ...userFormData, persona: selectedPersona });
      setIsNextEnabled(true); // Enable the Continue button after persona selection
    },
    [userFormData]
  );

  const updateUserFormField = useCallback(
    (key: string, value: any) => {
      setUserFormData({ ...userFormData, [key]: value });
    },
    [userFormData]
  );

  useEffect(() => {
    if (userFormData.current_step === 1) {
      setIsNextEnabled(true); // Always enable Next button on the first step
    }
  }, [userFormData.current_step]);

  return (
    <div
      className={classNames(
        "welcome-flow-container min-h-screen flex flex-col items-center justify-center",
        "bg-gradient-to-r from-magenta-500 to-indigo-500 dark:text-whitetext-gray-900"
      )}
    >
      <div className={classNames("w-full max-w-4xl p-6 rounded-lg shadow-lg", "dark:bg-gray-800 dark:text-white bg-white text-gray-900")}>
        {/* Carousel for Progress */}
        <div className="flex justify-center mb-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full mx-1 ${index + 1 === userFormData.current_step ? "bg-indigo-600" : "dark:bg-gray-600 bg-gray-300"}`}
            ></div>
          ))}
        </div>

        {/* Dynamic Heading */}
        <h2 className="text-2xl font-semibold text-center mb-8">{stepHeadings[userFormData.current_step - 1]}</h2>

        <TransitionGroup>
          <CSSTransition key={userFormData.current_step} classNames="slide" timeout={300}>
            <div className="step-content">
              {userFormData.current_step === 1 && <OnboardingIntroStep nextStep={nextStep} />}
              {userFormData.current_step === 2 && (
                <UserInfoStep
                  fullName={userFormData.full_name}
                  username={userFormData.username}
                  email={userFormData.email}
                  phoneNumber={userFormData.phone}
                  setFullName={(v) => updateUserFormField("full_name", v)}
                  setUserName={(v) => updateUserFormField("username", v)}
                  setEmail={(v) => updateUserFormField("email", v)}
                  setPhoneNumber={(v) => updateUserFormField("phone", v)}
                  setIsNextEnabled={setIsNextEnabled}
                />
              )}
              {userFormData.current_step === 3 && (
                <PersonaSelectionStep
                  persona={userFormData.persona}
                  handlePersonaSelection={handlePersonaSelection}
                  setIsNextEnabled={setIsNextEnabled}
                />
              )}
              {userFormData.current_step === 4 && userFormData.persona && (
                <>
                  {(userFormData.persona === "ph" || userFormData.persona === "tip") && (
                    <PublicProfileCreationStep
                      bio={userFormData.bio}
                      address={userFormData.address}
                      profileImage={userFormData.profile_image_url}
                      setBio={(v) => updateUserFormField("bio", v)}
                      setAddress={(v) => updateUserFormField("address", v)}
                      handleImageUpload={(v) => updateUserFormField("profile_image_url", v)}
                      setIsNextEnabled={setIsNextEnabled}
                      nextStep={nextStep}
                    />
                  )}
                  {userFormData.persona === "sm" && <StorePaymentsStep nextStep={nextStep} setIsNextEnabled={setIsNextEnabled} />}
                  {userFormData.persona === "dr" && (
                    <DonationPreferencesStep
                      preferredDonationAmount={userFormData.preferred_donation_amount || 0}
                      selectedCause={userFormData.selected_cause}
                      goodTip={userFormData.good_tip}
                      defaultTip={userFormData.default_tip}
                      setPreferredDonationAmount={(v) => updateUserFormField("preferred_donation_amount", v)}
                      setSelectedCause={(v) => updateUserFormField("selected_cause", v)}
                      setGoodTip={(v) => updateUserFormField("good_tip", v)}
                      setDefaultTip={(v) => updateUserFormField("default_tip", v)}
                      setIsNextEnabled={setIsNextEnabled}
                      nextStep={nextStep}
                    />
                  )}
                </>
              )}
              {userFormData.current_step === 5 && userFormData.persona && (
                <>
                  {(userFormData.persona === "ph" || userFormData.persona === "tip") && (
                    <ReceiveDonationsStep nextStep={nextStep} setIsNextEnabled={setIsNextEnabled} />
                  )}
                  {userFormData.persona === "sm" && (
                    <StoreProfileStep
                      fullName={userFormData.full_name}
                      phoneNumber={userFormData.phone}
                      address={userFormData.address}
                      setFullName={(v) => updateUserFormField("full_name", v)}
                      setPhoneNumber={(v) => updateUserFormField("phone", v)}
                      setAddress={(v) => updateUserFormField("address", v)}
                      nextStep={nextStep}
                      setIsNextEnabled={setIsNextEnabled}
                    />
                  )}
                  {userFormData.persona === "dr" && (
                    <AddFundsStep
                      preferredDonationAmount={userFormData.preferred_donation_amount || 0}
                      setPreferredDonationAmount={(v) => updateUserFormField("preferred_donation_amount", v)}
                      handleSubmitPayment={() => {}}
                      nextStep={nextStep}
                      setIsNextEnabled={setIsNextEnabled}
                    />
                  )}
                </>
              )}
              {userFormData.current_step === 6 && (
                <FinalWelcomeStep
                  onDashboardRedirect={() => {
                    saveToLocalStorage();
                    syncToSupabase();
                    router.push("/dashboard");
                  }}
                />
              )}
            </div>
          </CSSTransition>
        </TransitionGroup>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {userFormData.current_step > 1 && userFormData.current_step < 6 && (
            <button onClick={previousStep} className="text-indigo-600">
              Back
            </button>
          )}
          {userFormData.current_step < 6 && (
            <button
              onClick={nextStep}
              className={`text-indigo-600 ${!isNextEnabled && "opacity-50 cursor-not-allowed"}`}
              disabled={!isNextEnabled}
              style={{ marginLeft: "auto" }}
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
