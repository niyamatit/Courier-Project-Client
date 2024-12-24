

import { useState } from 'react';
import axiosSecure from '../../../api/axiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useUsersData from '../../../hooks/useUsersData/useUsersData';

const PickupparcelList = () => {
  const [modalData, setModalData] = useState({ isOpen: false, type: '', data: {} });
  const [formValues, setFormValues] = useState({ amount: '', note: '' });
  const queryClient = useQueryClient();
  const [verifiedUser] = useUsersData();

  const { data: RiderPickup = [] } = useQuery({
    queryKey: ['RiderPickup', verifiedUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/email/rider/parcel/${verifiedUser?.email}`);
      return Array.isArray(res.data) ? res.data : [res.data];
    },
  });
  

  const mutation = useMutation({
    mutationFn: async (updateData) => {
      const res = await axiosSecure.patch('/rider/update-parcel', updateData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['RiderPickup', verifiedUser?.email]);
      closeModal();
    },
  });

  const handleActionClick = (type, parcel) => {
    setModalData({ isOpen: true, type, data: parcel });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, type: '', data: {} });
    setFormValues({ amount: '', note: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const updateData = {
      id: modalData.data._id,
      type: modalData.type,
      ...formValues,
    };
    mutation.mutate(updateData);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-center">Pickup Parcel List</h1>
      <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-blue-600">
            <th className="border border-gray-300 px-4 py-2 text-white">SL</th>
            <th className="border border-gray-300 px-4 py-2 text-white">Date</th>
            <th className="border border-gray-300 px-4 py-2 text-white">CN Number</th>
            <th className="border border-gray-300 px-4 py-2 text-white">Sender Name</th>
            <th className="border border-gray-300 px-4 py-2 text-white">Recipient Name</th>
            <th className="border border-gray-300 px-4 py-2 text-white">Pickup Address</th>
            <th className="border border-gray-300 px-4 py-2 text-white">District</th>
            <th className="border border-gray-300 px-4 py-2 text-white">Amount</th>
            <th className="border border-gray-300 px-4 py-2 text-white">Status</th>
            <th className="border border-gray-300 px-4 py-2 text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {RiderPickup.length > 0 ? (
            RiderPickup.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{new Date(item.booking).toLocaleDateString()}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{item.CnNumber}</td>
                <td className="border border-gray-300 px-4 py-2">{item.senderName}</td>
                <td className="border border-gray-300 px-4 py-2">{item.recipientName}</td>
                <td className="border border-gray-300 px-4 py-2">{item.Receiver_Full_Adress}</td>
                <td className="border border-gray-300 px-4 py-2">{item.districtName}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{item.conditionCharge}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{item.update}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleActionClick('Successful', item)}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Successful
                  </button>
                  <button
                    onClick={() => handleActionClick('Return', item)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Return
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center py-4 text-gray-500">No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {modalData.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4 text-center">
              {modalData.type === 'Successful' ? 'Mark as Successful' : 'Mark as Returned'}
            </h2>
            <div>
              {modalData.type === 'Successful' && (
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Amount:</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded"
                    placeholder="Enter Amount"
                  />
                </div>
              )}
              <label className="block mb-2 font-medium">Note:</label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-3 py-2 rounded"
                placeholder="Enter Note"
              ></textarea>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PickupparcelList;




