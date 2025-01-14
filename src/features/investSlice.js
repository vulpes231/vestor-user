import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  devServer,
  getAccessToken,
  liveServer,
  sendError,
} from "../constants/constant";
import axios from "axios";

const initialState = {
  getPlanLoading: false,
  getPlanError: false,
  plans: false,
  getBotLoading: false,
  getBotError: false,
  bots: false,
  buyPlanLoading: false,
  buyPlanError: false,
  planBought: false,
};

export const getInvestmentPlans = createAsyncThunk(
  "invest/getInvestmentPlans",
  async () => {
    const url = `${liveServer}/pool/plan`;
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

export const getUserBots = createAsyncThunk("invest/getUserBots", async () => {
  const url = `${devServer}/pool`;
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

export const buyPlans = createAsyncThunk(
  "invest/buyPlans",
  async (formData) => {
    const url = `${devServer}/pool`;
    try {
      const accessToken = getAccessToken();
      const response = await axios.post(url, formData, {
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

const investSlice = createSlice({
  name: "invest",
  initialState,
  reducers: {
    resetBuyPlan(state) {
      state.buyPlanLoading = false;
      state.buyPlanError = false;
      state.planBought = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInvestmentPlans.pending, (state) => {
        state.getPlanLoading = true;
      })
      .addCase(getInvestmentPlans.fulfilled, (state, action) => {
        state.getPlanLoading = false;
        state.getPlanError = false;
        state.plans = action.payload.plans;
      })
      .addCase(getInvestmentPlans.rejected, (state, action) => {
        state.getPlanLoading = false;
        state.getPlanError = action.error.message;
        state.plans = false;
      });

    builder
      .addCase(getUserBots.pending, (state) => {
        state.getBotLoading = true;
      })
      .addCase(getUserBots.fulfilled, (state, action) => {
        state.getBotLoading = false;
        state.getBotError = false;
        state.bots = action.payload.userBots;
      })
      .addCase(getUserBots.rejected, (state, action) => {
        state.getBotLoading = false;
        state.getBotError = action.error.message;
        state.bots = false;
      });

    builder
      .addCase(buyPlans.pending, (state) => {
        state.buyPlanLoading = true;
      })
      .addCase(buyPlans.fulfilled, (state) => {
        state.buyPlanLoading = false;
        state.buyPlanError = false;
        state.planBought = true;
      })
      .addCase(buyPlans.rejected, (state, action) => {
        state.buyPlanLoading = false;
        state.buyPlanError = action.error.message;
        state.bots = false;
      });
  },
});

export const { resetBuyPlan } = investSlice.actions;
export default investSlice.reducer;
