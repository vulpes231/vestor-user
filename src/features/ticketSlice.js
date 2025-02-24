import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer, getAccessToken, sendError } from "../constants/constant";
import axios from "axios";

const initialState = {
  createTicketLoading: false,
  createTicketError: false,
  ticketCreated: false,
  userTicketsLoading: false,
  userTicketsError: false,
  userTickets: false,
  ticketLoading: false,
  ticketError: false,
  ticket: false,
  replyTicketLoading: false,
  replyTicketError: false,
  ticketReplied: false,
};

export const createTicket = createAsyncThunk(
  "ticket/createTicket",
  async (formData) => {
    try {
      const url = `${devServer}/ticket`;
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

export const getUserTickets = createAsyncThunk(
  "ticket/getUserTickets",
  async () => {
    try {
      const url = `${devServer}/ticket`;
      const accessToken = getAccessToken();
      const response = await axios.get(url, {
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

export const getTicketById = createAsyncThunk(
  "ticket/getTicketById",
  async (ticketId) => {
    try {
      const url = `${devServer}/ticket/${ticketId}`;
      const accessToken = getAccessToken();
      const response = await axios.get(url, {
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

export const replyTicket = createAsyncThunk(
  "ticket/replyTicket",
  async (formData) => {
    try {
      const url = `${devServer}/ticket/reply`;
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
    resetReplyTicket(state) {
      state.replyTicketError = false;
      state.replyTicketLoading = false;
      state.ticketReplied = false;
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

    builder
      .addCase(getUserTickets.pending, (state) => {
        state.userTicketsLoading = true;
      })
      .addCase(getUserTickets.fulfilled, (state, action) => {
        state.userTicketsError = false;
        state.userTicketsLoading = false;
        state.userTickets = action.payload.tickets;
      })
      .addCase(getUserTickets.rejected, (state, action) => {
        state.userTicketsError = action.error.message;
        state.userTicketsLoading = false;
        state.userTickets = false;
      });

    builder
      .addCase(getTicketById.pending, (state) => {
        state.ticketLoading = true;
      })
      .addCase(getTicketById.fulfilled, (state, action) => {
        state.ticketError = false;
        state.ticketLoading = false;
        state.ticket = action.payload.ticket;
      })
      .addCase(getTicketById.rejected, (state, action) => {
        state.ticketError = action.error.message;
        state.ticketLoading = false;
        state.ticket = false;
      });

    builder
      .addCase(replyTicket.pending, (state) => {
        state.replyTicketLoading = true;
      })
      .addCase(replyTicket.fulfilled, (state) => {
        state.replyTicketError = false;
        state.replyTicketLoading = false;
        state.ticketReplied = true;
      })
      .addCase(replyTicket.rejected, (state, action) => {
        state.replyTicketError = action.error.message;
        state.replyTicketLoading = false;
        state.ticketReplied = false;
      });
  },
});

export const { resetCreateTicket, resetReplyTicket } = ticketSlice.actions;

export default ticketSlice.reducer;
