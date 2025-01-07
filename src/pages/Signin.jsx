/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { styles } from "../constants/styles";
import { ErrorModal, LoadingModal, Successmodal } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/loginSlice";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { loginLoading, loginError, accessToken, country, isProfileComplete } =
    useSelector((state) => state.login);

  const year = new Date().getFullYear();

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

    console.log(form);
    dispatch(loginUser(form));

    // setForm({
    //   email: "",
    //   password: "",
    // });

    setError("");
  };

  useEffect(() => {
    if (loginError) {
      setError(loginError);
    }
  }, [loginError]);

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
    if (accessToken) {
      sessionStorage.setItem("accessToken", JSON.stringify(accessToken));

      const userData = {
        country: country,
        isProfileComplete: isProfileComplete,
      };

      sessionStorage.setItem("userData", JSON.stringify(userData));

      timeout = setTimeout(() => {
        if (isProfileComplete) {
          navigate("/dashboard");
        } else {
          navigate("/personal");
        }
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [accessToken, navigate, country, isProfileComplete]);

  useEffect(() => {
    document.title = "Vestor - Login";
  }, []);
  return (
    <div className="bg-black text-slate-100 h-screen">
      <div className="flex flex-col md:flex-row-reverse md:items-center h-full">
        <div className="flex flex-col gap-6 p-8 w-full md:w-[30%]">
          <Logo customClass={"flex items-center gap-1"} />
          <form action="" className="flex flex-col gap-4">
            <div className={styles.formHolder}>
              <label htmlFor="" className={styles.label}>
                Email address <span className={styles.formSpan}>*</span>
              </label>
              <input
                className={styles.input}
                type="text"
                placeholder="Email address"
                name="email"
                value={form.email}
                onChange={handleInput}
                autoComplete="off"
              />
            </div>
            <div className={styles.formHolder}>
              <label htmlFor="" className={styles.label}>
                Password <span className={styles.formSpan}>*</span>
              </label>
              <input
                className={styles.input}
                type="password"
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleInput}
              />
            </div>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                // className="bg-zinc-800 outline-none border border-zinc-700"
              />
              <small>Remember Me</small>
            </div>
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-slate-100 p-2 font-bold rounded-sm"
            >
              Sign In
            </button>
            <Link className={styles.formLink}>Forgot Password?</Link>
          </form>
          <div className="flex flex-col gap-1">
            <p>Need a vestor account?</p>
            <Link to={"/signup"} className={styles.formLink}>
              Sign up now!{" "}
            </Link>
          </div>
          <div className="lg:mt-20">
            <small className="text-[10px]">
              &copy; {year} Vestor, Inc. Copyrights, logos, and trademarks are
              property of Vestor, Inc. <br className="md:hidden" />
              All rights reserved. Vestor, Inc., member FINRA | SIPC | NFA
            </small>
          </div>
        </div>
        <div className="w-full md:w-[70%] flex items-center h-full bgImg"></div>
        {error && <ErrorModal error={error} />}
        {loginLoading && <LoadingModal text={"Logging In"} />}
        {accessToken && <Successmodal successText={"Login Successful."} />}
      </div>
    </div>
  );
};

export default Signin;
