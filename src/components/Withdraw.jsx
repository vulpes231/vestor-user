/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../constants/constant";
import { getUserInfo } from "../features/userSlice";
import { FaUserLock, FaWallet, FaPiggyBank } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ErrorModal from "./ErrorModal";
import LoadingModal from "./LoadingModal";
import { resetWithdraw, withdrawFunds } from "../features/trnxSlice";
import Successmodal from "./Successmodal";

const Withdrawmodal = ({ setWithdraw, setActive }) => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  const [form, setForm] = useState({
    withdrawFrom: "deposit",
    walletAddress: "",
    amount: "",
    bankName: "",
    bankAddress: "",
    routing: "",
    account: "",
    acctName: "",
    coin: "btc",
    method: "",
  });

  const [error, setError] = useState("");
  const [method, setMethod] = useState("bank");

  const { withdrawLoading, withdrawError, withdrawSucess } = useSelector(
    (state) => state.trnx
  );
  const { userInfo } = useSelector((state) => state.user);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      amount,
      coin,
      walletAddress,
      withdrawFrom,
      bankName,
      account,
      routing,
      bankAddress,
    } = form;

    if (!amount || !coin) {
      setError("Amount and coin are required!");
      return;
    }

    let formData = null;

    if (method === "crypto") {
      if (!withdrawFrom || !walletAddress) {
        setError("Incomplete crypto information!");
        return;
      }
      formData = {
        amount,
        coin,
        method,
        paymentInfo: walletAddress,
      };
    } else if (method === "bank") {
      if (!bankName || !account || !routing || !bankAddress) {
        setError("Incomplete bank information!");
        return;
      }
      formData = {
        amount,
        coin,
        method,
        paymentInfo: `${bankName} ${account} ${routing} ${bankAddress}`,
      };
    } else {
      setError("Unsupported payment method.");
      return;
    }

    dispatch(withdrawFunds(formData));
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

  useEffect(() => {
    if (withdrawError) {
      setError(withdrawError);
    }
  }, [withdrawError]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        setError("");
        dispatch(resetWithdraw());
      }, 3000);
    }
  }, [error, dispatch]);

  useEffect(() => {
    let timeout;
    if (withdrawSucess) {
      timeout = setTimeout(() => {
        dispatch(resetWithdraw());
        window.location.href = "/wallet";
      }, 3000);
    }
  }, [withdrawSucess, dispatch]);

  if (userInfo && !userInfo.isKYCVerified) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 flex flex-col gap-6 items-center justify-center bg-gray-900 rounded-xl text-center"
      >
        <div className="p-4 bg-red-500/20 rounded-full">
          <FaUserLock className="w-12 h-12 text-red-500" />
        </div>
        <h3 className="text-2xl font-semibold text-white">
          Account Verification Required
        </h3>
        <p className="text-gray-400 max-w-md">
          Your account needs to be verified before you can withdraw funds. This
          helps us ensure the security of your transactions.
        </p>
        <Link
          to="/settings"
          className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-medium text-white transition-colors"
        >
          Complete Verification
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-900 p-4 md:p-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Withdraw Funds
            </h1>
            <p className="text-gray-400">
              Transfer money to your external account
            </p>
          </div>
          {/* <button
            onClick={() => setWithdraw(false)}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <MdClose className="w-6 h-6 text-gray-400" />
          </button> */}
        </div>

        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
          {/* Method Selector */}
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setMethod("bank")}
              className={`flex-1 py-4 flex items-center justify-center gap-2 transition-colors ${
                method === "bank"
                  ? "bg-gray-700 text-cyan-400"
                  : "text-gray-400 hover:bg-gray-700/50"
              }`}
            >
              <FaPiggyBank className="w-5 h-5" />
              <span className="font-medium">Bank Transfer</span>
            </button>
            <button
              onClick={() => setMethod("crypto")}
              className={`flex-1 py-4 flex items-center justify-center gap-2 transition-colors ${
                method === "crypto"
                  ? "bg-gray-700 text-cyan-400"
                  : "text-gray-400 hover:bg-gray-700/50"
              }`}
            >
              <FaWallet className="w-5 h-5" />
              <span className="font-medium">Crypto Wallet</span>
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {method === "crypto" ? (
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      From
                    </label>
                    <select
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      name="withdrawFrom"
                      value={form.withdrawFrom}
                      onChange={handleInput}
                    >
                      <option value="deposit">Deposit Wallet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Coin
                    </label>
                    <select
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      name="coin"
                      value={form.coin}
                      onChange={handleInput}
                    >
                      <option value="btc">Bitcoin (BTC)</option>
                      <option value="eth">Ethereum (ETH)</option>
                      <option value="usdt(erc20)">USDT (ERC20)</option>
                      <option value="usdt(trc20)">USDT (TRC20)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Wallet Address
                  </label>
                  <input
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    type="text"
                    placeholder="Enter your wallet address"
                    name="walletAddress"
                    value={form.walletAddress}
                    onChange={handleInput}
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      $
                    </span>
                    <input
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pl-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      type="text"
                      placeholder="0.00"
                      name="amount"
                      value={form.amount}
                      onChange={handleInput}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </form>
            ) : (
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Bank Name
                    </label>
                    <input
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      type="text"
                      placeholder="e.g. Chase Bank"
                      name="bankName"
                      value={form.bankName}
                      onChange={handleInput}
                      autoComplete="off"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Account Number
                    </label>
                    <input
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      type="text"
                      placeholder="Enter account number"
                      name="account"
                      value={form.account}
                      onChange={handleInput}
                      autoComplete="off"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Routing Number
                    </label>
                    <input
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      type="text"
                      placeholder="Enter routing number"
                      name="routing"
                      value={form.routing}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Bank Address
                    </label>
                    <input
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      type="text"
                      placeholder="Bank's physical address"
                      name="bankAddress"
                      value={form.bankAddress}
                      onChange={handleInput}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      $
                    </span>
                    <input
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pl-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      type="text"
                      placeholder="0.00"
                      name="amount"
                      value={form.amount}
                      onChange={handleInput}
                    />
                  </div>
                </div>
              </form>
            )}

            <div className="mt-8">
              <button
                onClick={handleSubmit}
                disabled={withdrawLoading}
                className="w-full md:w-auto px-8 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-medium text-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {withdrawLoading ? "Processing..." : "Withdraw Funds"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>Withdrawals typically process within 5-7 business days.</p>
          <p>Contact support if you encounter any issues.</p>
        </div>
      </div>

      <AnimatePresence>
        {error && <ErrorModal error={error} />}
        {withdrawLoading && (
          <LoadingModal text={"Processing withdrawal request..."} />
        )}
        {withdrawSucess && (
          <Successmodal
            successText={"Withdrawal request submitted successfully!"}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Withdrawmodal;
