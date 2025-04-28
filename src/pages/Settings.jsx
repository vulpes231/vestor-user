/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Changepass, Userprofile, Verifyidentity } from "../components";
import { getAccessToken } from "../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../features/userSlice";

const Settings = ({ setActive }) => {
  const accessToken = getAccessToken();

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);
  // console.log(userInfo);
  useEffect(() => {
    if (accessToken) {
      dispatch(getUserInfo());
    }
  }, [dispatch, accessToken]);
  useEffect(() => {
    setActive("settings");
    document.title = "Vestor - Settings";
  }, [setActive]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400">Manage your account.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Userprofile userInfo={userInfo} />
        <Changepass />
      </div>
      <Verifyidentity userInfo={userInfo} />
    </div>
  );
};

export default Settings;
