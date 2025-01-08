/* eslint-disable no-unused-vars */
import React from "react";
import { styles } from "../constants/styles";

import { MdNotifications } from "react-icons/md";
import { userpic } from "../assets";
import Assets from "./Assets";

const Dashcontent = () => {
  return (
    <section className="h-full w-full bg-opacity-25 overflow-auto p-6 flex flex-col gap-6">
      {/* nav */}
      <div className="flex justify-between items-center">
        <h3 className={styles.dashTitle}>dashboard</h3>
        <div className="flex items-center gap-6">
          <span className="relative cursor-pointer">
            <MdNotifications />
            <small className="absolute -top-[5px] bg-red-500 w-4 h-4 left-[8px] rounded-full flex items-center justify-center">
              0
            </small>
          </span>
          <span className="flex items-center gap-1">
            <img src={userpic} alt="user profile alt" className="w-[30px]" />
            <p className="hidden lg:flex">username </p>
          </span>
        </div>
      </div>
      {/* assets */}
      <Assets />
    </section>
  );
};

export default Dashcontent;
