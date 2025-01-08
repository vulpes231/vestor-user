/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { getAccessToken } from "../constants/constant";
import Logo from "../components/Logo";

import { Link, useNavigate } from "react-router-dom";
import { Dashcontent, Mobilenav, Sidebar } from "../components";

const Dash = () => {
  const token = getAccessToken();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!token) {
  //     sessionStorage.clear();
  //     window.location.href = "/signin";
  //   }
  // }, [token]);

  useEffect(() => {
    document.title = "Vestor - Dashboard";
  });
  return (
    <div className="bg-stone-900 h-screen text-white lg:p-6 flex gap-6">
      <Sidebar />
      <Dashcontent />
      <Mobilenav />
    </div>
  );
};

export default Dash;
