/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoginCode, resetLoginOtp } from "../features/otpSlice";
import { ErrorModal, LoadingModal, Successmodal } from "../components";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../constants/constant";
import { getUserInfo } from "../features/userSlice";

const Loginotp = () => {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ otp: "" });
  const [error, setError] = useState("");

  const { otpLoading, otpError, loginOtp } = useSelector((state) => state.otp);
  const { userInfo } = useSelector((state) => state.user);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous error messages

    if (!form.otp) {
      setError("OTP required!");
      return;
    }

    // Verify OTP
    if (loginOtp === form.otp) {
      dispatch(resetLoginOtp());
      window.location.href = "/dashboard"; // Using useNavigate for routing
    } else {
      setError("Incorrect OTP Code!");
    }
  };

  useEffect(() => {
    if (otpError) {
      setError(otpError);
    }
  }, [otpError]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        setError("");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserInfo());
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    if (userInfo) {
      const data = {
        email: userInfo.email,
      };
      dispatch(getLoginCode(data));
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    document.title = "Vestor - Login OTP"; // Update the document title
  }, []);

  return (
    <section className="w-full h-screen bg-stone-900 text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 p-6 w-[380px] bg-stone-800"
      >
        <label htmlFor="otp" className="text-sm">
          Enter the OTP code sent to your registered email.
        </label>
        <input
          type="text"
          id="otp"
          name="otp"
          className="bg-transparent p-2 border border-stone-600 outline-none"
          value={form.otp}
          onChange={handleInput}
          pattern="[0-9]{6}"
          maxLength={6}
          required
          placeholder="123456" // Provide a pattern for better user experience
        />
        <small className="text-xs text-stone-400">
          Didn&apos;t receive the code? Check your spam or junk folder.
        </small>
        <button
          type="submit"
          disabled={otpLoading || !form.otp || form.otp.length !== 6} // Disable button if OTP is incorrect or empty
          className="bg-green-600 text-slate-100 p-2 mt-4"
        >
          Verify OTP
        </button>
      </form>

      {/* Modal Components */}
      {otpLoading && <LoadingModal text="Verifying OTP Code..." />}
      {error && <ErrorModal error={error} />}
      {loginOtp && loginOtp === form.otp && (
        <Successmodal successText="Login verified!" />
      )}
    </section>
  );
};

export default Loginotp;
