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
  updateUserLoading: false,
  updateUserError: false,
  userUpdated: false,
};

export const updateUser = createAsyncThunk(
  "updateuser/updateUser",
  async (formData) => {
    const url = `${devServer}/user`;
    const accessToken = getAccessToken();
    try {
      const response = await axios.put(url, formData, {
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

const updateUserSlice = createSlice({
  name: "updateuser",
  initialState,
  reducers: {
    resetUpdateUser(state) {
      state.updateUserLoading = false;
      state.updateUserError = false;
      state.userUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.updateUserLoading = true;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.updateUserLoading = false;
        state.updateUserError = false;
        state.userUpdated = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUserLoading = false;
        state.updateUserError = action.error.message;
        state.userUpdated = false;
      });
  },
});

export const { resetUpdateUser } = updateUserSlice.actions;
export default updateUserSlice.reducer;
