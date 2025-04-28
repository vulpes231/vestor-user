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
import { getAvailableAssets } from "../features/assetSlice";

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
  const { assets } = useSelector((state) => state.asset);

  const investWallet =
    userWallets && userWallets.find((wallet) => wallet.walletName === "invest");

  useEffect(() => {
    if (accessToken) {
      dispatch(getActiveTradeCount());
      dispatch(getUserTrades());
      dispatch(getUserInfo());
      dispatch(getUserWallets());
      dispatch(getAvailableAssets());
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    setActive("portfolio");
    document.title = "Vestor - Portfolio";
  }, [setActive]);

  useEffect(() => {
    if (assets) {
      console.log(assets);
    }
  }, [assets]);

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

  const headers = [
    {
      id: "name",
      title: "name",
    },
    {
      id: "price",
      title: "price",
    },
    {
      id: "change",
      title: "24Hr change",
    },
    {
      id: "high",
      title: "high",
    },
    {
      id: "low",
      title: "low",
    },
  ];

  return (
    <div className="p-6 flex flex-col gap-6 bg-black/70 min-h-screen">
      <h3 className="text-[18px] lg:text-[23px] font-bold leading-[19.5px]">
        Portfolio
      </h3>
      <table>
        <thead>
          {headers.map((hd) => {
            return <th key={hd.id}>{hd.title}</th>;
          })}
        </thead>
      </table>
      {/* <div>
        <Trades />
      </div> */}
    </div>
  );
};

export default Portfolio;
