/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { broker } from "../assets";

const About = () => {
  return (
    <section className="bg-white text-slate-900">
      <div className="bg-black text-white p-16 flex items-center uppercase justify-center">
        <Link className="py-3 px-10 bg-white text-slate-900 rounded-sm uppercase">
          open an account
        </Link>
      </div>
      <div className="lg:max-w-[1100px] flex flex-col gap-6 lg:mx-auto lg:shadow-lg">
        <div className="flex flex-col md:flex-row md:justify-between">
          <span
            className={`flex flex-col gap-3 lg:w-[65%] items-center justify-center md:items-start md:justify-start p-10`}
          >
            <h3 className={"text-4xl uppercase font-bold"}>who are we</h3>
            <p className="text-center md:text-left">
              From the early days of open outcry to introducing Java to Wall
              Street, <br className="hidden lg:flex" /> from pioneering options
              trading for retail investors to building tastylive,{" "}
              <br className="hidden lg:flex" /> the tastytrade team is among the
              most experienced in the industry.
            </p>
            <Link className="py-3 px-8 bg-green-600 text-white">
              learn more
            </Link>
          </span>
          <figure className="flex items-center justify-center w-full lg:w-[35%]">
            <img src={broker} alt="help" className="block h-full" />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default About;
