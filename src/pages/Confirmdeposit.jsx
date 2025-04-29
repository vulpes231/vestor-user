/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bitcoin, eth, tether } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { depositFunds, resetDeposit } from "../features/trnxSlice";
import { ErrorModal, LoadingModal, Successmodal } from "../components";
import { getUserInfo } from "../features/userSlice";
import { getAccessToken } from "../constants/constant";
import { QRCodeSVG } from "qrcode.react";
import { FiCopy, FiCheck } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

const Confirmdeposit = ({ setActive }) => {
  const dispatch = useDispatch();
  const { amount, method } = useParams();

  const formData = sessionStorage.getItem("depositForm");
  const form = JSON.parse(formData);

  const accessToken = getAccessToken();

  const [error, setError] = useState("");
  const [copy, setCopy] = useState(false);

  const { depositLoading, depositError, depositSucess } = useSelector(
    (state) => state.trnx
  );
  const { userInfo } = useSelector((state) => state.user);

  const handleCopy = () => {
    const textToCopy = form.coin.includes("btc")
      ? userInfo.walletDepositInfo.btc
      : form.coin.includes("ethArb")
      ? userInfo.walletDepositInfo.ethArb
      : form.coin.includes("ethErc")
      ? userInfo.walletDepositInfo.ethErc
      : form.coin.includes("usdtErc")
      ? userInfo.walletDepositInfo.usdtErc
      : form.coin.includes("usdtTrc : null")
      ? userInfo.walletDepositInfo.usdtTrc
      : null;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopy(true);
    }
  };

  const handleDeposit = (e) => {
    e.preventDefault();
    let formData;

    if (method === "bank") {
      formData = {
        method: method,
        amount: amount,
        paymentInfo: ``,
      };
    } else {
      formData = {
        method: method,
        amount: amount,
        paymentInfo: ``,
        coin: form.coin,
        memo: form.memo || null,
      };
    }

    dispatch(depositFunds(formData));
  };

  useEffect(() => {
    if (depositError) {
      setError(depositError);
    }
  }, [depositError]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        setError("");
        dispatch(resetDeposit());
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [error, dispatch]);

  useEffect(() => {
    let timeout;
    if (depositSucess) {
      timeout = setTimeout(() => {
        dispatch(resetDeposit());
        window.location.href = "/wallet";
      }, 4000);
    }
    return () => clearTimeout(timeout);
  }, [depositSucess, dispatch]);

  useEffect(() => {
    let timeout;
    if (copy) {
      timeout = setTimeout(() => {
        setCopy(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [copy]);

  useEffect(() => {
    setActive("wallet");
    if (accessToken) {
      dispatch(getUserInfo());
    }
  }, [setActive, dispatch, accessToken]);

  useEffect(() => {
    document.title = "Vestor - Confirm Payment";
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="bg-gray-900 p-6 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-white">Complete Payment</h3>
            <button
              onClick={() => (window.location.href = "/wallet")}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <IoMdClose size={24} />
            </button>
          </div>
          <p className="text-gray-400 mt-2 text-sm">
            {method === "bank"
              ? "Bank transfer instructions"
              : "Crypto deposit details"}
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Payment Info */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400">Payment Method:</span>
              {method === "bank" ? (
                <span className="font-medium text-white">Bank Transfer</span>
              ) : (
                <div className="flex items-center gap-2">
                  <img
                    src={
                      form.coin === "btc"
                        ? bitcoin
                        : form.coin.includes("eth")
                        ? eth
                        : tether
                    }
                    alt={form.coin}
                    className="w-6 h-6"
                  />
                  <span className="font-medium text-white uppercase">
                    {form.coin.includes("btc")
                      ? "BTC"
                      : form.coin.includes("eth")
                      ? "ETH"
                      : "USDT"}
                  </span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">Amount:</span>
              <span className="font-bold text-white">
                {amount} USD
                {/* {method === "bank"
                  ? "USD"
                  : form.coin.includes("btc")
                  ? "BTC"
                  : form.coin.includes("eth")
                  ? "ETH"
                  : "USDT"} */}
              </span>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gray-700 rounded-lg p-4 mb-6">
            <h4 className="text-white font-medium mb-2">Important Notes:</h4>
            <ul className="text-gray-300 text-sm space-y-2">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                Funds will be added automatically after confirmation
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                Contact support if you encounter any issues
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                Double-check all payment details
              </li>
            </ul>
          </div>

          {/* Payment Details */}
          {method === "bank" ? (
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-400 text-sm mb-1">
                  Bank Name
                </label>
                <div className="bg-gray-700 p-3 rounded-lg text-white">
                  {userInfo?.bankDepositInfo?.bankName || "Chase Bank"}
                </div>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">
                  Account Number
                </label>
                <div className="bg-gray-700 p-3 rounded-lg text-white">
                  {userInfo?.bankDepositInfo?.account || "2165789098"}
                </div>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">
                  Routing Number
                </label>
                <div className="bg-gray-700 p-3 rounded-lg text-white">
                  {userInfo?.bankDepositInfo?.routing || "2129870098"}
                </div>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">
                  Bank Address
                </label>
                <div className="bg-gray-700 p-3 rounded-lg text-white">
                  {userInfo?.bankDepositInfo?.address ||
                    "124 West Ave, Cios OH 09876"}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 mb-6">
              <div className="text-center">
                <p className="text-gray-300 mb-3">
                  Send exactly{" "}
                  <span className="font-bold text-white">
                    {method !== "bank" ? "0.0000" : amount}{" "}
                    {form.coin.includes("btc")
                      ? "BTC"
                      : form.coin.includes("eth")
                      ? "ETH"
                      : "USDT"}
                  </span>{" "}
                  to:
                </p>

                {userInfo?.walletDepositInfo && (
                  <div className="my-4 flex justify-center">
                    <QRCodeSVG
                      value={
                        form.coin === "btc"
                          ? userInfo?.walletDepositInfo?.btc
                          : form.coin === "ethErc"
                          ? userInfo?.walletDepositInfo?.ethErc
                          : form.coin === "ethArb"
                          ? userInfo?.walletDepositInfo?.ethArb
                          : form.coin === "ethArb"
                          ? userInfo?.walletDepositInfo?.ethArb
                          : form.coin === "usdtErc"
                          ? userInfo?.walletDepositInfo?.usdtErc
                          : form.coin === "usdtTrc"
                          ? userInfo?.walletDepositInfo?.usdtTrc
                          : null
                      }
                      size={180}
                      bgColor="transparent"
                      fgColor="#ffffff"
                      level="H"
                    />
                  </div>
                )}

                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={
                      form.coin === "btc"
                        ? userInfo?.walletDepositInfo?.btc
                        : form.coin === "ethErc"
                        ? userInfo?.walletDepositInfo?.ethErc
                        : form.coin === "ethArb"
                        ? userInfo?.walletDepositInfo?.ethArb
                        : form.coin === "ethArb"
                        ? userInfo?.walletDepositInfo?.ethArb
                        : form.coin === "usdtErc"
                        ? userInfo?.walletDepositInfo?.usdtErc
                        : form.coin === "usdtTrc"
                        ? userInfo?.walletDepositInfo?.usdtTrc
                        : null
                    }
                    className="w-full bg-gray-700 p-3 pr-12 rounded-lg text-white text-sm font-mono truncate"
                  />
                  <button
                    onClick={handleCopy}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white p-1"
                  >
                    {copy ? <FiCheck className="text-green-400" /> : <FiCopy />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleDeposit}
            disabled={depositLoading}
            className={`w-full py-3 rounded-lg font-medium text-white transition-all ${
              depositLoading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg"
            }`}
          >
            {depositLoading ? "Processing..." : "I've Made This Payment"}
          </button>

          <p className="text-xs text-center text-gray-500 mt-4">
            Transaction usually completes within 5-30 minutes
          </p>
        </div>
      </div>

      {/* Modals */}
      {depositError && <ErrorModal error={error} />}
      {depositLoading && <LoadingModal text={"Confirming your payment"} />}
      {depositSucess && (
        <Successmodal successText={"Deposit received! Processing..."} />
      )}
    </div>
  );
};

export default Confirmdeposit;
