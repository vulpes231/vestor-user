/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { formatCurrency, getAccessToken } from "../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { getActiveTradeCount, getTotalProfit } from "../features/tradeSlice";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiPieChart,
} from "react-icons/fi";

const Investstat = () => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const { totalProfit } = useSelector((state) => state.trade);

  useEffect(() => {
    if (accessToken) {
      dispatch(getActiveTradeCount());
      dispatch(getTotalProfit());
    }
  }, [accessToken, dispatch]);

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-cyan-500/10 rounded-lg">
          <FiPieChart className="text-cyan-400" size={20} />
        </div>
        <h3 className="text-xl font-semibold text-white">
          Investment Statistics
        </h3>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
          <div className="flex items-center gap-3">
            <FiDollarSign className="text-blue-400" />
            <p className="text-gray-300">Total Investment</p>
          </div>
          <p className="font-medium text-white">$0.00</p>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
          <div className="flex items-center gap-3">
            <FiTrendingUp className="text-green-400" />
            <p className="text-gray-300">Total Profit</p>
          </div>
          <p className="font-medium text-green-400">
            {formatCurrency(totalProfit)}
          </p>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
          <div className="flex items-center gap-3">
            <FiTrendingDown className="text-red-400" />
            <p className="text-gray-300">Total Loss</p>
          </div>
          <p className="font-medium text-red-400">$0.00</p>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg border border-gray-600/50">
          <div className="flex items-center gap-3">
            <FiPieChart className="text-cyan-400" />
            <p className="text-gray-200 font-medium">Overall Profit</p>
          </div>
          <p className="font-semibold text-cyan-400">$0.00</p>
        </div>
      </div>

      <div className="mt-6 p-3 bg-gray-800/40 rounded-lg border border-gray-700/50">
        <p className="text-xs text-gray-400">
          Options involve risk and are not suitable for all investors as the
          special risks inherent to options trading may expose investors to
          potentially significant losses.
        </p>
      </div>
    </div>
  );
};

export default Investstat;
