/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../constants/constant";
import { getUserInfo } from "../features/userSlice";
import { FaUserLock } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { BsFillSave2Fill } from "react-icons/bs";
import ErrorModal from "./ErrorModal";
import LoadingModal from "./LoadingModal";
import { resetWithdraw, withdrawFunds } from "../features/trnxSlice";
import Successmodal from "./Successmodal";

const withdrawStyles = {
  formHolder: "flex flex-col gap-2",
  label: "font-normal text-[12px] text-[#979797] lg:text-[13px] capitalize",
  input:
    "border border-[#dedede]/40 bg-black/40 p-2 rounded-[5px] h-[38px] lg:h-[40px] outline-none text-[16px] font-normal",
  select:
    "border border-[#dedede]/40 bg-black/40 p-2 h-[38px] lg:h-[40px] rounded-[5px] outline-none text-[16px] font-normal",
};

const withdrawMethods = [
  {
    id: "bank",
    name: "bank",
  },
  {
    id: "crypto",
    name: "crypto",
  },
];

const Withdrawmodal = ({ setWithdraw, setActive }) => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  const [form, setForm] = useState({
    withdrawFrom: "deposit",
    walletAddress: "",
    amount: "",
    bankName: "",
    bankAddress: "",
    routing: "",
    account: "",
    acctName: "",
    coin: "btc",
    method: "",
  });

  const [error, setError] = useState("");
  const [method, setMethod] = useState("bank");

  const { withdrawLoading, withdrawError, withdrawSucess } = useSelector(
    (state) => state.trnx
  );
  const { userInfo } = useSelector((state) => state.user);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      amount,
      coin,
      walletAddress,
      withdrawFrom,
      bankName,
      account,
      routing,
      bankAddress,
    } = form;

    if (!amount || !coin) {
      setError("Amount and coin are required!");
      return;
    }

    let formData = null;

    if (method === "crypto") {
      if (!withdrawFrom || !walletAddress) {
        setError("Incomplete crypto information!");
        return;
      }
      formData = {
        amount,
        coin,
        method,
        paymentInfo: walletAddress,
      };
    } else if (method === "bank") {
      if (!bankName || !account || !routing || !bankAddress) {
        setError("Incomplete bank information!");
        return;
      }
      formData = {
        amount,
        coin,
        method,
        paymentInfo: `${bankName} ${account} ${routing} ${bankAddress}`,
      };
    } else {
      setError("Unsupported payment method.");
      return;
    }

    console.log(formData);

    dispatch(withdrawFunds(formData));
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserInfo());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    document.title = "Vestor - Withdraw";
    setActive("withdraw");
  }, [setActive]);

  useEffect(() => {
    if (withdrawError) {
      setError(withdrawError);
    }
  }, [withdrawError]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        setError("");
        dispatch(resetWithdraw());
      }, 3000);
    }
  }, [error, dispatch]);

  useEffect(() => {
    let timeout;
    if (withdrawSucess) {
      timeout = setTimeout(() => {
        dispatch(resetWithdraw());
        window.location.href = "/wallet";
      }, 3000);
    }
  }, [withdrawSucess, dispatch]);

  if (userInfo && !userInfo.isKYCVerified) {
    return (
      <div className="p-6 flex flex-col gap-6 h-full items-center justify-center bg-black bg-opacity-50">
        <FaUserLock className="w-20 h-20" />
        <h3 className="text-xl">
          Account status:{" "}
          <span
            className={
              userInfo?.isKYCVerified ? "text-green-600" : "text-red-600"
            }
          >
            {userInfo?.isKYCVerified ? "Verified" : "Not Verified"}
          </span>
        </h3>
        <p className="text-center">
          Verify your account to enjoy full features.{" "}
          <br className="sm:hidden" />
          <Link to={"/settings"} className="text-green-600 underline">
            Complete verification
          </Link>{" "}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 space-y-8">
      <div className="p-6 w-full flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white">Withdraw</h1>
          <p className="text-gray-400">Withdraw funds.</p>
        </div>
        {/* <hr className="border-[1px] border-[#dedede]/40" /> */}
        <div className="flex items-center gap-4">
          {withdrawMethods.map((mtd) => {
            return (
              <span
                key={mtd.id}
                className={`${
                  method === mtd.id
                    ? "border-[1px] border-green-500 text-green-500 rounded-[5px]"
                    : "text-[#979797]"
                } cursor-pointer font-normal  w-[100px] h-[38px] flex items-center justify-center capitalize`}
                onClick={() => setMethod(mtd.id)}
              >
                <h6>{mtd.name}</h6>
              </span>
            );
          })}
        </div>
        {method === "crypto" ? (
          <form className="flex flex-col gap-4 bg-gray-800/50 rounded-xl backdrop-blur-sm p-6 border border-gray-700/50 hover:border-cyan-400/30 transition-all md:w-[50%]">
            <div className={withdrawStyles.formHolder}>
              <label className={withdrawStyles.label} htmlFor="from">
                From
              </label>
              <select
                className={withdrawStyles.select}
                name="withdrawFrom"
                value={form.withdrawFrom}
                onChange={handleInput}
              >
                <option value="deposit">Deposit wallet</option>
              </select>
            </div>
            <div className={withdrawStyles.formHolder}>
              <label className={withdrawStyles.label} htmlFor="coin">
                Coin
              </label>
              <select
                className={withdrawStyles.select}
                name="coin"
                value={form.coin}
                onChange={handleInput}
              >
                <option value="btc">Bitcoin</option>
                <option value="eth">Ethereum</option>
                <option value="usdt(erc20)">USDT (ERC20)</option>
                <option value="usdt(trc20)">USDT (TRC20)</option>
              </select>
            </div>

            <div className={withdrawStyles.formHolder}>
              <label className={withdrawStyles.label} htmlFor="Address">
                Wallet Address
              </label>
              <input
                className={withdrawStyles.input}
                type="text"
                placeholder="0x1Ahjkdsweoiiwepsdyuis"
                name="walletAddress"
                value={form.walletAddress}
                onChange={handleInput}
                autoComplete="off"
              />
            </div>

            <div className={withdrawStyles.formHolder}>
              <label className={withdrawStyles.label} htmlFor="amount">
                Amount
              </label>
              <input
                className={withdrawStyles.input}
                type="text"
                placeholder="$0.00"
                name="amount"
                value={form.amount}
                onChange={handleInput}
                autoComplete="off"
              />
            </div>
          </form>
        ) : (
          <form
            // onSubmit={handleSubmit}
            className="flex flex-col gap-4 bg-gray-800/50 rounded-xl backdrop-blur-sm p-6 border border-gray-700/50 hover:border-cyan-400/30 transition-all md:w-[50%]"
          >
            <div className={withdrawStyles.formHolder}>
              <label className={withdrawStyles.label} htmlFor="from">
                bank name
              </label>
              <input
                className={withdrawStyles.input}
                type="text"
                name="bankName"
                value={form.bankName}
                onChange={handleInput}
                autoComplete="off"
              />
            </div>

            <div className={withdrawStyles.formHolder}>
              <label className={withdrawStyles.label} htmlFor="Address">
                account number
              </label>
              <input
                className={withdrawStyles.input}
                type="text"
                name="account"
                value={form.account}
                onChange={handleInput}
                autoComplete="off"
              />
            </div>

            <div className={withdrawStyles.formHolder}>
              <label className={withdrawStyles.label} htmlFor="amount">
                routing number
              </label>
              <input
                className={withdrawStyles.input}
                type="text"
                name="routing"
                value={form.routing}
                onChange={handleInput}
              />
            </div>
            {/* <div className={withdrawStyles.formHolder}>
              <label className={withdrawStyles.label} htmlFor="amount">
                account name
              </label>
              <input
                className={withdrawStyles.input}
                type="text"
                name="acctName"
                value={form.acctName}
                onChange={handleInput}
              />
            </div> */}
            <div className={withdrawStyles.formHolder}>
              <label className={withdrawStyles.label} htmlFor="amount">
                bank address
              </label>
              <input
                className={withdrawStyles.input}
                type="text"
                name="bankAddress"
                value={form.bankAddress}
                onChange={handleInput}
              />
            </div>
            <div className={withdrawStyles.formHolder}>
              <label className={withdrawStyles.label} htmlFor="amount">
                Amount
              </label>
              <input
                className={withdrawStyles.input}
                type="text"
                placeholder="$0.00"
                name="amount"
                value={form.amount}
                onChange={handleInput}
              />
            </div>
          </form>
        )}
        <div className="">
          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-green-600 text-slate-100 py-2 px-8 rounded-[5px] mt-5 font-semibold md:w-[250px]"
          >
            Withdraw
          </button>
        </div>
      </div>
      {error && <ErrorModal error={error} />}
      {withdrawLoading && <LoadingModal text={"Initiating withdrawal..."} />}
      {withdrawSucess && (
        <Successmodal successText={"Withdrawal request created."} />
      )}
    </div>
  );
};

export default Withdrawmodal;
