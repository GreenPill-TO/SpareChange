export * from "./OTPForm";
import { countryCodes, formatPhoneNumber } from "@/utils/phone-data";
import { ChangeEvent, FormEvent } from "react";
import { Spinner } from "../icons";

type OTPFormProps = {
  authMethod: "phone" | "email";
  countryCode: string;
  contact: string;
  passcode: string;
  setCountryCode: (value: string) => void;
  setContact: (value: string) => void;
  setPasscode: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isOtpSent: boolean;
  isLoading?: boolean;
  errorMessage: string | null;
  handleAuthMethodChange: (method: "phone" | "email") => void;
};

function OTPForm({
  authMethod,
  countryCode,
  contact,
  passcode,
  setCountryCode,
  setContact,
  setPasscode,
  onSubmit,
  isOtpSent,
  errorMessage,
  handleAuthMethodChange,
  isLoading = false,
}: OTPFormProps) {
  const handleContactChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContact(authMethod === "phone" ? formatPhoneNumber(value, countryCode) : value);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        {!isOtpSent && (
          <>
            <p className="text-center md:mt-0 mt-6 text-xl mb-4 font-semibold">Sign In or Sign Up</p>
            <div className="flex mb-4 items-center">
              <label className="mr-4">Sign in with:</label>
              <select
                value={authMethod}
                onChange={(e) => handleAuthMethodChange(e.target.value as "phone" | "email")}
                className={`p-2 rounded border dark:bg-gray-800 dark:text-white dark:border-gray-600 bg-white text-black border-gray-300`}
              >
                <option value="phone">Phone</option>
                <option value="email">Email</option>
              </select>
            </div>
          </>
        )}

        {isOtpSent && (
          <>
            <p className="text-center text-lg md:mt-0 mt-6 font-semibold">Enter verification code received on {contact}</p>
            <p className="text-center text-slate-500 mt-2 text-sm">Didn't receive the code? Check your spam folder</p>
          </>
        )}

        {!isOtpSent && authMethod === "phone" && (
          <div className="form-control w-full mt-8 flex">
            <div className="flex w-full">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className={`p-2 mr-2 rounded border dark:bg-gray-800 dark:text-white dark:border-gray-600 bg-white text-black border-gray-300`}
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
                onChange={handleContactChange}
                className={`flex-1 p-2 rounded border dark:bg-gray-800 dark:text-white dark:border-gray-600 bg-white text-black border-gray-300`}
                required
              />
            </div>
          </div>
        )}

        {!isOtpSent && authMethod === "email" && (
          <div className="form-control w-full mt-8">
            <input
              type="email"
              placeholder="Enter your email"
              value={contact}
              onChange={handleContactChange}
              className={`w-full p-2 mb-4 rounded border dark:bg-gray-800 dark:text-white dark:border-gray-600 bg-white text-black border-gray-300`}
              required
            />
          </div>
        )}

        {isOtpSent && (
          <div className="form-control w-full mt-8">
            <label className="label">
              <span className="label-text text-base-content text-xs text-slate-600 dark:text-slate-300">Verification Code</span>
            </label>
            <input
              type="text"
              value={passcode}
              placeholder="Ex- 123456"
              onChange={(e) => setPasscode(e.target.value)}
              className={`input input-bordered input-primary w-full dark:bg-gray-800 dark:text-white bg-white text-black`}
            />
          </div>
        )}
      </div>

      {/* Display error only for phone authMethod */}
      {authMethod === "phone" && errorMessage && <div className="text-rose-500">{errorMessage}</div>}

      <button type="submit" className="btn mt-2 normal-case w-full btn-primary text-white" disabled={isLoading}>
        {isLoading && <Spinner />}
        {isOtpSent ? "Verify" : "Get Verification Code"}
      </button>
    </form>
  );
}

export default OTPForm;
