/* eslint-disable no-unused-vars */
import React from "react";
import { styles } from "../constants/styles";
import Dashwallet from "./Dashwallet";
import BitcoinChart from "./Bitcoinchart";

const Dashchart = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <BitcoinChart />
      {/* <Dashwallet /> */}
    </div>
  );
};

export default Dashchart;
