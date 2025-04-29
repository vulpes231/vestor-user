/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../constants/constant";
import { getUserInfo } from "../features/userSlice";
import ErrorModal from "./ErrorModal";

const DepositModal = ({ setDeposit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = getAccessToken();

  const [form, setForm] = useState({
    amount: "",
    coin: "",
    method: "",
    memo: "",
  });

  const [activeMethod, setActiveMethod] = useState("bank");
  const [error, setError] = useState("");

  const { userInfo } = useSelector((state) => state.user);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields =
      activeMethod === "bank" ? ["amount"] : ["coin", "amount"];

    const isValid = requiredFields.every(
      (field) => form[field] && form[field].trim() !== ""
    );

    if (!isValid) {
      setError("Please fill in all required fields.");
      return;
    }

    console.log(form);
    sessionStorage.setItem("depositForm", JSON.stringify(form));
    navigate(`/confirm/${form.amount}/${activeMethod}`);
  };

  useEffect(() => {
    if (token) {
      dispatch(getUserInfo());
    }
  }, [token, dispatch]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        setError("");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 p-6 w-full max-w-md mx-4 transform transition-all duration-300 scale-95 hover:scale-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Deposit Funds</h3>
          <button
            onClick={() => setDeposit(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Method Tabs */}
        <div className="flex items-center bg-gray-700 rounded-lg p-1 mb-8">
          {methods.map((bt) => (
            <button
              key={bt.id}
              onClick={() => setActiveMethod(bt.id)}
              className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeMethod === bt.id
                  ? "bg-cyan-600 text-white shadow-md"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {bt.name.charAt(0).toUpperCase() + bt.name.slice(1)}
            </button>
          ))}
        </div>

        {activeMethod === "bank" ? (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bank Name
                </label>
                <input
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  type="text"
                  // placeholder="e.g. Chase Bank"
                  name="bankName"
                  value={userInfo?.bankDepositInfo?.bankName || "Chase Bank"}
                  onChange={handleInput}
                  autoComplete="off"
                  readOnly
                  // autoComplete={"off"}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Account Number
                </label>
                <input
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  type="text"
                  placeholder="Enter account number"
                  name="account"
                  value={userInfo?.bankDepositInfo?.account || "2165789098"}
                  onChange={handleInput}
                  autoComplete="off"
                  readOnly
                  // autoComplete={"off"}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Routing Number
                </label>
                <input
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  type="text"
                  placeholder="Enter routing number"
                  name="routing"
                  value={userInfo?.bankDepositInfo?.routing || "2129870098"}
                  onChange={handleInput}
                  autoComplete={"off"}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bank Address
                </label>
                <input
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  type="text"
                  placeholder="Bank's physical address"
                  name="bankAddress"
                  value={
                    userInfo?.bankDepositInfo?.address ||
                    "124 West Ave, Cios OH 09876"
                  }
                  onChange={handleInput}
                  autoComplete={"off"}
                  readOnly
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300">
                  $
                </span>
                <input
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  type="text"
                  placeholder="0.00"
                  name="amount"
                  value={form.amount}
                  onChange={handleInput}
                  autoComplete={"off"}
                  // readOnly
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 mt-6"
            >
              Process Deposit
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Coin
              </label>
              <select
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none"
                name="coin"
                value={form.coin}
                onChange={handleInput}
              >
                <option value="" disabled>
                  Select a coin
                </option>
                <option value="btc">BTC (Bitcoin)</option>
                <option value="ethErc">ETH (ERC20)</option>
                <option value="ethArb">ETH (Arbitrum)</option>
                <option value="usdtErc">USDT (ERC20)</option>
                <option value="usdtTrc">USDT (TRC20)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Amount
              </label>
              <input
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                type="text"
                placeholder="0.00"
                name="amount"
                value={form.amount}
                onChange={handleInput}
                autoComplete="off"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Memo <span className="text-gray-400">(optional)</span>
              </label>
              <input
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                type="text"
                placeholder="Add a memo"
                name="memo"
                value={form.memo}
                onChange={handleInput}
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 mt-6"
            >
              Generate Deposit Address
            </button>
          </form>
        )}

        <button
          onClick={() => setDeposit(false)}
          className="w-full mt-4 text-gray-300 hover:text-white text-sm font-medium transition-colors"
        >
          Cancel Transaction
        </button>
      </div>
      {error && <ErrorModal error={error} />}
    </div>
  );
};

const methods = [
  {
    id: "bank",
    name: "bank",
  },
  {
    id: "crypto",
    name: "crypto",
  },
];

export default DepositModal;
