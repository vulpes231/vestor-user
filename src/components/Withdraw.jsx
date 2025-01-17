/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../constants/constant";
import { getUserInfo } from "../features/userSlice";
import { FaUserLock } from "react-icons/fa6";
import { Link } from "react-router-dom";

const withdrawStyles = {
  formHolder: "flex flex-col gap-2",
  label: "font-bold text-sm",
  input: "border border-stone-500 bg-transparent p-2 outline-none",
  select: "border border-stone-500 bg-transparent p-2",
};

const Withdrawmodal = ({ setWithdraw, setActive }) => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const [form, setForm] = useState({
    from: "",
    address: "",
    amount: "",
  });

  const { withdrawLoading, withdrawError, withdrawSucess } = useSelector(
    (state) => state.trnx
  );
  const { userInfo } = useSelector((state) => state.user);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.from || !form.address || !form.amount) {
      alert("Please fill in all fields.");
      return;
    }

    console.log(form);
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserInfo());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    document.title = "Vestor - Withdraw";
    setActive("withdraw");
  }, [setActive]);

  if (!userInfo.isKYCVerified) {
    return (
      <div className="p-6 flex flex-col gap-6 h-full items-center justify-center bg-black bg-opacity-50">
        <FaUserLock className="w-20 h-20" />
        <h3 className="text-xl">
          Account status:{" "}
          <span
            className={
              userInfo?.isKYCVerified ? "text-green-600" : "text-red-600"
            }
          >
            {userInfo?.isKYCVerified ? "Verified" : "Not Verified"}
          </span>
        </h3>
        <p className="text-center">
          Verify your account to enjoy full features.{" "}
          <br className="sm:hidden" />
          <Link to={"/settings"} className="text-green-600 underline">
            Complete verification
          </Link>{" "}
        </p>
      </div>
    );
  }

  return (
    <div className=" w-full h-screen flex items-center justify-center bg-black bg-opacity-50 text-slate-100 p-6 md:p-0">
      <div className="bg-black bg-opacity-45 rounded-md p-6 w-full md:w-[350px] border border-stone-600">
        <div className="flex items-center justify-between">
          <h3>Withdraw</h3>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className={withdrawStyles.formHolder}>
            <label className={withdrawStyles.label} htmlFor="from">
              From Wallet
            </label>
            <select
              className={withdrawStyles.select}
              name="from"
              value={form.from}
              onChange={handleInput}
            >
              <option value="">Select Wallet</option>
              <option value="deposit">deposit wallet</option>
              <option value="invest">Invest wallet</option>
            </select>
          </div>

          <div className={withdrawStyles.formHolder}>
            <label className={withdrawStyles.label} htmlFor="Address">
              Recipient Wallet Address
            </label>
            <input
              className={withdrawStyles.input}
              type="text"
              placeholder="Enter address"
              name="address"
              value={form.address}
              onChange={handleInput}
              autoComplete="off"
            />
          </div>

          <div className={withdrawStyles.formHolder}>
            <label className={withdrawStyles.label} htmlFor="amount">
              Amount
            </label>
            <input
              className={withdrawStyles.input}
              type="text"
              placeholder="Amount"
              name="amount"
              value={form.amount}
              onChange={handleInput}
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-slate-100 py-2 px-8 rounded-3xl mt-5"
          >
            Withdraw
          </button>
        </form>
      </div>
    </div>
  );
};

export default Withdrawmodal;
