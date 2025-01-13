/* eslint-disable no-unused-vars */
import React from "react";

const changePassStyle = {
  formHolder: "flex flex-col gap-1",
  input: "bg-transparent p-2 outline-none border border-stone-500",
};

const Changepass = () => {
  return (
    <div className="bg-stone-900 bg-opacity-40 p-6 border border-stone-600">
      <form action="" className="flex flex-col gap-6 ">
        <div className={changePassStyle.formHolder}>
          <label htmlFor="">Current password</label>
          <input className={changePassStyle.input} type="password" />
        </div>
        <div className={changePassStyle.formHolder}>
          <label htmlFor="">New password</label>
          <input className={changePassStyle.input} type="password" />
        </div>
        <div className={changePassStyle.formHolder}>
          <label htmlFor="">Confirm New password</label>
          <input className={changePassStyle.input} type="password" />
        </div>
        <button className="p-2 border-none bg-green-600 text-white rounded-3xl">
          Change password
        </button>
      </form>
    </div>
  );
};

export default Changepass;
