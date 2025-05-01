/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer, liveServer, sendError } from "../constants/constant";
import axios from "axios";

const initialState = {
  sendResetLoading: false,
  sendResetError: false,
  resetLinkSent: false,
  resetPassLoading: false,
  resetPassError: false,
  passReset: false,
};

export const sendPassResetLink = createAsyncThunk(
  "resetpass/sendPassResetLink",
  async (formData) => {
    try {
      const url = `${liveServer}/resetlink`;
      console.log(formData);
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      sendError(error);
      //   throw error;
    }
  }
);

export const verifyAndReset = createAsyncThunk(
  "resetpass/verifyAndReset",
  async (formData) => {
    try {
      const url = `${liveServer}/resetlink`;
      //   console.log(formData);
      const response = await axios.put(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      sendError(error);
      //   throw error;
    }
  }
);

const resetPassSlice = createSlice({
  name: "resetpass",
  initialState,
  reducers: {
    clearResetPass(state) {
      state.resetLinkSent = false;
      state.sendResetError = false;
      state.sendResetLoading = false;
    },
    clearLinkVerification(state) {
      state.passReset = false;
      state.resetPassError = false;
      state.resetPassLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendPassResetLink.pending, (state) => {
        state.sendResetLoading = true;
      })
      .addCase(sendPassResetLink.fulfilled, (state) => {
        state.sendResetLoading = false;
        state.sendResetError = false;
        state.resetLinkSent = true;
      })
      .addCase(sendPassResetLink.rejected, (state, action) => {
        state.sendResetLoading = false;
        state.sendResetError = action.error.message;
        state.resetLinkSent = false;
      });
    builder
      .addCase(verifyAndReset.pending, (state) => {
        state.resetPassLoading = true;
      })
      .addCase(verifyAndReset.fulfilled, (state) => {
        state.resetPassLoading = false;
        state.resetPassError = false;
        state.passReset = true;
      })
      .addCase(verifyAndReset.rejected, (state, action) => {
        state.resetPassLoading = false;
        state.resetPassError = action.error.message;
        state.passReset = false;
      });
  },
});

export const { clearResetPass, clearLinkVerification } = resetPassSlice.actions;
export default resetPassSlice.reducer;
