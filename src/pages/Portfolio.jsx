/* eslint-disable no-unused-vars */
import React from "react";
import { Trades } from "../components";

const Portfolio = () => {
  return (
    <div className="p-6 flex flex-col gap-6">
      <h3>Portfolio</h3>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-stone-900 bg-opacity-40  flex flex-col gap-4 justify-between">
          <span className="p-6">
            <h3>Available Signals</h3>
            <p className="text-4xl">2012</p>
          </span>
        </div>
        <div className="bg-stone-900 bg-opacity-40  flex flex-col gap-4 justify-between">
          <span className="p-6">
            <h3>Active Signals</h3>
            <p className="text-4xl">0</p>
          </span>
        </div>
        <div className="bg-stone-900 bg-opacity-40  flex flex-col gap-4 justify-between">
          <span className="p-6">
            <h3>Total Positions</h3>
            <p className="text-4xl">0</p>
          </span>
        </div>
      </div>
      <div>
        <Trades />
      </div>
    </div>
  );
};

export default Portfolio;
