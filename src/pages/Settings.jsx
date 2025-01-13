/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";

const Settings = ({ setActive }) => {
  useEffect(() => {
    setActive("settings");
    document.title = "Vestor - Settings";
  }, [setActive]);
  return <div className="p-6">Settings</div>;
};

export default Settings;
