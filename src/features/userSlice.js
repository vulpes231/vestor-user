import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  devServer,
  getAccessToken,
  liveServer,
  sendError,
} from "../constants/constant";
import axios from "axios";

const initialState = {
  getUserLoading: false,
  getUserError: false,
  userInfo: false,
  changePassLoading: false,
  changePassError: false,
  passwordChanged: false,
  logoutLoading: false,
  logoutError: false,
  loggedOut: false,
};

export const getUserInfo = createAsyncThunk("user/getUserInfo", async () => {
  const url = `${liveServer}/user`;
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

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (formData) => {
    const url = `${devServer}/user/changepass`;
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

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  const url = `${liveServer}/user/logout`;
  try {
    const accessToken = getAccessToken();
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          "Content-Length": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    sendError(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetPassChange(state) {
      state.changePassLoading = false;
      state.changePassError = false;
      state.passwordChanged = false;
    },
    resetLogout(state) {
      state.logoutLoading = false;
      state.logoutError = false;
      state.loggedOut = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.getUserLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.getUserLoading = false;
        state.getUserError = false;
        state.userInfo = action.payload.user;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.getUserLoading = false;
        state.getUserError = action.error.message;
        state.userInfo = false;
      });

    builder
      .addCase(changePassword.pending, (state) => {
        state.changePassLoading = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.changePassLoading = false;
        state.changePassError = false;
        state.passwordChanged = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.changePassLoading = false;
        state.changePassError = action.error.message;
        state.passwordChanged = false;
      });

    builder
      .addCase(logoutUser.pending, (state) => {
        state.logoutLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.logoutLoading = false;
        state.logoutError = false;
        state.loggedOut = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.logoutLoading = false;
        state.logoutError = action.error.message;
        state.loggedOut = false;
      });
  },
});

export const { resetPassChange, resetLogout } = userSlice.actions;
export default userSlice.reducer;
