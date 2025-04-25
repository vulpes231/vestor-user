/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorModal from "./ErrorModal";
import LoadingModal from "./LoadingModal";
import { resetVerifyUser, verifyUser } from "../features/verifySlice";
import Successmodal from "./Successmodal";

const identityStyle = {
  formHolder: "flex flex-col gap-1 w-full",
  input:
    "bg-transparent p-2 outline-none border border-stone-500 h-[38px] lg:h-[43px] text-[16px] rounded-[5px]",
  select:
    "bg-transparent p-2.5 outline-none border border-stone-500 h-[38px] lg:h-[43px] text-[16px] rounded-[5px]",
  label: "font-normal text-[12px] text-[#979797] lg:text-[13px] capitalize",
};

const Verifyidentity = ({ userInfo }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    idType: "",
    idNumber: "",
    dob: "",
    employment: "",
    image: null,
  });

  const [error, setError] = useState("");
  const [imageError, setImageError] = useState("");

  const { verifyUserLoading, verifyUserError, verifyRequested } = useSelector(
    (state) => state.verify
  );

  const handleInput = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file) {
        if (file.size > 5000000) {
          // 5MB limit
          setImageError("File size should not exceed 5MB.");
          return;
        }
        if (!["image/jpeg", "image/png"].includes(file.type)) {
          setImageError("Only JPEG and PNG files are allowed.");
          return;
        }
        setImageError(""); // Reset image error if file is valid
      }
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Reset previous errors

    // Validate all fields
    for (const key in form) {
      if (!form[key] && key !== "image") {
        setError(`${key} is required!`);
        return;
      }
    }

    if (!form.image) {
      setError("Image is required!");
      return;
    }

    const formData = new FormData();
    formData.append("idType", form.idType);
    formData.append("idNumber", form.idNumber);
    formData.append("dob", form.dob);
    formData.append("employment", form.employment);
    formData.append("image", form.image);

    dispatch(verifyUser(formData));
  };

  useEffect(() => {
    if (verifyUserError) {
      setError(verifyUserError);
    }
  }, [verifyUserError]);

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
    if (verifyRequested) {
      timeout = setTimeout(() => {
        dispatch(resetVerifyUser());
        setForm({
          idType: "",
          idNumber: "",
          dob: "",
          employment: "",
          image: null,
        });
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [verifyRequested, dispatch]);

  return (
    <div className="bg-stone-900 bg-opacity-40 flex flex-col gap-6 p-6 text-slate-300 border border-stone-600 mb-20">
      <h3 className="font-bold text-white"> Verification Info</h3>
      <p>
        Status:{" "}
        <span
          className={`${
            !userInfo.isKYCVerified ? "text-red-500" : "text-green-500"
          } capitalize`}
        >
          {userInfo.isKYCVerified ? "verified" : "not verified"}
        </span>
      </p>
      {userInfo && userInfo.isKYCVerified ? (
        <div></div>
      ) : (
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 lg:p-6"
        >
          <small>Upload a clear image of your government-issued ID Card</small>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className={identityStyle.formHolder}>
              <label className={identityStyle.label} htmlFor="idType">
                ID type
              </label>
              <select
                className={identityStyle.select}
                name="idType"
                onChange={handleInput}
                value={form.idType}
              >
                <option value="">Select ID</option>
                <option value="license">Driver License</option>
                <option value="passport">International Passport</option>
                <option value="state">State ID</option>
              </select>
            </div>
            <div className={identityStyle.formHolder}>
              <label className={identityStyle.label} htmlFor="idNumber">
                ID Number
              </label>
              <input
                className={identityStyle.input}
                type="text"
                placeholder="Enter ID Number"
                name="idNumber"
                onChange={handleInput}
                value={form.idNumber}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className={identityStyle.formHolder}>
              <label className={identityStyle.label} htmlFor="dob">
                DOB
              </label>
              <input
                className={identityStyle.input}
                type="date"
                name="dob"
                onChange={handleInput}
                value={form.dob}
              />
            </div>
            <div className={identityStyle.formHolder}>
              <label className={identityStyle.label} htmlFor="employment">
                Employment
              </label>
              <select
                className={identityStyle.select}
                name="employment"
                onChange={handleInput}
                value={form.employment}
              >
                <option value="">Select Employment</option>
                <option value="employed">Employed</option>
                <option value="student">Student</option>
                <option value="retired">Retired</option>
                <option value="unemployed">Unemployed</option>
              </select>
            </div>
          </div>

          <div className={identityStyle.formHolder}>
            <label className={identityStyle.label} htmlFor="image">
              Upload ID Image
            </label>
            <input
              className={identityStyle.input}
              type="file"
              name="image"
              onChange={handleInput}
            />
            {imageError && <small className="text-red-500">{imageError}</small>}
          </div>
          <button
            type="submit"
            className="p-2 h-[38px] lg:h-[43px] w-full lg:w-[420px] border-none bg-green-600 text-white rounded-[5px] mt-8"
            disabled={verifyUserLoading}
          >
            {verifyUserLoading ? "Verifying..." : "Verify account"}
          </button>
        </form>
      )}
      {error && <ErrorModal error={error} />}
      {verifyUserLoading && (
        <LoadingModal text={"Sending verification request"} />
      )}
      {verifyRequested && <Successmodal successText={"Verification pending"} />}
    </div>
  );
};

export default Verifyidentity;
