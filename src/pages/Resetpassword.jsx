/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { ErrorModal, LoadingModal, Successmodal } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { clearResetPass, sendPassResetLink } from "../features/resetPassSlice";

const Resetpassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { sendResetLoading, sendResetError, resetLinkSent } = useSelector(
    (state) => state.resetpass
  );

  const handleInput = (e) => {
    setEmail(e.target.value);
    setError(""); // Clear error when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    dispatch(sendPassResetLink({ email: email }));
  };

  useEffect(() => {
    if (sendResetError) {
      setError(sendResetError);
    }
  }, [sendResetError]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        setError("");
        dispatch(clearResetPass());
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [error, dispatch]);

  useEffect(() => {
    let timeout;
    if (resetLinkSent) {
      timeout = setTimeout(() => {
        dispatch(clearResetPass());
        setEmail("");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [dispatch, resetLinkSent]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Reset Password
            </h1>
            <p className="text-gray-600 text-sm">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleInput}
                autoComplete="off"
                className={`w-full px-4 py-3 rounded-lg border ${
                  error ? "border-red-300" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-[#333]`}
                placeholder="your@email.com"
              />
              {error && (
                <p className="mt-1 text-sm text-red-600 animate-fade-in">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={sendResetLoading}
              className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${
                sendResetLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {sendResetLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Remember your password?{" "}
              <a
                href="/login"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      {error && <ErrorModal error={error} />}
      {/* {sendResetLoading && <LoadingModal text={"Sending reset link..."} />} */}
      {resetLinkSent && (
        <Successmodal successText={"Reset link sent to your email!"} />
      )}
    </div>
  );
};

export default Resetpassword;
