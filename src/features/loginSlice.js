import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devServer, sendError } from "../constants/constant";

const initialState = {
  loginLoading: false,
  loginError: false,
  accessToken: false,
};

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (formData) => {
    const url = `${devServer}/auth`;
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      sendError(error);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    resetLogin(state) {
      state.loginLoading = false;
      state.loginError = false;
      state.accessToken = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.accessToken = action.payload.accessToken;
        state.loginError = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.accessToken = false;
        state.loginError = action.error.message;
      });
  },
});

export const { resetLogin } = loginSlice.actions;
export default loginSlice.reducer;
