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

import React, { useState } from 'react';

const PickupparcelList = () => {
  const [modalData, setModalData] = useState({ isOpen: false, type: '', data: {} });

  const handleActionClick = (type) => {
    setModalData({ isOpen: true, type });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, type: '', data: {} });
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Pickup Parcel List</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-400">
            <th className="border border-gray-300 px-4 py-2">SL</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">CN Number</th>
            <th className="border border-gray-300 px-4 py-2">Merchant Name</th>
            <th className="border border-gray-300 px-4 py-2">Merchant Number</th>
            <th className="border border-gray-300 px-4 py-2">Customer Name</th>
            <th className="border border-gray-300 px-4 py-2">Pickup Address</th>
            <th className="border border-gray-300 px-4 py-2">District</th>
            <th className="border border-gray-300 px-4 py-2">Collectable Amount</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">1</td>
            <td className="border border-gray-300 px-4 py-2">2024-12-24</td>
            <td className="border border-gray-300 px-4 py-2">CN12345</td>
            <td className="border border-gray-300 px-4 py-2">Merchant A</td>
            <td className="border border-gray-300 px-4 py-2">0123456789</td>
            <td className="border border-gray-300 px-4 py-2">John Doe</td>
            <td className="border border-gray-300 px-4 py-2">123 Street</td>
            <td className="border border-gray-300 px-4 py-2">Dhaka</td>
            <td className="border border-gray-300 px-4 py-2">500</td>
            <td className="border border-gray-300 px-4 py-2">Pending</td>
            <td className="border border-gray-300 px-4 py-2">
              <button
                onClick={() => handleActionClick('Successful')}
                className="bg-green-500 text-white px-2 py-1 rounded mr-2"
              >
                Successful
              </button>
              <button
                onClick={() => handleActionClick('Return')}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Return
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Modal */}
      {modalData.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">
              {modalData.type === 'Successful' ? 'Successful Action' : 'Return Action'}
            </h2>
            {modalData.type === 'Successful' ? (
              <div>
                <label className="block mb-2">Amount:</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 px-3 py-2 rounded mb-4"
                  placeholder="Enter Amount"
                />
                <label className="block mb-2">Note:</label>
                <textarea
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  placeholder="Enter Note"
                ></textarea>
              </div>
            ) : (
              <div>
                <label className="block mb-2">Note:</label>
                <textarea
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  placeholder="Enter Note"
                ></textarea>
              </div>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={closeModal}
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



