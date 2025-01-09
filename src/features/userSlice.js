import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer, getAccessToken, sendError } from "../constants/constant";
import axios from "axios";

const initialState = {
  getUserLoading: false,
  getUserError: false,
  userInfo: false,
  changePassLoading: false,
  changePassError: false,
  passwordChanged: false,
};

export const getUserInfo = createAsyncThunk("user/getUserInfo", async () => {
  const url = `${devServer}/user`;
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetPassChange(state) {
      state.changePassLoading = false;
      state.changePassError = false;
      state.passwordChanged = false;
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
        state.userInfo = action.payload;
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
  },
});

export const { resetPassChange } = userSlice.actions;
export default userSlice.reducer;
