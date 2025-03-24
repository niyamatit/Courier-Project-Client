import { useState } from "react";
import axiosSecure from "../../../../api/axiosSecure";
import Swal from "sweetalert2";
import useUsersData from "../../../../hooks/useUsersData/useUsersData";

const AddBalanceModal = ({ show, onClose, branch, refetch }) => {
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [verifiedUser] = useUsersData();
    const handleSubmit = async () => {
        const parsedAmount = parseFloat(amount);

        if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
            Swal.fire({
                title: "Invalid Amount!",
                text: "Please enter a valid positive number.",
                icon: "error",
            });
            return;
        }

        const updatedAmount = parseFloat(branch.Branch_Balace || 0) + parsedAmount;

        try {
            const { data } = await axiosSecure.put(`/recharge/add/balance/${branch.email}`, {
                Amount: updatedAmount,
               
            });

            if (data.modifiedCount > 0) {
                Swal.fire({
                    title: "Success!",
                    text: `Balance updated successfully.`,
                    icon: "success",
                });
                branch.Branch_Balace = updatedAmount;
                const { data } = await axiosSecure.post(`/history`, {
                    Total_Amount_Branch: updatedAmount,
                    Branch_Email:branch?.email,
                    Branch_Name:branch?.Branch_Name,
                    Branch_Number:branch?.Branch_Number,
                    Amount_Now_Added:parsedAmount,
                    Status:`Amount Added By Admin Directly (Name: ${verifiedUser?.name})`,
                    Added_Admin_Name:verifiedUser?.name,
                    Added_Admin_Email:verifiedUser?.email,
                    Date: new Date(),
                    Note:note,
                    isRechargeComplete: true
                    
                   
                });
            
                refetch();
                onClose();
            } else {
                Swal.fire({
                    title: "No Changes!",
                    text: "No update was made. Try again.",
                    icon: "warning",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Failed to update balance. Please try again.",
                icon: "error",
            });
            console.error("Update error:", error);
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                {/* Modal Header */}
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-lg font-semibold">Add Balance to {branch?.Branch_Name}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>

                </div>

                {/* Modal Body */}
                <div className="mt-4">
                    <p className="text-sm text-gray-600">Current Balance: <strong>{branch?.Branch_Balace || 0}</strong></p>

                    <label className="block mt-4 text-sm font-medium">Amount</label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                    />

                    <label className="block mt-4 text-sm font-medium">Note</label>
                    <textarea
                        className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Enter note (optional)"
                    />
                </div>

                {/* Modal Footer */}
                <div className="mt-6 flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300">Close</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Update Balance</button>
                </div>
            </div>
        </div>
    );
};

export default AddBalanceModal;
