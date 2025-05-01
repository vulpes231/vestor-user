import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/registerSlice";
import loginReducer from "../features/loginSlice";
import updateUserReducer from "../features/updateUserSlice";
import userReducer from "../features/userSlice";
import walletReducer from "../features/walletSlice";
import trnxReducer from "../features/trnxSlice";
import investReducer from "../features/investSlice";
import tradeReducer from "../features/tradeSlice";
import verifyReducer from "../features/verifySlice";
import ticketReducer from "../features/ticketSlice";
import assetReducer from "../features/assetSlice";
import resetPassReducer from "../features/resetPassSlice";

const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    updateuser: updateUserReducer,
    user: userReducer,
    wallet: walletReducer,
    trnx: trnxReducer,
    invest: investReducer,
    trade: tradeReducer,
    verify: verifyReducer,
    ticket: ticketReducer,
    asset: assetReducer,
    resetpass: resetPassReducer,
  },
});

export default store;
