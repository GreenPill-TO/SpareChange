import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { sendPasscode, verifyPasscode, resetAuthState } from "@/store/authSlice";
import OTPForm from "../OTPForm";
import ImageCarousel from "../ImageCarousel";
import { useTheme } from "@/context/ThemeContext";
import { getSupabaseClient } from "@/utils/supabase/client"; // Supabase client
import { useNotification } from "@/context/NotificationContext"; // Import custom notification context
import axios from "axios"; // Import axios for API calls
import { isValidUUID } from "@/utils/validators"; // Utility function to validate UUIDs

const supabase = getSupabaseClient(); // Initialize Supabase client

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
  const { theme } = useTheme(); // Retrieve the theme using the useTheme hook
  const { notify } = useNotification(); // Use the notification context

  const isPasscodeSent = useSelector((state: RootState) => state.auth.isPasscodeSent);

  useEffect(() => {
    // Reset state when the modal opens/closes
    dispatch(resetAuthState());
    setAuthMethod('phone');
    setCountryCode('+1');
    setContact('');
    setPasscode('');
  }, [extraObject.isSignIn, dispatch]);

  const handleSendPasscode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullContact = authMethod === 'phone' ? `${countryCode}${contact}` : contact;

    console.log('Sending passcode to:', fullContact);

    try {
      await dispatch(sendPasscode({ method: authMethod, contact: fullContact })).unwrap();
    } catch (err) {
      console.error('Error sending passcode:', err);
      notify('Failed to send passcode. Please try again.', 'error'); // Show error notification
    }
  };

  const handleVerifyPasscode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullContact = authMethod === 'phone' ? `${countryCode}${contact}` : contact;

    try {
      const result = await dispatch(verifyPasscode({ method: authMethod, contact: fullContact, passcode })).unwrap();
      if (result === 'Passcode verified successfully!') {
        notify('Passcode verified successfully!', 'success'); // Show success notification
        await handlePostAuthentication(fullContact);
      }
    } catch (err) {
      console.error('Error verifying passcode:', err);
      notify('Failed to verify passcode. Please try again.', 'error'); // Show error notification
    }
  };

  const handlePostAuthentication = async (fullContact: string) => {
    console.log('Attempting to fetch user with contact:', fullContact);
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq(authMethod === 'phone' ? 'phone' : 'email', fullContact)
      .single();

    console.log('User fetch result:', { user, error });

    if (error || !user) {
      console.log('No existing user found, attempting to create new user with contact:', fullContact);

      // Call Cubid API to create user and get UUID and newuser status
      const cubidResponse = await axios.post(
        "https://passport.cubid.me/api/dapp/create_user",
        {
          dapp_id: process.env.NEXT_PUBLIC_CUBID_API_KEY,
          email: fullContact,
          stamptype: authMethod === 'email' ? 'email' : 'phone',
        }
      );

      const { uuid, newuser } = cubidResponse.data;

      if (!isValidUUID(uuid)) {
        console.error('Received invalid UUID from Cubid API:', uuid);
        notify('Failed to create user. Invalid UUID received.', 'error');
        return;
      }

      // Insert new user with Cubid data into Supabase
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert([{ 
          [authMethod === 'phone' ? 'phone' : 'email']: fullContact,
          cubid_id: uuid, // Store the Cubid UUID
          is_new_user: newuser // Store the newuser status
        }])
        .single();

      console.log('New user creation result:', { newUser, insertError });

      if (insertError) {
        console.error('Error creating new user:', insertError);
        notify('Failed to create user. Please try again.', 'error'); // Show error notification
        return;
      }
      notify('Account created successfully!', 'success'); // Show success notification
      setTimeout(() => {
        closeModal();
        router.push('/welcome');
      }, 2000); // Auto-close modal after 2 seconds and redirect
    } else {
      // For returning users, let's update the Cubid data if necessary
      await updateCubidData(user.cubid_id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
      }
      notify('Login successful!', 'success'); // Show success notification
      setTimeout(() => {
        closeModal();
        router.push('/dashboard');
      }, 2000); // Auto-close modal after 2 seconds and redirect
    }
  };

  const updateCubidData = async (cubidId: string) => {
    try {
      const { data: supabaseData, error: supabaseError } = await supabase
        .from('users')
        .select('cubid_score, cubid_identity, cubid_score_details')
        .eq('cubid_id', cubidId)
        .single();

      if (supabaseError || !supabaseData) {
        console.error('Error fetching user data from Supabase:', supabaseError);
        return;
      }

      const [score, identity, scoreDetails] = await Promise.all([
        axios.post("https://passport.cubid.me/api/dapp/fetch_score", {
          apikey: process.env.NEXT_PUBLIC_CUBID_API_KEY,
          uid: cubidId,
        }),
        axios.post("https://passport.cubid.me/api/dapp/get_identity", {
          apikey: process.env.NEXT_PUBLIC_CUBID_API_KEY,
          uid: cubidId,
        }),
        axios.post("https://passport.cubid.me/api/dapp/get_score_details", {
          apikey: process.env.NEXT_PUBLIC_CUBID_API_KEY,
          uid: cubidId,
        }),
      ]);

      const updatedFields: Record<string, any> = {};
      if (score.data !== supabaseData.cubid_score) updatedFields.cubid_score = score.data;
      if (identity.data !== supabaseData.cubid_identity) updatedFields.cubid_identity = identity.data;
      if (scoreDetails.data !== supabaseData.cubid_score_details) updatedFields.cubid_score_details = scoreDetails.data;

      if (Object.keys(updatedFields).length > 0) {
        await supabase
          .from('users')
          .update(updatedFields)
          .eq('cubid_id', cubidId);
      }

    } catch (err) {
      console.error('Error updating Cubid data:', err);
    }
  };

  const handleAuthMethodChange = (method: 'phone' | 'email') => {
    setAuthMethod(method);
    setContact('');
    dispatch(resetAuthState()); // Reset the auth state when the method changes
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
            errorMessage={null} // Removed modal-specific error message display
            handleAuthMethodChange={handleAuthMethodChange}
            theme={theme} // Pass the theme prop here
          />
        </div>
      </div>
    </div>
  );
}

export default SignInModal;
