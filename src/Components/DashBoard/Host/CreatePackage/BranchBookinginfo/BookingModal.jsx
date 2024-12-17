import { useState } from "react";

const BookingModal = ({ booking, onClose, onSave }) => {
    if (!booking) return null;

    const [editableBooking, setEditableBooking] = useState({ ...booking });
    const [isEditing, setIsEditing] = useState(false); // Track edit mode

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableBooking((prevBooking) => ({
            ...prevBooking,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onSave(editableBooking); // Call the save function with the updated booking
        setIsEditing(false); // Exit edit mode after saving
        onClose(); // Close the modal after saving
    };
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


    return (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center overflow-y-auto">
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
                                value={editableBooking.senderName}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block mb-2">
                            <span className="text-gray-700">Recipient Name:</span>
                            <input
                                type="text"
                                name="recipientName"
                                value={editableBooking.recipientName}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block mb-2">
                            <span className="text-gray-700">Sender Mobile:</span>
                            <input
                                type="text"
                                name="senderMobile"
                                value={editableBooking.senderMobile}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block mb-2">
                            <span className="text-gray-700">Recipient Mobile:</span>
                            <input
                                type="text"
                                name="recipientMobile"
                                value={editableBooking.recipientMobile}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block mb-2">
                            <span className="text-gray-700">Product Details:</span>
                            <input
                                type="text"
                                name="productDetails"
                                value={editableBooking.productDetails}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block mb-2">
                            <span className="text-gray-700">Product _id:</span>
                            <input
                                type="text"
                                name="product_id"
                                value={editableBooking._id}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block mb-2">
                            <span className="text-gray-700">Package Tracking Number:</span>
                            <input
                                type="text"
                                name="packageTrackingNumber"
                                value={editableBooking.packageTrackingNumber}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block mb-2">
                            <span className="text-gray-700">Product qty:</span>
                            <input
                                type="text"
                                name="qty"
                                value={editableBooking.qty}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block mb-2">
                            <span className="text-gray-700">Selected District:</span>
                            <input
                                type="text"
                                name="productDetails"
                                value={editableBooking.productDetails}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                            />
                        </label>

                    </>
                ) : (
                    <>
                        <p><strong>Sender Name:</strong> {booking.senderName}</p>
                        <p><strong>Recipient Name:</strong> {booking.recipientName}</p>
                        <p><strong>Sender Mobile:</strong> {booking.senderMobile}</p>
                        <p><strong>Recipient Mobile:</strong> {booking.recipientMobile}</p>
                        <p><strong>Product Details:</strong> {booking.productDetails}</p>
                        <p><strong>Booking ID:</strong> {booking._id}</p>
                        <p><strong>Package Tracking Number:</strong> {booking.packageTrackingNumber}</p>
                        <p><strong>Package Quantity:</strong> {booking.qty}</p>
                        <p><strong>District:</strong> {booking.districtName}</p>
                        <p><strong>Area:</strong> {booking.selectedArea}</p>
                        <p><strong>Amount:</strong> {booking.amount}</p>
                        <p><strong>Word Amount:</strong> {booking.wordAmount}</p>
                        <p><strong>Booking Date & Time:</strong> {formatTime(booking.booking)}</p>
                        <p><strong>Update:</strong> {booking.update}</p>
                        <p><strong>Delivery Option:</strong> {booking.deliveryOption}</p>
                        <p><strong>Payment Option:</strong> {booking.paymentOption}</p>
                        <p><strong>Condition:</strong> {booking.condition}</p>
                        <p><strong>Branch Contact Number:</strong> {booking.Branch_Number}</p>
                        <p><strong>Branch Name:</strong> {booking.Branch_Name}</p>
                        <p><strong>Branch District Name:</strong> {booking.Branch_District_Name}</p>
                        <p><strong>Branch Area:</strong> {booking.Branch_Area}</p>
                        <p><strong>Branch Full Address</strong> {booking.Branch_Address}</p>

                        
                        <p><strong>Branch ID:</strong> {booking.email}</p>
                    </>
                )}
                 {/* Tracking Timeline */}
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
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${booking?.Branch_Name ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
                                {booking?.Branch_Name ? '✓' : '-'}
                            </div>
                            <div>
                                <h1 className="text-gray-700 font-semibold">Received By: {booking?.Branch_Name || 'N/A'}</h1>
                                <p className="text-gray-500 text-sm">Branch Received Time: {booking?.booking ? formatTime(booking.booking) : 'Not Available'}</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    {/* 2nd Line */}
    <div className="relative ">
        
        <div className="space-y-6">
            {/* Tracking Timeline */}
            <div className="mt-6">
                    
                    <div className="relative">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${booking?.Branch_Name ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
                                {booking?.Branch_Name ? '✓' : '-'}
                            </div>
                            <div>
                                <h1 className="text-gray-700 font-semibold">Received By: {booking?.Branch_Name || 'N/A'}</h1>
                                <p className="text-gray-500 text-sm">Branch Received Time: {booking?.booking ? formatTime(booking.booking) : 'Not Available'}</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    {/* 3rd Line */}
    <div className="relative ">
        
        <div className="space-y-6">
            {/* Tracking Timeline */}
            <div className="mt-6">
                    
                    <div className="relative">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${booking?.Branch_Name ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
                                {booking?.Branch_Name ? '✓' : '-'}
                            </div>
                            <div>
                                <h1 className="text-gray-700 font-semibold">Received By: {booking?.Branch_Name || 'N/A'}</h1>
                                <p className="text-gray-500 text-sm">Branch Received Time: {booking?.booking ? formatTime(booking.booking) : 'Not Available'}</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    {/* 4th  Line */}
    <div className="relative ">
        
        <div className="space-y-6">
            {/* Tracking Timeline */}
            <div className="mt-6">
                    
                    <div className="relative">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${booking?.Branch_Name ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
                                {booking?.Branch_Name ? '✓' : '-'}
                            </div>
                            <div>
                                <h1 className="text-gray-700 font-semibold">Received By: {booking?.Branch_Name || 'N/A'}</h1>
                                <p className="text-gray-500 text-sm">Branch Received Time: {booking?.booking ? formatTime(booking.booking) : 'Not Available'}</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
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

export default BookingModal;