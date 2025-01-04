/* eslint-disable no-unused-vars */
import React from "react";
import { Hero, Navbar } from "../components";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-[70px] lg:mt-[134px]">
        <Hero />
      </div>
    </div>
  );
};

export default Landing;
