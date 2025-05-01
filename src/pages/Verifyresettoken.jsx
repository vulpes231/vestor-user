/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import {
  clearLinkVerification,
  verifyAndReset,
} from "../features/resetPassSlice";
import { ErrorModal, LoadingModal, Successmodal } from "../components";

const PasswordReset = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const id = queryParams.get("id");

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    number: false,
    specialChar: false,
  });

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const { resetPassLoading, resetPassError, passReset } = useSelector(
    (state) => state.resetpass
  );

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Validate password requirements
    if (name === "newPassword") {
      setPasswordRequirements({
        length: value.length >= 8,
        number: /\d/.test(value),
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      });
    }
  };

  const validatePassword = () => {
    if (!form.newPassword || !form.confirmPassword) {
      setError("Both password fields are required");
      return false;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (form.newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePassword()) return;

    const formData = {
      token,
      id,
      newPassword: form.newPassword,
    };
    dispatch(verifyAndReset(formData));
  };

  useEffect(() => {
    if (resetPassError) setError(resetPassError);
  }, [resetPassError]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => setError(""), 5000);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  useEffect(() => {
    if (passReset) {
      setTimeout(() => {
        dispatch(clearLinkVerification());
        navigate("/signin");
      }, 3000);
    }
  }, [passReset, dispatch, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800  flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Reset Your Password
            </h1>
            <p className="text-gray-600">
              Create a new password for your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password Field */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleInput}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-[#333]"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 space-y-1">
              <p className="font-medium">Password must contain:</p>
              <div className="flex items-center">
                {passwordRequirements.length ? (
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500 mr-2" />
                )}
                <span>At least 8 characters</span>
              </div>
              <div className="flex items-center">
                {passwordRequirements.number ? (
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500 mr-2" />
                )}
                <span>At least one number</span>
              </div>
              <div className="flex items-center">
                {passwordRequirements.specialChar ? (
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500 mr-2" />
                )}
                <span>At least one special character</span>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleInput}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-[#333]"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={resetPassLoading}
              className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${
                resetPassLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {resetPassLoading ? "Processing..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>

      {/* Modals */}
      {error && <ErrorModal error={error} />}
      {resetPassLoading && <LoadingModal text={"Updating password..."} />}
      {passReset && <Successmodal text={"Password updated successfully!"} />}
    </div>
  );
};

export default PasswordReset;
