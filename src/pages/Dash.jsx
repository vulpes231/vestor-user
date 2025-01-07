/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { getAccessToken } from "../constants/constant";
import Logo from "../components/Logo";

import { Link, useNavigate } from "react-router-dom";
import { Dashnav } from "../components";

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
    <div className="bg-black min-h-screen text-white">
      <Dashnav />
    </div>
  );
};

export default Dash;
