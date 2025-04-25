/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { MdError } from "react-icons/md";

const ErrorModal = ({ error }) => {
  return (
    <div className="bg-black/70 fixed top-[40px] right-[10px] p-4 z-[1000] border border-red-600 rounded-[5px]">
      <div className="text-red-500 flex items-center gap-2">
        <MdError className="w-[18px]" />
        <h6 className="text-[14px]">{error}</h6>
      </div>
    </div>
  );
};

export default ErrorModal;
