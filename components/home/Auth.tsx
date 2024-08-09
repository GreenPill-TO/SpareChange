"use client";

import React, { useState } from 'react';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { sendPasscode, verifyPasscode, selectAuthStatus, selectAuthError, selectAuthMessage } from "@/store/authSlice";
import { useTheme } from "@/context/ThemeContext";
import { countryCodes, formatPhoneNumber } from "@/utils/phoneData";
import { createClient } from "@/utils/supabase/client"; // Import Supabase client

const supabase = createClient(); // Initialize Supabase client

function Auth() {
  const { theme } = useTheme();
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [countryCode, setCountryCode] = useState('+1'); 
  const [contact, setContact] = useState(''); 
  const [passcode, setPasscode] = useState('');

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();  // Use the router without conditional checks

  const isPasscodeSent = useSelector((state: RootState) => state.auth.isPasscodeSent);
  const authStatus = useSelector(selectAuthStatus);
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
    <div className={`p-8 rounded shadow-md max-w-md w-full ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      <h1 className="text-2xl font-bold mb-4">
        Sign in with
        <select
          value={authMethod}
          onChange={(e) => handleAuthMethodChange(e.target.value as 'phone' | 'email')}
          className={`ml-2 p-1 ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-black"} border-b-2 border-gray-500 focus:outline-none focus:border-blue-500`}
        >
          <option value="phone">Phone</option>
          <option value="email">Email</option>
        </select>
      </h1>

      {isPasscodeSent ? (
        <form onSubmit={handleVerifyPasscode}>
          <input
            type="text"
            placeholder="Enter your passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className={`w-full p-2 mb-4 border rounded ${theme === "dark" ? "bg-gray-800 text-white border-gray-700" : "bg-gray-100 text-black border-gray-300"}`}
            required
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
            Verify Passcode
          </button>
        </form>
      ) : (
        <form onSubmit={handleSendPasscode}>
          {authMethod === 'phone' && (
            <div className="flex mb-4">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className={`p-2 mr-2 rounded ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-black"} border-gray-500 focus:outline-none`}
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={contact}
                onChange={(e) => setContact(formatPhoneNumber(e.target.value, countryCode))}
                className={`flex-1 p-2 border rounded ${theme === "dark" ? "bg-gray-800 text-white border-gray-700" : "bg-gray-100 text-black border-gray-300"}`}
                required
              />
            </div>
          )}
          {authMethod === 'email' && (
            <input
              type="email"
              placeholder="Enter your email"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className={`w-full p-2 mb-4 border rounded ${theme === "dark" ? "bg-gray-800 text-white border-gray-700" : "bg-gray-100 text-black border-gray-300"}`}
              required
            />
          )}
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
            Send Passcode
          </button>
        </form>
      )}
      {(authMessage || authError) && <p className="mt-4 text-center">{authMessage || authError}</p>}
    </div>
  );
}

export default Auth;
