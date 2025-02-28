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
  userTradeLoading: false,
  userTradeError: false,
  userTrades: false,
  getCountLoading: false,
  getCountError: false,
  activeTradeCount: false,
  getProfitLoading: false,
  getProfitError: false,
  totalProfit: false,
};

export const getUserTrades = createAsyncThunk(
  "trade/getUserTrades",
  async () => {
    const url = `${liveServer}/trade`;
    const accessToken = getAccessToken();
    try {
      const response = await axios.get(url, {
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

export const getActiveTradeCount = createAsyncThunk(
  "trade/getActiveTradeCount",
  async () => {
    const url = `${liveServer}/trade/active`;
    const accessToken = getAccessToken();
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      sendError(error);
    }
  }
);

export const getTotalProfit = createAsyncThunk(
  "trade/getTotalProfit",
  async () => {
    const url = `${liveServer}/trade/profit`;
    const accessToken = getAccessToken();
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      sendError(error);
    }
  }
);

const tradeSlice = createSlice({
  name: "trade",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserTrades.pending, (state) => {
        state.userTradeLoading = true;
      })
      .addCase(getUserTrades.fulfilled, (state, action) => {
        state.userTradeLoading = false;
        state.userTradeError = false;
        state.userTrades = action.payload.userTrades;
      })
      .addCase(getUserTrades.rejected, (state, action) => {
        state.userTradeLoading = false;
        state.userTradeError = action.error.message;
        state.userTrades = false;
      });

    builder
      .addCase(getActiveTradeCount.pending, (state) => {
        state.getCountLoading = true;
      })
      .addCase(getActiveTradeCount.fulfilled, (state, action) => {
        state.getCountLoading = false;
        state.getCountError = false;
        state.activeTradeCount = action.payload.activeCount;
      })
      .addCase(getActiveTradeCount.rejected, (state, action) => {
        state.getCountLoading = false;
        state.getCountError = action.error.message;
        state.activeTradeCount = false;
      });

    builder
      .addCase(getTotalProfit.pending, (state) => {
        state.getProfitLoading = true;
      })
      .addCase(getTotalProfit.fulfilled, (state, action) => {
        state.getProfitLoading = false;
        state.getProfitError = false;
        state.totalProfit = action.payload.totalProfit;
      })
      .addCase(getTotalProfit.rejected, (state, action) => {
        state.getProfitLoading = false;
        state.getProfitError = action.error.message;
        state.totalProfit = false;
      });
  },
});

export default tradeSlice.reducer;
