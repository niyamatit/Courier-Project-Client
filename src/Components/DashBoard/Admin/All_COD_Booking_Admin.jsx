import { useQuery } from "@tanstack/react-query";
import { getOffline, getPackage } from "../../../api/auth";

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

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">All COD Bookings</h2>
            {(isOnlineLoading || isOfflineLoading) ? (
                <p>Loading...</p>
            ) : (
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Sl.</th>
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
                        {allBookings.map((booking, index) => (
                            <tr key={booking._id} className="border">
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{booking.CnNumber}</td>
                                <td className="border px-4 py-2">{booking.senderName}</td>
                                <td className="border px-4 py-2">{booking.senderMobile || booking.senderContactNo}</td>
                                <td className="border px-4 py-2">{booking.recipientName || booking.receiverName}</td>
                                <td className="border px-4 py-2">{booking.recipientMobile || booking.receiverContactNo}</td>
                                <td className="border px-4 py-2">{booking.amount || booking.totalCharge}</td>
                                <td className="border px-4 py-2">{booking.condition || booking.receiverPay}</td>
                                <td className="border px-4 py-2">{booking.conditionCharge || booking.serviceCharge}</td>
                                <td className="border px-4 py-2">{(booking.condition || booking.receiverPay) + (booking.conditionCharge || booking.serviceCharge)}</td>
                                <td className="border px-4 py-2">Due</td>
                                <td className="border px-4 py-2">
                                    <button className="bg-blue-500 text-white px-4 py-1 rounded">Pay</button>
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
