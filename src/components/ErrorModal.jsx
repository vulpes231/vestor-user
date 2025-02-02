/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { MdError } from "react-icons/md";

const ErrorModal = ({ error }) => {
  return (
    <div className="bg-black bg-opacity-90 fixed top-5 right-3 p-8 flex items-start justify-center rounded-lg z-[1000] border border-stone-600">
      <div className="text-red-500 flex items-center">
        <MdError size={25} />
        <span>{error}</span>
      </div>
    </div>
  );
};

export default ErrorModal;
