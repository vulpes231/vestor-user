/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const Whatwedo = () => {
  return (
    <section>
      <div>
        <h3>
          stocks <span>/</span> options <span>/</span> futures <span>/</span>{" "}
          crypto
        </h3>
        <div className="shadow-lg">
          <div>
            <article>
              <span>
                <h3>pricing</h3>
                <p>
                  Our revolutionary low rates make for easier trading
                  decisions.*
                  <Link className="underline">See how we compare</Link> against
                  other brokers.
                </p>
                <Link>learn more</Link>
              </span>
            </article>
            <small>
              * Futures trades are $1.25 to open/close. Some additional
              applicable fees will be charged on both opening and closing trades
              for all products.
            </small>
          </div>
          <div>
            <figure>
              <img src="" alt="technology" />
            </figure>
            <span>
              <h3>technology</h3>
              <p>
                See it. Click it. Trade it. Our intuitive platform makes it easy
                to create and adjust orders with just a couple clicks.
              </p>
              <Link>learn more</Link>
            </span>
          </div>
          <div>
            <figure>
              <img src="" alt="technology" />
            </figure>
            <span>
              <h3>inspiration</h3>
              <p>
                See what other traders are doing, and come up with your own
                great ideas right inside our platform. All for free!
              </p>
              <Link>learn more</Link>
            </span>
          </div>{" "}
          <div>
            <figure>
              <img src="" alt="technology" />
            </figure>
            <span>
              <h3>security</h3>
              <p>
                Your safety and privacy are our top priority, and we safeguard
                your account with a high standard of data encryption and
                real-time monitoring.
              </p>
              <Link>learn more</Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Whatwedo;
