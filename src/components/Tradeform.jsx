/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openPosition, resetOpenPosition } from "../features/tradeSlice";
import ErrorModal from "./ErrorModal";
import Successmodal from "./Successmodal";
import LoadingModal from "./LoadingModal";

const style = {
  label: "text-[14px] text-[#979797] font-normal capitalize",
  input:
    "text-[16px] h-[38px] bg-transparent border-[1px] border-[#979797]/30 rounded-[5px] outline-none p-2",
};

const Tradeform = ({ asset, action }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    amount: "",
  });

  const [qty, setQty] = useState(0);
  const [error, setError] = useState("");

  const { openPositionLoading, openPositionError, positionOpened } =
    useSelector((state) => state.trade);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      assetName: asset.name,
      amount: form.amount,
      assetSymbol: asset.symbol,
      type: action,
    };
    dispatch(openPosition(formData));
  };

  useEffect(() => {
    if (form.amount && asset) {
      const qunt = parseFloat(form.amount) / parseFloat(asset.price);

      setQty(qunt);
    }
  }, [form.amount, asset]);

  useEffect(() => {
    if (openPositionError) {
      setError(openPositionError);
    }
  }, [openPositionError]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        setError("");
        dispatch(resetOpenPosition());
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [error, dispatch]);
  useEffect(() => {
    let timeout;
    if (positionOpened) {
      timeout = setTimeout(() => {
        setError("");
        dispatch(resetOpenPosition());
        window.location.href = "/history";
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [positionOpened, dispatch]);
  return (
    <div className="">
      <form action="" className="flex flex-col gap-4">
        <div className="flex flex-col gap-1z">
          <label className={style.label} htmlFor="">
            amount
          </label>
          <input
            className={style.input}
            type="text"
            placeholder="$0.00"
            value={form.amount}
            onChange={handleInput}
            name="amount"
            autoComplete="off"
          />
        </div>
        <span className="flex items-center whitespace-nowrap gap-2">
          <label className={style.label} htmlFor="">
            quantity:
          </label>
          <h6>
            {Number.isFinite(qty) ? qty.toFixed(4) : "0.0000"}{" "}
            {asset?.symbol?.toUpperCase()}
          </h6>
        </span>
        <button
          onClick={handleSubmit}
          className={`${
            action === "buy" ? "bg-green-600" : "bg-red-600"
          } text-white h-[40px] w-full rounded-[5px] capitalize font-semibold`}
        >
          {action === "buy" ? "buy" : "sell"}
        </button>
      </form>
      {error && <ErrorModal error={error} />}
      {positionOpened && <Successmodal successText={"Position opened."} />}
      {openPositionLoading && <LoadingModal text={"Opening position..."} />}
    </div>
  );
};

export default Tradeform;
