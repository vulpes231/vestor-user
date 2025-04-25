/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { styles } from "../constants/styles";
import { getAccessToken } from "../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { getInvestmentPlans } from "../features/investSlice";
import { Activateplan } from "../pages";
import { getUserInfo } from "../features/userSlice";
import ErrorModal from "./ErrorModal";

const Dashwallet = () => {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();

  const [activatePlanModal, setActivatePlanModal] = useState(false);
  const [planData, setPlanData] = useState(false);
  const [error, setError] = useState("");

  const { getPlanLoading, getPlanError, plans } = useSelector(
    (state) => state.invest
  );

  const { userInfo } = useSelector((state) => state.user);

  const myPlans =
    plans &&
    plans.map((plan) => {
      return (
        <div
          key={plan._id}
          className="p-6 bg-stone-900/40 flex flex-col gap-2 border border-stone-600 justify-between"
        >
          <span className="flex justify-between w-full">
            <p className="flex flex-col">
              <small className="text-xs text-slate-400">Level</small>
              <span className="capitalize">{plan.packageName}</span>
            </p>
            <p className="flex flex-col">
              <small className="text-xs text-slate-400">ROI(%)</small>
              <span className="capitalize">{plan.yield}%</span>
            </p>
            <p className="flex flex-col">
              <small className="text-xs text-slate-400">Period</small>
              <span className="capitalize">{plan.period}days</span>
            </p>
          </span>
          <button
            type="button"
            onClick={() => handleActivate(plan)}
            className="px-5 py-2 bg-green-600 text-white text-[11px] rounded-3xl"
          >
            Activate
          </button>
        </div>
      );
    });

  function handleActivate(plan) {
    if (!userInfo.isKYCVerified) {
      setError("Account not verified!");
      return;
    }

    setPlanData(plan);
    setActivatePlanModal(true);
    console.log(activatePlanModal);
  }

  function closeModal() {
    setActivatePlanModal(false);
    setPlanData(false);
  }

  useEffect(() => {
    if (accessToken) {
      dispatch(getInvestmentPlans());
      dispatch(getUserInfo());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        setError("");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  if (getPlanLoading) {
    return (
      <div>
        <div className="bg-stone-900/40 border border-stone-600 p-6 flex-col flex ">
          <div className="flex ">
            <h3 className={`${styles.dashTitle}`}>available plans</h3>
          </div>
          <p>Fetching plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="  flex flex-col gap-4">
        <div className="flex justify-between items-start p-2 bg-stone-900/40">
          <h3 className={`${styles.dashTitle}`}>available plans</h3>
        </div>
        <div className="flex flex-col gap-4">{myPlans}</div>
      </div>
      {activatePlanModal && (
        <Activateplan planData={planData} close={closeModal} />
      )}

      {error && <ErrorModal error={error} />}
    </div>
  );
};

export default Dashwallet;
