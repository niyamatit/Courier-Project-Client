import { useEffect, useState } from "react";
import useAuth from "../../../../../../hooks/useAuth";
import { getPackage, updateBooking } from "../../../../../../api/auth";
import BookingModal from "../BookingModal";
import TableBooking from "../TableBooking";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


const BookingInfo = () => {
    const { loading } = useAuth();
    const [selectedBooking, setSelectedBooking] = useState(null);
    const queryClient = useQueryClient();
    const [initialBooking, setInitialBooking] = useState([]);



    useEffect(() => {
        if (initialBooking.length > 0) {
            const indexedBookings = initialBooking.map((p, idx) => ({ ...p, idx: idx + 1 }));
            setSelectedBooking(indexedBookings);
        }
    }, [initialBooking]);

    const {
        data: bookings = [],
        isLoading,
    } = useQuery({
        queryKey: ['bookings'],
        enabled: !loading,
        queryFn: async () => await getPackage(),
        onSuccess: (data) => {
            // Populate initialBooking when the data is fetched
            setInitialBooking(data);
        },
    });

    const mutation = useMutation({
        mutationFn: updateBooking,
        onSuccess: () => {
            queryClient.invalidateQueries(['bookings']); // Refresh bookings after update
        },
        onError: (error) => {
            console.error("Error updating booking:", error); // Handle error if needed
        },
    });

    const handleView = (booking) => setSelectedBooking(booking);
    const handleCloseModal = () => setSelectedBooking(null);

    const handleSave = (updatedBooking) => {
        mutation.mutate(updatedBooking); // Update booking data
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className='container mx-auto px-4 sm:px-8'>
            <div className='py-8'>
                <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                        <table className='min-w-full leading-normal'>
                            <thead>
                                <tr>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        SL
                                    </th>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        Date
                                    </th>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        Sender Name
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
                                        Print
                                    </th>
                                    {/* <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        Select MotherHub
                                    </th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking, index) => (
                                    <TableBooking key={booking._id} booking={{ ...booking, idx: index + 1 }} onView={handleView} onSave={handleSave} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Render the modal if a booking is selected */}
            {selectedBooking && (
                <BookingModal
                    booking={selectedBooking}
                    onClose={handleCloseModal}
                    onSave={handleSave} // Pass handleSave to BookingModal
                />
            )}
        </div>
    );
};

export default BookingInfo;


// import { useState } from "react";
// import useAuth from "../../../../../../hooks/useAuth";
// import { getPackage, updateBooking } from "../../../../../../api/auth";
// import BookingModal from "../BookingModal";
// import TableBooking from "../TableBooking";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// const BookingInfo = () => {
//     const { loading } = useAuth();
//     const [selectedBooking, setSelectedBooking] = useState(null);
//     const queryClient = useQueryClient();
//     const [initialBooking, setInitialBooking] = useState([]);
//     const [searchDate, setSearchDate] = useState(""); // State for the date search

//     // Load bookings and populate initialBooking
//     useQuery({
//         queryKey: ['bookings'],
//         enabled: !loading,
//         queryFn: async () => await getPackage(),
//         onSuccess: (data) => {
//             setInitialBooking(data);
//         },
//     });

//     const mutation = useMutation({
//         mutationFn: updateBooking,
//         onSuccess: () => {
//             queryClient.invalidateQueries(['bookings']);
//         },
//         onError: (error) => {
//             console.error("Error updating booking:", error);
//         },
//     });

//     const handleView = (booking) => setSelectedBooking(booking);
//     const handleCloseModal = () => setSelectedBooking(null);

//     const handleSave = (updatedBooking) => {
//         mutation.mutate(updatedBooking);
//     };

//     // Filter bookings by the entered search date
//     const filteredBookings = searchDate
//         ? initialBooking.filter((booking) => {
//             const bookingDate = new Date(booking.date).toISOString().split("T")[0];
//             return bookingDate === searchDate;
//         })
//         : initialBooking;

//     return (
//         <div className='container mx-auto px-4 sm:px-8'>
//             <div className='py-8'>
//                 {/* Date filter input */}
//                 <div className="mb-4">
//                     <label htmlFor="search-date" className="mr-2 text-sm font-medium text-gray-700">
//                         Search by Date:
//                     </label>
//                     <input
//                         type="date"
//                         id="search-date"
//                         value={searchDate}
//                         onChange={(e) => setSearchDate(e.target.value)}
//                         className="border border-gray-300 rounded px-2 py-1 text-sm"
//                         placeholder="Select a date"
//                     />
//                 </div>

//                 <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
//                     <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
//                         <table className='min-w-full leading-normal'>
//                             <thead>
//                                 <tr>
//                                     <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
//                                         SL
//                                     </th>
//                                     <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
//                                         Date
//                                     </th>
//                                     <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
//                                         Sender Name
//                                     </th>
//                                     <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
//                                         Recipient Name
//                                     </th>
//                                     <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
//                                         Sender Mobile
//                                     </th>
//                                     <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
//                                         Recipient Mobile
//                                     </th>
//                                     <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
//                                         Product Details
//                                     </th>
//                                     <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
//                                         Actions
//                                     </th>
//                                     <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
//                                         Print
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredBookings.map((booking, index) => (
//                                     <TableBooking
//                                         key={booking._id}
//                                         booking={{ ...booking, idx: index + 1 }}
//                                         onView={handleView}
//                                     />
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>

//             {/* Render the modal if a booking is selected */}
//             {selectedBooking && (
//                 <BookingModal
//                     booking={selectedBooking}
//                     onClose={handleCloseModal}
//                     onSave={handleSave}
//                 />
//             )}
//         </div>
//     );
// };

// export default BookingInfo;
