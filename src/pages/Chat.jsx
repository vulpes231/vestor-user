/* eslint-disable no-unused-vars */
import React from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { ticketId } = useParams();

  console.log(ticketId);
  return (
    <div className="bg-red-200">
      <h3>This is ur ticket {ticketId}</h3>
    </div>
  );
};

export default Chat;
