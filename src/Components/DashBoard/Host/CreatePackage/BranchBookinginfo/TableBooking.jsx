import { useState } from "react";
import PrintModal from "../PrintModal";


const TableBooking = ({ booking, onView }) => {

    const [bookingInfo, setBookingInfo] = useState(null);
    const [isOpen, setIsOpen] = useState(false);


    const closeModal = () => {
        setIsOpen(false);
    };

    const print = () => {
        setBookingInfo(booking);
        setIsOpen(true);
    }

    return (
        <>
            <tr className="font-rancho">
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{booking?.idx}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{booking?.bookingTimestamp}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <div className='flex items-center'>
                        <p className='text-gray-900 whitespace-no-wrap'>
                            {booking?.senderName}
                        </p>
                    </div>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{booking?.recipientName}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{booking?.senderMobile}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{booking?.recipientMobile}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{booking?.productDetails}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <button
                        onClick={() => onView(booking)}
                        className='text-blue-500 hover:underline'
                    >
                        View
                    </button>
                </td>

                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">

                    {/* Button to print StickerDetails */}
                    <button
                        onClick={print}
                        className='text-blue-500 hover:underline'
                    >
                        Print
                    </button>
                </td>
            </tr>
            <PrintModal closeModal={closeModal} isOpen={isOpen} bookingInfo={bookingInfo}></PrintModal>
        </>
    );
};
export default TableBooking;