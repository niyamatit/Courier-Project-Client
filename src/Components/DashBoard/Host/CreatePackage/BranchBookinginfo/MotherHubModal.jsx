import { useState } from 'react';
import axiosSecure from '../../../../../api/axiosSecure';
import { useQuery } from '@tanstack/react-query';
import useUsersData from '../../../../../hooks/useUsersData/useUsersData';

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
        onSave({ ...booking, Tracking_Admin_Select_Online_MotherHub_Branch: branch, Tracking_Admin_Select_Online_MotherHub_Branch_Note: note });
        onClose();
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
                        <option value="123233333">Select MotherHub</option>
                        {
                    users.filter(user => user?.role === 'host').map(user => (
                      <option key={user._id} value={user?.name}>
                        {user?.name || "No Name Found"}
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
