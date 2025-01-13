/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const depositStyles = {
  formHolder: "flex flex-col gap-1",
  label: "font-bold text-sm",
  input: "border border-stone-500 bg-transparent p-2 outline-none",
  select: "border border-stone-500 bg-transparent p-2",
};

const paymentMethods = [
  {
    id: 1,
    name: "btc",
    network: ["bitcoin"],
    address: "", // Bitcoin address will be added here
  },
  {
    id: 2,
    name: "usdt",
    network: ["erc20", "trc20"],
    erc20Address: "",
    trc20Address: "",
  },
];

const DepositModal = ({ setDeposit }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    coin: "",
    network: "",
    amount: "",
    memo: "",
  });

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.coin || !form.network || !form.amount) {
      alert("Please fill in all fields.");
      return;
    }

    console.log(form);
    navigate(`/confirm/${form.coin}/${form.amount}/${form.network}`); ///
  };

  const renderNetworkOptions = () => {
    const selectedCoin = paymentMethods.find((coin) => coin.name === form.coin);

    if (form.coin === "btc") {
      return <option value="bitcoin">bitcoin</option>;
    } else if (form.coin === "usdt" && selectedCoin) {
      return (
        <>
          <option value="erc20">ERC20</option>
          <option value="trc20">TRC20</option>
        </>
      );
    }
    return null;
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-white text-slate-100 bg-opacity-30">
      <div className="bg-stone-900 rounded-md p-6 w-full md:w-[350px] border border-stone-600 flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <h3>Deposit</h3>
          <MdClose
            className="cursor-pointer"
            onClick={() => {
              console.log("Clicked");
              setDeposit(false);
            }}
          />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className={depositStyles.formHolder}>
            <label className={depositStyles.label} htmlFor="coin">
              Coin
            </label>
            <select
              className={depositStyles.select}
              name="coin"
              value={form.coin}
              onChange={handleInput}
            >
              <option value="">Select Coin</option>
              {paymentMethods.map((pmt) => (
                <option key={pmt.id} value={pmt.name}>
                  {pmt.name}
                </option>
              ))}
            </select>
          </div>
          {form.coin && (
            <div className={depositStyles.formHolder}>
              <label className={depositStyles.label} htmlFor="network">
                Network
              </label>
              <select
                className={depositStyles.select}
                name="network"
                value={form.network}
                onChange={handleInput}
              >
                <option value="">Select Network</option>
                {renderNetworkOptions()}
              </select>
            </div>
          )}

          <div className={depositStyles.formHolder}>
            <label className={depositStyles.label} htmlFor="amount">
              Amount
            </label>
            <input
              className={depositStyles.input}
              type="text"
              placeholder="Amount"
              name="amount"
              value={form.amount}
              onChange={handleInput}
              autoComplete="off"
            />
          </div>
          <div className={depositStyles.formHolder}>
            <label className={depositStyles.label} htmlFor="memo">
              Memo <small>(optional)</small>
            </label>
            <input
              className={depositStyles.input}
              type="text"
              placeholder="memo"
              name="memo"
              value={form.memo}
              onChange={handleInput}
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-slate-100 py-2 px-8 rounded-3xl mt-5"
          >
            Deposit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DepositModal;
