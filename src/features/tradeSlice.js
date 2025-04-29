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
  openPositionLoading: false,
  openPositionError: false,
  positionOpened: false,
  closePositionLoading: false,
  closePositionError: false,
  positionClosed: false,
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
      // console.log(response.data);
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

export const openPosition = createAsyncThunk(
  "trade/openPosition",
  async (formData) => {
    const url = `${liveServer}/trade`;
    const accessToken = getAccessToken();
    try {
      const response = await axios.post(url, formData, {
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

export const closePosition = createAsyncThunk(
  "trade/closePosition",
  async (formData) => {
    const url = `${liveServer}/trade`;
    const accessToken = getAccessToken();
    try {
      const response = await axios.put(url, formData, {
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
  reducers: {
    resetOpenPosition(state) {
      state.openPositionError = false;
      state.openPositionLoading = false;
      state.positionOpened = false;
    },
    resetClosePosition(state) {
      state.closePositionError = false;
      state.closePositionLoading = false;
      state.positionClosed = false;
    },
  },
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
    builder
      .addCase(openPosition.pending, (state) => {
        state.openPositionLoading = true;
      })
      .addCase(openPosition.fulfilled, (state) => {
        state.openPositionLoading = false;
        state.openPositionError = false;
        state.positionOpened = true;
      })
      .addCase(openPosition.rejected, (state, action) => {
        state.openPositionLoading = false;
        state.openPositionError = action.error.message;
        state.positionOpened = false;
      });
    builder
      .addCase(closePosition.pending, (state) => {
        state.closePositionLoading = true;
      })
      .addCase(closePosition.fulfilled, (state) => {
        state.closePositionLoading = false;
        state.closePositionError = false;
        state.positionClosed = true;
      })
      .addCase(closePosition.rejected, (state, action) => {
        state.closePositionLoading = false;
        state.closePositionError = action.error.message;
        state.positionClosed = false;
      });
  },
});

export const { resetClosePosition, resetOpenPosition } = tradeSlice.actions;

export default tradeSlice.reducer;
