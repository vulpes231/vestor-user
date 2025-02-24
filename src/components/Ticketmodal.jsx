/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingModal from "./LoadingModal";
import ErrorModal from "./ErrorModal";
import Successmodal from "./Successmodal";
import { createTicket, resetCreateTicket } from "../features/ticketSlice";

const Ticketmodal = ({ close }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    subject: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState("");

  const { createTicketLoading, createTicketError, ticketCreated } = useSelector(
    (state) => state.ticket
  );

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    dispatch(createTicket(form));
  };

  useEffect(() => {
    if (createTicketError) {
      setError(createTicketError);
    }
  }, [createTicketError]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        setError("");
        dispatch(resetCreateTicket());
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [error, dispatch]);

  useEffect(() => {
    let timeout;
    if (ticketCreated) {
      timeout = setTimeout(() => {
        dispatch(resetCreateTicket());
        window.location.reload();
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [ticketCreated, dispatch]);

  return (
    <div className="bg-white/80 h-screen fixed w-full flex items-center justify-center top-0 left-0">
      <div className="bg-white text-slate-600 flex flex-col rounded-[5px] p-6 gap-4 w-full md:w-[350px]">
        <span className="flex items-center justify-between">
          <h3 className="text-[14px] lg:text-[16px] capitalize font-semibold">
            create new ticket
          </h3>
          <button
            onClick={close}
            className="text-[12px] font-medium capitalize "
          >
            close
          </button>
        </span>
        <form action="" className="flex flex-col gap-4">
          <select
            name="subject"
            onChange={handleInput}
            value={form.subject}
            className="border rounded-[5px] p-2 capitalize outline-none"
          >
            <option value="">Choose a category</option>
            <option value="deposit">Deposit</option>
            <option value="withdrawal">Withdrawal</option>
            <option value="transaction">Transaction</option>
            <option value="trade">Trade</option>
            <option value="investment">Investment</option>
          </select>
          <input
            type="email"
            placeholder="Enter email"
            className="border rounded-[5px] p-2 outline-none"
            name="email"
            onChange={handleInput}
            value={form.email}
          />
          <textarea
            rows={4}
            className="border rounded-[5px] p-2 outline-none"
            placeholder="Your message"
            name="message"
            onChange={handleInput}
            value={form.message}
          ></textarea>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white rounded-[5px] p-2 capitalize"
          >
            Create ticket
          </button>
        </form>
      </div>
      {createTicketLoading && <LoadingModal text={"creating ticket..."} />}
      {error && <ErrorModal error={error} />}
      {ticketCreated && <Successmodal successText={"Ticket created."} />}
    </div>
  );
};

export default Ticketmodal;
