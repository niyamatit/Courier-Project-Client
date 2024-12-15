import { useState } from "react";

const BranchModal = ({ branch, onClose, onSave }) => {
    if (!branch) return null;

    const [editableBranch, setEditableBranch] = useState({ ...branch });
    const [isEditing, setIsEditing] = useState(false); // Track edit mode

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableBranch((prevBranch) => ({
            ...prevBranch,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onSave(editableBranch); // Call the save function with the updated booking
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
                            <span className="text-gray-700">Branch Number:</span>
                            <input
                                type="text"
                                name="Branch_Number"
                                value={editableBranch.Branch_Number}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block mb-2">
                            <span className="text-gray-700">Branch Name:</span>
                            <input
                                type="text"
                                name="Branch_Name"
                                value={editableBranch.Branch_Name}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block mb-2">
                            <span className="text-gray-700">Branch Commission:</span>
                            <input
                                type="text"
                                name="Branch_Commission"
                                value={editableBranch.Branch_Commission}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block mb-2">
                            <span className="text-gray-700">Branch Address:</span>
                            <input
                                type="text"
                                name="Branch_Address"
                                value={editableBranch.Branch_Address}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block mb-2">
                            <span className="text-gray-700">Branch_District_Name:</span>
                            <input
                                type="text"
                                name="Branch_District_Name"
                                value={editableBranch.Branch_District_Name}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block mb-2">
                            <span className="text-gray-700"> Branch_Area:</span>
                            <input
                                type="text"
                                name="Branch_Area"
                                value={editableBranch.Branch_Area}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block mb-2">
                            <span className="text-gray-700">Branch_type:</span>
                            <input
                                type="text"
                                name="Branch_type"
                                value={editableBranch.Branch_type}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block mb-2">
                            <span className="text-gray-700">email:</span>
                            <input
                                type="text"
                                name="email"
                                value={editableBranch.email}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block mb-2">
                            <span className="text-gray-700">Branch_Password:</span>
                            <input
                                type="text"
                                name="Branch_Password"
                                value={editableBranch.Branch_Password}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                            />
                        </label>

                    </>
                ) : (
                    <>
                        <p><strong>Branch Number:</strong> {branch.Branch_Number}</p>
                        <p><strong>Branch Name:</strong> {branch.Branch_Name}</p>
                        <p><strong>Branch Commission:</strong> {branch.Branch_Commission}</p>
                        <p><strong>Branch District:</strong> {branch.Branch_District_Name}</p>
                        <p><strong>Branch type:</strong> {branch.Branch_type}</p>
                        <p><strong>Branch User_ID:</strong> {branch.email}</p>
                        <p><strong>Branch Password:</strong> {branch.Branch_Password}</p>
                        <p><strong>branch ID:</strong> {branch._id}</p>
                        <p><strong>Branch type:</strong> {branch.Branch_type}</p>
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

export default BranchModal;