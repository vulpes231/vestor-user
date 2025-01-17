/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../constants/constant";
import { getUserTrades } from "../features/tradeSlice";

const tradeStyle = {
  th: "px-6 py-3 whitespace-nowrap",
};

const Trades = () => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  const { userTradeLoading, userTrades } = useSelector((state) => state.trade);

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserTrades());
    }
  }, [dispatch, accessToken]);
  if (userTradeLoading) {
    return (
      <div className="flex flex-col bg-stone-900 bg-opacity-40 overflow-auto mb-20 border border-stone-600 text-sm">
        <h3 className="p-4 font-bold text-lg">Recent Trades</h3>
        <table className="min-w-full">
          <thead className="bg-white text-slate-800">
            <tr className="text-left uppercase font-bold ">
              <th className={tradeStyle.th}>date</th>
              <th className={tradeStyle.th}>market</th>
              <th className={tradeStyle.th}>amount</th>
              <th className={tradeStyle.th}>ROI</th>
              <th className={tradeStyle.th}>status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="5" className={`text-center p-6`}>
                Fetching user trades...
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div className="flex flex-col bg-stone-900 bg-opacity-40 overflow-auto mb-20 border border-stone-600 text-sm">
      <h3 className="p-4 font-bold text-lg">Recent Trades</h3>
      <table className="min-w-full">
        <thead className="bg-white text-slate-800">
          <tr className="text-left uppercase font-bold ">
            <th className={tradeStyle.th}>date</th>
            <th className={tradeStyle.th}>market</th>
            <th className={tradeStyle.th}>amount</th>
            <th className={tradeStyle.th}>ROI</th>
            <th className={tradeStyle.th}>status</th>
          </tr>
        </thead>
        <tbody>
          {userTrades.length > 0 ? (
            userTrades &&
            userTrades.map((trade) => {
              return (
                <tr
                  key={trade.id}
                  className="border-b border-stone-600 text-slate-300"
                >
                  <td className={tradeStyle.th}>{trade.date}</td>
                  <td className={tradeStyle.th}>{trade.market}</td>
                  <td className={tradeStyle.th}>{trade.amount} USD</td>
                  <td className={tradeStyle.th}>
                    <span
                      className={
                        trade.ROI > 0 ? "text-green-600" : "text-red-600"
                      }
                    >
                      {trade.ROI} USD
                    </span>
                  </td>
                  <td className={tradeStyle.th}>
                    <span
                      className={
                        trade.status == "closed"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }
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
    </div>
  );
};

export default Trades;
