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
    <div className="p-6 flex flex-col gap-6 bg-black/70 min-h-screen">
      <h3 className="text-[18px] lg:text-[23px] font-bold leading-[19.5px]">
        Settings
      </h3>
      <hr className="border-[1px] border-[#dedede]/40" />
      <div className="grid gap-6 md:grid-cols-2">
        <Userprofile userInfo={userInfo} />
        <Changepass />
      </div>
      <Verifyidentity userInfo={userInfo} />
    </div>
  );
};

export default Settings;
