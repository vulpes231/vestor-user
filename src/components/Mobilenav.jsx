/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { authLinks } from "../constants/constant";
import { Link } from "react-router-dom";
import { CgHomeAlt } from "react-icons/cg";
import { MdHistoryEdu } from "react-icons/md";
import { FaGear, FaPiggyBank } from "react-icons/fa6";

const Mobilenav = () => {
  return (
    <nav className="md:hidden w-full bg-stone-900 text-white h-[70px] bottom-0 left-0 fixed flex items-center justify-center">
      <ul className="flex items-center justify-evenly w-full">
        {authLinks.map((link) => {
          const icon =
            link.id === "dashboard" ? (
              <CgHomeAlt size={20} />
            ) : link.id === "wallet" ? (
              <FaPiggyBank size={20} />
            ) : link.id === "portfolio" ? (
              <MdHistoryEdu size={20} />
            ) : link.id === "settings" ? (
              <FaGear size={20} />
            ) : null;
          return (
            <Link
              to={link.path}
              key={link.id}
              className="flex flex-col items-center cursor-pointer"
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
