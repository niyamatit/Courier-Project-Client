/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import useAuth from "../../../../../../hooks/useAuth";
import { getAllPackage, getAllPackage_Updated, getPackage, updateBooking } from "../../../../../../api/auth";

import TableBooking from "../TableBooking";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useUsersData from "../../../../../../hooks/useUsersData/useUsersData";
import BookingModal_Branch from "../BookingModal_Branch";

const BookingInfo = () => {
    const { loading } = useAuth();
    const [selectedBooking, setSelectedBooking] = useState(null);
    const queryClient = useQueryClient();
    const [initialBooking, setInitialBooking] = useState([]);
    const [searchStartDate, setSearchStartDate] = useState("");
    const [searchEndDate, setSearchEndDate] = useState("");
    const [verifiedUser] = useUsersData();
    const [page, setPage] = useState(1);
const [limit] = useState(50);

    const {data,isLoading} =useQuery({
  queryKey: ['bookings', verifiedUser?.email, page],
  enabled: !loading && !!verifiedUser?.email,
  queryFn: () =>
    getAllPackage_Updated(
      verifiedUser?.email,
      page,
      limit
    ),
    });
const bookings = data?.data || [];
const total = data?.total || 0;
const totalPages = data?.totalPages || 0;
    const mutation = useMutation({
        mutationFn: updateBooking,
        onSuccess: () => {
            queryClient.invalidateQueries(['bookings']);
        },
        onError: (error) => {
            console.error("Error updating booking:", error);
        },
    });

    const handleView = (booking) => setSelectedBooking(booking);
    const handleCloseModal = () => setSelectedBooking(null);

    const handleSave = (updatedBooking) => {
        mutation.mutate(updatedBooking);
    };

    const filteredOfflines = bookings.filter((booking) => {
        const bookingDate = new Date(booking.booking).toISOString().split("T")[0];
        const start = searchStartDate;
        const end = searchEndDate;
if(start && end){
return bookingDate >= start && bookingDate <= end;
        } else if (start) {
            return bookingDate >= start;
        } else if (end){
            return bookingDate <= end;
        }
        return true;
    });

    if (isLoading) return <p>Loading...</p>;
const getPagination = (currentPage, totalPages) => {
  const pages = [];

  if (totalPages <= 7) {
    return Array.from(
      { length: totalPages },
      (_, i) => i + 1
    );
  }

  pages.push(1);

  if (currentPage > 4) {
    pages.push("...");
  }

  let start = Math.max(2, currentPage - 1);
  let end = Math.min(totalPages - 1, currentPage + 1);

  if (currentPage <= 4) {
    start = 2;
    end = 5;
  }

  if (currentPage >= totalPages - 3) {
    start = totalPages - 4;
    end = totalPages - 1;
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 3) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
};
    return (
        <div className='container mx-auto px-4 sm:px-8'>
            <h2 className='text-3xl font-bold text-gray-700 mb-4 text-center mt-5'>All Online Booking</h2>
            
            <div className='py-8'>
                <div className="my-4 text-center space-x-4">
                    <div className="inline-block">
                        <label htmlFor="search-start-date" className="mr-2 text-lg font-medium text-gray-700">
                            Start Date:
                        </label>
                        <input
                            type="date"
                            id="search-start-date"
                            value={searchStartDate}
                            onChange={(e) => setSearchStartDate(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                    </div>
                    <div className="inline-block">
                        <label htmlFor="search-end-date" className="mr-2 text-lg font-medium text-gray-700">
                            End Date:
                        </label>
                         <input
                            type="date"
                            id="search-end-date"
                            value={searchEndDate}
                            onChange={(e) => setSearchEndDate(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                    </div>
                </div>

                <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                        <table className='min-w-full leading-normal'>
                            <thead>
                                <tr>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        SL
                                    </th>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        Booking
                                    </th>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        Date
                                    </th>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        Print
                                    </th>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        Recipient Name
                                    </th>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        Sender Mobile
                                    </th>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        Recipient Mobile
                                    </th>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        Product Details
                                    </th>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        CN Number
                                    </th>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        Actions
                                    </th>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        Sender Name
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOfflines.map((booking, index) => (
                                    <TableBooking key={booking._id} booking={{ ...booking, idx: index + 1 }} onView={handleView} onSave={handleSave} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
  <button
    disabled={page === 1}
    onClick={() => setPage((prev) => prev - 1)}
    className="px-3 py-1 border rounded disabled:opacity-50"
  >
    Prev
  </button>

  {getPagination(page, totalPages).map((item, index) =>
    item === "..." ? (
      <span key={index} className="px-2">
        ...
      </span>
    ) : (
      <button
        key={item}
        onClick={() => setPage(item)}
        className={`px-3 py-1 rounded border ${
          page === item
            ? "bg-blue-500 text-white"
            : "bg-white"
        }`}
      >
        {item}
      </button>
    )
  )}

  <button
    disabled={page === totalPages}
    onClick={() => setPage((prev) => prev + 1)}
    className="px-3 py-1 border rounded disabled:opacity-50"
  >
    Next
  </button>
</div>
                </div>
            </div>

            {selectedBooking && (
                <BookingModal_Branch
                    booking={selectedBooking}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default BookingInfo;