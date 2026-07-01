import React, { useState } from 'react';
import useUsersData from '../../../../hooks/useUsersData/useUsersData';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../../../api/axiosSecure';
import Merchant_Print_Modal from '../../Merchant/MerchantAddPercel/Merchant_Print_Modal';

const Merchant_Booking_List = () => {
  const [verifiedUser] = useUsersData();
  const [selectedParcel, setSelectedParcel] = useState(null);
const [bookingInfo, setBookingInfo] = useState(null);
const [isOpen, setIsOpen] = useState(false);
  const { data: Merchant_Booking_Parcels = [], refetch, isLoading } = useQuery({
    queryKey: ['merchant-booking-parcels'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/merchants/branch/${verifiedUser?.name}`);
    //   setBookingInfo(res.data); 
      return res.data;
    }
  });
 const closeModal = () => {
    setIsOpen(false);
  };
 const print = (parcel) => {
    setBookingInfo(parcel);
    console.log("Booking Info for Printing:", parcel);
    setIsOpen(true);
};

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading parcels...</div>;
  }

  return (
    // Increased max-width here to allow the table more space on large screens
    <div className="container mx-auto p-4 max-w-[95%]">
      <h1 className="text-3xl text-center mt-10 font-bold mb-8">
        My Merchants Booking List <span className="text-blue-600">({Merchant_Booking_Parcels.length})</span>
      </h1>

      <div className="overflow-x-auto shadow-md rounded-lg">
        {/* Added min-w-[1400px] to force the table to be wider and trigger horizontal scrolling if needed */}
        <table className="w-full min-w-[1400px] text-left bg-white border-collapse whitespace-nowrap">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 border-b">SL</th>
              <th className="py-3 px-4 border-b">Date</th>
              <th className="py-3 px-4 border-b">CN Number</th>
              <th className="py-3 px-4 border-b">Item Type</th>
              {/* <th className="py-3 px-4 border-b">Merchant Email</th> */}
              <th className="py-3 px-4 border-b">Merchant Name</th>
              <th className="py-3 px-4 border-b">Customer Contact</th>
              <th className="py-3 px-4 border-b">Customer Name</th>
              <th className="py-3 px-4 border-b">Customer Address</th>
              <th className="py-3 px-4 border-b text-center sticky right-0 bg-gray-800 z-10">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Merchant_Booking_Parcels.map((parcel, index) => (
              <tr key={parcel._id} className="hover:bg-gray-100 transition duration-150">
                <td className="py-3 px-4 border-b font-medium text-gray-700">{index + 1}</td>
                <td className="py-3 px-4 border-b">{formatDateTime(parcel.Date)}</td>
                <td className="py-3 px-4 border-b font-semibold text-gray-800">{parcel.CnNumber}</td>
                <td className="py-3 px-4 border-b">{parcel.Item_Type}</td>
                {/* <td className="py-3 px-4 border-b">{parcel.Merchant_email}</td> */}
                <td className="py-3 px-4 border-b">{parcel.Merchant_Name}</td>
                <td className="py-3 px-4 border-b">{parcel.Customer_Contact_Number}</td>
                <td className="py-3 px-4 border-b">{parcel.Customer_Name}</td>
                <td className="py-3 px-4 border-b max-w-xs truncate" title={parcel.Customer_Address}>
                  {parcel.Customer_Address}
                </td>
                {/* Actions column made sticky so it stays visible when scrolling horizontally */}
                <td className="py-3 px-4 border-b flex justify-center gap-2 sticky right-0 bg-white group-hover:bg-gray-100 shadow-[-5px_0_10px_rgba(0,0,0,0.05)]">
                  {/* <button
                    onClick={() => setSelectedParcel(parcel)}
                    className="bg-blue-500 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-600 transition"
                  >
                    View
                  </button> */}
                  <button
  onClick={() => print(parcel)}
  className="bg-emerald-500 text-white px-3 py-1.5 rounded text-sm hover:bg-emerald-600 transition"
>
  Print
</button>
                  
                </td>
              </tr>
            ))}
            
            {Merchant_Booking_Parcels.length === 0 && (
                <tr>
                    <td colSpan="10" className="text-center py-6 text-gray-500">
                        No bookings found.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Viewing Full Data */}
      {selectedParcel && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h2 className="text-2xl font-bold text-gray-800">Parcel Details: {selectedParcel.CnNumber}</h2>
              <button 
                onClick={() => setSelectedParcel(null)}
                className="text-gray-500 hover:text-red-500 font-bold text-xl"
              >
                &times;
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
              {Object.entries(selectedParcel).map(([key, value]) => (
                <div key={key} className="flex flex-col bg-gray-50 p-3 rounded border border-gray-100">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                    {key.replace(/_/g, ' ')}
                  </span>
                  <span className="text-gray-800 font-medium mt-1 break-words">
                    {key === 'Date' 
                      ? formatDateTime(value) 
                      : typeof value === 'boolean' 
                        ? (value ? 'Yes' : 'No') 
                        : String(value)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t pt-4">
              {/* <button
                onClick={print}
                className="bg-emerald-500 text-white px-5 py-2 rounded hover:bg-emerald-600 transition font-medium"
              >
                Print Details
              </button> */}
              <button
                onClick={() => setSelectedParcel(null)}
                className="bg-gray-800 text-white px-5 py-2 rounded hover:bg-gray-900 transition font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <Merchant_Print_Modal
        closeModal={closeModal}
        isOpen={isOpen}
        bookingInfo={bookingInfo}
      />
    </div>
  );
};

export default Merchant_Booking_List;