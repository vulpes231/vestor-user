/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import Ticketmodal from "../components/Ticketmodal";

const headers = ["subject", "date created", "status", "last updated", "action"];

const ticketStyle = {
  th: "py-2 px-3 whitespace-nowrap font-medium capitalize text-[14px] lg:text-[16px]",
  td: "py-2 px-3 whitespace-nowrap font-medium capitalize text-[14px] lg:text-[16px]",
};

const Ticket = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };
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
              <tr className="bg-white text-zinc-900">
                {headers.map((hd, index) => {
                  return (
                    <th key={index} className={ticketStyle.th}>
                      <span className="flex items-center gap-1">
                        <h6>{hd}</h6>
                        <TiArrowSortedDown />
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>

      {showModal && <Ticketmodal close={closeModal} />}
    </section>
  );
};

export default Ticket;
