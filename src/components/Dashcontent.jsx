/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FaGear } from "react-icons/fa6";
import { MdOutlineSupportAgent } from "react-icons/md";

import { MdNotifications } from "react-icons/md";
import { userpic } from "../assets";
import Assets from "./Assets";
import Dashchart from "./Dashchart";
import Investstat from "./Investstat";
import Recenthistory from "./Recenthistory";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../constants/constant";
import { getUserInfo } from "../features/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Dashcontent = () => {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const { userInfo } = useSelector((state) => state.user);
  // console.log(userInfo);
  useEffect(() => {
    if (accessToken) {
      dispatch(getUserInfo());
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    if (userInfo && !userInfo.isProfileComplete) {
      navigate("/personal");
    }
    // if (!userInfo.isEmailVerified) {
    //   navigate("/verifymail");
    // }
  }, [userInfo, navigate]);

  return (
    <section className="h-full p-6 w-full ">
      <div className="flex flex-col gap-6">
        {/* nav */}
        <div className="flex justify-between items-center">
          <h3 className="text-[18px] lg:text-[23px] font-bold leading-[19.5px]">
            Dashboard
          </h3>
          <div className="flex items-center gap-6 lg:px-6">
            <span className="relative cursor-pointer">
              <MdNotifications />
              <small className="absolute -top-[5px] bg-red-500 w-4 h-4 left-[8px] rounded-full flex items-center justify-center">
                0
              </small>
            </span>
            <button
              onClick={handleShowMenu}
              className="flex items-center gap-1"
            >
              <img src={userpic} alt="user pic" className="w-[25px]" />
              <p className="hidden lg:flex font-light capitalize">
                {userInfo?.username}{" "}
              </p>
            </button>
          </div>
        </div>
        {/* notifications */}
        <div className="flex flex-col gap-4"></div>
        {/* assets */}
        <div>
          <Assets />
        </div>
        {/* charts */}
        <div>
          <Dashchart />
        </div>
        {/* analytics */}
        <div className="grid gap-6 md:grid-cols-3 h-full">
          <div className="md:col-span-1 bg-gray-800/50 rounded-xl backdrop-blur-sm p-6 border border-gray-700/50 hover:border-cyan-400/30 transition-all">
            <Investstat />
          </div>
          <div className="md:col-span-2 overflow-auto mb-16 h-full bg-gray-800/50 rounded-xl backdrop-blur-sm p-6 border border-gray-700/50 hover:border-cyan-400/30 transition-all">
            <Recenthistory />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="absolute top-[60px] right-[30px] bg-zinc-800 text-white flex flex-col p-6 gap-6 rounded-[5px] border border-zinc-700">
          <Link
            to={"/settings"}
            className="flex items-center gap-2 capitalize font-medium "
          >
            <FaGear /> settings
          </Link>
          <Link
            to={"/ticket"}
            className="flex items-center gap-2 capitalize font-medium "
          >
            <MdOutlineSupportAgent />
            ticket
          </Link>
        </div>
      )}
    </section>
  );
};

export default Dashcontent;
