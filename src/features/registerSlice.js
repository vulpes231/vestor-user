/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devServer, liveServer, sendError } from "../constants/constant";

const initialState = {
  registerLoading: false,
  registerError: false,
  accessToken: false,
  emailCode: false,
};

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (formData) => {
    const url = `${devServer}/signup`;
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      sendError(error);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    resetRegister(state) {
      state.registerLoading = false;
      state.registerError = false;
      state.accessToken = false;
      state.emailCode = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.accessToken = action.payload.accessToken;
        state.emailCode = action.payload.code;
        state.registerError = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerLoading = false;
        state.accessToken = false;
        state.emailCode = false;
        state.registerError = action.error.message;
      });
  },
});

export const { resetRegister } = registerSlice.actions;
export default registerSlice.reducer;
