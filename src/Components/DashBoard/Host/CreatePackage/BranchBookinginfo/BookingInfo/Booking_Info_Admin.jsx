/* eslint-disable no-unused-vars */
import { useState } from "react";
import useAuth from "../../../../../../hooks/useAuth";
import useUsersData from "../../../../../../hooks/useUsersData/useUsersData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPackage, getPackagesAdmin, updateBooking } from "../../../../../../api/auth";
import TableBooking from "../TableBooking";
import BookingModal from "../BookingModal";


const Booking_Info_Admin = () => {
    const { loading } = useAuth();
    const [selectedBooking, setSelectedBooking] = useState(null);
    const queryClient = useQueryClient();
    const [initialBooking, setInitialBooking] = useState([]);
    const [searchStartDate, setSearchStartDate] = useState("");
    const [searchEndDate, setSearchEndDate] = useState("");
    const [verifiedUser] = useUsersData();
const [page, setPage] = useState(1);
const limit = 30;

   const {
  data,
  isLoading,
} = useQuery({
  queryKey: ['bookings', page],
  enabled: !loading,
  queryFn: () => getPackagesAdmin(page, limit),
  keepPreviousData: true,
});


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
const bookings = data?.data || [];
const totalPages = data?.totalPages || 1;

    const filteredOfflines = bookings.filter((booking) => {
        const bookingDate = new Date(booking.booking).toISOString().split("T")[0];
        const start = searchStartDate;
        const end = searchEndDate;

        if (start && end) {
            return bookingDate >= start && bookingDate <= end;
        } else if (start) {
            return bookingDate >= start;
        } else if (end) {
            return bookingDate <= end;
        }
        return true;
    });

    if (isLoading) return <p>Loading...</p>;

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
                                        Booking Type
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
                                    {
                                        verifiedUser?.role === 'admin' && <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        Amount Request
                                    </th>
                                    }
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
                </div>
            </div>
<div className="flex justify-center gap-4 mt-6">
  <button
    disabled={page === 1}
    onClick={() => setPage(p => p - 1)}
    className="px-4 py-2 border disabled:opacity-50"
  >
    Prev
  </button>

  <span className="font-semibold">
    Page {page} of {totalPages}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() => setPage(p => p + 1)}
    className="px-4 py-2 border disabled:opacity-50"
  >
    Next
  </button>
</div>

            {selectedBooking && (
                <BookingModal
                    booking={selectedBooking}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default Booking_Info_Admin;