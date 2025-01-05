/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Landing, Signin, Signup, Steptwo } from "./pages";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/personal" element={<Steptwo />} />
      </Routes>
    </div>
  );
};

export default App;
