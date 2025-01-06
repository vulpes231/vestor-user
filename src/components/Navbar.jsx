/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import { styles } from "../constants/styles";
import Logo from "./Logo";

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
    name: "accounts",
    sublinks: ["account types", "how to fund"],
  },
];

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <header className="fixed top-0 z-[10] h-[134px] w-full lg:shadow-md">
      <nav>
        <div className="hidden lg:flex justify-end bg-zinc-700 py-3 px-10 lg:px-32">
          <span className="flex items-center gap-6 uppercase font-medium text-slate-100">
            <Link to={"/signin"} className={styles.link}>
              log in
            </Link>
            <Link className={styles.link}>help center</Link>
            <Link
              to={"/signup"}
              className={`bg-green-600 py-2 px-4 ${styles.link} hover:text-slate-100 hover:bg-green-700`}
            >
              open an account
            </Link>
          </span>
        </div>
        <div className="flex items-center justify-between bg-white shadow-sm py-4 px-10 lg:px-32">
          <span
            onClick={() => setToggle((prev) => !prev)}
            className="lg:hidden"
          >
            {!toggle ? <MdMenu size={30} /> : <MdClose size={30} />}
          </span>
          <Logo customClass={"flex items-center justify-center"} />
          <span className="hidden lg:flex gap-6 text-sm font-bold">
            {navLinks.map((link) => (
              <Link className={styles.linkText} key={link.id}>
                {link.name}
              </Link>
            ))}
          </span>
          <span className="lg:hidden"></span>
        </div>
        {/* mobile menu */}
        <div
          className={
            toggle
              ? "absolute top-0 w-full h-screen bg-black text-white mt-[70px] p-6 flex flex-col gap-6 uppercase font-bold md:hidden"
              : "hidden"
          }
        >
          {navLinks.map((link) => {
            return <div key={link.id}>{link.name}</div>;
          })}
          <Link to={"/signin"}>log in</Link>
          <Link to={"/signup"}>open an account</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
