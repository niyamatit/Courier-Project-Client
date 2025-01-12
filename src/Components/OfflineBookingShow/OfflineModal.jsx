import { useState } from "react";

const OfflineModal = ({ offline, onClose, onSave }) => {
    if (!offline) return null;

    const [editableBooking, setEditableBooking] = useState({ ...offline });
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

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
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
                        <p><strong>Sender Name:</strong> {offline.senderName}</p>
                        <p><strong>Sender Address:</strong> {offline.address}</p>
                        <p><strong>Sender Mobile:</strong> {offline.senderContactNo}</p>
                        <p><strong>Recipient Name:</strong> {offline.receiverName}</p>
                        <p><strong>Recipient Address:</strong> {offline.receiveraddress}</p>
                        
                        <p><strong>Recipient Mobile:</strong> {offline.receiverContactNo}</p>
                        <p><strong>Product Details:</strong> {offline.product}</p>
                        {/* <p><strong>Booking ID:</strong> {offline.CnNumber}</p> */}
                        <p><strong>Booking Tracking Number:</strong> {offline.CnNumber}</p>
                        <p><strong>Package Quantity:</strong> {offline.qty}</p>
                        {/* <p><strong>District:</strong> {offline.selectedDistrict}</p> */}
                        {/* <p><strong>Area:</strong> {offline.selectedArea}</p> */}
                        <p><strong>Amount:</strong> {offline.totalCharge} Tk</p>
                        {/* <p><strong>Word Amount:</strong> {offline.wordAmount}</p> */}
                        <p><strong>Booking Date & Time:</strong> {offline.bookingDate}</p>
                        {/* <p><strong>Update:</strong> {offline.update}</p> */}
                        <p><strong>Delivery Type:</strong> {offline.serviceType}</p>
                        <p><strong>Payment Option:</strong> {offline.paymentMethod}</p>
                        <p><strong>Receiver Pay:</strong> {offline.receiverPay} Tk</p>
                        <p><strong>Sender Receive:</strong> {offline.senderReceive} Tk</p>
                        <p><strong>Service Charge:</strong> {offline.serviceCharge} Tk</p>
                        <p><strong>Booking Branch ID:</strong> {offline.email}</p>
                        <p><strong>Booking Branch Name:</strong> {offline.Branch_Name}</p>
                        <p><strong>Booking Branch Mobile:</strong> {offline.Branch_Number}</p>
                    </>
                )}

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