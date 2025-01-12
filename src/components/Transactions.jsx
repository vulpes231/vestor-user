/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { testData } from "../constants/constant";
import { bitcoin, eth, tether } from "../assets";

const trxStyles = {
  td: "px-6 py-6",
};

const Transactions = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  // Calculate the starting and ending indices for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = testData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNext = () => {
    if (currentPage < Math.ceil(testData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section>
      <div className="flex flex-col gap-10 ">
        <h3>Transactions</h3>
        <div className="bg-stone-900 bg-opacity-40 mb-20 overflow-auto border border-stone-600">
          <table className="min-w-full ">
            <thead className="uppercase text-left border-b border-stone-400">
              <tr>
                <th className={trxStyles.td}>date</th>
                <th className={trxStyles.td}>coin</th>
                <th className={trxStyles.td}>amount</th>
                <th className={trxStyles.td}>type</th>
                <th className={trxStyles.td}>status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((data) => {
                return (
                  <tr
                    key={data.id}
                    className="border-b border-slate-600 text-sm text-slate-200"
                  >
                    <td className={trxStyles.td}>{data.date}</td>
                    <td className={trxStyles.td}>
                      <span className="flex items-center gap-1 uppercase">
                        <img
                          src={
                            data.coin === "btc"
                              ? bitcoin
                              : data.coin === "usdt"
                              ? tether
                              : eth
                          }
                          alt=""
                          className="w-[25px]"
                        />
                        {data.coin}
                      </span>
                    </td>
                    <td className={trxStyles.td}>${data.amount.toFixed(2)}</td>
                    <td className={trxStyles.td}>
                      <span
                        className={
                          data.type === "deposit"
                            ? "text-green-500"
                            : data.type === "withdraw"
                            ? "text-red-500"
                            : "text-yellow-500"
                        }
                      >
                        {data.type}
                      </span>
                    </td>
                    <td className={trxStyles.td}>
                      <span
                        className={`${
                          data.status === "completed"
                            ? "bg-green-500 text-white px-6 py-2 rounded-3xl"
                            : data.status === "failed"
                            ? "bg-red-500 text-white px-6 py-2 rounded-3xl"
                            : "bg-yellow-500 text-white px-6 py-2 rounded-3xl"
                        } w-[150px]`}
                      >
                        {data.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5" className="px-6 py-4">
                  <div className="flex justify-between">
                    <button
                      onClick={handlePrevious}
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    <span className="self-center text-white">
                      Page {currentPage} of{" "}
                      {Math.ceil(testData.length / itemsPerPage)}
                    </span>
                    <button
                      onClick={handleNext}
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
                      disabled={
                        currentPage ===
                        Math.ceil(testData.length / itemsPerPage)
                      }
                    >
                      Next
                    </button>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Transactions;
