import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

function Auth() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage('Error sending OTP: ' + error.message);
    } else {
      setMessage('Check your email for the OTP!');
      setIsOtpSent(true);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email'  // specify the type of OTP verification
      });
      if (error) {
        setMessage('Error verifying OTP: ' + error.message);
      } else {
        setMessage('OTP verified successfully!');
        // Optionally, you can redirect the user to a protected route here
        // window.location.href = '/protected';
      }
    } catch (err) {
      if (err instanceof Error) {
        setMessage('Error: ' + err.message);
      } else {
        setMessage('An unknown error occurred');
      }
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
      <h1 className="text-2xl font-bold mb-4">Authenticate</h1>
      {isOtpSent ? (
        <form onSubmit={handleVerifyOtp}>
          <input
            type="text"
            placeholder="Enter your OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
            Verify OTP
          </button>
        </form>
      ) : (
        <form onSubmit={handleSendOtp}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
            Send OTP
          </button>
        </form>
      )}
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}

export default Auth;
