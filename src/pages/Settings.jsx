/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Changepass, Userprofile, Verifyidentity } from "../components";

const Settings = ({ setActive }) => {
  useEffect(() => {
    setActive("settings");
    document.title = "Vestor - Settings";
  }, [setActive]);
  return (
    <div className="p-6 flex flex-col gap-6">
      <h3 className="md:font-bold md:text-2xl">Settings</h3>
      <div className="grid gap-6 md:grid-cols-2 mb-20">
        <Userprofile />
        <Changepass />
        <Verifyidentity />
      </div>
    </div>
  );
};

export default Settings;
