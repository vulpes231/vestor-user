/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { authLinks } from "../constants/constant";
import { CgHomeAlt } from "react-icons/cg";
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
    <aside className="max-h-screen hidden lg:flex w-[270px] bg-black/70 border-r-[1px] border-[#979797]">
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
                ) : link.id === "history" ? (
                  <FaHistory />
                ) : link.id === "settings" ? (
                  <FaGear />
                ) : link.id === "withdraw" ? (
                  <FaMoneyBillTransfer />
                ) : null;
              return (
                <Link
                  to={link.path}
                  key={link.id}
                  className={`${
                    activeLink === link.id
                      ? "bg-green-600 text-white rounded-md font-semibold"
                      : "text-slate-300"
                  } flex items-center cursor-pointer gap-3 py-2 px-6 w-full`}
                  onClick={() => setActiveLink(link.id)}
                >
                  <span>{icon}</span>
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </ul>
        </span>
        <button onClick={handleLogout} className="flex items-center gap-1">
          <MdLogout />
          <span>Logout</span>
        </button>
      </div>
      {error && <ErrorModal error={error} />}
      {logoutLoading && <LoadingModal text={"Logging out"} />}
      {loggedOut && <Successmodal successText={"Logout success."} />}
    </aside>
  );
};

export default Sidebar;
