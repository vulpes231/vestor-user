/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { userpic } from "../assets";
import { getAccessToken } from "../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../features/userSlice";

const Userprofile = () => {
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
    <div className="flex flex-col gap-4 bg-stone-900 bg-opacity-40 border border-stone-600 p-6">
      <figure className="flex items-center justify-center mb-5 ">
        <img
          src={userpic}
          alt=""
          className="w-[90px] bg-stone-900 rounded-full"
        />
      </figure>

      <div className="flex items-center justify-between">
        <span className="capitalize">email</span>
        <span>{userInfo?.email}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="capitalize">username</span>
        <span>{userInfo?.username}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="capitalize">full name</span>
        <span>{`${userInfo?.firstname} ${userInfo?.lastname}`}</span>
      </div>

      <div className="flex items-center justify-between">
        <span>Disable Trading</span>
        <span>
          <FaToggleOff />
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span>Disable Withdrawals</span>
        <span>
          <FaToggleOff />
        </span>
      </div>
    </div>
  );
};

export default Userprofile;
