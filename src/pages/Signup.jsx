/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import { MdHelp } from "react-icons/md";
import { Link } from "react-router-dom";
import { styles } from "../constants/styles";
import { ErrorModal, Footer } from "../components";

const countries = [
  {
    id: 1,
    name: "United States of America",
  },
  {
    id: 2,
    name: "United Kingdom",
  },
  {
    id: 3,
    name: "Netherlands",
  },
  {
    id: 4,
    name: "Germany",
  },
  {
    id: 5,
    name: "France",
  },
];

const Signup = () => {
  const [form, setForm] = useState({
    country: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (const key in form) {
      if (form[key] === "") {
        setError(`Please enter your ${key}`);
        return;
      }
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    console.log(form);
    setForm({
      country: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });

    setError("");
  };

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
    document.title = "Vestor - Account Opening";
  }, []);

  return (
    <div className="bg-stone-900 min-h-screen text-white ">
      {/* nav */}
      <div className="border-b border-zinc-600">
        <nav className=" flex justify-between items-center px-10 py-4 lg:max-w-[1200px] lg:mx-auto">
          <Logo customClass={"flex items-center"} />
          <span className="cursor-pointer">
            <MdHelp size={25} />
          </span>
        </nav>
      </div>
      <div className="px-8 py-16 flex flex-col gap-6 md:max-w-[450px] md:mx-auto mb-20">
        <h3 className="text-2xl">Let&apos;s get started</h3>
        <form action="" className="flex flex-col gap-6">
          <div className={styles.formHolder}>
            <label className={styles.label} htmlFor="">
              Country of Residence
            </label>
            <select
              name="country"
              value={form.country}
              onChange={handleInput}
              className={styles.select}
            >
              <option value="">Select</option>
              {countries.map((country) => {
                return (
                  <option key={country.id} value={country.name}>
                    {country.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={form.country ? "flex flex-col gap-6" : "hidden"}>
            <div className={styles.formHolder}>
              <label htmlFor="" className={styles.label}>
                Email Address
              </label>
              <input
                type="email"
                className={styles.signupInput}
                placeholder="Email Address"
                name="email"
                value={form.email}
                onChange={handleInput}
                autoComplete="off"
              />
            </div>
            <div className={styles.formHolder}>
              <label htmlFor="" className={styles.label}>
                Username
              </label>
              <input
                type="text"
                className={styles.signupInput}
                placeholder="Username"
                name="username"
                value={form.username}
                onChange={handleInput}
                autoComplete="off"
              />
            </div>
            <div className={styles.formHolder}>
              <label htmlFor="" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                className={styles.signupInput}
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleInput}
              />
            </div>
            <div className={styles.formHolder}>
              <label htmlFor="" className={styles.label}>
                Confirm Password
              </label>
              <input
                type="password"
                className={styles.signupInput}
                placeholder="Confirm Password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="py-2 px-6 bg-green-600 w-full"
            >
              Sign up
            </button>
          </div>

          <p className="flex gap-2 items-center justify-center">
            Already have an account?{" "}
            <Link to={"/signin"} className={styles.formLink}>
              Log in now
            </Link>
          </p>
        </form>
      </div>
      <Footer />
      {error && <ErrorModal error={error} />}
    </div>
  );
};

export default Signup;
