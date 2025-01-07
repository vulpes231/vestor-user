/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { MdHelp } from "react-icons/md";
import Logo from "../components/Logo";
import { styles } from "../constants/styles";

const customStyles = {
  input:
    "py-2 px-4 bg-stone-700 text-white border-none focus:outline-green-700 outline-none focus:border-none placeholder:text-xs w-full",
};

const Identification = () => {
  const [form, setForm] = useState({
    employment: "",
    tax: "",
    dob: "",
    marital: "",
  });

  const [taxExempt, setTaxExempt] = useState("no");

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const userInfoString = sessionStorage.getItem("personal");
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
  // console.log(userInfo);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };
  return (
    <section>
      <div className="border-b border-zinc-600">
        <nav className=" flex justify-between items-center px-10 py-4 lg:max-w-[1200px] lg:mx-auto">
          <Logo customClass={"flex items-center"} />
          <span className="cursor-pointer">
            <MdHelp size={25} />
          </span>
        </nav>
      </div>
      <div className="p-4 flex flex-col gap-10 w-full md:max-w-[600px] md:mx-auto">
        <span className="flex flex-col gap-2">
          <p className="uppercase text-sm text-slate-300">personal info</p>
          <h2 className="capitalize text-2xl">Identity information</h2>
        </span>
        <form action="" className="flex flex-col gap-6">
          <div>
            <div>
              <label htmlFor="">employment status</label>
              <select name="">
                <option value="">select</option>
                <option value="employed">employed</option>
                <option value="retired">retired</option>
                <option value="student">student</option>
                <option value="undemployed">unemployed</option>
              </select>
            </div>
            <div>
              <label htmlFor="">marital status</label>
              <select name="">
                <option value="">select</option>
                <option value="single">single</option>
                <option value="married">married</option>
                <option value="divorced">divorced</option>
                <option value="widowed">widowed</option>
              </select>
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="">ID Number</label>
              <input type="text" placeholder="ID Number" />
            </div>
            <div>
              <label htmlFor="">date of birth</label>
              <input type="date" />
            </div>
          </div>
          <div className="flex flex-col gap-1 lg:flex-row lg:justify-between w-full">
            <p className="w-full">Are you subject to backup tax withholding?</p>
            <span className="flex items-center w-full lg:justify-end">
              <button
                onClick={() => setTaxExempt("yes")}
                type="button"
                className={`w-full lg:w-[100px] p-2 ${
                  taxExempt === "yes" ? "bg-green-600" : "bg-stone-600"
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => setTaxExempt("no")}
                type="button"
                className={`w-full lg:w-[100px] p-2 ${
                  taxExempt === "no" ? "bg-green-600" : "bg-stone-600"
                }`}
              >
                No
              </button>
            </span>
          </div>
          <hr className="border border-stone-500" />
          <small className="text-[11px] text-slate-300">
            Federal law requires financial institutions to obtain, verify, and
            record information that identifies each person who opens an account
            to help fight the funding of terrorism and money laundering
            activities. Therefore, we will ask you for your name, address, date
            of birth, and other personal information to identify you. We may
            also utilize a third-party information provider and/or service for
            verification purposes and reserve the right to ask you for a copy of
            your driver&apos;s license or other identifying documents.
          </small>
          <button className="p-2 w-full bg-green-600">Next</button>
        </form>
      </div>
    </section>
  );
};

export default Identification;
