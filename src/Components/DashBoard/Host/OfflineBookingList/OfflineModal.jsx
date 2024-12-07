import { useState } from "react";

const OfflineModal = ({ offline, onClose, onSave }) => {
    // State for edit mode and editable values
    const [isEditMode, setIsEditMode] = useState(false);
    const [editableOffline, setEditableOffline] = useState({ ...offline });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableOffline((prev) => ({ ...prev, [name]: value }));
    };

    const toggleEditMode = () => {
        setIsEditMode((prev) => !prev); // Toggle between view and edit modes
    };

    const handleSave = () => {
        onSave(editableOffline); // Pass updated data to the parent component
        setIsEditMode(false); // Exit edit mode after saving
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Booking Details</h2>

                {/* Conditional rendering based on edit mode */}
                {!isEditMode ? (
                    <>
                        {/* View Mode */}
                        <p><strong>Sender Name:</strong> {offline.senderName}</p>
                        <p><strong>Receiver Name:</strong> {offline.receiverName}</p>
                        <p><strong>Booking Date:</strong> {offline.bookingDate}</p>
                        <p><strong>Receiver Mobile:</strong> {offline.receiverContactNo}</p>
                        <p><strong>CN Number:</strong> {offline.CnNumber}</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-300 rounded mr-2"
                            >
                                Close
                            </button>
                            <button
                                onClick={toggleEditMode}
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Edit
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Edit Mode */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                                Sender Name:
                            </label>
                            <input
                                type="text"
                                name="senderName"
                                value={editableOffline.senderName}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                                Receiver Name:
                            </label>
                            <input
                                type="text"
                                name="receiverName"
                                value={editableOffline.receiverName}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                                Booking Date:
                            </label>
                            <input
                                type="date"
                                name="bookingDate"
                                value={editableOffline.bookingDate}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                                Receiver Mobile:
                            </label>
                            <input
                                type="text"
                                name="receiverContactNo"
                                value={editableOffline.receiverContactNo}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                                CN Number:
                            </label>
                            <input
                                type="text"
                                name="CnNumber"
                                value={editableOffline.CnNumber}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-300 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Save
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default OfflineModal;




