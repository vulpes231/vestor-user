/* eslint-disable no-unused-vars */
import React from "react";
import { styles } from "../constants/styles";
import Dashwallet from "./Dashwallet";
import Netgrowth from "./Netgrowth";

const Dashchart = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Netgrowth />
      <Dashwallet />
    </div>
  );
};

export default Dashchart;
