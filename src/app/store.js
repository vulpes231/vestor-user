import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/registerSlice";
import loginReducer from "../features/loginSlice";
import updateUserReducer from "../features/updateUserSlice";

const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    updateuser: updateUserReducer,
  },
});

export default store;
