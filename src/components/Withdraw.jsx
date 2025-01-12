/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { MdClose } from "react-icons/md";

const withdrawStyles = {
  formHolder: "flex flex-col gap-2",
  label: "font-bold text-sm",
  input: "border border-stone-500 bg-transparent p-2 outline-none",
  select: "border border-stone-500 bg-transparent p-2",
};

const Withdrawmodal = ({ setWithdraw }) => {
  const [form, setForm] = useState({
    from: "",
    address: "",
    amount: "",
  });

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

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-white text-slate-100 bg-opacity-30">
      <div className="bg-stone-900 rounded-md p-6 w-full md:w-[350px] border border-stone-600">
        <div className="flex items-center justify-between">
          <h3>Withdraw</h3>
          <MdClose
            className="cursor-pointer"
            onClick={() => setWithdraw(false)}
          />
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
              <option value="invest">Investment wallet</option>
            </select>
          </div>

          <div className={withdrawStyles.formHolder}>
            <label className={withdrawStyles.label} htmlFor="Address">
              Address
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
