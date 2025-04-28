/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

const tabs = [
  {
    id: "trade",
    name: "trade history",
  },
  {
    id: "transaction",
    name: "transaction history",
  },
];

const History = ({ setActive }) => {
  const [activeTab, setActiveTab] = useState("trade");

  useEffect(() => {
    setActive("history");
    document.title = "Vestor - History";
  }, [setActive]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-white">History</h1>
        <p className="text-gray-400"> View recent trades and transactions</p>

        <div className="flex items-center gap-4">
          {tabs.map((btn) => {
            return (
              <button
                onClick={() => setActiveTab(btn.id)}
                className={`${
                  activeTab === btn.id
                    ? "bg-green-600 text-[#fff]"
                    : "text-green-500 border-[1px] border-green-500"
                } w-[140px] h-[38px] rounded-[5px] capitalize text-[14px] font-normal`}
                key={btn.id}
              >
                {btn.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default History;
