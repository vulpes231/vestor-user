/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section>
      <div>
        <Link>open an account</Link>
      </div>
      <div>
        <span>
          <h3>who are we</h3>
          <p>
            From the early days of open outcry to introducing Java to Wall
            Street, from pioneering options trading for retail investors to
            building tastylive, the tastytrade team is among the most
            experienced in the industry.
          </p>
          <Link>learn more</Link>
        </span>
        <figure>
          <img src="" alt="help" />
        </figure>
      </div>
    </section>
  );
};

export default About;
