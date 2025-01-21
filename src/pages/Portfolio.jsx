/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Trades } from "../components";
import { FaSignal, FaUserLock } from "react-icons/fa";
import { RiSignalTowerLine } from "react-icons/ri";
import { GrLineChart } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../constants/constant";
import {
  getActiveTradeCount,
  getTotalProfit,
  getUserTrades,
} from "../features/tradeSlice";
import { getUserInfo } from "../features/userSlice";
import { Link } from "react-router-dom";
import { getUserWallets } from "../features/walletSlice";

const portFolioStyle = {
  title: "font-bold text-lg whitespace-nowrap",
  icon: "w-6 h-6",
};

const Portfolio = ({ setActive }) => {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();

  const { activeTradeCount, userTrades } = useSelector((state) => state.trade);
  const { userInfo } = useSelector((state) => state.user);
  const { userWallets } = useSelector((state) => state.wallet);

  const investWallet =
    userWallets && userWallets.find((wallet) => wallet.walletName === "invest");

  useEffect(() => {
    if (accessToken) {
      dispatch(getActiveTradeCount());
      dispatch(getUserTrades());
      dispatch(getUserInfo());
      dispatch(getUserWallets());
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    setActive("portfolio");
    document.title = "Vestor - Portfolio";
  }, [setActive]);

  if (!userInfo.isKYCVerified) {
    return (
      <div className="p-6 flex flex-col gap-6 h-full items-center justify-center bg-black bg-opacity-50">
        <FaUserLock className="w-20 h-20" />
        <h3 className="text-xl">
          Account status:{" "}
          <span
            className={
              userInfo?.isKYCVerified ? "text-green-600" : "text-red-600"
            }
          >
            {userInfo?.isKYCVerified ? "Verified" : "Not Verified"}
          </span>
        </h3>
        <p>
          Verify your account to enjoy full features.{" "}
          <Link to={"/settings"} className="text-green-600 underline">
            Complete verification
          </Link>{" "}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-6">
      <h3 className="md:font-bold md:text-2xl">Portfolio</h3>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-stone-900 bg-opacity-40  flex flex-col gap-4 justify-between border border-stone-600 p-6">
          <span className="flex items-center gap-2">
            <FaSignal className={portFolioStyle.icon} />
            <h3 className={portFolioStyle.title}>Portfolio Balance</h3>
          </span>
          <p className="text-4xl text-slate-400 px-2">
            ${investWallet?.balance?.toFixed(2) || `0.00`}
          </p>
        </div>

        <div className="bg-stone-900 bg-opacity-40  flex flex-col gap-4 justify-between border border-stone-600 p-6">
          <span className="flex items-center gap-2">
            <RiSignalTowerLine className={portFolioStyle.icon} />
            <h3 className={portFolioStyle.title}>Total Trades</h3>
          </span>

          <p className="text-4xl text-slate-400 px-2">
            {userTrades?.length || 0}
          </p>
        </div>
        <div className="bg-stone-900 bg-opacity-40  flex flex-col gap-4 justify-between border border-stone-600 p-6">
          <span className="flex items-center gap-2">
            <GrLineChart className={portFolioStyle.icon} />
            <h3 className={portFolioStyle.title}>Active Trades</h3>
          </span>
          <p className="text-4xl text-slate-400 px-2">
            {activeTradeCount || 0}
          </p>
        </div>
      </div>
      <div>
        <Trades />
      </div>
    </div>
  );
};

export default Portfolio;
