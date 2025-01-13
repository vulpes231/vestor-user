/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { bitcoin, tether } from "../assets";
import { TbTransfer } from "react-icons/tb";
import { BiMoneyWithdraw } from "react-icons/bi";
import { PiHandDepositBold } from "react-icons/pi";
import { Deposit, Transactions, Withdraw } from "../components";

const walletStyles = {
  span: "flex items-center gap-1",
  button: "flex items-center gap-1 text-slate-400 text-xs capitalize",
};

const Wallet = ({ setActive }) => {
  const [depositModal, setDepositModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [transferModal, setTransferModal] = useState(false);

  useEffect(() => {
    setActive("wallet");
    document.title = "Vestor - Wallet";
  }, [setActive]);

  return (
    <section className="p-6">
      <div className="flex flex-col gap-10">
        <h3>My Wallets</h3>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-stone-900 bg-opacity-40  flex flex-col gap-4 justify-between">
            <span className="p-6">
              <h3>Deposit wallet</h3>
              <p className="text-4xl">$0.00</p>
            </span>

            <span className="bg-stone-800 p-2 flex items-center gap-6 ">
              <button
                onClick={() => {
                  setDepositModal(true);
                  console.log("depositactive");
                }}
                className={walletStyles.button}
              >
                <PiHandDepositBold /> deposit
              </button>
              <button
                onClick={() => setWithdrawModal(true)}
                className={walletStyles.button}
              >
                {" "}
                <BiMoneyWithdraw /> withdraw
              </button>
            </span>
          </div>
          <div className="bg-stone-900 bg-opacity-40  flex flex-col gap-4 justify-between">
            <span className="p-6">
              <h3>Investment wallet</h3>
              <p className="text-4xl">$0.00</p>
            </span>

            <span className="bg-stone-800 p-2 flex items-center gap-6">
              <button
                onClick={() => setTransferModal(true)}
                className={walletStyles.button}
              >
                {" "}
                <TbTransfer /> transfer
              </button>
              <button
                onClick={() => setWithdrawModal(true)}
                className={walletStyles.button}
              >
                <BiMoneyWithdraw /> withdraw
              </button>
            </span>
          </div>
        </div>
        <div>
          <Transactions />
        </div>
      </div>
      {depositModal && <Deposit setDeposit={setDepositModal} />}
      {withdrawModal && <Withdraw setWithdraw={setWithdrawModal} />}
    </section>
  );
};

export default Wallet;
