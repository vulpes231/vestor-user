/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { logo } from "../assets";

const Logo = ({ customClass }) => {
  return (
    <div className={customClass}>
      <img src={logo} alt="logo" className="w-[30px] block" />
      <h1 className="font-bold text-3xl">
        <span className="text-green-600">ves</span>tor
      </h1>
    </div>
  );
};

export default Logo;
