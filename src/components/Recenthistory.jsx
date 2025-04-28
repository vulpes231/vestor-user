/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { bitcoin, eth, tether, trf, wallet } from "../assets";
import {
  formatCurrency,
  getAccessToken,
  testData,
} from "../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { getUserTrnxs } from "../features/trnxSlice";

import { format } from "date-fns";

const tableStyle = {
  th: "px-8 py-2",
};

const Recenthistory = () => {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();

  const { getTrnxLoading, getTrnxError, userTrnxs } = useSelector(
    (state) => state.trnx
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

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
  }, [accessToken, dispatch]);

  if (getTrnxLoading) {
    return (
      <div className="bg-stone-900 bg-opacity-40  flex flex-col gap-6 border-b border-stone-600">
        <h3 className="text-lg capitalize font-bold p-4">Recent history</h3>
        <p className="text-center">Fetching User Transactions...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 h-full">
      <h3 className="text-lg capitalize font-bold p-4">Recent history</h3>
      <div className="overflow-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left font-bold text-sm bg-white text-slate-900">
              <th className={tableStyle.th}>Date</th>
              <th className={tableStyle.th}>Coin</th>
              <th className={tableStyle.th}>Amount</th>
              <th className={tableStyle.th}>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((data) => {
              return (
                <tr
                  key={data._id}
                  className="text-left text-sm font-light text-slate-300 border-b border-stone-600"
                >
                  <td className={`${tableStyle.th} whitespace-nowrap`}>
                    {format(data.createdAt, "MMM dd yyyy")}
                  </td>
                  <td className={`${tableStyle.th} uppercase`}>
                    <span className="flex items-center gap-1">
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
                        className="w-[25px]"
                      />
                      {data.coin && data.method !== "bank" ? data.coin : "bank"}
                    </span>
                  </td>
                  <td className={`${tableStyle.th}`}>
                    {formatCurrency(data.amount)}
                  </td>
                  <td className={`${tableStyle.th}`}>
                    <span
                      className={`${
                        data.type == "deposit"
                          ? "text-green-500"
                          : data.type == "withdraw"
                          ? "text-red-500"
                          : "text-yellow-500"
                      } capitalize text-[12px] lg:text-[13px] font-normal`}
                    >
                      {data.type}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Recenthistory;
