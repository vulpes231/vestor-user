/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Chat,
  Confirmdeposit,
  Dash,
  History,
  Identification,
  Landing,
  Loginotp,
  Portfolio,
  Settings,
  Signin,
  Signup,
  Steptwo,
  Ticket,
  Tradeasset,
  Verifyemail,
  Wallet,
} from "./pages";
import { Mobilenav, Sidebar, Withdraw } from "./components";
import { getAccessToken } from "./constants/constant";

const App = () => {
  const [activeLink, setActiveLink] = useState("dashboard");
  const isAuth = sessionStorage.getItem("isAuth");
  const token = getAccessToken();
  return (
    <div className="bg-slate-700 h-screen text-white flex">
      <div className={token && isAuth ? "lg:flex" : "hidden"}>
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
          <Route path="/verifymail" element={<Verifyemail />} />
          <Route path="/otpcode" element={<Loginotp />} />
          <Route
            path="/dashboard"
            element={<Dash setActive={setActiveLink} />}
          />
          <Route
            path="/wallet"
            element={<Wallet setActive={setActiveLink} />}
          />
          <Route
            path="/markets"
            element={<Portfolio setActive={setActiveLink} />}
          />
          <Route
            path="/settings"
            element={<Settings setActive={setActiveLink} />}
          />
          <Route
            path="/withdraw"
            element={<Withdraw setActive={setActiveLink} />}
          />
          <Route
            path="/confirm/:coin/:amount/:network"
            element={<Confirmdeposit setActive={setActiveLink} />}
          />
          <Route
            path="/chat/:ticketId"
            element={<Chat setActive={setActiveLink} />}
          />
          <Route
            path="/ticket"
            element={<Ticket setActive={setActiveLink} />}
          />
          <Route
            path="/history"
            element={<History setActive={setActiveLink} />}
          />
          <Route
            path="/asset/:symbol"
            element={<Tradeasset setActive={setActiveLink} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
