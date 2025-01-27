// TableOffline.jsx
import { useState } from "react";
import OfflinePrintModal from "../DashBoard/Host/CreatePackage/BookingForm/OfflinePrintModal";

const TableOffline = ({ offline, onView }) => {
    const [offlineBookingShow, setOfflineBooking] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const print = () => {
        setOfflineBooking(offline);
        setIsOpen(true);
    };

    return (
        <>
            <tr className="font-rancho">
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {offline?.senderName}
                    </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {offline?.receiverName}
                    </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {offline?.bookingDate}
                    </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {offline?.receiverContactNo}
                    </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {offline?.CnNumber}
                    </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button
                        onClick={() => onView(offline)}
                        className="text-blue-500 hover:underline"
                    >
                        View
                    </button>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button
                        onClick={print}
                        className="text-blue-500 hover:underline"
                    >
                        Print
                    </button>
                </td>
            </tr>
            <OfflinePrintModal
                closeModal={closeModal}
                isOpen={isOpen}
                offlineBookingShow={offlineBookingShow}
                bookingInfo={offlineBookingShow}
            ></OfflinePrintModal>
        </>
    );
};

export default TableOffline;
