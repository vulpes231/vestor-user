import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer, getAccessToken, sendError } from "../constants/constant";
import axios from "axios";

const initialState = {
  createTicketLoading: false,
  createTicketError: false,
  ticketCreated: false,
};

export const createTicket = createAsyncThunk(
  "ticket/createTicket",
  async (formData) => {
    try {
      const url = `${devServer}`;
      const accessToken = getAccessToken();
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      sendError(error);
    }
  }
);

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    resetCreateTicket(state) {
      state.createTicketError = false;
      state.createTicketLoading = false;
      state.ticketCreated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.createTicketLoading = true;
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.createTicketError = false;
        state.createTicketLoading = false;
        state.ticketCreated = true;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.createTicketError = action.error.message;
        state.createTicketLoading = false;
        state.ticketCreated = false;
      });
  },
});

export default ticketSlice.reducer;
