/* eslint-disable no-unused-vars */
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { bitcoin, eth, tether } from "../assets";
import { styles } from "../constants/styles";

// Chart.js imports (for version 3+)
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register necessary components in Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

// Dummy balances for demonstration (replace with actual data)
const balances = {
  bitcoin: 100,
  tether: 123,
  ethereum: 209,
};

const acceptedCoins = [
  {
    id: 1,
    name: "bitcoin",
    shortName: "btc",
    img: bitcoin,
    balance: balances.bitcoin,
  },
  {
    id: 2,
    name: "tether",
    shortName: "usdt",
    img: tether,
    balance: balances.tether,
  },
  {
    id: 3,
    name: "ethereum",
    shortName: "eth",
    img: eth,
    balance: balances.ethereum,
  },
];

const data = {
  labels: acceptedCoins.map((coin) => coin.shortName.toUpperCase()),
  datasets: [
    {
      data: acceptedCoins.map((coin) => coin.balance),
      backgroundColor: ["#F7931A", "#26A17B", "#3C3C3D"],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          const coin = acceptedCoins[tooltipItem.dataIndex];
          return `${coin.shortName.toUpperCase()}: ${tooltipItem.raw} ${
            coin.shortName
          }`;
        },
      },
    },
  },
};

const Dashwallet = () => {
  return (
    <div className="bg-stone-900 bg-opacity-40">
      <span className="flex justify-between items-start p-6">
        <h3 className={`${styles.dashTitle}`}>my wallet</h3>
        {/* Coin List */}
        <ul className="flex flex-col gap-2">
          {acceptedCoins.map((coin) => {
            return (
              <li
                key={coin.id}
                className="flex items-center gap-6 justify-between text-slate-400"
              >
                <div className="flex gap-1">
                  <img
                    src={coin.img}
                    alt={coin.name}
                    className={
                      coin.shortName === "eth" ? "w-[15px]" : "w-[20px]"
                    }
                  />
                  <span className="uppercase text-[14px] flex gap-2">
                    {coin.shortName}
                  </span>
                </div>
                <span className="text-end">${coin.balance.toFixed(2)}</span>
              </li>
            );
          })}
        </ul>
      </span>
      {/* Doughnut Chart */}
      <div className="w-full max-w-[250px] mx-auto">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default Dashwallet;
