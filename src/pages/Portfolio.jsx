/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Trades } from "../components";
import { FaSignal, FaUserLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../constants/constant";
import {
  getActiveTradeCount,
  getTotalProfit,
  getUserTrades,
} from "../features/tradeSlice";
import { getUserInfo } from "../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { getUserWallets } from "../features/walletSlice";
import { getAvailableAssets } from "../features/assetSlice";
import { PiChartLineDownThin, PiChartLineUpLight } from "react-icons/pi";
import { motion } from "framer-motion";

const portFolioStyle = {
  title: "font-bold text-lg whitespace-nowrap",
  icon: "w-6 h-6",
  td: "text-[13px] font-normal lg:text-[14px] text-[#fff]/70 px-4 py-3",
  th: "text-[13px] font-semibold lg:text-[14px] capitalize px-4 py-3",
};

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

const myButtons = [
  {
    id: "crypto",
    name: "crypto",
  },
  {
    id: "stocks",
    name: "stocks",
  },
];

const Portfolio = ({ setActive }) => {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeSection, setActiveSection] = useState("crypto");
  const [assetSymbol, setAssetSymbol] = useState("");

  // const { activeTradeCount, userTrades } = useSelector((state) => state.trade);
  const { userInfo } = useSelector((state) => state.user);

  const { assets } = useSelector((state) => state.asset);

  const itemsPerPage = 15;

  const totalPages = Math.ceil(assets.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAssets =
    assets && assets.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (accessToken) {
      // dispatch(getActiveTradeCount());
      // dispatch(getUserTrades());
      dispatch(getUserInfo());
      dispatch(getAvailableAssets());
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    setActive("portfolio");
    document.title = "Vestor - Markets";
  }, [setActive]);

  if (userInfo && !userInfo.isKYCVerified) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 flex flex-col gap-6 items-center justify-center bg-gray-900 rounded-xl text-center min-h-screen"
      >
        <div className="p-4 bg-red-500/20 rounded-full">
          <FaUserLock className="w-12 h-12 text-red-500" />
        </div>
        <h3 className="text-2xl font-semibold text-white">
          Account Verification Required
        </h3>
        <p className="text-gray-400 max-w-md">
          Your account needs to be verified before you can withdraw funds. This
          helps us ensure the security of your transactions.
        </p>
        <Link
          to="/settings"
          className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-medium text-white transition-colors"
        >
          Complete Verification
        </Link>
      </motion.div>
    );
  }

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // const goToAssetInfo = () => {
  //   navigate(`/asset`);
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 space-y-8 mb-[70px] lg:mb-0">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-white">Portfolio</h1>
        <p className="text-gray-400"> Get access to trending markets</p>
        <div className="flex items-center gap-4">
          {myButtons.map((btn) => {
            return (
              <button
                onClick={() => setActiveSection(btn.id)}
                className={`${
                  activeSection === btn.id
                    ? "bg-green-600 text-[#fff]"
                    : "text-green-500 border-[1px] border-green-500"
                } w-[89px] h-[38px] rounded-[5px] capitalize`}
                key={btn.id}
              >
                {btn.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="w-full overflow-x-auto  shadow-lg rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-cyan-400/30 transition-all">
        <table className="w-full min-w-[800px] text-left">
          <thead className="border-b border-slate-700/70 text-gray-400">
            <tr>
              {headers.map((hd) => (
                <th
                  key={hd.id}
                  className="px-4 py-3 text-sm font-semibold capitalize"
                >
                  {hd.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-white">
            {currentAssets && currentAssets.length > 0 ? (
              currentAssets.map((ast) => (
                <tr
                  key={ast._id}
                  className="border-b border-gray-800 hover:bg-[#1e1e1e] transition-all"
                >
                  <td className="px-4 py-4">
                    <div
                      onClick={() => {
                        // setAssetSymbol(ast.symbol);
                        navigate(`/asset/${ast.symbol}`);
                      }}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <img
                        src={ast.img}
                        alt={ast.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex flex-col">
                        <h3 className="font-medium">{ast.name}</h3>
                        <span className="text-xs text-gray-500">
                          {ast.symbol.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 font-semibold">${ast.price}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-semibold ${
                          ast.dailyPercentChange < 0
                            ? "text-red-500"
                            : "text-green-400"
                        }`}
                      >
                        {ast.dailyPercentChange.toFixed(2)}%
                      </span>
                      {ast.dailyPercentChange < 0 ? (
                        <PiChartLineDownThin className="text-red-500" />
                      ) : (
                        <PiChartLineUpLight className="text-green-400" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">${ast.dailyHigh}</td>
                  <td className="px-4 py-4">${ast.dailyLow}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-400">
                  No Assets Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 text-gray-400 text-sm p-6 ">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md bg-[#1e1e1e] hover:bg-[#2c2c2c] disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-md bg-[#1e1e1e] hover:bg-[#2c2c2c] disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
