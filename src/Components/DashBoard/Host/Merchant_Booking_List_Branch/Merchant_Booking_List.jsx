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
  
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 50; 

  const { data: queryData = {}, refetch, isLoading } = useQuery({
    queryKey: ['merchant-booking-parcels', verifiedUser?.name, currentPage],
    queryFn: async () => {
      // Pass page and limit as query parameters
      const res = await axiosSecure.get(`/merchants/branch/${verifiedUser?.name}?page=${currentPage}&limit=${limit}`);
      return res.data;
    },
    // Don't run query until we have the user name
    enabled: !!verifiedUser?.name, 
    keepPreviousData: true // Keeps old data on screen while fetching the next page
  });

  const Merchant_Booking_Parcels = queryData.data || [];
  const totalPages = queryData.totalPages || 1;
  const totalCount = queryData.totalCount || 0;

  const closeModal = () => {
    setIsOpen(false);
  };

  const print = (parcel) => {
    setBookingInfo(parcel);
    setIsOpen(true);
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };


  const generatePagination = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  if (isLoading && Merchant_Booking_Parcels.length === 0) {
    return <div className="text-center mt-10">Loading parcels...</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-[95%]">
      <h1 className="text-3xl text-center mt-10 font-bold mb-8">
        My Merchants Booking List 
        <span className="text-blue-600 block text-lg mt-2 font-medium">Total Bookings: {totalCount}</span>
      </h1>

      <div className="overflow-x-auto shadow-md rounded-lg mb-6">
        <table className="w-full min-w-[1400px] text-left bg-white border-collapse whitespace-nowrap">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 border-b">SL</th>
              <th className="py-3 px-4 border-b">Date</th>
              <th className="py-3 px-4 border-b">CN Number</th>
              <th className="py-3 px-4 border-b">Item Type</th>
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
                {/* Calculate continuous serial number across pages */}
                <td className="py-3 px-4 border-b font-medium text-gray-700">
                  {(currentPage - 1) * limit + index + 1}
                </td>
                <td className="py-3 px-4 border-b">{formatDateTime(parcel.Date)}</td>
                <td className="py-3 px-4 border-b font-semibold text-gray-800">{parcel.CnNumber}</td>
                <td className="py-3 px-4 border-b">{parcel.Item_Type}</td>
                <td className="py-3 px-4 border-b">{parcel.Merchant_Name}</td>
                <td className="py-3 px-4 border-b">{parcel.Customer_Contact_Number}</td>
                <td className="py-3 px-4 border-b">{parcel.Customer_Name}</td>
                <td className="py-3 px-4 border-b max-w-xs truncate" title={parcel.Customer_Address}>
                  {parcel.Customer_Address}
                </td>
                <td className="py-3 px-4 border-b flex justify-center gap-2 sticky right-0 bg-white group-hover:bg-gray-100 shadow-[-5px_0_10px_rgba(0,0,0,0.05)]">
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
                    <td colSpan="9" className="text-center py-6 text-gray-500">
                        No bookings found.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination UI */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pb-10">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          {generatePagination().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && setCurrentPage(page)}
              disabled={page === '...'}
              className={`px-4 py-2 border rounded ${
                currentPage === page 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : page === '...' 
                    ? 'bg-transparent border-none cursor-default' 
                    : 'hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}

          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal / Print functionality stays unchanged */}
      <Merchant_Print_Modal
        closeModal={closeModal}
        isOpen={isOpen}
        bookingInfo={bookingInfo}
      />
    </div>
  );
};

export default Merchant_Booking_List;