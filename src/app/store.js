import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/registerSlice";
import loginReducer from "../features/loginSlice";
import updateUserReducer from "../features/updateUserSlice";
import userReducer from "../features/userSlice";
import walletReducer from "../features/walletSlice";
import trnxReducer from "../features/trnxSlice";

const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    updateuser: updateUserReducer,
    user: userReducer,
    wallet: walletReducer,
    trnx: trnxReducer,
  },
});

export default store;
