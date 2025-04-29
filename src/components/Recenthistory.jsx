/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { bitcoin, eth, tether, wallet } from "../assets";
import { formatCurrency, getAccessToken } from "../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { getUserTrnxs } from "../features/trnxSlice";
import { format } from "date-fns";
import {
  FiArrowLeft,
  FiArrowRight,
  FiDownload,
  FiUpload,
} from "react-icons/fi";

const Recenthistory = () => {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();
  const { getTrnxLoading, userTrnxs } = useSelector((state) => state.trnx);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const sortedTrnxs = Array.isArray(userTrnxs)
    ? [...userTrnxs].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : [];
  const currentItems = sortedTrnxs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < Math.ceil(sortedTrnxs.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserTrnxs());
    }
  }, [accessToken, dispatch]);

  if (getTrnxLoading) {
    return (
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <FiDownload className="text-blue-400" size={20} />
          </div>
          <h3 className="text-xl font-semibold text-white">
            Recent Transactions
          </h3>
        </div>
        <div className="text-center py-8 text-gray-400">
          Loading transactions...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <FiDownload className="text-blue-400" size={20} />
          </div>
          <h3 className="text-xl font-semibold text-white">
            Recent Transactions
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-700/50">
              <tr className="text-left text-sm text-gray-400">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Asset</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50 text-[13px] lg:text-[14px]">
              {currentItems.length > 0 ? (
                currentItems.map((data) => (
                  <tr
                    key={data._id}
                    className="hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-white/90">
                      {format(new Date(data.createdAt), "MMM dd yyyy")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            data?.coin?.includes("btc") &&
                            data?.method !== "bank"
                              ? bitcoin
                              : data?.coin?.includes("eth")
                              ? eth
                              : data?.coin?.includes("usdt")
                              ? tether
                              : data?.method === "bank"
                              ? wallet
                              : wallet
                          }
                          alt={data?.coin || "bank"}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-white/80 uppercase">
                          {data?.method === "bank"
                            ? "bank"
                            : data?.coin?.includes("btc")
                            ? "BTC"
                            : data?.coin?.includes("eth")
                            ? "ETH"
                            : data?.coin?.includes("usdt")
                            ? "USDT"
                            : "transfer"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white/90">
                      {formatCurrency(data.amount)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {data.type === "deposit" ? (
                          <FiDownload className="text-green-400" size={16} />
                        ) : (
                          <FiUpload className="text-red-400" size={16} />
                        )}
                        <span
                          className={`${
                            data.type === "deposit"
                              ? "text-green-400"
                              : "text-red-400"
                          } capitalize`}
                        >
                          {data.type}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-8 text-center text-gray-400"
                  >
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {sortedTrnxs.length > itemsPerPage && (
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 disabled:opacity-50 hover:bg-gray-700 transition"
            >
              <FiArrowLeft /> Previous
            </button>
            <span className="text-gray-400">
              Page {currentPage} of{" "}
              {Math.ceil(sortedTrnxs.length / itemsPerPage)}
            </span>
            <button
              onClick={handleNext}
              disabled={
                currentPage === Math.ceil(sortedTrnxs.length / itemsPerPage)
              }
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 disabled:opacity-50 hover:bg-gray-700 transition"
            >
              Next <FiArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recenthistory;
