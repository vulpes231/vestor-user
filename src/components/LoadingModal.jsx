/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const LoadingModal = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 fixed top-0 left-0 h-screen bg-black bg-opacity-40">
      <div className="relative w-16 h-16 border-4 border-t-4 border-green-600 border-dashed rounded-full animate-spin"></div>
      <h5 className="text-lg text-gray-700">{text}...</h5>
    </div>
  );
};

export default LoadingModal;
