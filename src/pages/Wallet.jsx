/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { bitcoin, tether } from "../assets";
import { TbTransfer } from "react-icons/tb";
import { BiMoneyWithdraw } from "react-icons/bi";
import { PiHandDepositBold } from "react-icons/pi";
import { Deposit, Transactions, Transfer, Withdraw } from "../components";
import { formatCurrency, getAccessToken } from "../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { getUserWallets } from "../features/walletSlice";

const walletStyles = {
  span: "flex items-center gap-1",
  button: "flex items-center gap-1 text-slate-400 text-xs capitalize",
};

const Wallet = ({ setActive }) => {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();
  const [depositModal, setDepositModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [transferModal, setTransferModal] = useState(false);

  const { userWallets } = useSelector((state) => state.wallet);

  const myWallets =
    userWallets &&
    userWallets.map((wallet, index) => (
      <div
        key={index}
        className={`${wallet.color}  p-6 text-white shadow-lg hover:shadow-xl transition-shadow bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700/50`}
      >
        <h3 className="text-lg font-medium">{wallet.name}</h3>
        <p className="text-2xl font-bold mt-2">${wallet.balance.toFixed(2)}</p>
        <div className="flex gap-3 mt-4">
          <button className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-sm hover:bg-white/20 transition">
            Deposit
          </button>
          <button className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-sm hover:bg-white/20 transition">
            Transfer
          </button>
        </div>
      </div>
    ));

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserWallets());
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    setActive("wallet");
    document.title = "Vestor - Wallet";
  }, [setActive]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 mb-[70px]">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Wallets</h1>
          <p className="text-gray-400">Manage your funds and transactions</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{myWallets}</div>
        <div>
          <Transactions />
        </div>
      </div>
      {depositModal && <Deposit setDeposit={setDepositModal} />}
      {withdrawModal && <Withdraw setWithdraw={setWithdrawModal} />}
      {transferModal && <Transfer setWithdraw={setTransferModal} />}
    </section>
  );
};

export default Wallet;
