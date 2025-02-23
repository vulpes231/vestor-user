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
  getWalletLoading: false,
  getWalletError: false,
  userWallets: false,
  getBalanceLoading: false,
  getBalanceError: false,
  balance: false,
};

export const getUserWallets = createAsyncThunk(
  "wallet/getUserWallets",
  async () => {
    const url = `${devServer}/wallet`;
    try {
      const accessToken = getAccessToken();
      const response = await axios.get(url, {
        headers: {
          "Content-Length": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      sendError(error);
    }
  }
);

export const getBalance = createAsyncThunk("wallet/getBalance", async () => {
  const url = `${liveServer}/wallet/balance`;
  try {
    const accessToken = getAccessToken();
    const response = await axios.get(url, {
      headers: {
        "Content-Length": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    sendError(error);
  }
});

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserWallets.pending, (state) => {
        state.getWalletLoading = true;
      })
      .addCase(getUserWallets.fulfilled, (state, action) => {
        state.getWalletLoading = false;
        state.getWalletError = false;
        state.userWallets = action.payload.wallets;
      })
      .addCase(getUserWallets.rejected, (state, action) => {
        state.getWalletLoading = false;
        state.getWalletError = action.error.message;
        state.userWallets = false;
      });
    builder
      .addCase(getBalance.pending, (state) => {
        state.getBalanceLoading = true;
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        state.getBalanceLoading = false;
        state.getBalanceError = false;
        state.balance = action.payload.balance;
      })
      .addCase(getBalance.rejected, (state, action) => {
        state.getBalanceLoading = false;
        state.getBalanceError = action.error.message;
        state.balance = false;
      });
  },
});

export default walletSlice.reducer;
