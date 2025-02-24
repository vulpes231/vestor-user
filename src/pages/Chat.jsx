/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAccessToken } from "../constants/constant";
import {
  getTicketById,
  replyTicket,
  resetReplyTicket,
} from "../features/ticketSlice";

const Chat = () => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const { ticketId } = useParams();

  const { ticket, ticketReplied, replyTicketLoading } = useSelector(
    (state) => state.ticket
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (accessToken && ticketId) {
      dispatch(getTicketById(ticketId));
    }
  }, [accessToken, ticketId, dispatch]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      dispatch(replyTicket({ ticketId, message }));
    }
    setMessage("");
  };

  useEffect(() => {
    let timeout;
    if (ticketReplied) {
      timeout = setTimeout(() => {
        dispatch(resetReplyTicket());
        dispatch(getTicketById(ticketId));
      }, 3000);
    }
    return () => clearTimeout();
  }, [ticketReplied, dispatch, ticketId]);

  return (
    <div className="h-full p-6 flex flex-col gap-2">
      <div>
        <h3 className="text-[14px] font-medium">
          Welcome to Vestor Markets Live Chat
        </h3>
        <h6 className="text-[14px] font-medium">
          Our agent will be with you shortly
        </h6>
        <small>Your ticket ID: {ticketId}</small>
      </div>

      {/* Message Area */}
      <div className="h-[400px] overflow-y-scroll p-[10px] mb-[10px] border border-slate-300/20">
        {ticket?.messages?.length > 0 ? (
          ticket.messages.map((message, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  message.sender === "67bb07a9b3e35d484a2d6605"
                    ? "flex-start"
                    : "flex-end",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  maxWidth: "60%",
                  padding: "8px",
                  backgroundColor:
                    message.sender === "67bb07a9b3e35d484a2d6605"
                      ? "#e1e1e1"
                      : "#4CAF50",
                  color:
                    message.sender === "67bb07a9b3e35d484a2d6605"
                      ? "#000"
                      : "#fff",
                  borderRadius: "10px",
                }}
              >
                {message.msg}
              </div>
            </div>
          ))
        ) : (
          <div>No messages yet.</div>
        )}
      </div>

      {/* Show reply notification */}
      {ticketReplied && (
        <div
          style={{
            textAlign: "center",
            marginBottom: "10px",
            color: "#4CAF50",
          }}
        >
          <p>A reply has been sent.</p>
        </div>
      )}

      {/* Input Area */}
      <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          className="flex flex-1 p-[10px] mr-[10px] rounded-[5px] border border-slate-300 outline-none text-slate-800"
          name="message"
        />
        <button
          onClick={handleSendMessage}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {!replyTicketLoading ? "Send" : "Wait..."}
        </button>
      </div>
    </div>
  );
};

export default Chat;
