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
    <div className="p-6 flex flex-col gap-6">
      <h3 className="md:font-bold md:text-2xl">Settings</h3>
      <div className="grid gap-6 md:grid-cols-2 mb-20">
        <Userprofile userInfo={userInfo} />
        <Changepass />
        <Verifyidentity userInfo={userInfo} />
      </div>
    </div>
  );
};

export default Settings;
