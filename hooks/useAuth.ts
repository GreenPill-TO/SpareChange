import { useState, useEffect } from "react";
import { getSupabaseClient } from "@/utils/supabase/client";
import OTPForm from "./OTPForm";
import ImageCarousel from "./ImageCarousel";

const constants = {
  SIGN_UP_IMAGES: [
    {
      title: "Support with spare change.",
      imageUrl: "https://plus.unsplash.com/premium_photo-1681319553238-9860299dfb0f?auto=format&fit=crop&q=80&w=2831&ixlib=rb-4.0.3",
    },
    // Other images...
  ],
};

function SignInModal({ closeModal, extraObject }) {
  const INITIAL_REGISTER_OBJ = {
    otp: "",
    emailId: "",
  };

  const { isSignIn } = extraObject;
  const supabase = getSupabaseClient();

  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_REGISTER_OBJ);

  useEffect(() => {
    setLoading(false);
    setIsOtpSent(false);
    setErrorMessage("");
    setLoginObj({ otp: "", emailId: "" });
  }, [isSignIn]);

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  const checkIfUserExists = async (userId) => {
    const { data, error } = await supabase
      .from('public.users')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      setErrorMessage("An error occurred while checking user status.");
      return null;
    }

    return data;
  };

  const submitVerificationCode = async () => {
    setLoading(true);
    const { data: authData, error } = await supabase.auth.verifyOtp({
      email: loginObj.emailId,
      token: loginObj.otp,
      type: "email",
    });

    setLoading(false);

    if (error) {
      return setErrorMessage("Failed to verify OTP: " + error.message);
    }

    if (authData?.user) {
      const userId = authData.user.id;
      const userData = await checkIfUserExists(userId);

      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/welcome';
      }
    } else {
      setErrorMessage("Verification failed: User data is missing.");
    }
  };

  const submitForm = async () => {
    if (isOtpSent) {
      await submitVerificationCode();
    } else {
      setLoading(true);
      await supabase.auth.signInWithOtp({
        email: loginObj.emailId,
      });
      setLoading(false);
      setIsOtpSent(true);
    }
  };

  return (
    <div className="flex items-center rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        <ImageCarousel images={constants.SIGN_UP_IMAGES} />
        <div className="md:p-10 pb-12">
          <OTPForm
            onSubmit={submitForm}
            loading={loading}
            isOtpSent={isOtpSent}
            errorMessage={errorMessage}
            loginObj={loginObj}
            updateFormValue={updateFormValue}
          />
        </div>
      </div>
    </div>
  );
}

export default SignInModal;
