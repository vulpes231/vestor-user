/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { getAccessToken } from "../constants/constant";

import { useNavigate } from "react-router-dom";
import { Dashcontent } from "../components";

const Dash = ({ active, setActive }) => {
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
    <div>
      <Dashcontent />
    </div>
  );
};

export default Dash;
