/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { styles } from "../constants/styles";
import { MdOutlineSavings, MdAttachMoney } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";

import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { getAccessToken } from "../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { getBalance } from "../features/walletSlice";

const Assets = () => {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();

  const { balance } = useSelector((state) => state.wallet);

  useEffect(() => {
    if (accessToken) {
      dispatch(getBalance());
    }
  }, [dispatch, accessToken]);
  return (
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
        <h3 className={` text-green-600 ${styles.money}`}>0.00 USD</h3>
      </span>
      <span className={styles.card}>
        <span className="flex items-center gap-2">
          <FaChartLine size={25} />
          <h5 className="font-bold">Trades</h5>
        </span>
        <h3 className={styles.money}>0</h3>
      </span>
    </div>
  );
};

export default Assets;
