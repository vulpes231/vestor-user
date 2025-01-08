/* eslint-disable no-unused-vars */
import React from "react";
import { styles } from "../constants/styles";
import { MdOutlineSavings, MdAttachMoney } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";
import { bitcoin, eth, tether } from "../assets";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const acceptedCoins = [
  {
    id: 1,
    name: "bitcoin",
    shortName: "btc",
    img: bitcoin,
  },
  {
    id: 2,
    name: "tether",
    shortName: "usdt",
    img: tether,
  },
  {
    id: 3,
    name: "ethereum",
    shortName: "eth",
    img: eth,
  },
];

const Assets = () => {
  return (
    <section>
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        <span className={`${styles.card} lg:col-span-2`}>
          <span className="flex items-center gap-2">
            <MdOutlineSavings size={25} />
            <h5 className="font-bold">Total Balance</h5>
          </span>
          <h3 className={styles.money}>$10.00</h3>
          <ul className="flex gap-7">
            {acceptedCoins.map((coin) => {
              return (
                <li key={coin.id} className="flex items-center gap-1">
                  <img
                    src={coin.img}
                    alt=""
                    className={
                      coin.shortName === "eth" ? "w-[15px]" : "w-[20px]"
                    }
                  />
                  <span className="uppercase text-[14px] text-slate-400 flex gap-2">
                    <span className="hidden md:flex "> {coin.shortName}</span>{" "}
                    $0.00
                  </span>
                </li>
              );
            })}
          </ul>
        </span>
        <span className={styles.card}>
          <span className="flex items-center gap-2">
            <RiMoneyDollarCircleFill size={25} />
            <h5 className="font-bold">Profits</h5>
          </span>
          <h3 className={` text-green-600 ${styles.money}`}>$0.00</h3>
        </span>
        <span className={styles.card}>
          <span className="flex items-center gap-2">
            <FaChartLine size={25} />
            <h5 className="font-bold">Trades</h5>
          </span>
          <h3 className={styles.money}>0</h3>
          <span className="flex justify-between capitalize text-slate-400">
            <small>open positions 0</small>
            <small>closed position 0</small>
          </span>
        </span>
      </div>
    </section>
  );
};

export default Assets;
