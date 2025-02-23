/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorModal, LoadingModal, Successmodal } from "../components";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../constants/constant";
import { getUserInfo } from "../features/userSlice";
import { verifyEmailAddress } from "../features/verifySlice";

const Verifyemail = () => {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ otp: "" });
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const emailCode = JSON.parse(sessionStorage.getItem("emailCode"));

  const { emailVerified, verifyEmailLoading, verifyEmailError } = useSelector(
    (state) => state.verify
  );

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

    if (emailCode && form.otp) {
      const data = {
        serverCode: emailCode,
        userCode: form.otp,
      };

      dispatch(verifyEmailAddress(data));
    } else {
      setError("Incorrect Verification Code!");
    }
  };

  useEffect(() => {
    if (verifyEmailError) {
      setError(verifyEmailError);
    }
  }, [verifyEmailError]);

  console.log(verifyEmailError);

  useEffect(() => {
    if (verifyEmailError === "Bad token!") {
      sessionStorage.clear();
      window.location.href = "/signin";
    }
  }, [verifyEmailError]);

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
    let timeout;
    if (accessToken && emailVerified) {
      timeout = setTimeout(() => {
        navigate("/personal");
      }, 3000);
    }
  }, [navigate, accessToken, emailVerified]);

  useEffect(() => {
    document.title = "Vestor - Verify Email";
  }, []);

  return (
    <section className="w-full h-screen bg-stone-900 text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 p-6 w-[380px] bg-stone-800"
      >
        <label htmlFor="otp" className="text-sm">
          Enter the your email verification code to verify that this is an
          active mail address
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
          autoComplete="off"
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
          Verify Email
        </button>
      </form>
      {verifyEmailLoading && <LoadingModal text={"Verifying email..."} />}
      {error && <ErrorModal error={error} />}
      {emailVerified && <Successmodal successText="Login verified!" />}
    </section>
  );
};

export default Verifyemail;
