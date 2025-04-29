/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAssetByParam } from "../features/assetSlice";
import { getAccessToken } from "../constants/constant";
import { getUserWallets } from "../features/walletSlice";
import { Tradeform } from "../components";
import { SlWallet } from "react-icons/sl";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiBarChart2,
} from "react-icons/fi";

const Tradeasset = ({ setActive }) => {
  const { symbol } = useParams();
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  const [action, setAction] = useState("buy");

  const { singleAsset } = useSelector((state) => state.asset);
  const { userWallets } = useSelector((state) => state.wallet);
  const investWallet =
    userWallets &&
    userWallets.find((wallet) => wallet.walletName.toLowerCase() === "invest");

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserWallets());
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    if (symbol) {
      const assetSymbol = symbol;
      dispatch(getAssetByParam(assetSymbol));
    }
  }, [symbol, dispatch]);

  useEffect(() => {
    setActive("portfolio");
    document.title = "Vestor - Trade Asset";
  }, [setActive]);

  const formatLargeNumber = (num) => {
    if (!num) return "0";
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`;
    }
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    }
    return `$${parseFloat(num).toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
        {/* Asset Overview Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Asset Header */}
          <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm">
            <img
              src={singleAsset?.img}
              alt={singleAsset?.name}
              className="w-12 h-12 rounded-full border-2 border-cyan-400/30"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">
                {singleAsset?.name}
              </h1>
              <p className="text-gray-400 uppercase tracking-wider">
                {singleAsset?.symbol}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-cyan-400/30 transition-all">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <FiDollarSign className="text-cyan-400" />
                <span className="text-sm">Market Cap</span>
              </div>
              <p className="text-2xl font-semibold text-white">
                {formatLargeNumber(singleAsset?.marketCap)}
              </p>
            </div>

            <div className="bg-gray-800/50 p-4 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-cyan-400/30 transition-all">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <FiBarChart2 className="text-cyan-400" />
                <span className="text-sm">24h Volume</span>
              </div>
              <p className="text-2xl font-semibold text-white">
                {formatLargeNumber(singleAsset?.totalVolume)}
              </p>
            </div>

            <div className="bg-gray-800/50 p-4 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-cyan-400/30 transition-all">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <FiTrendingUp className="text-green-400" />
                <span className="text-sm">24h High</span>
              </div>
              <p className="text-2xl font-semibold text-white">
                ${parseFloat(singleAsset?.dailyHigh).toFixed(2)}
              </p>
            </div>

            <div className="bg-gray-800/50 p-4 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-cyan-400/30 transition-all">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <FiTrendingDown className="text-red-400" />
                <span className="text-sm">24h Low</span>
              </div>
              <p className="text-2xl font-semibold text-white">
                ${parseFloat(singleAsset?.dailyLow).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Trading Panel */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl backdrop-blur-sm overflow-hidden mb-20">
          {/* Action Tabs */}
          <div className="flex border-b border-gray-700/50">
            {["buy", "sell"].map((btn) => (
              <button
                key={btn}
                onClick={() => setAction(btn)}
                className={`flex-1 py-4 font-medium transition-colors ${
                  action === btn
                    ? btn === "buy"
                      ? "text-green-400 border-b-2 border-green-400 bg-green-400/10"
                      : "text-red-400 border-b-2 border-red-400 bg-red-400/10"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                {btn.toUpperCase()} {singleAsset?.symbol?.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="p-5 space-y-6">
            {/* Wallet Balance */}
            <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <SlWallet className="text-cyan-400" />
                <span className="text-sm">Invest Wallet Balance</span>
              </div>
              <p className="text-2xl font-semibold text-white">
                $
                {investWallet?.balance
                  ? parseFloat(investWallet.balance).toFixed(2)
                  : "0.00"}
              </p>
            </div>

            {/* Trade Form */}
            <Tradeform asset={singleAsset} action={action} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tradeasset;
