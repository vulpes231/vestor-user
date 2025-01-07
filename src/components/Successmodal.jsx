/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { MdCheckCircle } from "react-icons/md";

const Successmodal = ({ successText }) => {
  return (
    <div className="bg-slate-50 fixed top-5 right-3 p-8 flex items-start justify-center rounded-lg">
      <div className="text-green-500 flex items-center">
        <MdCheckCircle size={25} />
        <span>{successText}</span>
      </div>
    </div>
  );
};

export default Successmodal;
