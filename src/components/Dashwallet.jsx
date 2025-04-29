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
          className="p-6 flex flex-col gap-6 justify-between bg-black/30 backdrop-blur-md rounded-2xl border border-gray-700 hover:border-cyan-400/50 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <div className="flex justify-between items-center text-sm text-slate-300">
            <div className="flex flex-col">
              <small className="text-xs text-gray-400">Level</small>
              <span className="capitalize font-semibold">
                {plan.packageName}
              </span>
            </div>
            <div className="flex flex-col">
              <small className="text-xs text-gray-400">ROI (%)</small>
              <span className="capitalize font-semibold">{plan.yield}%</span>
            </div>
            <div className="flex flex-col">
              <small className="text-xs text-gray-400">Period</small>
              <span className="capitalize font-semibold">
                {plan.period} days
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleActivate(plan)}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-semibold rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300"
          >
            Activate Plan
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
      <div className="bg-black/30 backdrop-blur-md p-8 rounded-xl border border-gray-700 flex flex-col gap-4">
        <h3 className={`${styles.dashTitle} text-white`}>Available Plans</h3>
        <p className="text-gray-400 animate-pulse">
          Fetching investment plans...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center p-4 bg-black/30 backdrop-blur-md rounded-xl border border-gray-700">
        <h3 className={`${styles.dashTitle} text-white`}>Available Plans</h3>
      </div>
      <div className="grid grid-cols-1 gap-6">{myPlans}</div>

      {activatePlanModal && (
        <Activateplan planData={planData} close={closeModal} />
      )}

      {error && <ErrorModal error={error} />}
    </div>
  );
};

export default Dashwallet;
