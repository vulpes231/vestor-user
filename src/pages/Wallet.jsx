/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { bitcoin, tether } from "../assets";
import { TbTransfer } from "react-icons/tb";
import { BiMoneyWithdraw } from "react-icons/bi";
import { PiHandDepositBold } from "react-icons/pi";
import { Deposit, Transactions, Transfer, Withdraw } from "../components";
import { formatCurrency, getAccessToken } from "../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { getUserWallets } from "../features/walletSlice";

const walletStyles = {
  span: "flex items-center gap-1",
  button: "flex items-center gap-1 text-slate-400 text-xs capitalize",
};

const Wallet = ({ setActive }) => {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();
  const [depositModal, setDepositModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [transferModal, setTransferModal] = useState(false);

  const { userWallets } = useSelector((state) => state.wallet);

  const myWallets =
    userWallets &&
    userWallets.map((wallet) => {
      return (
        <div
          key={wallet._id}
          className="bg-stone-900 bg-opacity-40 flex flex-col"
        >
          <div className="p-6 flex flex-col gap-2">
            <h3 className="font-bold text-slate-400 capitalize">
              {wallet.walletName} wallet
            </h3>
            <p className="text-4xl">{formatCurrency(wallet.balance)}</p>
          </div>
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
              onClick={() => setTransferModal(true)}
              className={walletStyles.button}
            >
              {" "}
              <BiMoneyWithdraw /> transfer
            </button>
          </span>
        </div>
      );
    });

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserWallets());
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    setActive("wallet");
    document.title = "Vestor - Wallet";
  }, [setActive]);

  return (
    <section className="p-6">
      <div className="flex flex-col gap-10">
        <h3 className="md:font-bold md:text-2xl">Wallets</h3>
        <div className="grid gap-6 md:grid-cols-3">{myWallets}</div>
        <div>
          <Transactions />
        </div>
      </div>
      {depositModal && <Deposit setDeposit={setDepositModal} />}
      {withdrawModal && <Withdraw setWithdraw={setWithdrawModal} />}
      {transferModal && <Transfer setWithdraw={setTransferModal} />}
    </section>
  );
};

export default Wallet;
