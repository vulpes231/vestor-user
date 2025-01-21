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
};

export const verifyUser = createAsyncThunk(
  "verify/verifyUser",
  async (formData) => {
    const url = `${liveServer}/verify/`;
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

const verifyUserSlice = createSlice({
  name: "verify",
  initialState,
  reducers: {
    resetVerifyUser(state) {
      state.verifyUserLoading = false;
      state.verifyUserError = false;
      state.verifyRequested = false;
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
  },
});

export const { resetVerifyUser } = verifyUserSlice.actions;
export default verifyUserSlice.reducer;
