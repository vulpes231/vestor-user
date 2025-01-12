/* eslint-disable no-unused-vars */
import React from "react";
import { bitcoin, eth, tether } from "../assets";
import { testData } from "../constants/constant";

const tableStyle = {
  th: "px-8 py-2",
};

const Recenthistory = () => {
  return (
    <div className="bg-stone-900 bg-opacity-40  flex flex-col gap-6 h-[300px]">
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
            {testData.map((data) => {
              return (
                <tr
                  key={data.id}
                  className="text-left text-sm font-light text-slate-300 border-b border-stone-700"
                >
                  <td className={`${tableStyle.th} whitespace-nowrap`}>
                    {data.date}
                  </td>
                  <td className={`${tableStyle.th} uppercase`}>
                    <span className="flex items-center gap-1">
                      <img
                        src={
                          data.coin == "btc"
                            ? bitcoin
                            : data.coin == "usdt"
                            ? tether
                            : eth
                        }
                        alt=""
                        className="w-[25px]"
                      />
                      {data.coin}
                    </span>
                  </td>
                  <td className={`${tableStyle.th}`}>{data.amount} USD</td>
                  <td className={`${tableStyle.th}`}>
                    <span
                      className={
                        data.type == "deposit"
                          ? "text-green-500"
                          : data.type == "withdraw"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }
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
