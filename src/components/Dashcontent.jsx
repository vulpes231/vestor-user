/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { styles } from "../constants/styles";

import { MdNotifications } from "react-icons/md";
import { userpic } from "../assets";
import Assets from "./Assets";
import Dashchart from "./Dashchart";
import Investstat from "./Investstat";
import Recenthistory from "./Recenthistory";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../constants/constant";
import { getUserInfo } from "../features/userSlice";

const Dashcontent = () => {
  const accessToken = getAccessToken();

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);
  // console.log(userInfo);
  useEffect(() => {
    if (accessToken) {
      dispatch(getUserInfo());
    }
  }, [dispatch, accessToken]);
  return (
    <section className="h-full p-6 w-full ">
      <div className="flex flex-col gap-6">
        {/* nav */}
        <div className="flex justify-between items-center">
          <h3 className="md:font-bold md:text-2xl ">Dashboard</h3>
          <div className="flex items-center gap-6">
            <span className="relative cursor-pointer">
              <MdNotifications />
              <small className="absolute -top-[5px] bg-red-500 w-4 h-4 left-[8px] rounded-full flex items-center justify-center">
                0
              </small>
            </span>
            <span className="flex items-center gap-1">
              <img src={userpic} alt="user profile alt" className="w-[30px]" />
              <p className="hidden lg:flex">{userInfo?.username} </p>
            </span>
          </div>
        </div>
        {/* assets */}
        <div>
          <Assets />
        </div>
        {/* charts */}
        <div>
          <Dashchart />
        </div>
        {/* analytics */}
        <div className="grid gap-6 md:grid-cols-3  ">
          <div className="md:col-span-1 border border-stone-700">
            <Investstat />
          </div>
          <div className="md:col-span-2 border border-stone-700 overflow-auto mb-16">
            <Recenthistory />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashcontent;
