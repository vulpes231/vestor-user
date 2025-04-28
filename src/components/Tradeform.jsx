/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

const style = {
  label: "text-[14px] text-[#979797] font-normal capitalize",
  input:
    "text-[16px] h-[38px] bg-transparent border-[1px] border-[#979797]/30 rounded-[5px] outline-none p-2",
};

const Tradeform = ({ asset, action }) => {
  const [form, setForm] = useState({
    amount: "",
  });

  const [qty, setQty] = useState(0);

  useEffect(() => {
    if (form.amount && asset) {
      const qunt = parseFloat(form.amount) / parseFloat(asset.price);

      setQty(qunt);
    }
  }, [form.amount, asset]);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div>
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
          className={`${
            action === "buy" ? "bg-green-600" : "bg-red-600"
          } text-white h-[40px] w-full rounded-[5px] capitalize font-semibold`}
        >
          {action === "buy" ? "buy" : "sell"}
        </button>
      </form>
    </div>
  );
};

export default Tradeform;
