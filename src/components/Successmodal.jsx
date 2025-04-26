/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { MdCheckCircle } from "react-icons/md";

const Successmodal = ({ successText }) => {
  return (
    <div className="bg-black/70 fixed top-[40px] right-[10px] p-4 z-[1000] border border-green-600 rounded-[5px] ">
      <div className="text-green-500 flex items-center">
        <MdCheckCircle className="w-[18px]" />
        <h6 className="text-[14px]">{successText}</h6>
      </div>
    </div>
  );
};

export default Successmodal;
