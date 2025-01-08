/* eslint-disable no-unused-vars */
import React from "react";
import { styles } from "../constants/styles";
import Dashwallet from "./Dashwallet";
import Netgrowth from "./Netgrowth";

const Dashchart = () => {
  return (
    <section className="mb-24">
      <div className="grid md:grid-cols-3 h-[400px] gap-6 overflow-auto">
        <Netgrowth />
        <Dashwallet />
      </div>
    </section>
  );
};

export default Dashchart;
