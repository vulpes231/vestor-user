/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bitcoin, tether } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { depositFunds, resetDeposit } from "../features/trnxSlice";
import { ErrorModal, LoadingModal, Successmodal } from "../components";

const addresses = [
  {
    id: "bitcoin",
    address: "3xu782jjklsksdhdu8903032i67uihsd",
  },
  {
    id: "trc20",
    address: "0x1dshjssoopw08ejsuwboo902js22",
  },
  {
    id: "erc20",
    address: "0x1dshjs682jsjsjkejsu6378wijse",
  },
];

const Confirmdeposit = ({ setActive }) => {
  const dispatch = useDispatch();
  const { coin, amount, memo, network } = useParams();

  const [error, setError] = useState();

  const { depositLoading, depositError, depositSucess } = useSelector(
    (state) => state.trnx
  );

  const handleDeposit = (e) => {
    e.preventDefault();
    const data = {
      coin: coin,
      amount: parseFloat(amount),
    };
    dispatch(depositFunds(data));
  };

  useEffect(() => {
    if (depositError) {
      setError(depositError);
    }
  }, [depositError]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        setError("");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  useEffect(() => {
    let timeout;
    if (depositSucess) {
      timeout = setTimeout(() => {
        dispatch(resetDeposit());
        window.location.href = "/wallet";
      }, 4000);
    }
    return () => clearTimeout(timeout);
  }, [depositSucess, dispatch]);

  useEffect(() => {
    setActive("wallet");
  }, [setActive]);

  useEffect(() => {
    document.title = "Vestor - Confirm Payment";
  });

  const address = addresses.find((adr) => adr.id === network);

  console.log(coin, amount, memo, network);
  return (
    <div className=" flex md:items-center md:justify-center h-screen w-full">
      <div className="bg-stone-900 text-slate-100 w-full md:w-[380px] lg:w-[480px]  p-6 flex flex-col gap-4">
        <h3 className="text-2xl font-bold">Complete payment</h3>
        <ul className="text-xs pl-6 font-light text-slate-400 flex flex-col gap-2 list-disc">
          <li>
            After payment funds will be added automatically to your account
            after a minimum of 2 confirmations.
          </li>

          <li>
            Do Not try to Send Less than required amount of coin as it may cause
            the transaction to fail
          </li>
          <li>If there are any error contact admin to resolve.</li>
        </ul>

        <div>
          <span className="flex flex-col gap-2">
            {" "}
            <div className="flex gap-2">
              <span> Payment method:</span>
              <span className="uppercase font-bold flex items-center gap-1">
                <img
                  src={coin === "btc" ? bitcoin : tether}
                  alt=""
                  className="w-[20px]"
                />
                <span>{coin}</span>
              </span>
            </div>
            <p>
              USD Amount: <span className=" font-bold">{amount} USD</span>{" "}
            </p>
            <p className="text-slate-200">
              You are to pay{" "}
              <span className="font-bold text-white uppercase">
                {coin === "btc" ? "0.0000" : amount} {coin}
              </span>{" "}
              to:{" "}
            </p>
            <span className="flex items-center gap-4">
              <input
                type="text"
                readOnly
                value={address.address}
                className="p-2 border border-stone-600 bg-transparent w-full text-slate-400 text-md font-light"
              />
              <button className="px-4 py-2 rounded-sm bg-green-500 text-xs text-white">
                Copy
              </button>
            </span>
            {/* <img src="" alt="qr-code" /> */}
          </span>
        </div>

        <small className="text-xs font-light text-slate-400">
          Always double check the address before sending payment{" "}
        </small>

        <button
          onClick={handleDeposit}
          className="bg-green-600 text-white p-2 rounded-3xl"
        >
          Paid
        </button>
      </div>
      {depositError && <ErrorModal error={error} />}
      {depositLoading && <LoadingModal text={"Submitting deposit"} />}
      {depositSucess && <Successmodal successText={"Deposit pending."} />}
    </div>
  );
};

export default Confirmdeposit;
