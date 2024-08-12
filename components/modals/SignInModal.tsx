import { useState } from "react";
import { useRouter } from "next/navigation";  // Use next/navigation instead of next/router
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { sendPasscode, verifyPasscode, selectAuthStatus, selectAuthError, selectAuthMessage } from "@/store/authSlice";
import OTPForm from "../OTPForm";
import ImageCarousel from "../ImageCarousel";
import { getSupabaseClient } from "@/utils/supabase/client"; // Supabase client

const supabase = getSupabaseClient(); // Initialize Supabase client

// Define types for the props
type SignInModalProps = {
  closeModal: () => void;
  extraObject: {
    isSignIn: boolean;
  };
};

const constants = {
  SIGN_UP_IMAGES: [
    {
      title: "Support with spare change.",
      imageUrl: "https://plus.unsplash.com/premium_photo-1677105212168-8b5704a404d9?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Join our community.",
      imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "Make a difference today.",
      imageUrl: "https://images.unsplash.com/photo-1547481887-a26e2cacb5b2?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Empower those in need.",
      imageUrl: "https://plus.unsplash.com/premium_photo-1692110540280-88aa6dd9c3db?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Be a change maker.",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1350&q=80",
    },
  ],
};

function SignInModal({ closeModal, extraObject }: SignInModalProps) {
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [countryCode, setCountryCode] = useState('+1');
  const [contact, setContact] = useState('');
  const [passcode, setPasscode] = useState('');

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const isPasscodeSent = useSelector((state: RootState) => state.auth.isPasscodeSent);
  const authError = useSelector(selectAuthError);
  const authMessage = useSelector(selectAuthMessage);

  const handleSendPasscode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullContact = authMethod === 'phone' ? `${countryCode}${contact}` : contact;

    try {
      await dispatch(sendPasscode({ method: authMethod, contact: fullContact })).unwrap();
    } catch (err) {
      console.error('Error sending passcode:', err);
    }
  };

  const handleVerifyPasscode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullContact = authMethod === 'phone' ? `${countryCode}${contact}` : contact;

    try {
      const result = await dispatch(verifyPasscode({ method: authMethod, contact: fullContact, passcode })).unwrap();
      if (result === 'Passcode verified successfully!') {
        await handlePostAuthentication(fullContact);
      }
    } catch (err) {
      console.error('Error verifying passcode:', err);
    }
  };

  const handlePostAuthentication = async (fullContact: string) => {
    const { data: user, error } = await supabase
      .from('public.users')
      .select('*')
      .eq(authMethod === 'phone' ? 'phone' : 'email', fullContact)
      .single();

    if (error || !user) {
      const { data: newUser, error: insertError } = await supabase
        .from('public.users')
        .insert([{ [authMethod === 'phone' ? 'phone' : 'email']: fullContact }])
        .single();

      if (insertError) {
        console.error('Error creating new user:', insertError);
        return;
      }
      router.push('/welcome');
    } else {
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/dashboard');
    }
  };

  const handleAuthMethodChange = (method: 'phone' | 'email') => {
    setAuthMethod(method);
    setContact('');
  };

  return (
    <div className="flex items-center rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        <ImageCarousel images={constants.SIGN_UP_IMAGES} />
        <div className="md:p-10 pb-12">
          <OTPForm
            authMethod={authMethod}
            countryCode={countryCode}
            contact={contact}
            passcode={passcode}
            setCountryCode={setCountryCode}
            setContact={setContact}
            setPasscode={setPasscode}
            onSubmit={isPasscodeSent ? handleVerifyPasscode : handleSendPasscode}
            isOtpSent={isPasscodeSent}
            errorMessage={authError || authMessage}
            handleAuthMethodChange={handleAuthMethodChange}
          />
        </div>
      </div>
    </div>
  );
}

export default SignInModal;
