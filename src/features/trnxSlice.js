import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  devServer,
  getAccessToken,
  liveServer,
  sendError,
} from "../constants/constant";
import axios from "axios";

const initialState = {
  getTrnxLoading: false,
  getTrnxError: false,
  userTrnxs: false,
  depositLoading: false,
  depositError: false,
  depositSucess: false,
  withdrawLoading: false,
  withdrawError: false,
  withdrawSucess: false,
  transferLoading: false,
  transferError: false,
  transferSucess: false,
};

export const getUserTrnxs = createAsyncThunk("trnx/getUserTrnxs", async () => {
  const url = `${devServer}/trnx`;
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

export const depositFunds = createAsyncThunk(
  "trnx/depositFunds",
  async (formData) => {
    const url = `${liveServer}/trnx/deposit`;
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

export const withdrawFunds = createAsyncThunk(
  "trnx/withdrawFunds",
  async (formData) => {
    const url = `${devServer}/trnx/withdraw`;
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

export const transferFunds = createAsyncThunk(
  "trnx/transferFunds",
  async (formData) => {
    const url = `${liveServer}/trnx/transfer`;
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

const trnxSlice = createSlice({
  name: "trnx",
  initialState,
  reducers: {
    resetDeposit(state) {
      state.depositLoading = false;
      state.depositError = false;
      state.depositSucess = false;
    },
    resetWithdraw(state) {
      state.withdrawLoading = false;
      state.withdrawError = false;
      state.withdrawSucess = false;
    },
    resetTransfer(state) {
      state.transferLoading = false;
      state.transferError = false;
      state.transferSucess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserTrnxs.pending, (state) => {
        state.getTrnxLoading = true;
      })
      .addCase(getUserTrnxs.fulfilled, (state, action) => {
        state.getTrnxLoading = false;
        state.getTrnxError = false;
        state.userTrnxs = action.payload.userTrnxs;
      })
      .addCase(getUserTrnxs.rejected, (state, action) => {
        state.getTrnxLoading = false;
        state.getTrnxError = action.error.message;
        state.userTrnxs = false;
      });

    builder
      .addCase(depositFunds.pending, (state) => {
        state.depositLoading = true;
      })
      .addCase(depositFunds.fulfilled, (state) => {
        state.depositLoading = false;
        state.depositError = false;
        state.depositSucess = true;
      })
      .addCase(depositFunds.rejected, (state, action) => {
        state.depositLoading = false;
        state.depositError = action.error.message;
        state.depositSucess = false;
      });

    builder
      .addCase(withdrawFunds.pending, (state) => {
        state.withdrawLoading = true;
      })
      .addCase(withdrawFunds.fulfilled, (state) => {
        state.withdrawLoading = false;
        state.withdrawError = false;
        state.withdrawSucess = true;
      })
      .addCase(withdrawFunds.rejected, (state, action) => {
        state.withdrawLoading = false;
        state.withdrawError = action.error.message;
        state.withdrawSucess = false;
      });

    builder
      .addCase(transferFunds.pending, (state) => {
        state.transferLoading = true;
      })
      .addCase(transferFunds.fulfilled, (state) => {
        state.transferLoading = false;
        state.transferError = false;
        state.transferSucess = true;
      })
      .addCase(transferFunds.rejected, (state, action) => {
        state.transferLoading = false;
        state.transferError = action.error.message;
        state.transferSucess = false;
      });
  },
});

export const { resetDeposit, resetTransfer, resetWithdraw } = trnxSlice.actions;
export default trnxSlice.reducer;
