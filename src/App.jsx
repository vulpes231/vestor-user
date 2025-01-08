/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Dash,
  Identification,
  Landing,
  Portfolio,
  Settings,
  Signin,
  Signup,
  Steptwo,
  Wallet,
} from "./pages";
import { Mobilenav, Sidebar } from "./components";
import { getAccessToken } from "./constants/constant";

const App = () => {
  const [activeLink, setActiveLink] = useState("dashboard");

  const token = getAccessToken();
  return (
    <div className="bg-slate-700 h-screen text-white flex">
      <div className={token ? "lg:flex" : "hidden"}>
        <Sidebar activeLink={activeLink} setActiveLink={setActiveLink} />
        <Mobilenav activeLink={activeLink} setActiveLink={setActiveLink} />
      </div>
      <div className="h-full w-full bg-opacity-25 overflow-auto ">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/personal" element={<Steptwo />} />
          <Route path="/identity" element={<Identification />} />
          <Route path="/dashboard" element={<Dash />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
