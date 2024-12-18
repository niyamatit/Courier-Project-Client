import { useState } from 'react';
import axiosSecure from '../../../../../api/axiosSecure';
import { useQuery } from '@tanstack/react-query';
import useUsersData from '../../../../../hooks/useUsersData/useUsersData';
import Swal from 'sweetalert2';

const MotherHubModal = ({ isOpen, onClose, onSave, booking }) => {
    const [branch, setBranch] = useState('');
    const [note, setNote] = useState('');
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
          const res = await axiosSecure.get("/users");
          return res.data;
        }
      })
      const [verifiedUser] = useUsersData();
    const handleSubmit = () => {
        // Call the save handler with updated fields
        onSave({ ...booking, Tracking_Admin_Select_Online_MotherHub_Branch_email: branch, Tracking_Admin_Select_Online_MotherHub_Branch_Note: note,Tracking_Admin_Select_Online_MotherHub_Branch_Date: new Date(),
            MotherHub_Selection_Admin_Name:verifiedUser?.name
          });
        onClose();
        Swal.fire({
            title: "Success!",
            text: "MotherHub branch Select successfully.",
            icon: "success",
            confirmButtonText: "OK",
        });
    };

    if (!isOpen) return null;
   

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl mb-4">Select MotherHub</h2>
                <div className="mb-4">
                    <label className="block mb-1">Branch:</label>
                    <select
                        className="border p-2 w-full"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                    >
                        <option value="">Select MotherHub</option>
{
    users.filter(user => user?.role === 'host').map(user => (
        <option key={user._id} value={user?.email}>
            {/* {`${user?.name || "No Name Found"} (${user?.email})`} */}
            {`${user?.name || "No Name Found"} (${user?.email})`}
        </option>
    ))
}

                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Note:</label>
                    <textarea
                        className="border p-2 w-full"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Enter additional notes"
                    ></textarea>
                </div>
                <div className="flex justify-end">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleSubmit}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MotherHubModal;
