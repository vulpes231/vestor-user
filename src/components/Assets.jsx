/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { MdOutlineSavings, MdAttachMoney } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";
import { FiAlertOctagon } from "react-icons/fi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { getAccessToken } from "../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { getBalance } from "../features/walletSlice";
import { getTotalProfit, getUserTrades } from "../features/tradeSlice";
import { getUserInfo } from "../features/userSlice";

const Assets = () => {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();

  const { balance } = useSelector((state) => state.wallet);
  const { userTrades, totalProfit } = useSelector((state) => state.trade);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (accessToken) {
      dispatch(getBalance());
      dispatch(getUserTrades());
      dispatch(getTotalProfit());
      dispatch(getUserInfo());
    }
  }, [dispatch, accessToken]);

  return (
    <div className="space-y-6">
      {/* Alert Messages */}
      <div className="space-y-3">
        {userInfo && !userInfo?.canWithdraw && (
          <div className="flex items-start gap-3 p-4 bg-red-500/10 border-l-4 border-red-500 rounded-lg backdrop-blur-sm">
            <FiAlertOctagon
              className="mt-0.5 flex-shrink-0 text-red-500"
              size={20}
            />
            <p className="text-sm text-red-100">
              {userInfo?.customWithdrawalMsg}
            </p>
          </div>
        )}

        {userInfo && !userInfo?.isKYCVerified && (
          <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border-l-4 border-yellow-500 rounded-lg backdrop-blur-sm">
            <FiAlertOctagon
              className="mt-0.5 flex-shrink-0 text-yellow-500"
              size={20}
            />
            <p className="text-sm text-yellow-100">
              Verify your account to enjoy full features of the app.
            </p>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Balance Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-indigo-900/50 to-indigo-800/30 p-6 rounded-xl border border-indigo-700/50 backdrop-blur-sm hover:shadow-lg transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-600/20 rounded-lg">
              <MdOutlineSavings className="text-indigo-300" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-200">Total Balance</h3>
          </div>
          <p className="text-3xl font-bold text-white">
            ${(balance && balance.toFixed(2)) || "0.00"}
            <span className="text-sm font-normal text-gray-400 ml-1">USD</span>
          </p>
        </div>

        {/* Profits Card */}
        <div className="bg-gradient-to-br from-emerald-900/50 to-emerald-800/30 p-6 rounded-xl border border-emerald-700/50 backdrop-blur-sm hover:shadow-lg transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-600/20 rounded-lg">
              <RiMoneyDollarCircleFill className="text-emerald-300" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-200">Profits</h3>
          </div>
          <p className="text-3xl font-bold text-emerald-400">
            +${totalProfit || "0.00"}
            <span className="text-sm font-normal text-gray-400 ml-1">USD</span>
          </p>
        </div>

        {/* Trades Card */}
        <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 p-6 rounded-xl border border-purple-700/50 backdrop-blur-sm hover:shadow-lg transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-600/20 rounded-lg">
              <FaChartLine className="text-purple-300" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-200">Trades</h3>
          </div>
          <p className="text-3xl font-bold text-white">
            {userTrades?.length || 0}
            <span className="text-sm font-normal text-gray-400 ml-1">
              total
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Assets;
