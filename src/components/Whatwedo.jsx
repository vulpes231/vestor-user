/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { insp, secure, tech } from "../assets";

const customStyles = {
  card: "flex flex-col md:flex-row items-center justify-center gap-6",
  img: "w-[200px] bg-black h-full w-full p-2 rounded-full",
  miniCard:
    "flex flex-col items-center justify-center gap-3 w-full md:w-[50%] md:items-start md:justify-start",
  figure: "bg-green-100 w-[200px] h-[200px] rounded-full  w-full md:w-[50%]",
  title: "font-bold uppercase text-3xl",
  button: "bg-green-600 text-white px-8 py-3",
  info: "text-center md:text-start text-sm font-light",
};

const Whatwedo = () => {
  return (
    <section className="bg-white text-slate-800 ">
      <div className="px-6 py-20 flex flex-col gap-6 lg:max-w-[1100px] lg:mx-auto">
        <div className="flex flex-col items-center justify-center gap-4">
          <span className="flex flex-col items-center justify-center w-full uppercase font-bold lg:flex-row gap-1 text-5xl ">
            <p className="flex items-center">
              stocks <span className="hidden md:flex text-green-600">/</span>
            </p>{" "}
            <p className="flex items-center">
              options <span className="hidden md:flex text-green-600">/</span>{" "}
            </p>{" "}
            <p className="flex items-center">
              futures <span className="hidden md:flex text-green-600">/</span>{" "}
            </p>{" "}
            crypto
          </span>
          <p className="font-bold text-2xl text-center">
            You deserved a better investment plan.
          </p>
        </div>
        <div className="md:shadow-lg shadow-slate-800 p-2 md:p-10 lg:p-20 flex flex-col gap-10 relative">
          <div className="flex flex-col gap-6 ">
            <div className="flex flex-col gap-6 md:flex-row">
              <article className="w-full md:w-[50%] ">
                <span className="flex flex-col items-center justify-center md:justify-start md:items-start gap-4">
                  <h3 className="text-4xl font-bold uppercase">pricing</h3>
                  <p className="text-sm text-center md:text-left">
                    Our revolutionary low rates make for easier{" "}
                    <br className="hidden md:flex" /> trading decisions.*
                    <Link className="underline">See how we compare</Link>{" "}
                    against other brokers.
                  </p>
                  <Link className={customStyles.button}>learn more</Link>
                </span>
              </article>
              {/* <article className="hidden md:flex flex-col gap-4 absolute top-0 bg-green-600 right-0 h-[300px]">
                <h3>closing trade</h3>
                <p>$0.00</p>
                <small>Commision</small>
              </article> */}
            </div>
            <small className="w=[75%] text-center text-slate-400 mt-10">
              * Futures trades are $1.25 to open/close. Some additional
              applicable fees will be charged on both opening and closing trades
              for all products.
            </small>
          </div>
          <hr />
          <div className={`${customStyles.card} pt-20`}>
            <figure className={customStyles.figure}>
              <img className={customStyles.img} src={tech} alt="technology" />
            </figure>
            <span className={customStyles.miniCard}>
              <h3 className={customStyles.title}>technology</h3>
              <p className={customStyles.info}>
                See it. Click it. Trade it. Our intuitive platform makes it easy
                to create and adjust orders with just a couple clicks.
              </p>
              <Link className={customStyles.button}>learn more</Link>
            </span>
          </div>
          <div className={`${customStyles.card} md:flex-row-reverse`}>
            <figure className={customStyles.figure}>
              <img className={customStyles.img} src={insp} alt="inspiration" />
            </figure>
            <span className={customStyles.miniCard}>
              <h3 className={customStyles.title}>inspiration</h3>
              <p className={customStyles.info}>
                See what other traders are doing, and come up with your own
                great ideas right inside our platform. All for free!
              </p>
              <Link className={customStyles.button}>learn more</Link>
            </span>
          </div>{" "}
          <div className={customStyles.card}>
            <figure className={customStyles.figure}>
              <img className={customStyles.img} src={secure} alt="technology" />
            </figure>
            <span className={customStyles.miniCard}>
              <h3 className={customStyles.title}>security</h3>
              <p className={customStyles.info}>
                Your safety and privacy are our top priority, and we safeguard
                your account with a high standard of data encryption and
                real-time monitoring.
              </p>
              <Link className={customStyles.button}>learn more</Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Whatwedo;
