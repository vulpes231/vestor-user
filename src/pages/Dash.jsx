/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { getAccessToken } from "../constants/constant";

const Dash = () => {
  const token = getAccessToken();

  useEffect(() => {
    if (!token) {
      sessionStorage.clear();
      window.location.href = "/signin";
    }
  }, [token]);
  return <div>Dash</div>;
};

export default Dash;
