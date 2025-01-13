/* eslint-disable no-unused-vars */
import React from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { userpic } from "../assets";

const Userprofile = () => {
  return (
    <div className="flex flex-col gap-4 bg-stone-900 bg-opacity-40 border border-stone-600 p-6">
      <figure className="flex items-center justify-center mb-5 ">
        <img
          src={userpic}
          alt=""
          className="w-[90px] bg-stone-900 rounded-full"
        />
      </figure>

      <div className="flex items-center justify-between">
        <span className="capitalize">email</span>
        <span>testuser@me.com</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="capitalize">username</span>
        <span>testuser</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="capitalize">full name</span>
        <span>testuser@me.com</span>
      </div>

      <div className="flex items-center justify-between">
        <span>Disable Trading</span>
        <span>
          <FaToggleOff />
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span>Disable Withdrawals</span>
        <span>
          <FaToggleOff />
        </span>
      </div>
    </div>
  );
};

export default Userprofile;
