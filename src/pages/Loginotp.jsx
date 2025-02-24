/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorModal, LoadingModal, Successmodal } from "../components";
import { getAccessToken } from "../constants/constant";

const Loginotp = () => {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();
  const [form, setForm] = useState({ otp: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const userInfoString = sessionStorage.getItem("userData");

  const userInfo = JSON.parse(userInfoString);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    setIsDisabled(e.target.value.length !== 6);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.otp) {
      setError("OTP required!");
      return;
    }

    console.log("server", userInfo.otpCode);
    console.log("form", form.otp);

    if (userInfo.otpCode === form.otp) {
      setSuccess(true);

      const isAuth = true;
      sessionStorage.setItem("isAuth", isAuth);

      window.location.href = "/dashboard";
    } else {
      setError("Incorrect OTP Code!");
    }
  };

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
    document.title = "Vestor - Login OTP";
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
          placeholder="123456"
        />
        <small className="text-xs text-stone-400">
          Didn&apos;t receive the code? Check your spam or junk folder.
        </small>
        <button
          type="submit"
          disabled={isDisabled}
          className={`${
            isDisabled ? "bg-gray-500" : "bg-green-600"
          } text-slate-100 p-2 mt-4`}
        >
          Verify OTP
        </button>
      </form>

      {error && <ErrorModal error={error} />}
      {success && <Successmodal successText="Login verified!" />}
    </section>
  );
};

export default Loginotp;
