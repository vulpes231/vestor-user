/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { authLinks } from "../constants/constant";
import { Link } from "react-router-dom";
import { CgChart, CgHomeAlt, CgTrending } from "react-icons/cg";
import { MdHistoryEdu } from "react-icons/md";
import { FaGear, FaMoneyBillTransfer, FaPiggyBank } from "react-icons/fa6";

const Mobilenav = ({ activeLink, setActiveLink }) => {
  return (
    <nav className="lg:hidden w-full bg-black bg-opacity-80 text-white h-[70px] bottom-0 left-0 fixed flex items-center justify-center z-50">
      <ul className="flex items-center justify-evenly w-full">
        {authLinks.map((link) => {
          const icon =
            link.id === "dashboard" ? (
              <CgHomeAlt size={20} />
            ) : link.id === "wallet" ? (
              <FaPiggyBank size={20} />
            ) : link.id === "portfolio" ? (
              <CgTrending size={20} />
            ) : link.id === "history" ? (
              <CgChart size={20} />
            ) : link.id === "withdraw" ? (
              <FaMoneyBillTransfer size={20} />
            ) : null;
          return (
            <Link
              to={link.path}
              key={link.id}
              className={`${
                activeLink === link.id ? "text-green-600" : "text-slate-400"
              } flex flex-col items-center cursor-pointer`}
              onClick={() => setActiveLink(link.id)}
            >
              <span>{icon}</span>
              <span className="text-[10px] capitalize">{link.name}</span>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default Mobilenav;
