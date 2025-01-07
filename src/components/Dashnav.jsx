/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { CgLogOff, CgMenu, CgSupport } from "react-icons/cg";
import { MdChat } from "react-icons/md";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const authLinks = [
  {
    id: 1,
    name: "dashboard",
    path: "/dashboard",
  },
  {
    id: 2,
    name: "invest",
    path: "/invest",
  },
  {
    id: 3,
    name: "transactions",
    path: "/transactions",
  },
  {
    id: 4,
    name: "settings",
    path: "/settings",
  },
  {
    id: 5,
    name: "profile",
    path: "/profile",
  },
];

const supportLinks = [
  {
    id: 1,
    name: "chat",
    path: "/chat",
  },
  {
    id: 2,
    name: "help",
    path: "/help",
  },
];

const Dashnav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [active, setActive] = useState("dashboard");

  const handleLink = () => {
    setShowMenu((prev) => !prev);
  };
  return (
    <header className="fixed top-0 w-full bg-stone-900 h-[70px]">
      <nav className="flex gap-1 justify-between items-center p-4">
        <div className="flex items-center gap-10">
          <Logo customClass={"flex items-center"} />
          <div className="hidden md:flex items-center gap-3 text-[12px] uppercase font-medium">
            {authLinks.map((link) => {
              return (
                <Link
                  onClick={() => setActive(link.name)}
                  className={active === link.name ? "text-green-600" : ""}
                  key={link.id}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        <button
          className="cursor-pointer bg-stone-600 py-1.5 px-5 rounded-md capitalize text-sm md:hidden"
          onClick={handleLink}
        >
          {active}
        </button>
        {/* mobile menu */}
        <div
          className={`${
            showMenu ? "fixed top-[70px] left-0 " : "hidden"
          } bg-stone-700 w-full flex flex-col md:hidden`}
        >
          {authLinks.map((link) => {
            return (
              <button
                className="capitalize border-b border-stone-500 p-3 flex items-center justify-center"
                onClick={() => {
                  setActive(link.name);
                  setShowMenu(false);
                }}
                key={link.id}
              >
                {link.name}
              </button>
            );
          })}
        </div>
        <div className="md:flex items-center gap-6 text-md hidden ">
          {supportLinks.map((link) => {
            const icon = link.name === "chat" ? <MdChat /> : <CgSupport />;
            return (
              <Link
                className="flex items-center gap-1 capitalize"
                key={link.id}
              >
                <span>{link.name}</span>
                <span>{icon}</span>
              </Link>
            );
          })}
          <button className="flex items-center gap-1">
            <span>Signout</span>
            <CgLogOff />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Dashnav;
