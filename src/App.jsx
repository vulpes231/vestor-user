/* eslint-disable no-unused-vars */
import React from "react";
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

const App = () => {
  return (
    <div>
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
  );
};

export default App;
