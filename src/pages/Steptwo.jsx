/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import { MdHelp } from "react-icons/md";
import { styles } from "../constants/styles";
import { getAccessToken } from "../constants/constant";
import { useNavigate } from "react-router-dom";

const customStyles = {
  input:
    "py-2 px-4 bg-stone-700 text-white border-none focus:outline-green-700 outline-none focus:border-none placeholder:text-xs w-full",
};

const Steptwo = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    street: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    mailing: "",
  });

  const [mailing, setMailing] = useState("yes");
  const [error, setError] = useState("");
  const [formSaved, setFormSaved] = useState(false);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const token = getAccessToken();

  const handleSubmit = (e) => {
    e.preventDefault();

    for (const key in form) {
      if (form[key] === "") {
        setError(`Please enter your ${key}`);
        return;
      }
    }
    console.log(form);
    sessionStorage.setItem("personal", JSON.stringify(form));
    setFormSaved(true);
  };

  useEffect(() => {
    if (!token) {
      sessionStorage.clear();
      window.location.href = "/signin";
    }
  }, [token]);

  useEffect(() => {
    if (formSaved) {
      navigate("/identity");
      setFormSaved(false);
    }
  }, [formSaved, navigate]);

  useEffect(() => {
    document.title = "Vestor - Contact Information";
  }, []);

  return (
    <section className="bg-stone-900 min-h-screen text-white ">
      <div className="border-b border-zinc-600">
        <nav className=" flex justify-between items-center px-10 py-4 lg:max-w-[1200px] lg:mx-auto">
          <Logo customClass={"flex items-center"} />
          <span className="cursor-pointer">
            <MdHelp size={25} />
          </span>
        </nav>
      </div>
      <div className="p-4 flex flex-col gap-10 w-full md:max-w-[600px] md:mx-auto">
        <span className="flex flex-col gap-2">
          <p className="uppercase text-sm text-slate-300">personal info</p>
          <h2 className="capitalize text-2xl">contact information</h2>
        </span>
        <p className="text-slate-300">
          Please list your name as it appears on your government I.D. so we can
          verify your identity.
        </p>
        <form action="" className="flex flex-col gap-6 w-full ">
          <div className="flex gap-2">
            <span className={`w-full ${styles.formHolder}`}>
              <label htmlFor="">First Name</label>
              <input
                className={customStyles.input}
                type="text"
                placeholder="First Name"
                name="firstname"
                value={form.firstname}
                onChange={handleInput}
                autoComplete="off"
              />
            </span>
            <span className={`w-full ${styles.formHolder}`}>
              <label htmlFor="">Last Name</label>
              <input
                className={customStyles.input}
                type="text"
                placeholder="Last Name"
                name="lastname"
                value={form.lastname}
                onChange={handleInput}
                autoComplete="off"
              />
            </span>
          </div>
          <div className={`w-full ${styles.formHolder}`}>
            <label htmlFor="">Physical Address</label>
            <input
              className={customStyles.input}
              type="text"
              placeholder="Physical Address"
              name="street"
              value={form.street}
              onChange={handleInput}
              autoComplete="off"
            />
          </div>

          <div className={`w-full ${styles.formHolder}`}>
            <label htmlFor="">Apt / Suite / Other</label>
            <input
              className={customStyles.input}
              type="text"
              placeholder="Apt / Suite / Other"
              name="apt"
              value={form.apt}
              onChange={handleInput}
              autoComplete="off"
            />
          </div>
          <div className="flex gap-2">
            <span className={`w-full ${styles.formHolder}`}>
              <label htmlFor="">City</label>
              <input
                className={customStyles.input}
                type="text"
                placeholder="City"
                name="city"
                value={form.city}
                onChange={handleInput}
                autoComplete="off"
              />
            </span>
            <span className={`w-full ${styles.formHolder}`}>
              <label htmlFor="">State</label>
              <input
                className={customStyles.input}
                type="text"
                placeholder="State"
                name="state"
                value={form.state}
                onChange={handleInput}
                autoComplete="off"
              />
            </span>
          </div>
          <div className="flex gap-2">
            <span className={`w-full ${styles.formHolder}`}>
              <label htmlFor="">Zip Code</label>
              <input
                className={customStyles.input}
                type="text"
                placeholder="Zip Code"
                name="zip"
                value={form.zip}
                onChange={handleInput}
                autoComplete="off"
              />
            </span>
            <span className={`w-full ${styles.formHolder}`}>
              <label htmlFor="">Country</label>
              <input className={customStyles.input} type="text" readOnly />
            </span>
          </div>
          <div className={`w-full ${styles.formHolder}`}>
            <label htmlFor="">Mobile Phone</label>
            <input
              className={customStyles.input}
              type="text"
              placeholder="Mobile Phone"
              name="phone"
              value={form.phone}
              onChange={handleInput}
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-1 lg:flex-row lg:justify-between w-full">
            <p className="w-full">
              My mailing address is the same as my physical address
            </p>
            <span className="flex items-center w-full lg:justify-end">
              <button
                onClick={() => setMailing("yes")}
                type="button"
                className={`w-full lg:w-[100px] p-2 ${
                  mailing === "yes" ? "bg-green-600" : "bg-stone-600"
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => setMailing("no")}
                type="button"
                className={`w-full lg:w-[100px] p-2 ${
                  mailing === "no" ? "bg-green-600" : "bg-stone-600"
                }`}
              >
                No
              </button>
            </span>
          </div>
          <hr className="border border-stone-500" />
          <small className="text-[11px] text-slate-300">
            Federal law requires financial institutions to obtain, verify, and
            record information that identifies each person who opens an account
            to help fight the funding of terrorism and money laundering
            activities. Therefore, we will ask you for your name, address, date
            of birth, and other personal information to identify you. We may
            also utilize a third-party information provider and/or service for
            verification purposes and reserve the right to ask you for a copy of
            your driver&apos;s license or other identifying documents.
          </small>
          <button onClick={handleSubmit} className="p-2 w-full bg-green-600">
            Next
          </button>
        </form>
      </div>
    </section>
  );
};

export default Steptwo;
