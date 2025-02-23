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
  verifyUserLoading: false,
  verifyUserError: false,
  verifyRequested: false,
  verifyEmailLoading: false,
  verifyEmailError: false,
  emailVerified: false,
};

export const verifyUser = createAsyncThunk(
  "verify/verifyUser",
  async (formData) => {
    const url = `https://vestor-server.onrender.com/verify`;
    const accessToken = getAccessToken();
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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

export const verifyEmailAddress = createAsyncThunk(
  "otp/verifyEmailAddress",
  async (formData) => {
    const url = `${devServer}/user/verifymail`;
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

const verifyUserSlice = createSlice({
  name: "verify",
  initialState,
  reducers: {
    resetVerifyUser(state) {
      state.verifyUserLoading = false;
      state.verifyUserError = false;
      state.verifyRequested = false;
    },
    resetverifyEmail(state) {
      state.verifyEmailLoading = false;
      state.verifyEmailError = false;
      state.emailVerified = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyUser.pending, (state) => {
        state.verifyUserLoading = true;
      })
      .addCase(verifyUser.fulfilled, (state) => {
        state.verifyUserLoading = false;
        state.verifyUserError = false;
        state.verifyRequested = true;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.verifyUserLoading = false;
        state.verifyUserError = action.error.message;
        state.verifyRequested = false;
      });

    builder
      .addCase(verifyEmailAddress.pending, (state) => {
        state.verifyEmailLoading = true;
      })
      .addCase(verifyEmailAddress.fulfilled, (state) => {
        state.verifyEmailLoading = false;
        state.verifyEmailError = false;
        state.emailVerified = true;
      })
      .addCase(verifyEmailAddress.rejected, (state, action) => {
        state.verifyEmailLoading = false;
        state.verifyEmailError = action.error.message;
        state.emailVerified = false;
      });
  },
});

export const { resetVerifyUser } = verifyUserSlice.actions;
export default verifyUserSlice.reducer;
