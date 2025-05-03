/* eslint-disable no-unused-vars */
import React from "react";
import Logo from "./Logo";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-stone-500 bg-stone-950 w-full">
      <div className="p-6 flex flex-col gap-6 lg:flex-row lg:max-w-[1200px] lg:mx-auto lg:items-start">
        <div className="flex flex-col gap-6 text-[10px] w-full lg:w-[90%]">
          <p>
            vestor&apos;s website and brokerage services are not intended for
            persons of any jurisdiction where vestor is not authorized to do
            business or where such products and other services offered by the
            tastytrade would be contrary to the securities regulations, futures
            regulations or other local laws and regulations of that
            jurisdiction. Options involve risk and are not suitable for all
            investors as the special risks inherent to options trading may
            expose investors to potentially significant losses.{" "}
          </p>
          <p>
            Futures accounts are not protected by the Securities Investor
            Protection Corporation (SIPC). All customer futures accounts
            positions and cash balances are segregated by Apex Clearing
            Corporation. Futures and futures options trading is speculative and
            is not suitable for all investors.
          </p>
          <p>
            Cryptocurrency transaction and custody services are powered by Zero
            Hash LLC and Zero Hash Liquidity Services LLC. Cryptocurrency assets
            are held and custodied by Zero Hash LLC, not tastytrade. Services
            may not be available in all states. Zero Hash LLC and Zero Hash
            Liquidity Services are licensed to engage in Virtual Currency
            Business Activity by the New York State Department of Financial
            Services. Cryptocurrency assets are not subject to Federal Deposit
            Insurance Corporation (FDIC) or Securities Investor Protection
            Corporation (SIPC) coverage. Cryptocurrency trading is not suitable
            for all investors due to the number of risks involved. The value of
            any cryptocurrency, including digital assets pegged to fiat
            currency, commodities, or any other asset, may go to zero.
          </p>
        </div>
        <div className="text-[10px] flex flex-col w-full lg:w-[25%]">
          <Logo customClass={"flex items-center"} />
          <h3 className="font-bold text-lg">
            &copy; {year} vestor. All rights reserved.
          </h3>
          <span>
            Copyrights, logos, and trademarks are property of Vestor, Inc. All
            rights reserved. Vestor, Inc., member
          </span>
          <span>FINRA | SIPC | NFA</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
