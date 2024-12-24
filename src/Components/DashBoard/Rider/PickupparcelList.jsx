// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Dropdown } from "primereact/dropdown";
// import { useParcels } from "../../../hooks/useParcels";
// import { useState, useEffect } from "react";
// import axios from "axios";

// const PickupparcelList = () => {
//   const { data: initialParcels, isLoading } = useParcels();
//   const [parcels, setParcels] = useState([]);

//   const [statuses] = useState([
//     { label: "Pickuped", value: "Ongoing" },
//     { label: "Hold", value: "Hold" },
//     { label: "Cancel", value: "Cancel" },
//   ]);

//   useEffect(() => {
//     if (initialParcels) {
//       setParcels(initialParcels.map((p, idx) => ({ ...p, idx: idx + 1 })));
//     }
//   }, [initialParcels]);

//   const handleStatusChange = async (value, parcel) => {
//     console.log("ornob", value);
//     try {
//       // Update the local state
//       setParcels((prevParcels) =>
//         prevParcels.map((p, idx) =>
//           p._id === parcel._id ? { ...p, deliveryStatus: value, idx: idx + 1 } : { ...p, idx: idx + 1 }
//         )
//       );

//       await axios.put(`https://courier-server-rho.vercel.app/parcel/${parcel._id}`, {
//         deliveryStatus: value,
//       });
//     } catch (error) {
//       console.error("Error updating parcel status:", error);
//     }
//   };


//   return (
//     <div className=" mx-auto  sm:px-8 ">
//       <h2 className="mt-6 font-bold text-2xl">Pickup Parcel List</h2>

//       <div className="py-4 w-full">
//         <div className="shadow rounded-lg overflow-hidden">
//           <DataTable
//             value={parcels}
//             paginator={parcels?.length > 5}
//             rows={5}
//             sortMode="multiple"
//             className="p-datatable-customers"
//             loading={isLoading}
//             emptyMessage="No parcels found."
//           >

//             <Column
//               field="idx"
//               header="SL"
//             />
//             <Column
//               field="Date"
//               header="Date"
//               sortable
//               body={(rowData) => new Date(rowData.Date).toLocaleDateString()}
//             />
//             <Column field="Merchant_Order_ID" header="CN Number" sortable />
//             <Column field="Store_Name" header="Merchant Name" sortable />
//             <Column
//               field="Customer_Contact_Number"
//               header="Merchant Number"
//               sortable
//             />
//             <Column field="Customer_Name" header="Customer Name" sortable />
//             <Column field="Customer_Address" header="Pickup Address" sortable />
//             <Column field="Customer_District_Name" header="District" sortable />
//             <Column
//               field="Total_Collection_Amount"
//               header="Collectable Amount"
//               sortable
//             />
//             <Column field="Service_Type" header="Status" sortable />
//             <Column
//               header="Action"
//               body={(rowData) => (
//                 <Dropdown
//                   value={rowData.deliveryStatus || "Ongoing"}
//                   options={statuses}
//                   onChange={(e) => handleStatusChange(e.value, rowData)}
//                   placeholder="Select a Status"
//                 />
//               )}
//             />
//           </DataTable>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PickupparcelList;

import { useState } from 'react';
import axiosSecure from '../../../api/axiosSecure';
import { useQuery } from '@tanstack/react-query';
import useUsersData from '../../../hooks/useUsersData/useUsersData';

const PickupparcelList = () => {
  const [modalData, setModalData] = useState({ isOpen: false, type: '', data: {} });
  const [formData, setFormData] = useState({ amount: '', note: '' });
  const [verifiedUser] = useUsersData();

  const { data: RiderPickup = [] } = useQuery({
    queryKey: ['RiderPickup', verifiedUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/email/rider/parcel/${verifiedUser?.email}`);
      return Array.isArray(res.data) ? res.data : [res.data];
    },
  });
  

  const handleActionClick = (type, data) => {
    setModalData({ isOpen: true, type, data });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, type: '', data: {} });
    setFormData({ amount: '', note: '' });
  };

  const handleSubmit = () => {
    console.log('Submitting:', modalData.type, formData, modalData.data);
    // Perform the required action (e.g., update status in the database)
    closeModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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




