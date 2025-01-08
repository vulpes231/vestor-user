/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { authLinks } from "../constants/constant";
import { CgHomeAlt } from "react-icons/cg";
import { MdHistoryEdu } from "react-icons/md";
import { FaGear, FaPiggyBank } from "react-icons/fa6";

const Sidebar = ({ activeLink, setActiveLink }) => {
  return (
    <aside className="max-h-screen hidden lg:flex w-[270px] ">
      <div className="flex flex-col justify-between h-full p-4 w-full">
        <span className="flex gap-6 flex-col ">
          <Logo customClass={"flex items-center gap-1"} />
          <ul className="flex flex-col gap-4 capitalize w-full">
            {authLinks.map((link) => {
              const icon =
                link.id === "dashboard" ? (
                  <CgHomeAlt />
                ) : link.id === "wallet" ? (
                  <FaPiggyBank />
                ) : link.id === "portfolio" ? (
                  <MdHistoryEdu />
                ) : link.id === "settings" ? (
                  <FaGear />
                ) : null;
              return (
                <Link
                  to={link.path}
                  key={link.id}
                  className={`${
                    activeLink === link.id
                      ? "bg-green-600 text-white"
                      : "text-slate-400"
                  } flex items-center cursor-pointer gap-3 p-2 w-full`}
                  onClick={() => setActiveLink(link.id)}
                >
                  <span>{icon}</span>
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </ul>
        </span>
        <span className="flex items-center gap-1">
          <MdLogout />
          <button>Logout</button>
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;
