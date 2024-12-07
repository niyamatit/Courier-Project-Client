

import { useState } from "react";
import OfflinePrintModal from "../CreatePackage/BookingForm/OfflinePrintModal";

const TableOffline = ({ offline, onView }) => {
  const [offlineBookingShow, setOfflineBooking] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  const print = () => {
    setOfflineBooking(offline);
    setIsOpen(true);
  };

  return (
    <>
      <tr className="font-rancho">
        <td className="px-5 py-5 border-b bg-white text-sm">{offline.senderName}</td>
        <td className="px-5 py-5 border-b bg-white text-sm">{offline.receiverName}</td>
        <td className="px-5 py-5 border-b bg-white text-sm">{offline.bookingDate}</td>
        <td className="px-5 py-5 border-b bg-white text-sm">{offline.receiverContactNo}</td>
        <td className="px-5 py-5 border-b bg-white text-sm">{offline.CnNumber}</td>
        <td className="px-5 py-5 border-b bg-white text-sm">
          <button onClick={() => onView(offline)} className="text-blue-500 hover:underline">
            View
          </button>
        </td>
        <td className="px-5 py-5 border-b bg-white text-sm">
          <button onClick={print} className="text-blue-500 hover:underline">
            Print
          </button>
        </td>
      </tr>
      <OfflinePrintModal closeModal={closeModal} isOpen={isOpen} offlineBookingShow={offlineBookingShow} />
    </>
  );
};

export default TableOffline;


