import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOffline, getPackage } from "../../../api/auth";
import { useState } from "react";
import useUsersData from "../../../hooks/useUsersData/useUsersData";
import axiosSecure from "../../../api/axiosSecure";
import Swal from "sweetalert2";

const All_COD_Booking_Admin = () => {
    const { data: OnlineBookings = [], isLoading: isOnlineLoading } = useQuery({
        queryKey: ["OnlineBookings"],
        queryFn: async () => await getPackage(),
    });
    const [verifiedUser] = useUsersData();

    const { data: OfflineBookings = [], isLoading: isOfflineLoading } = useQuery({
        queryKey: ["OfflineBookings"],
        queryFn: async () => await getOffline(),
    });
    const queryClient = useQueryClient();

    const allBookings = [...OnlineBookings, ...OfflineBookings];
    const [searchStartDate, setSearchStartDate] = useState("");
    const [searchEndDate, setSearchEndDate] = useState("");
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [notesdfdfsf, setNotfsfsfsfse] = useState("");
    const [note, setNote] = useState("");
    

    const filteredOfflines = allBookings.filter((booking) => {
        // Ensure correct date field is used
        const bookingDate = booking.booking
            ? new Date(booking.booking).toISOString().split("T")[0]  
            : booking.bookingDate
                ? new Date(booking.bookingDate + "T00:00:00").toISOString().split("T")[0] 
                : null;

        if (!bookingDate) return false; 

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
    const handleSave = async () => {

        if(!selectedBooking){
            return 
        }
        const paymentData = {
            id: selectedBooking._id,
            cnNumber: selectedBooking.CnNumber,
            Admin_Accept_Payment_Amount: (parseFloat(selectedBooking.condition)) || selectedBooking.senderReceive || 0,
            note: note,
            Received_Payment_Admin_Name:verifiedUser?.name,
            Received_Payment_Admin_Email:verifiedUser?.email,
            Admin_Accept_Payment_Time: new Date(),

        };
        try {
             const response = await axiosSecure.patch("/update-payment/hello/bhai/kaj/kor", paymentData);
            if (response.status === 200) {
                await queryClient.invalidateQueries(["OnlineBookings"]);
      await queryClient.invalidateQueries(["OfflineBookings"]);
                Swal.fire("Success!", "Payment updated successfully!!!", "success");
                setSelectedBooking(null);
                setNote("");
            } else {
                Swal.fire("Error!", "Failed to update payment!!", "error");
            }
        } catch (error) {
            console.error("Error updating payment:", error);
            Swal.fire("Error!", "An error occurred while updating payment.", "error");
        }



    }

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-10 text-center mt-5 ">All COD Bookings</h2>
            <div className="my-4 text-center space-x-4">
                <div className="inline-block">
                    <label htmlFor="search-start-date" className="mr-2 text-lg font-medium text-black">
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
                    <label htmlFor="search-end-date" className="mr-2 text-lg font-medium text-black">
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
                        {filteredOfflines.filter((booking) => (parseFloat(booking.condition) || booking.senderReceive || 0) > 0).map((booking, index) => (
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
                                <td className="border px-4  py-2">{(parseFloat(booking.condition)) || booking.senderReceive || 0}</td>
                                <td className="border px-4 py-2">{(parseFloat(booking.conditionCharge) - parseFloat(booking.condition)) || booking.serviceCharge || 0}</td>
                                {/* <td className="border px-4 py-2">{ || booking.receiverPay}</td> */}
                                <td className="border px-4 py-2">{(booking.conditionCharge) || parseFloat(booking?.receiverPay) || 0}</td>
                                {
                                    (booking?.conditionCharge || parseFloat(booking?.receiverPay)) ?
                                       <>
                                       {
                                        (booking?.Admin_Accept_Payment_Amount) ?  <td className="border px-4 text-green-500 py-2">Paid</td> : <td className="border px-4 py-2 text-red-600">Due</td>
                                       }
                                       </> : <td className="border px-4 py-2">N/A</td>
                                }
                                <td className="border px-4 py-2">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={!(booking?.conditionCharge || parseFloat(booking?.receiverPay) ) || booking?.Admin_Accept_Payment_Amount}
                                        onClick={()=>setSelectedBooking(booking)}
                                    >
                                        Pay
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {/* Payment Modal */}
            {selectedBooking && (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Payment</h3>

            {/* Editable COD Amount Field */}
            <label className="block mb-4">
                <span className="text-gray-700 font-semibold">Total COD Amount:</span>
                <input
                    type="number"
                    className="w-full mt-1 p-2 border rounded"
                    value={(parseFloat(selectedBooking.condition)) || selectedBooking.senderReceive || 0}
                    // onChange={(e) => setSelectedBooking({ ...selectedBooking, receiverPay: e.target.value,conditionCharge:e.target.value })}
                />
            </label>

            {/* Note Field */}
            <label className="block mt-4">
                <span className="text-gray-700">Note:</span>
                <textarea
                    className="w-full mt-1 p-2 border rounded"
                    rows="3"
                    placeholder="Enter any additional notes..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
            </label>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-end space-x-2">
                <button
                    onClick={() => setSelectedBooking(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                    Close
                </button>
                <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Save Payment
                </button>
            </div>
        </div>
    </div>
)}
        </div>
    );
};

export default All_COD_Booking_Admin;
