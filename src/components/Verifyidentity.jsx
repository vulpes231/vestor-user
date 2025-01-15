/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const identityStyle = {
  formHolder: "flex flex-col gap-1",
  input: "bg-transparent p-2 outline-none border border-stone-500",
  select: "bg-transparent p-2 outline-none border border-stone-500",
};

const Verifyidentity = ({ userInfo }) => {
  // console.log(userInfo);
  const [status, setStatus] = useState("not verified");
  const [form, setForm] = useState({
    idType: "",
    idNumber: "",
    image: "",
  });

  return (
    <div className="bg-stone-900 bg-opacity-40 flex flex-col gap-6 p-6 text-slate-300 border border-stone-600">
      <h3 className="font-bold text-white">Account Verification</h3>
      <p>
        Status:{" "}
        <span
          className={`${
            !userInfo.isKYCVerified
              ? "text-red-500"
              : status == "verification pending"
              ? "text-yellow-500"
              : "text-green-500"
          } capitalize`}
        >
          {userInfo.isKYCVerified ? "verified" : "not verified"}
        </span>
      </p>
      <form action="" className="flex flex-col gap-4">
        <small>Upload a clear image of your government issued ID Card</small>
        <div className={identityStyle.formHolder}>
          <label htmlFor="">ID type</label>
          <select className={identityStyle.select} name="">
            <option value="">Select ID</option>
            <option value="license">Driver License</option>
            <option value="passport">International Passport</option>
            <option value="state">State ID</option>
          </select>
        </div>
        <div className={identityStyle.formHolder}>
          <label htmlFor="">ID Number</label>
          <input
            className={identityStyle.input}
            type="text"
            placeholder="Enter ID Number"
          />
        </div>
        <div className={identityStyle.formHolder}>
          <label htmlFor="">Upload ID Image</label>
          <input className={identityStyle.input} type="file" />
        </div>
        <button className="p-2 border-none bg-green-600 text-white rounded-3xl">
          Verify account
        </button>
      </form>
    </div>
  );
};

export default Verifyidentity;
