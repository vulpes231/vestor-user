/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, resetPassChange } from "../features/userSlice";
import LoadingModal from "./LoadingModal";
import ErrorModal from "./ErrorModal";
import Successmodal from "./Successmodal";

const changePassStyle = {
  formHolder: "flex flex-col gap-1",
  input:
    "bg-transparent p-2 outline-none border border-stone-500 h-[38px] lg:h-[43px] text-[16px]",
  label: "font-normal text-[12px] text-[#979797] lg:text-[13px] capitalize",
};

const Changepass = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    password: "",
    newPassword: "",
    confirmPass: "",
  });
  const { changePassLoading, changePassError, passwordChanged } = useSelector(
    (state) => state.user
  );

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChangePass = (e) => {
    console.log("submitted");
    e.preventDefault();
    for (const key in form) {
      if (form[key] === "") {
        setError(`Please enter your ${key}`);
        return;
      }
    }
    console.log(form);
    dispatch(changePassword(form));
    // setError("");
  };

  useEffect(() => {
    if (changePassError) {
      setError(changePassError);
    }
  }, [changePassError]);

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
    if (passwordChanged) {
      timeout = setTimeout(() => {
        dispatch(resetPassChange());
        window.location.reload();
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [passwordChanged, dispatch]);
  return (
    <div className="bg-gray-800/50 rounded-xl backdrop-blur-sm p-6 border border-gray-700/50 hover:border-cyan-400/30 transition-all">
      <form action="" className="flex flex-col gap-6 ">
        <div className={changePassStyle.formHolder}>
          <label className={changePassStyle.label} htmlFor="">
            Current password
          </label>
          <input
            className={changePassStyle.input}
            type="password"
            value={form.password}
            onChange={handleInput}
            name="password"
          />
        </div>
        <div className={changePassStyle.formHolder}>
          <label className={changePassStyle.label} htmlFor="">
            New password
          </label>
          <input
            className={changePassStyle.input}
            type="password"
            value={form.newPassword}
            onChange={handleInput}
            name="newPassword"
          />
        </div>
        <div className={changePassStyle.formHolder}>
          <label className={changePassStyle.label} htmlFor="">
            Confirm New password
          </label>
          <input
            className={changePassStyle.input}
            type="password"
            value={form.confirmPass}
            onChange={handleInput}
            name="confirmPass"
          />
        </div>
        <button
          onClick={handleChangePass}
          className="p-2 h-[38px] lg:h-[43px] border-none bg-green-600 text-white rounded-[5px]"
        >
          Change password
        </button>
      </form>
      {changePassLoading && <LoadingModal text={"Updating password"} />}
      {error && <ErrorModal error={error} />}
      {passwordChanged && <Successmodal successText={"Password changed."} />}
    </div>
  );
};

export default Changepass;
