/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { formatCurrency, getAccessToken } from "../constants/constant";
import { bitcoin, eth, tether, trf, wallet } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { getUserTrnxs } from "../features/trnxSlice";
import LoadingModal from "./LoadingModal";
import { format } from "date-fns";
import {
  FiArrowLeft,
  FiArrowRight,
  FiTrendingDown,
  FiTrendingUp,
} from "react-icons/fi";

const trxStyles = {
  td: "px-6 py-6 whitespace-nowrap",
};

const Transactions = () => {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();

  const { userTrnxs, getTrnxLoading } = useSelector((state) => state.trnx);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Only calculate pagination if `userTrnxs` is an array
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const sortedTrnxs = Array.isArray(userTrnxs)
    ? [...userTrnxs].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : [];

  const currentItems = sortedTrnxs.slice(indexOfFirstItem, indexOfLastItem);

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
  }, [dispatch, accessToken]);

  // if (getTrnxLoading) {
  //   return <LoadingModal text={"Fetching Transactions"} />;
  // }

  return (
    <section>
      <div className="flex flex-col gap-10 ">
        <h2 className="text-xl font-semibold text-white mb-6">
          Recent Transactions
        </h2>
        <div className="overflow-x-auto rounded-xl backdrop-blur-sm  border border-gray-700/50 hover:border-cyan-400/30 transition-all">
          <table className="w-full">
            <thead className="bg-white text-slate-800">
              <tr className="text-left text-sm">
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3 pl-6">Date</th>
                <th className="px-4 py-3 pr-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50 text-[12px] lg:text-[14px]">
              {currentItems.length > 0 ? (
                currentItems.map((data) => (
                  <tr
                    key={data._id}
                    className="hover:bg-gray-700/30 transition"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            data.coin === "bitcoin" ||
                            (data.coin === "btc" && data.method !== "bank")
                              ? bitcoin
                              : data.coin === "usdt(erc20)" ||
                                data.coin === "usdt"
                              ? tether
                              : data.coin === "usdt(trc20)"
                              ? tether
                              : data.coin === "ethereum"
                              ? eth
                              : wallet
                          }
                          alt=""
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-white/80 uppercase">
                          {data.coin && data.method !== "bank"
                            ? data.coin
                            : "Bank"}
                        </span>
                      </div>
                    </td>

                    <td className={trxStyles.td}>
                      <div className="flex items-center gap-1">
                        {data.type === "deposit" ? (
                          <FiTrendingUp className="text-green-400" />
                        ) : (
                          <FiTrendingDown className="text-red-400" />
                        )}
                        <span
                          className={`${
                            data.type === "deposit"
                              ? "text-green-400"
                              : "text-red-400"
                          } capitalize`}
                        >
                          {data.type === "withdraw" ? "payout" : data.type}
                        </span>
                      </div>
                    </td>
                    <td className={trxStyles.td}>
                      {formatCurrency(data.amount)}
                    </td>
                    <td className={trxStyles.td}>
                      {format(new Date(data.createdAt), "MMM dd yyyy")}
                    </td>
                    <td className={trxStyles.td}>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          data.status === "completed"
                            ? "bg-green-900/50 text-green-400"
                            : data.status === "failed"
                            ? "bg-red-900/50 text-red-400"
                            : "bg-yellow-900/50 text-yellow-400"
                        }`}
                      >
                        {data.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-400">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {sortedTrnxs.length > itemsPerPage && (
            <div className="flex items-center justify-between mt-6 p-6 text-[13px] lg:text-[14px]">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 disabled:opacity-50 hover:bg-gray-700 transition"
              >
                <FiArrowLeft /> Previous
              </button>
              <span className="text-gray-400 whitespace-nowrap">
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
    </section>
  );
};

export default Transactions;
