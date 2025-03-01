/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devServer, liveServer, sendError } from "../constants/constant";

const initialState = {
  loginLoading: false,
  loginError: false,
  accessToken: false,
  country: false,
  isProfileComplete: false,
  email: false,
  otpCode: false,
};

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (formData) => {
    const url = `${liveServer}/auth/`;
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      sendError(error);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    resetLogin(state) {
      state.loginLoading = false;
      state.loginError = false;
      state.accessToken = false;
      state.isProfileComplete = false;
      state.country = false;
      state.email = false;
      state.otpCode = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.accessToken = action.payload.accessToken;
        state.isProfileComplete = action.payload.isProfileComplete;
        state.country = action.payload.country;
        state.email = action.payload.email;
        state.otpCode = action.payload.otpCode;
        state.loginError = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.accessToken = false;
        state.isProfileComplete = false;
        state.country = false;
        state.email = false;
        state.otpCode = false;
        state.loginError = action.error.message;
      });
  },
});

export const { resetLogin } = loginSlice.actions;
export default loginSlice.reducer;
