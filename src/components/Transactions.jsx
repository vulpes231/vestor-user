/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { formatCurrency, getAccessToken } from "../constants/constant";
import { bitcoin, eth, tether, trf } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { getUserTrnxs } from "../features/trnxSlice";
import LoadingModal from "./LoadingModal";
import { format } from "date-fns";

const trxStyles = {
  td: "px-6 py-6",
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

  const currentItems = Array.isArray(userTrnxs)
    ? userTrnxs.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const handleNext = () => {
    if (currentPage < Math.ceil(userTrnxs?.length / itemsPerPage)) {
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

  if (getTrnxLoading) {
    return <LoadingModal text={"Fetching Transactions"} />;
  }

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
              {currentItems.length > 0 ? (
                currentItems.map((data) => (
                  <tr
                    key={data._id}
                    className="border-b border-slate-600 text-sm text-slate-200"
                  >
                    <td className={trxStyles.td}>
                      {format(data.createdAt, "MMM dd yyyy")}
                    </td>
                    <td className={trxStyles.td}>
                      <span className="flex items-center gap-1 uppercase">
                        <img
                          src={
                            data.coin === "btc" || data.coin == "bitcoin"
                              ? bitcoin
                              : data.coin === "usdt"
                              ? tether
                              : data.coin === "usdt"
                              ? eth
                              : trf
                          }
                          alt=""
                          className="w-[25px]"
                        />
                        {data.coin}
                      </span>
                    </td>
                    <td className={trxStyles.td}>
                      {formatCurrency(data.amount)}
                    </td>
                    <td className={trxStyles.td}>
                      <span
                        className={
                          data.type === "deposit"
                            ? "text-green-500 capitalize"
                            : data.type === "withdraw"
                            ? "text-red-500 capitalize"
                            : "text-yellow-500 capitalize"
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
                ))
              ) : (
                <tr>
                  <td colSpan="5" className={`text-center ${trxStyles.td}`}>
                    No transactions found.
                  </td>
                </tr>
              )}
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
                      {Math.ceil(userTrnxs?.length / itemsPerPage)}
                    </span>
                    <button
                      onClick={handleNext}
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
                      disabled={
                        currentPage ===
                        Math.ceil(userTrnxs?.length / itemsPerPage)
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
