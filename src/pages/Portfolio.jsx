/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Trades } from "../components";
import { FaSignal } from "react-icons/fa";
import { RiSignalTowerLine } from "react-icons/ri";
import { GrLineChart } from "react-icons/gr";

const portFolioStyle = {
  title: "font-bold text-lg",
  icon: "w-6 h-6",
};

const Portfolio = ({ setActive }) => {
  useEffect(() => {
    setActive("portfolio");
    document.title = "Vestor - Portfolio";
  }, [setActive]);
  return (
    <div className="p-6 flex flex-col gap-6">
      <h3>Portfolio</h3>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-stone-900 bg-opacity-40  flex flex-col gap-4 justify-between border border-stone-600 p-6">
          <span className="flex items-center gap-2">
            <FaSignal className={portFolioStyle.icon} />
            <h3 className={portFolioStyle.title}>Available Signals</h3>
          </span>
          <p className="text-4xl text-slate-400 px-2">26</p>
        </div>
        <div className="bg-stone-900 bg-opacity-40  flex flex-col gap-4 justify-between border border-stone-600 p-6">
          <span className="flex items-center gap-2">
            <RiSignalTowerLine className={portFolioStyle.icon} />
            <h3 className={portFolioStyle.title}>Active Signals</h3>
          </span>

          <p className="text-4xl text-slate-400 px-2">0</p>
        </div>
        <div className="bg-stone-900 bg-opacity-40  flex flex-col gap-4 justify-between border border-stone-600 p-6">
          <span className="flex items-center gap-2">
            <GrLineChart className={portFolioStyle.icon} />
            <h3 className={portFolioStyle.title}>Total Positions</h3>
          </span>
          <p className="text-4xl text-slate-400 px-2">0</p>
        </div>
      </div>
      <div>
        <Trades />
      </div>
    </div>
  );
};

export default Portfolio;
