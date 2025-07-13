import { useQuery } from "@tanstack/react-query";
import useUsersData from "../../../hooks/useUsersData/useUsersData";
import axiosSecure from "../../../api/axiosSecure";
import Swal from 'sweetalert2';
import { useState } from "react";

const Bkash_Payment_Admin = () => {
    const [verifiedUser] = useUsersData();
    const [noteStates, setNoteStates] = useState({}); // Store notes by payment ID

    const { data: Payment_History_Admin = [], isLoading, refetch } = useQuery({
        queryKey: ['Payment_History_Admin', verifiedUser?.email],
        queryFn: async () => {
            if (!verifiedUser?.email) return [];
            const res = await axiosSecure.get(`/bkash`);
            return res.data;
        },
        enabled: !!verifiedUser?.email,
    });

    const handleNoteChange = (id, value) => {
        setNoteStates((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleConfirmPayment = async (id, currentStatus) => {
        if (currentStatus === 'confirmed') {
            Swal.fire({
                icon: 'info',
                title: 'Already Confirmed!',
                text: 'This payment has already been confirmed.'
            });
            return;
        }

        const note = noteStates[id] || '';

        try {
            const res = await axiosSecure.patch(`/bkash/${id}`, { status: 'confirmed', note });
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Confirmed!',
                    text: 'Payment status updated to confirmed.'
                });
                refetch();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to update payment status.'
                });
            }
        } catch (error) {
            console.error("Error confirming payment:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while confirming the payment.'
            });
        }
    };

    if (isLoading) {
        return <p>Loading payment history...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Bkash Payment History (Admin)</h1>
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-blue-100 border-b border-gray-300">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase">Amount</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase">Account</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase">Transaction ID</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase">Email</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase">Role</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase">Note</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {Payment_History_Admin.map((payment) => (
                            <tr key={payment._id} className="hover:bg-gray-50">
                                <td className="py-4 px-6">{payment.amount}</td>
                                <td className="py-4 px-6">{payment.accountNumber}</td>
                                <td className="py-4 px-6">{payment.transactionId}</td>
                                <td className="py-4 px-6">{payment.Payment_Email}</td>
                                <td className="py-4 px-6">{payment.Payment_Name}</td>
                                <td className="py-4 px-6">{payment.date}</td>
                                <td className="py-4 px-6">{payment.Role}</td>
                                <td className="py-4 px-6">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        payment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {payment.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <input
                                        type="text"
                                        className="w-full p-1 border border-gray-300 rounded"
                                        placeholder="Optional note"
                                        value={noteStates[payment._id] ?? payment.note ?? ''}
                                        onChange={(e) => handleNoteChange(payment._id, e.target.value)}
                                        disabled={payment.status === 'confirmed'}
                                    />
                                </td>
                                <td className="py-4 px-6">
                                    <button
                                        onClick={() => handleConfirmPayment(payment._id, payment.status)}
                                        className={`px-4 py-2 rounded-md transition duration-300 ${
                                            payment.status === 'confirmed'
                                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                                        }`}
                                        disabled={payment.status === 'confirmed'}
                                    >
                                        {payment.status === 'confirmed' ? 'Confirmed' : 'Confirm'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bkash_Payment_Admin;
