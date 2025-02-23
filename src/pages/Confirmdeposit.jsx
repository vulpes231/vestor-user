/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bitcoin, tether } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { depositFunds, resetDeposit } from "../features/trnxSlice";
import { ErrorModal, LoadingModal, Successmodal } from "../components";
import { getUserInfo } from "../features/userSlice";
import { getAccessToken } from "../constants/constant";
import { QRCodeSVG } from "qrcode.react";

const Confirmdeposit = ({ setActive }) => {
  const dispatch = useDispatch();
  const { coin, amount, memo, network } = useParams();

  const accessToken = getAccessToken();

  const [error, setError] = useState("");
  const [copy, setCopy] = useState(false);

  const { depositLoading, depositError, depositSucess } = useSelector(
    (state) => state.trnx
  );
  const { userInfo } = useSelector((state) => state.user);

  const handleCopy = () => {
    const textToCopy = userInfo?.depositAddress;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopy(true);
    }
  };

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
    let timeout;
    if (copy) {
      timeout = setTimeout(() => {
        setCopy(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [copy]);

  useEffect(() => {
    setActive("wallet");
    if (accessToken) {
      dispatch(getUserInfo());
    }
  }, [setActive, dispatch, accessToken]);

  useEffect(() => {
    document.title = "Vestor - Confirm Payment";
  }, []);

  // Format QR code URI for crypto payment
  const generateQRCodeValue = () => {
    if (coin === "btc" && userInfo?.depositAddress) {
      // Bitcoin URI format
      return `bitcoin:${userInfo.depositAddress}?amount=${amount}&label=${
        memo || ""
      }`;
    } else if (coin === "usdt" && userInfo?.depositAddress) {
      // Tether or other coin URI format (adjust accordingly)
      return `ethereum:${userInfo.depositAddress}?amount=${amount}&label=${
        memo || ""
      }`;
    } else {
      return "";
    }
  };

  return (
    <div className="flex md:items-center md:justify-center h-screen w-full">
      <div className="bg-stone-900 text-slate-100 w-full md:w-[380px] lg:w-[480px] p-6 flex flex-col gap-4">
        <h3 className="text-2xl font-bold">Complete payment</h3>
        <ul className="text-xs pl-6 font-light text-slate-400 flex flex-col gap-2 list-disc">
          <li>
            After payment, funds will be added automatically to your account
            after a minimum of 2 confirmations.
          </li>

          <li>
            Do Not try to Send Less than the required amount of coin as it may
            cause the transaction to fail.
          </li>
          <li>If there are any errors, contact admin to resolve.</li>
        </ul>

        <div>
          <span className="flex flex-col gap-2">
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
              USD Amount: <span className="font-bold">{amount} USD</span>{" "}
            </p>
            <p className="text-slate-200">
              You are to pay{" "}
              <span className="font-bold text-white uppercase">
                {coin === "btc" ? "0.0000" : amount} {coin}
              </span>{" "}
              to: {userInfo?.depositAddress}
            </p>

            {/* QR Code Component */}
            {userInfo?.depositAddress && (
              <div className="my-4 flex justify-center">
                <QRCodeSVG value={generateQRCodeValue()} size={200} />
              </div>
            )}

            <span className="flex items-center gap-4">
              <input
                type="text"
                readOnly
                value={userInfo?.depositAddress}
                className="p-2 border outline-none border-stone-600 bg-transparent w-full text-slate-400 text-md font-light"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2 rounded-sm bg-green-500 text-xs text-white"
              >
                {!copy ? "Copy" : "Copied."}
              </button>
            </span>
          </span>
        </div>

        <small className="text-xs font-light text-slate-400">
          Always double-check the address before sending payment.
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
