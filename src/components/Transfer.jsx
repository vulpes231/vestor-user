/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import ErrorModal from "./ErrorModal";

const transferStyles = {
  formHolder: "flex flex-col gap-2",
  label: "font-bold text-sm",
  input: "border border-stone-500 bg-transparent p-2 outline-none",
  select: "border border-stone-500 bg-transparent p-2",
};

const Transfermodal = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    from: "",
    to: "",
    amount: "",
  });

  const [error, setError] = useState("");

  const { transferLoading, transferError, transferSucess } = useSelector(
    (state) => state.trnx
  );

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.from || !form.to || !form.amount) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.from === form.to) {
      setError("Select another account!");
      return;
    }

    console.log(form);
  };

  useEffect(() => {
    if (transferError) {
      setError(transferError);
    }
  }, [transferError]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        setError("");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [error]);
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-white text-slate-100 bg-opacity-30">
      <div className="bg-stone-900 rounded-md p-6 w-full md:w-[350px] border border-stone-600">
        <div className="flex items-center justify-between">
          <h3>Transfer</h3>
          <MdClose
            className="cursor-pointer"
            // onClick={() => setWithdraw(false)}
          />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className={transferStyles.formHolder}>
            <label className={transferStyles.label} htmlFor="from">
              From Wallet
            </label>
            <select
              className={transferStyles.select}
              name="from"
              value={form.from}
              onChange={handleInput}
            >
              <option value="">Select Wallet</option>
              <option value="deposit">deposit wallet</option>
              <option value="invest">Investment wallet</option>
            </select>
          </div>

          <div className={transferStyles.formHolder}>
            <label className={transferStyles.label} htmlFor="to">
              To Wallet
            </label>
            <select
              className={transferStyles.select}
              name="to"
              value={form.to}
              onChange={handleInput}
            >
              <option value="">Select Wallet</option>
              <option value="deposit">deposit wallet</option>
              <option value="invest">Investment wallet</option>
            </select>
          </div>

          <div className={transferStyles.formHolder}>
            <label className={transferStyles.label} htmlFor="amount">
              Amount
            </label>
            <input
              className={transferStyles.input}
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
      {error && <ErrorModal error={error} />}
    </div>
  );
};

export default Transfermodal;
