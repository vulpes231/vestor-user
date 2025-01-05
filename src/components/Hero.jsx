/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { market, stock } from "../assets";

const Hero = () => {
  return (
    <section className="">
      <div className="bg-slate-200 flex items-start justify-between w-full h-[450px] overflow-hidden">
        <figure className="hidden lg:flex w-[20%] rounded-tr-3xl mt-5 -ml-16 ">
          <img src={stock} alt="" className="block w-full " />
        </figure>
        <div className="bg-green-600 text-white flex items-center justify-center flex-col gap-6 p-6 w-full lg:w-[50%] h-full">
          <h2 className="uppercase text-2xl lg:text-4xl font-extrabold">
            join the club, genius
          </h2>
          <ul className="flex flex-col items-center text-sm font-light list-disc gap-1.5 lg:text-lg">
            <li>Low rates and capped commissions*</li>
            <li>Cutting edge risk analysis tools</li>
            <li>Unscripted support. No upsells</li>
            <li>
              Get started with a{" "}
              <Link to={"/signup"} className="underline">
                new account bonus
              </Link>
            </li>
          </ul>
          <Link className="bg-black text-white py-3 px-7 uppercase font-bold rounded-3xl">
            see our pricing
          </Link>
          <small className="text-center text-xs font-light w-[75%]">
            *Exchange, clearing, and regulatory fees still apply for all opening
            and closing trades. All futures options and the following index
            products are excluded from the capped commission offer: SPX, RUT,
            VIX, OEX, XEO, DJX, XSP, CBTX, and MBTX.
          </small>
        </div>
        <figure className="hidden lg:flex w-[20%] mt-5 -mr-16 rounded-tl-3xl">
          <img src={market} alt="" className="block w-full" />
        </figure>
      </div>
      <div className="flex items-center justify-center bg-black p-20">
        <Link
          to={"/signup"}
          className="bg-white py-4 lg:py-6 px-10 text-black uppercase font-bold text-lg lg:text-xl rounded-3xl whitespace-nowrap"
        >
          open an account
        </Link>
      </div>
    </section>
  );
};

export default Hero;
