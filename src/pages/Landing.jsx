/* eslint-disable no-unused-vars */
import React from "react";
import { About, Footer, Hero, Navbar, Whatwedo } from "../components";
import Review from "./Review";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-[70px] lg:mt-[134px]">
        <Hero />
        <Whatwedo />
        <Review />
        <About />
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
