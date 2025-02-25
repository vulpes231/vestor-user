/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { styles } from "../constants/styles";
import { MdOutlineSavings, MdAttachMoney } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";
import { FiAlertOctagon } from "react-icons/fi";

import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { getAccessToken } from "../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { getBalance } from "../features/walletSlice";
import { getTotalProfit, getUserTrades } from "../features/tradeSlice";
import { getUserInfo } from "../features/userSlice";

const Assets = () => {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();

  const { balance } = useSelector((state) => state.wallet);
  const { userTrades, totalProfit } = useSelector((state) => state.trade);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (accessToken) {
      dispatch(getBalance());
      dispatch(getUserTrades());
      dispatch(getTotalProfit());
      dispatch(getUserInfo());
    }
  }, [dispatch, accessToken]);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3
          className={`${
            userInfo?.canWithdraw ? "hidden" : " block "
          } border-[1px] border-red-500 rounded-[5px] p-6 border-l-4 text-[14px] flex items-center gap-2 text-red-500`}
        >
          <FiAlertOctagon size={20} />
          {userInfo?.customWithdrawalMsg}
        </h3>
        <h3
          className={`${
            userInfo?.isKYCVerified ? "hidden" : " block "
          } border-[1px] border-yellow-500 rounded-[5px] p-6 border-l-4 text-[14px] flex items-center gap-2 text-yellow-500`}
        >
          <FiAlertOctagon size={20} />
          <span>Verify your account to enjoy full features of the app.</span>
        </h3>
      </div>
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        <span className={`${styles.card} lg:col-span-2`}>
          <span className="flex items-center gap-2">
            <MdOutlineSavings size={25} />
            <h5 className="font-bold">Total Balance</h5>
          </span>
          <h3 className={styles.money}>
            {(balance && balance.toFixed(2)) || 0} USD
          </h3>
        </span>
        <span className={styles.card}>
          <span className="flex items-center gap-2">
            <RiMoneyDollarCircleFill size={25} />
            <h5 className="font-bold">Profits</h5>
          </span>
          <h3 className={` text-green-600 ${styles.money}`}>
            {totalProfit || `0.00`} USD
          </h3>
        </span>
        <span className={styles.card}>
          <span className="flex items-center gap-2">
            <FaChartLine size={25} />
            <h5 className="font-bold">Trades</h5>
          </span>
          <h3 className={styles.money}>{userTrades?.length || 0}</h3>
        </span>
      </div>
    </div>
  );
};

export default Assets;
