/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import Ticketmodal from "../components/Ticketmodal";
import { getAccessToken } from "../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { getUserTickets } from "../features/ticketSlice";
import { IoIosChatboxes } from "react-icons/io";
import LoadingModal from "../components/LoadingModal";
import { useNavigate } from "react-router-dom";

const headers = ["subject", "date created", "status", "last updated", "action"];

const ticketStyle = {
  th: "py-2 px-3 whitespace-nowrap font-medium capitalize text-[14px] lg:text-[16px] ",
  td: "py-4 px-3 whitespace-nowrap font-light capitalize text-[14px] lg:text-[16px] text-slate-300 border-b border-zinc-700 text-center",
};

const Ticket = () => {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 10;

  const { userTickets, userTicketsLoading } = useSelector(
    (state) => state.ticket
  );

  // Paginate the tickets
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets =
    userTickets && userTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleClick = (ticketId) => {
    console.log(ticketId);
    navigate(`/chat/${ticketId}`);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserTickets());
    }
  }, [accessToken, dispatch]);

  if (userTicketsLoading) {
    return <LoadingModal text={"Fetching tickets..."} />;
  }

  return (
    <section>
      <div>
        <div className="flex items-center justify-between p-6">
          <h3 className="capitalize font-semibold text-[16px]">my tickets</h3>

          <button
            onClick={() => setShowModal((prev) => !prev)}
            className="bg-green-600 text-white rounded-[5px] px-3 py-2"
          >
            Create new ticket
          </button>
        </div>

        <div className="overflow-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-white text-zinc-900 text-center">
                {headers.map((hd, index) => {
                  if (hd === "date created" || hd === "last updated") {
                    return (
                      <th
                        key={index}
                        className={`${ticketStyle.th} hidden lg:table-cell`}
                      >
                        <div className="flex justify-center items-center gap-1">
                          <h6>{hd}</h6>
                          <TiArrowSortedDown />
                        </div>
                      </th>
                    );
                  }
                  return (
                    <th key={index} className={ticketStyle.th}>
                      <div className="flex justify-center items-center gap-1">
                        <h6>{hd}</h6>
                        <TiArrowSortedDown />
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {currentTickets.length ? (
                currentTickets.map((ticket) => {
                  return (
                    <tr key={ticket._id}>
                      <td className={ticketStyle.td}>{ticket.subject}</td>
                      <td className={`${ticketStyle.td} hidden lg:table-cell`}>
                        {ticket.createdAt}
                      </td>
                      <td className={ticketStyle.td}>
                        <span
                          className={`${
                            ticket.status === "open"
                              ? "bg-green-600/20"
                              : "bg-red-600"
                          } px-3 py-1 rounded-[5px]`}
                        >
                          {ticket.status}
                        </span>
                      </td>
                      <td className={`${ticketStyle.td} hidden lg:table-cell`}>
                        {ticket.updatedAt}
                      </td>
                      <td>
                        <div
                          onClick={() => handleClick(ticket._id)}
                          className="flex items-center justify-center gap-2 w-full cursor-pointer"
                        >
                          <IoIosChatboxes /> view
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    You have no tickets.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l"
          >
            Previous
          </button>
          <span className="px-4 py-2">{currentPage}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage * ticketsPerPage >= userTickets.length}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r"
          >
            Next
          </button>
        </div>
      </div>

      {showModal && <Ticketmodal close={closeModal} />}
    </section>
  );
};

export default Ticket;
