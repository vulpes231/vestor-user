/* eslint-disable no-unused-vars */
import React from "react";

const myTrades = [
  {
    id: 1,
    date: "2025 Jan 13, 10:56AM",
    market: "BTC/USD",
    amount: 1500,
    ROI: 100,
    status: "closed",
  },
  {
    id: 2,
    date: "2025 Jan 13, 12:56PM",
    market: "BTC/USD",
    amount: 200,
    ROI: 0,
    status: "open",
  },
  {
    id: 3,
    date: "2025 Jan 13, 02:56PM",
    market: "XAU/USD",
    amount: 456,
    ROI: 0,
    status: "open",
  },
];

const tradeStyle = {
  th: "px-6 py-3 whitespace-nowrap",
};

const Trades = () => {
  return (
    <div className="flex flex-col gap-10 bg-stone-900 bg-opacity-40 overflow-auto mb-20">
      <h3 className="p-6">Recent Trades</h3>
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
          {myTrades.map((trade) => {
            return (
              <tr key={trade.id} className="border-b border-stone-600">
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
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Trades;
