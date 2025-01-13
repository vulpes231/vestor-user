/* eslint-disable no-unused-vars */
import React from "react";

const style = {
  span: "flex justify-between items-center",
};

const Investstat = () => {
  return (
    <div className=" p-6 flex flex-col gap-5 ">
      <h3 className="text-lg capitalize ">My Stats</h3>
      <div className="capitalize font-light text-xs">
        <span className={style.span}>
          <p>total investment</p>
          <p>$0.00</p>
        </span>
        <span className={style.span}>
          <p>total profit</p>
          <p>$0.00</p>
        </span>
        <span className={style.span}>
          <p>total loss</p>
          <p>$0.00</p>
        </span>
      </div>
      <span className={`text-green-600 font-semibold capitalize ${style.span}`}>
        <p>overall profit</p>
        <p>$0.00</p>
      </span>
      <small className="text-slate-400 text-xs">
        Options involve risk and are not suitable for all investors as the
        special risks inherent to options trading may expose investors to
        potentially significant losses.{" "}
      </small>
    </div>
  );
};

export default Investstat;
