/* eslint-disable no-unused-vars */
import React from "react";
import { styles } from "../constants/styles";
import Dashwallet from "./Dashwallet";

const Dashchart = () => {
  return (
    <section className="mb-24">
      <div className="grid md:grid-cols-3 h-[400px] gap-6">
        <div className="md:col-span-2 bg-stone-900 bg-opacity-40">
          <h3 className={` p-6 ${styles.dashTitle}`}>net growth</h3>
        </div>
        <Dashwallet />
      </div>
    </section>
  );
};

export default Dashchart;
