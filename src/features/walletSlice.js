import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer, getAccessToken, sendError } from "../constants/constant";
import axios from "axios";

const initialState = {
  getWalletLoading: false,
  getWalletError: false,
  userWallets: false,
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
        state.userWallets = action.payload;
      })
      .addCase(getUserWallets.rejected, (state, action) => {
        state.getWalletLoading = false;
        state.getWalletError = action.error.message;
        state.userWallets = false;
      });
  },
});

export default walletSlice.reducer;
