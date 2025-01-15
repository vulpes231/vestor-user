/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { MdClose } from "react-icons/md";
const modalStyles = {
  input: "border border-stone-600 p-2 outline-none bg-transparent",
  holder: "flex flex-col gap-1",
  label: "text-sm font-light text-slate-400",
};

const Activateplan = ({ planData, close }) => {
  console.log(planData);
  return (
    <section className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-80 z-[1000] p-6 md:p-0">
      <div className="bg-stone-900 border border-stone-600 p-6 w-full md:w-[350px] rounded-lg">
        <span className="flex justify-between items-center mb-8">
          <h3 className="font-bold text-lg md:text-2xl capitalize">
            add invest plan
          </h3>
          <MdClose className="cursor-pointer w-6 h-6" onClick={close} />
        </span>
        <form action="" className="flex flex-col gap-2">
          <div className={modalStyles.holder}>
            <label className={modalStyles.label} htmlFor="">
              Plan
            </label>
            <input
              className={modalStyles.input}
              type="text"
              readOnly
              value={planData?.packageName}
            />
          </div>
          <div className={modalStyles.holder}>
            <label className={modalStyles.label} htmlFor="">
              Yield
            </label>
            <input
              className={modalStyles.input}
              type="text"
              readOnly
              value={`${planData?.yield}%`}
            />
          </div>
          <div className={modalStyles.holder}>
            <label className={modalStyles.label} htmlFor="">
              Duration
            </label>
            <input
              className={modalStyles.input}
              type="text"
              readOnly
              value={`${planData?.period} days`}
            />
          </div>
          <div className={modalStyles.holder}>
            <label className={modalStyles.label} htmlFor="">
              Amount
            </label>
            <input
              className={modalStyles.input}
              type="text"
              placeholder="Enter amount to invest"
            />
          </div>
          <button className="bg-green-600 text-white p-2 rounded-3xl mt-5">
            Invest
          </button>
        </form>
      </div>
    </section>
  );
};

export default Activateplan;
