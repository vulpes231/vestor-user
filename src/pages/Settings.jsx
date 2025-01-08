/* eslint-disable no-unused-vars */
import React from "react";
import { Mobilenav, Sidebar } from "../components";

const Settings = () => {
  return (
    <div className="bg-stone-900 h-screen text-white lg:p-6 flex gap-6">
      <Sidebar />
      <div className="h-full bg-red-200 w-full bg-opacity-25 overflow-auto p-6">
        Settings
      </div>
      <Mobilenav />
    </div>
  );
};

export default Settings;
