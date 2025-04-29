/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { authLinks } from "../constants/constant";
import { CgChart, CgHomeAlt, CgTrending } from "react-icons/cg";
import { MdHistoryEdu } from "react-icons/md";
import { FaGear, FaMoneyBillTransfer, FaPiggyBank } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, resetLogout } from "../features/userSlice";
import ErrorModal from "./ErrorModal";
import LoadingModal from "./LoadingModal";
import Successmodal from "./Successmodal";
import { FaHistory } from "react-icons/fa";

const Sidebar = ({ activeLink, setActiveLink }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const { logoutLoading, logoutError, loggedOut } = useSelector(
    (state) => state.user
  );

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (logoutError) {
      setError(logoutError);
    }
  }, [logoutError]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        setError("");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  useEffect(() => {
    let timeout;
    if (loggedOut) {
      timeout = setTimeout(() => {
        sessionStorage.clear();
        dispatch(resetLogout());
        window.location.href = "/signin";
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [loggedOut, dispatch]);

  return (
    <aside className="max-h-screen hidden lg:flex w-[270px] bg-black/40 backdrop-blur-md border-r border-gray-700 shadow-lg">
      <div className="flex flex-col justify-between h-full p-6 w-full overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-10">
          <Logo
            customClass={"flex items-center gap-2 text-white text-xl font-bold"}
          />
          <ul className="flex flex-col gap-4 w-full">
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
                  className={`flex items-center gap-4 py-3 px-5 rounded-lg transition-all duration-300
                    ${
                      activeLink === link.id
                        ? "bg-green-500 text-white font-semibold shadow-md"
                        : "text-gray-300 hover:bg-green-600 hover:text-white"
                    }`}
                  onClick={() => setActiveLink(link.id)}
                >
                  {icon}
                  <span className="capitalize">{link.name}</span>
                </Link>
              );
            })}
          </ul>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition-all duration-300"
        >
          <MdLogout size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* Modals */}
      {error && <ErrorModal error={error} />}
      {logoutLoading && <LoadingModal text={"Logging out"} />}
      {loggedOut && <Successmodal successText={"Logout success."} />}
    </aside>
  );
};

export default Sidebar;
