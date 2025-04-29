/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../constants/constant";
import { getUserTrades } from "../features/tradeSlice";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { format } from "date-fns";

const tradeStyle = {
  th: "px-6 py-3 whitespace-nowrap",
};

const Trades = () => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  const { userTradeLoading, userTrades } = useSelector((state) => state.trade);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const sortedTrnxs = Array.isArray(userTrades)
    ? [...userTrades].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : [];

  const currentItems =
    sortedTrnxs && sortedTrnxs.slice(indexOfFirstItem, indexOfLastItem);

  const handleNext = () => {
    if (currentPage < Math.ceil(userTrades.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // useEffect(() => {
  //   if (userTrades) {
  //     console.log(userTrades);
  //   }
  // }, [userTrades]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserTrades());
    }
  }, [dispatch, accessToken]);
  // if (userTradeLoading) {
  //   return (
  //     <div className="flex flex-col ">
  //       <h3 className="p-4 font-bold text-lg">Recent Trades</h3>
  //       <table className="min-w-full">
  //         <thead className="">
  //           <tr className="text-left uppercase font-bold ">
  //             <th className={tradeStyle.th}>date</th>
  //             <th className={tradeStyle.th}>market</th>
  //             <th className={tradeStyle.th}>amount</th>
  //             <th className={tradeStyle.th}>ROI</th>
  //             <th className={tradeStyle.th}>status</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           <tr>
  //             <td colSpan="5" className={`text-center p-6`}>
  //               Fetching user trades...
  //             </td>
  //           </tr>
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // }
  return (
    <div className="flex flex-col ">
      <h3 className="p-4 font-bold text-lg">Recent Trades</h3>
      <div className="overflow-x-auto rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-cyan-400/30 transition-all">
        <table className="min-w-full">
          <thead className="bg-white text-slate-800">
            <tr className="text-left capitalize font-bold ">
              <th className={tradeStyle.th}>market</th>
              <th className={tradeStyle.th}>amount</th>
              <th className={tradeStyle.th}>ROI</th>
              <th className={tradeStyle.th}>date</th>
              <th className={tradeStyle.th}>status</th>
            </tr>
          </thead>
          <tbody className="text-[13px] lg:text-[14px]">
            {currentItems.length > 0 ? (
              currentItems &&
              currentItems.map((trade) => {
                return (
                  <tr
                    key={trade._id}
                    className="border-b border-stone-600 text-slate-300"
                  >
                    <td className={tradeStyle.th}>
                      <span className="flex items-center gap-2">
                        <img
                          src={trade.img ? trade.img : ""}
                          alt=""
                          className="w-[25px] h-[25px]"
                        />
                        <h6>{trade.market}</h6>
                      </span>
                    </td>
                    <td className={tradeStyle.th}>
                      <span>
                        <h3 className="">{trade.amount} USD</h3>
                        <h6 className="text-[10px] lg:text-[12px] flex items-center text-[#979797]">
                          {trade.qty
                            ? trade.qty.toFixed(6)
                            : parseFloat(0).toFixed(2)}{" "}
                          {trade.symbol ? trade.symbol.toUpperCase() : null}
                        </h6>
                      </span>
                    </td>
                    <td className={tradeStyle.th}>
                      <span
                        className={
                          trade.roi > 0 ? "text-green-600" : "text-red-600"
                        }
                      >
                        {trade.roi} USD
                      </span>
                    </td>
                    <td className={tradeStyle.th}>
                      {format(trade.createdAt, "MMM dd, yyyy")}
                    </td>
                    <td className={tradeStyle.th}>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          trade.status === "open"
                            ? "bg-green-900/50 text-green-400"
                            : "bg-red-900/50 text-red-400"
                        }`}
                      >
                        {trade.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="p-6 text-center">
                  You have no trades
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* {currentItems.length > itemsPerPage && ( */}
        <div className="flex items-center justify-between mt-6 p-6 text-[13px] lg:text-[14px]">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 disabled:opacity-50 hover:bg-gray-700 transition"
          >
            <FiArrowLeft /> Previous
          </button>
          <span className="text-gray-400">
            Page {currentPage} of{" "}
            {Math.ceil(currentItems.length / itemsPerPage)}
          </span>
          <button
            onClick={handleNext}
            disabled={
              currentPage === Math.ceil(currentItems.length / itemsPerPage)
            }
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 disabled:opacity-50 hover:bg-gray-700 transition"
          >
            Next <FiArrowRight />
          </button>
        </div>
      </div>

      {/* )} */}
    </div>
  );
};

export default Trades;
