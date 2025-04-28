/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { getAccessToken } from "../constants/constant";

import { useNavigate } from "react-router-dom";
import { Dashcontent } from "../components";

const Dash = ({ active, setActive }) => {
  const token = getAccessToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      sessionStorage.clear();
      window.location.href = "/signin";
    }
  }, [token]);

  useEffect(() => {
    setActive("dashboard");
    document.title = "Vestor - Dashboard";
  }, [setActive]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 space-y-8">
      <Dashcontent />
    </div>
  );
};

export default Dash;
