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
  const [form, setForm] = useState({});

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
          <h2 className="capitalize text-2xl">employment information</h2>
        </span>
        <form action="">
          <div></div>
        </form>
      </div>
    </section>
  );
};

export default Identification;
