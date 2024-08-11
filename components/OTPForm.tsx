import { useState, useEffect } from "react";

function OTPForm({ onSubmit, loading, isOtpSent, errorMessage, loginObj, updateFormValue }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        {!isOtpSent && (
          <p className="text-center md:mt-0 mt-6 text-xl mb-4 font-semibold">
            Sign In or Sign Up
          </p>
        )}
        {isOtpSent && (
          <>
            <p className="text-center text-lg md:mt-0 mt-6 font-semibold">
              Enter verification code received on {loginObj.emailId}
            </p>
            <p className="text-center text-slate-500 mt-2 text-sm">
              Didn&apos;t receive mail? Check spam folder
            </p>
          </>
        )}

        {/* Email Input */}
        {!isOtpSent && (
          <div className="form-control w-full mt-8">
            <label className="label">
              <span className="label-text text-base-content text-xs text-slate-600 dark:text-slate-300">
                {"Enter your email Id"}
              </span>
            </label>
            <input
              type="text"
              value={loginObj.emailId}
              placeholder={"Ex- username@gmail.com"}
              onChange={(e) =>
                updateFormValue({
                  updateType: "emailId",
                  value: e.target.value,
                })
              }
              className="input input-bordered input-primary w-full bg-white dark:bg-gray-700 text-black dark:text-white"
            />
          </div>
        )}

        {/* OTP Input */}
        {isOtpSent && (
          <div className="form-control w-full mt-8">
            <label className="label">
              <span className="label-text text-base-content text-xs text-slate-600 dark:text-slate-300">
                {"Verification Code"}
              </span>
            </label>
            <input
              type="text"
              value={loginObj.otp}
              placeholder={"Ex- 123456"}
              onChange={(e) =>
                updateFormValue({
                  updateType: "otp",
                  value: e.target.value,
                })
              }
              className="input input-bordered input-primary w-full bg-white dark:bg-gray-700 text-black dark:text-white"
            />
          </div>
        )}
      </div>

      <div className={`${"mt-6"} text-rose-500`}>
        {errorMessage}
      </div>

      <button
        type="submit"
        className="btn mt-2 normal-case w-full btn-primary text-white"
        disabled={loading}
      >
        {loading && <span className="loading loading-spinner"></span>}
        {isOtpSent ? `Verify` : `Get Verification Code`}
      </button>
    </form>
  );
}

export default OTPForm;
