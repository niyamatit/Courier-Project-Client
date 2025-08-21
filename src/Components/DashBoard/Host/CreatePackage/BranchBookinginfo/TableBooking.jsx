import { useState } from "react";
import PrintModal from "../PrintModal";
import MotherHubModal from "./MotherHubModal";
import useUsersData from "../../../../../hooks/useUsersData/useUsersData";


const TableBooking = ({ booking, onView ,onSave }) => {

    const [bookingInfo, setBookingInfo] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isHubModalOpen, setIsHubModalOpen] = useState(false);
    const closeHubModal = () => setIsHubModalOpen(false);
    const openHubModal = () => setIsHubModalOpen(true);
    const [verifiedUser] = useUsersData();
    const closeModal = () => {
        setIsOpen(false);
    };

    const print = () => {
        setBookingInfo(booking);
        setIsOpen(true);
    }
    const formatTime = (utcTime) => {
        const date = new Date(utcTime);
    
        // Extract components
        const day = date.toLocaleString('en-US', { day: '2-digit', timeZone: 'Asia/Dhaka' });
        const month = date.toLocaleString('en-US', { month: '2-digit', timeZone: 'Asia/Dhaka' });
        const year = date.toLocaleString('en-US', { year: 'numeric', timeZone: 'Asia/Dhaka' });
    
        // Combine in DD/MM/YYYY format
        return `${day}/${month}/${year}`;
    };
    

    return (
        <>
            <tr className="font-rancho">
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{booking?.idx}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{formatTime(booking?.booking)}</p>
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
                    <p className='text-gray-900 whitespace-no-wrap'>{booking?.CnNumber}</p>
                </td>
               {
                verifiedUser?.role === 'admin' &&  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    {/* <p className='text-gray-900 whitespace-no-wrap'>{booking?.requestStatus || 'No Request'}</p> */}
                    {
    booking?.requestStatus === "pending" ? 
    <button
        onClick={() => onSave({ ...booking, requestStatus: "accept" })}
        className='text-blue-500 hover:underline'
    >
        Accept
    </button>
    :
   <>
   {
    booking?.requestStatus === "accept" ? <p className='text-green-500'>
  
  accepted

    </p>
    :
     'No Request'
   }
   
   </>
}
                </td>
               }
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
                {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">

                   
                    {
                      booking?.Tracking_Admin_Select_Online_MotherHub_Branch_email ? <h1 className="text-green-400">Already Selected</h1> :  <button onClick={openHubModal} className="text-blue-500">
                      Select MotherHub
                  </button>
                    }
                   
                </td> */}
            </tr>
            <MotherHubModal
                isOpen={isHubModalOpen}
                onClose={closeHubModal}
                onSave={onSave}
                booking={booking}
            />
            <PrintModal closeModal={closeModal} isOpen={isOpen} bookingInfo={bookingInfo}></PrintModal>
        </>
    );
};
export default TableBooking;