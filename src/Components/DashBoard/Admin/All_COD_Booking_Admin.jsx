import { useQuery } from "@tanstack/react-query";
import { getOffline, getPackage } from "../../../api/auth";
import { useState } from "react";

const All_COD_Booking_Admin = () => {
    const { data: OnlineBookings = [], isLoading: isOnlineLoading } = useQuery({
        queryKey: ["OnlineBookings"],
        queryFn: async () => await getPackage(),
    });

    const { data: OfflineBookings = [], isLoading: isOfflineLoading } = useQuery({
        queryKey: ["OfflineBookings"],
        queryFn: async () => await getOffline(),
    });

    const allBookings = [...OnlineBookings, ...OfflineBookings];
    const [searchStartDate, setSearchStartDate] = useState("");
        const [searchEndDate, setSearchEndDate] = useState("");
    const filteredOfflines = allBookings.filter((booking) => {
        // Ensure correct date field is used
        const bookingDate = booking.booking
            ? new Date(booking.booking).toISOString().split("T")[0]  // Online booking date
            : booking.bookingDate
            ? new Date(booking.bookingDate + "T00:00:00").toISOString().split("T")[0] // Offline booking date
            : null;
    
        if (!bookingDate) return false; // Skip if no valid date is found
    
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
    
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-10 text-center mt-5 ">All COD Bookings</h2>
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
            {(isOnlineLoading || isOfflineLoading) ? (
                <p>Loading...</p>
            ) : (
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Sl.</th>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">CN Number</th>
                            <th className="border px-4 py-2">Sender Name</th>
                            <th className="border px-4 py-2">Sender Number</th>
                            <th className="border px-4 py-2">Receiver Name</th>
                            <th className="border px-4 py-2">Receiver Number</th>
                            <th className="border px-4 py-2">Booking Amount</th>
                            <th className="border px-4 py-2">COD Amount</th>
                            <th className="border px-4 py-2">COD Fee</th>
                            <th className="border px-4 py-2">Total COD</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOfflines.map((booking, index) => (
                            <tr key={booking._id} className="border">
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">
  {booking?.booking
    ? new Date(booking.booking).toLocaleString()
    : booking?.bookingDate
    ? new Date(booking.bookingDate + "T00:00:00").toLocaleString() 
    : booking?.Date
    ? new Date(booking.Date + "T00:00:00").toLocaleString()
    : "N/A"}
</td>

                                <td className="border px-4 py-2">{booking.CnNumber}</td>
                               
                                <td className="border px-4 py-2">{booking.senderName}</td>
                                <td className="border px-4 py-2">{booking.senderMobile || booking.senderContactNo}</td>
                                <td className="border px-4 py-2">{booking.recipientName || booking.receiverName}</td>
                                <td className="border px-4 py-2">{booking.recipientMobile || booking.receiverContactNo}</td>
                                <td className="border px-4 py-2">{parseFloat(booking.amount) || booking.totalCharge}</td>
                                <td className="border px-4 py-2">{(parseFloat(booking.condition)) || booking.senderReceive || 0}</td>
                                <td className="border px-4 py-2">{(parseFloat(booking.conditionCharge)-parseFloat(booking.condition)) || booking.serviceCharge || 0}</td>
                                {/* <td className="border px-4 py-2">{ || booking.receiverPay}</td> */}
                                <td className="border px-4 py-2">{(booking.conditionCharge) || parseFloat(booking?.receiverPay) ||0}</td>
                                {
                                    (booking?.conditionCharge || parseFloat(booking?.receiverPay)) ?
                                    <td className="border px-4 py-2">Due</td> : <td className="border px-4 py-2">N/A</td>
                                }
                                <td className="border px-4 py-2">
  <button
    className="bg-blue-500 text-white px-4 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
    disabled={!(booking?.conditionCharge || parseFloat(booking?.receiverPay))}
  >
    Pay
  </button>
</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default All_COD_Booking_Admin;
