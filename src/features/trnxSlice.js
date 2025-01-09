import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer, getAccessToken, sendError } from "../constants/constant";
import axios from "axios";

const initialState = {
  getTrnxLoading: false,
  getTrnxError: false,
  userTrnxs: false,
};

export const getUserTrnxs = createAsyncThunk("trnx/getUserTrnxs", async () => {
  const url = `${devServer}/trnxs`;
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

const trnxSlice = createSlice({
  name: "trnx",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserTrnxs.pending, (state) => {
        state.getTrnxLoading = true;
      })
      .addCase(getUserTrnxs.fulfilled, (state, action) => {
        state.getTrnxLoading = false;
        state.getTrnxError = false;
        state.userTrnxs = action.payload;
      })
      .addCase(getUserTrnxs.rejected, (state, action) => {
        state.getTrnxLoading = false;
        state.getTrnxError = action.error.message;
        state.userTrnxs = false;
      });
  },
});

export default trnxSlice.reducer;
