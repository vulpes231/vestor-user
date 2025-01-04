/* eslint-disable no-unused-vars */
import React from "react";
import { MdMenu } from "react-icons/md";
import { logo } from "../assets";
import { Link } from "react-router-dom";
import { styles } from "../constants/styles";

const navLinks = [
  {
    id: 1,
    name: "why vestor",
    sublinks: ["why choose us", "how we compare", "who we are"],
  },
  {
    id: 2,
    name: "pricing",
    sublinks: ["pricing", "commission and fees"],
  },
  {
    id: 3,
    name: "trading services",
    sublinks: ["stocks", "options", "futures", "crypto"],
  },
  {
    id: 4,
    name: "account",
    sublinks: ["account types", "how to fund"],
  },
];

const Navbar = () => {
  return (
    <header className="fixed top-0 z-[10] h-[134px] w-full">
      <nav>
        <div className="hidden lg:flex justify-end bg-zinc-700 py-3 px-10 lg:px-32">
          <span className="flex items-center gap-6 uppercase font-medium text-slate-100">
            <Link className={styles.link}>log in</Link>
            <Link className={styles.link}>help center</Link>
            <Link className={`bg-green-600 py-2 px-4 ${styles.link}`}>
              open an account
            </Link>
          </span>
        </div>
        <div className="flex items-center justify-between bg-white shadow-sm py-4 px-10 lg:px-32">
          <span className="lg:hidden">
            <MdMenu className={styles.icon} />
          </span>
          <div className="flex items-center justify-center">
            <img src={logo} alt="logo" className="w-[30px] block" />
            <h1 className="font-bold text-3xl">
              <span className="text-green-600">ves</span>tor
            </h1>
          </div>
          <span className="hidden lg:flex gap-6 text-sm font-bold">
            {navLinks.map((link) => (
              <Link className={styles.linkText} key={link.id}>
                {link.name}
              </Link>
            ))}
          </span>
          <span className="lg:hidden"></span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
