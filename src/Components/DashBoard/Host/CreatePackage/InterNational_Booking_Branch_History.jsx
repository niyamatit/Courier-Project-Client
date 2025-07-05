import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../../api/axiosSecure";
import { useState } from "react"; // Import useState for modal state

const InterNational_Booking_Branch_History = () => {
    const { data: Int_Booking_History, isLoading, error } = useQuery({
        queryKey: ['Int_Booking_History'],
        queryFn: async () => {
            const response = await axiosSecure.get('/int');
            return response.data;
        },
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleViewMore = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    if (isLoading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-center py-4 text-red-500">Error: {error.message}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">International Booking History</h1>

            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left">CN Number</th>
                            <th className="py-3 px-6 text-left">Customer Name</th>
                            <th className="py-3 px-6 text-left">Customer Country</th>
                            <th className="py-3 px-6 text-left">Service Type</th>
                            <th className="py-3 px-6 text-left">Booking Date</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {Int_Booking_History.map((item) => (
                            <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">{item.CnNumber}</td>
                                <td className="py-3 px-6 text-left">{item.Customer_Name_Int}</td>
                                <td className="py-3 px-6 text-left">{item.Customer_Country_Name}</td>
                                <td className="py-3 px-6 text-left">{item.Service_Type}</td>
                                <td className="py-3 px-6 text-left">{item.bookingDate}</td>
                                <td className="py-3 px-6 text-center">
                                    <button
                                        onClick={() => handleViewMore(item)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        View More
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && selectedItem && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Booking Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                            {Object.entries(selectedItem).map(([key, value]) => (
                                <div key={key} className="break-words">
                                    <span className="font-semibold">{key.replace(/_/g, ' ')}:</span> {value}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InterNational_Booking_Branch_History;