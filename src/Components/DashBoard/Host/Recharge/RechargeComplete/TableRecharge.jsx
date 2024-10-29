import { useEffect, useState } from "react";
import axiosSecure from "../../../../../api/axiosSecure";

const TableRecharge = ({ recharge, refetch }) => {
    const [status, setStatus] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [note, setNote] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        console.log(recharge?.Status);
        if (!status) {
            setStatus(recharge?.Status || "processing");
        }
    }, [recharge]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        openModal(); // Open modal when status changes
    };

    const handleModalSubmit = async () => {
        try {
            const response = await axiosSecure.put(`/recharge/${recharge._id}`, {
                Status: status,
                Note: note,
                Amount: amount
            });
            console.log(response);
            if (response.data.acknowledged && response.data.modifiedCount > 0) {
                refetch();
                closeModal();
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <tr className="font-rancho">
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                            <div className='block relative'>
                                <p className='text-gray-900 whitespace-no-wrap'>
                                    {recharge?.Account_Name}
                                </p>
                            </div>
                        </div>
                    </div>
                </td>

                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>
                        {recharge?.Account_Number}
                    </p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>
                        {recharge?.Account_Amount}
                    </p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>
                        {recharge?.Recharge_Note}
                    </p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>
                        <select onChange={handleStatusChange} value={status} className="focus:outline-none">
                            <option value="processing">Processing</option>
                            <option value="accept">Accepted</option>
                            <option value="cancel">Cancel</option>
                        </select>
                    </p>
                </td>
            </tr>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-96">
                        <h2 className="text-xl font-semibold mb-4">Update Recharge Details</h2>
                        <label className="block mb-2">
                            Note:
                            <textarea
                                className="w-full p-2 border rounded mt-1"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Add a note"
                            />
                        </label>
                        <label className="block mb-2">
                            Amount:
                            <input
                                type="number"
                                className="w-full p-2 border rounded mt-1"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Add amount"
                            />
                        </label>
                        <button
                            onClick={handleModalSubmit}
                            className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600"
                        >
                            Submit
                        </button>
                        <button
                            onClick={closeModal}
                            className="text-gray-500 mt-2 hover:underline ml-4"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default TableRecharge;
