/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import { styles } from "../constants/styles";
import { loginbg } from "../assets";

const Signin = () => {
  const year = new Date().getFullYear();
  useEffect(() => {
    document.title = "Vestor - Login";
  }, []);
  return (
    <div className="bg-black text-slate-100 h-screen">
      <div className="flex flex-col md:flex-row-reverse md:items-center h-full">
        <div className="flex flex-col gap-6 p-8 w-full md:w-[30%]">
          <Logo customClass={"flex items-center gap-1"} />
          <form action="" className="flex flex-col gap-4">
            <div className={styles.formHolder}>
              <label htmlFor="" className={styles.label}>
                Email address <span className={styles.formSpan}>*</span>
              </label>
              <input
                className={styles.input}
                type="text"
                placeholder="Email address"
              />
            </div>
            <div className={styles.formHolder}>
              <label htmlFor="" className={styles.label}>
                Password <span className={styles.formSpan}>*</span>
              </label>
              <input
                className={styles.input}
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                // className="bg-zinc-800 outline-none border border-zinc-700"
              />
              <small>Remember Me</small>
            </div>
            <button className="bg-green-600 text-slate-100 p-2 font-bold rounded-sm">
              Sign In
            </button>
            <Link className={styles.formLink}>Forgot Password?</Link>
          </form>
          <div className="flex flex-col gap-1">
            <p>Need a vestor account?</p>
            <Link className={styles.formLink}>Sign up now! </Link>
          </div>
          <div className="lg:mt-20">
            <small className="text-[10px]">
              &copy; {year} Vestor, Inc. Copyrights, logos, and trademarks are
              property of Vestor, Inc. <br className="md:hidden" />
              All rights reserved. Vestor, Inc., member FINRA | SIPC | NFA
            </small>
          </div>
        </div>
        <div className="w-full md:w-[70%] flex items-center h-full bgImg"></div>
      </div>
    </div>
  );
};

export default Signin;
