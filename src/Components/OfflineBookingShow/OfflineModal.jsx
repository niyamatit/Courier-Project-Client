import { useState } from "react";

const OfflineModal = ({ booking, onClose, onSave }) => {
    if (!booking) return null;

    const [editableBooking, setEditableBooking] = useState({ ...booking });
    const [isEditing, setIsEditing] = useState(false); // Track edit mode

    const formatTime = (utcTime) => {
        const options = {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Asia/Dhaka',
        };
        return new Date(utcTime).toLocaleString('en-US', options);
    };

   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableBooking((prevBooking) => ({
            ...prevBooking,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onSave(editableBooking); // Save the updated booking
        setIsEditing(false); // Exit edit mode
        onClose();
    };

    return (
         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center overflow-y-auto">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-3xl max-h-screen overflow-y-auto relative">
                <h2 className="text-xl font-bold mb-4">
                    {isEditing ? "Edit Booking Details" : "Booking Details"}
                </h2>

                {isEditing ? (
                     <>
                     <label className="block mb-2">
                         <span className="text-gray-700">Sender Name:</span>
                         <input
                             type="text"
                             name="senderName"
                             value={editableBooking.senderName || ""}
                             onChange={handleChange}
                             className="mt-1 block w-full border-gray-300 rounded-md"
                         />
                     </label>
                     <label className="block mb-2">
                         <span className="text-gray-700">Recipient Name:</span>
                         <input
                             type="text"
                             name="receiverName"
                             value={editableBooking.receiverName || ""}
                             onChange={handleChange}
                             className="mt-1 block w-full border-gray-300 rounded-md"
                         />
                     </label>
                     <label className="block mb-2">
                         <span className="text-gray-700">Sender Mobile:</span>
                         <input
                             type="text"
                             name="senderContactNo"
                             value={editableBooking.senderContactNo || ""}
                             onChange={handleChange}
                             className="mt-1 block w-full border-gray-300 rounded-md"
                         />
                     </label>
                     <label className="block mb-2">
                         <span className="text-gray-700">Recipient Mobile:</span>
                         <input
                             type="text"
                             name="receiverContactNo"
                             value={editableBooking.receiverContactNo || ""}
                             onChange={handleChange}
                             className="mt-1 block w-full border-gray-300 rounded-md"
                         />
                     </label>
                     <label className="block mb-2">
                         <span className="text-gray-700">Product Details:</span>
                         <input
                             type="text"
                             name="product"
                             value={editableBooking.product || ""}
                             onChange={handleChange}
                             className="mt-1 block w-full border-gray-300 rounded-md"
                         />
                     </label>
                     <label className="block mb-2">
                         <span className="text-gray-700">Quantity:</span>
                         <input
                             type="number"
                             name="qty"
                             value={editableBooking.qty || ""}
                             onChange={handleChange}
                             className="mt-1 block w-full border-gray-300 rounded-md"
                         />
                     </label>
                 </>
                ) : (
                    <>
                        <p><strong>Sender Name:</strong> {booking.senderName}</p>
                        <p><strong>Sender Address:</strong> {booking.address}</p>
                        <p><strong>Sender Mobile:</strong> {booking.senderContactNo}</p>
                        <p><strong>Recipient Name:</strong> {booking.receiverName}</p>
                        <p><strong>Recipient Address:</strong> {booking.receiveraddress}</p>
                        
                        <p><strong>Recipient Mobile:</strong> {booking.receiverContactNo}</p>
                        <p><strong>Product Details:</strong> {booking.product}</p>
                        {/* <p><strong>Booking ID:</strong> {booking.CnNumber}</p> */}
                        <p><strong>Booking Tracking Number:</strong> {booking.CnNumber}</p>
                        <p><strong>Package Quantity:</strong> {booking.qty}</p>
                        {/* <p><strong>District:</strong> {booking.selectedDistrict}</p> */}
                        {/* <p><strong>Area:</strong> {booking.selectedArea}</p> */}
                        <p><strong>Amount:</strong> {booking.totalCharge} Tk</p>
                        {/* <p><strong>Word Amount:</strong> {booking.wordAmount}</p> */}
                        <p><strong>Booking Date & Time:</strong> {booking.bookingDate}</p>
                        {/* <p><strong>Update:</strong> {booking.update}</p> */}
                        <p><strong>Delivery Type:</strong> {booking.serviceType}</p>
                        <p><strong>Payment Option:</strong> {booking.paymentMethod}</p>
                        <p><strong>Receiver Pay:</strong> {booking.receiverPay} Tk</p>
                        <p><strong>Sender Receive:</strong> {booking.senderReceive} Tk</p>
                        <p><strong>Service Charge:</strong> {booking.serviceCharge} Tk</p>
                        <p><strong>Booking Branch ID:</strong> {booking.email}</p>
                        <p><strong>Booking Branch Name:</strong> {booking.Branch_Name}</p>
                        <p><strong>Booking Branch Mobile:</strong> {booking.Branch_Number}</p>
                    </>
                )}
                <div className="mt-8">
   <div  className=" font-bold mb-6 text-gray-800 border-b pb-2">
   <h3 className="text-2xl mb-6 text-gray-800 border-b pb-2 text-center">Tracking Updates</h3>
   <p className="text-lg">Booking Branch: {booking.email}</p>
   </div>
    {/* 1st Line */}
    <div className="relative ">
        
        <div className="space-y-6">
            {/* Tracking Timeline */}
            <div className="mt-6">
                    
                    <div className="relative">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${booking?.Tracking_Booking_Branch_Received_Parcel ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
                                {booking?.Tracking_Booking_Branch_Received_Parcel ? '✓' : '-'}
                            </div>
                            
                            {
                                booking?.Tracking_Booking_Branch_Received_Parcel && 
                                <div>
                                <h1 className="text-gray-700 font-semibold">Accepted By: {booking?.Branch_Name || 'N/A'}</h1>
                                <p className="text-gray-500 text-sm">Branch Accept Time: {booking?.Tracking_Booking_Branch_Received_Parcel_Time ? formatTime(booking.Tracking_Booking_Branch_Received_Parcel_Time) : 'Not Available'}</p>
                            </div>
                            }
                        </div>
                    </div>
                </div>
        </div>
    </div>
    {/* 2nd Line */}
    {
        booking?.Tracking_Booking_Branch_Select_MotherHub &&  <div className="relative ">
        
        <div className="space-y-6">
            {/* Tracking Timeline */}
            <div className="mt-6">
                    
                    <div className="relative">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${booking?.Tracking_Booking_Branch_Select_MotherHub ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
                                {booking?.Tracking_Booking_Branch_Select_MotherHub ? '✓' : '-'}
                            </div>
                            <div>
                                <h1 className="text-gray-700 font-semibold">Sent To MotherHub Branch ({booking?.Tracking_Booking_Branch_Select_MotherHub})</h1>
                                <p className="text-gray-500 text-sm">Sent Time: {booking?.Tracking_Booking_Branch_Select_MotherHub_Date ? formatTime(booking.Tracking_Booking_Branch_Select_MotherHub_Date) : 'Not Available'}</p>
                                <h1 className="text-gray-500 text-sm">Admin Note: {booking?.Tracking_Booking_Branch_Select_MotherHub_Note || "No Message"}</h1>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    }
   
    {/* 3rd Line */}
    {
        booking?.Tracking_MotherHub_Branch_Received_Parcel &&  <div className="relative ">
        
        <div className="space-y-6">
            {/* Tracking Timeline */}
            <div className="mt-6">
                    
                    <div className="relative">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${booking?.Tracking_MotherHub_Branch_Received_Parcel ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
                                {booking?.Tracking_MotherHub_Branch_Received_Parcel ? '✓' : '-'}
                            </div>
                            <div>
                                <h1 className="text-gray-700 font-semibold">Parcel Received MotherHub Branch</h1>
                                <p className="text-gray-500 text-sm">Received Time: {booking?.Tracking_MotherHub_Branch_Received_Parcel_Time ? formatTime(booking.Tracking_MotherHub_Branch_Received_Parcel_Time) : 'Not Available'}</p>
                               
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    }
    {/* 4th Line */}
    {
        booking?.Tracking_MotherHub_Branch_Select_Destiantion_Branch &&  <div className="relative ">
        
        <div className="space-y-6">
            {/* Tracking Timeline */}
            <div className="mt-6">
                    
                    <div className="relative">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${booking?.Tracking_MotherHub_Branch_Select_Destiantion_Branch ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
                                {booking?.Tracking_MotherHub_Branch_Select_Destiantion_Branch ? '✓' : '-'}
                            </div>
                            <div>
                                <h1 className="text-gray-700 font-semibold">Sent to Destination Branch ({booking?.Tracking_MotherHub_Branch_Select_Destiantion_Branch})</h1>
                                <p className="text-gray-500 text-sm">Sent Time: {booking?.Tracking_MotherHub_Branch_Select_Destiantion_Branch_Date ? formatTime(booking.Tracking_MotherHub_Branch_Select_Destiantion_Branch_Date) : 'Not Available'}</p>
                                <p className="text-gray-500 text-sm">Note: {booking?.Tracking_MotherHub_Branch_Select_Destiantion_Branch_Note || 'Not Available'}</p>
                               
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    }
     {/* 5th Line */}
     {
        booking?.Tracking_Destination_Branch_Received_Parcel_Offline &&  <div className="relative ">
        
        <div className="space-y-6">
            {/* Tracking Timeline */}
            <div className="mt-6">
                    
                    <div className="relative">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${booking?.Tracking_Destination_Branch_Received_Parcel_Offline ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
                                {booking?.Tracking_Destination_Branch_Received_Parcel_Offline ? '✓' : '-'}
                            </div>
                            <div>
                                <h1 className="text-gray-700 font-semibold">Parcel Received Destination  Branch</h1>
                                <p className="text-gray-500 text-sm">Received Time: {booking?.Tracking_Destination_Branch_Received_Parcel_Time_Offline ? formatTime(booking.Tracking_Destination_Branch_Received_Parcel_Time_Offline) : 'Not Available'}</p>
                               
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    }
    {/* 6th Line */}
    {
        booking?.Tracking_Destination_Branch_Select_Rider_Offline &&  <div className="relative ">
        
        <div className="space-y-6">
            {/* Tracking Timeline */}
            <div className="mt-6">
                    
                    <div className="relative">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${booking?.Tracking_Destination_Branch_Select_Rider_Offline ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
                                {booking?.Tracking_Destination_Branch_Select_Rider_Offline ? '✓' : '-'}
                            </div>
                            <div>
                                <h1 className="text-gray-700 font-semibold">Dest. Branch Select Rider ({booking?.Tracking_Destination_Branch_Select_Rider_Offline})</h1>
                                <p className="text-gray-500 text-sm">Select Time: {booking?.Tracking_Destination_Branch_Select_Rider_Date_Offline ? formatTime(booking.Tracking_Destination_Branch_Select_Rider_Date_Offline) : 'Not Available'}</p>
                                <p className="text-gray-500 text-sm">Note: {booking?.Tracking_Destination_Branch_Note_Offline || 'Not Available'}</p>
                               
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    }
    {/* 6th Line */}
    {
        booking?.Tracking_Rider_Offline_Booking_Delivary_Update &&  <div className="relative ">
        
        <div className="space-y-6">
            {/* Tracking Timeline */}
            <div className="mt-6">
                    
                    <div className="relative">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Successful ? 'bg-green-500 text-white' : 'bg-red-500 text-gray-500'}`}>
                                {booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Successful ? '✓' : '-'}
                            </div>
                             <div>
                                <h1 className="text-gray-700 font-semibold">{booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Successful || booking?. Tracking_Rider_Offline_Booking_Delivary_Update_Returned}</ h1>
                                <p className="text-gray-500 text-sm">
  {booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Time
    ? `Delivery Time: ${formatTime(booking.Tracking_Rider_Offline_Booking_Delivary_Update_Time)}`
    : booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Return_Time
    ? `Returned Time: ${formatTime(booking.Tracking_Rider_Offline_Booking_Delivary_Update_Return_Time)}`
    : 'Not Available'}
</p>


                                 <p className="text-gray-500 text-sm">Note: {booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Note || booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Return_Note ||'Not Available'}</p>
                               
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    }
    
</div>

                <div className="flex justify-end mt-4">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 mr-2 bg-green-500 text-white rounded"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-yellow-500 text-white rounded mr-2"
                        >
                            Edit
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OfflineModal;