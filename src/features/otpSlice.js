/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  devServer,
  getAccessToken,
  liveServer,
  sendError,
} from "../constants/constant";
import axios from "axios";

const initialState = {
  otpLoading: false,
  otpError: false,
  loginOtp: false,
};

export const getLoginCode = createAsyncThunk(
  "otp/getLoginCode",
  async (formData) => {
    const url = `${devServer}/otp`;
    const accessToken = getAccessToken();
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      sendError(error);
    }
  }
);

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    resetLoginOtp(state) {
      state.otpLoading = false;
      state.otpError = false;
      state.loginOtp = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoginCode.pending, (state) => {
        state.otpLoading = true;
      })
      .addCase(getLoginCode.fulfilled, (state, action) => {
        state.otpLoading = false;
        state.otpError = false;
        state.loginOtp = action.payload.code;
      })
      .addCase(getLoginCode.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpError = action.error.message;
        state.loginOtp = false;
      });
  },
});

export const { resetLoginOtp } = otpSlice.actions;
export default otpSlice.reducer;
