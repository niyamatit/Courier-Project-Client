import { useQuery } from "@tanstack/react-query";

import { useState } from "react"; // Import useState for modal state


const InterNational_Booking_Branch_Admin = () => {
    const [verifiedUser] = useUsersData();
    const { data: Int_Booking_History, isLoading, error } = useQuery({
        queryKey: ['Int_Booking_History', verifiedUser?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/int/${verifiedUser?.email}`);
            return response.data;
        },
    });
 const [offlineBookingShow, setOfflineBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
const [isOpen, setIsOpen] = useState(false);

    const closeModalPrint = () => {
        setIsOpen(false);
    };

    const print = (item) => {
        setOfflineBooking(item);
        setIsOpen(true);
    };
    const handleViewMore = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    if (isLoading) return <div className="text-center py-8 text-lg font-semibold text-gray-700">Loading data...</div>;
    if (error) return <div className="text-center py-8 text-lg font-semibold text-red-600">Error: {error.message}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-800">International Booking Records</h1>

            <div className="overflow-x-auto shadow-xl rounded-lg bg-white">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                        <tr>
                            <th scope="col" className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider rounded-tl-lg">SL</th>
                            <th scope="col" className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider">CN Number</th>
                            <th scope="col" className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider">Customer Name</th>
                            <th scope="col" className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider">Customer Country</th>
                            <th scope="col" className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider">Service Type</th>
                            <th scope="col" className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider">Item Type</th>
                            <th scope="col" className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider">Booking Date</th>
                            <th scope="col" className="py-4 px-6 text-center text-sm font-bold uppercase tracking-wider rounded-tr-lg">View Details</th>
                            <th scope="col" className="py-4 px-6 text-center text-sm font-bold uppercase tracking-wider rounded-tr-lg">Print Details</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {Int_Booking_History.map((item,index) => (
                            <tr key={item._id} className="hover:bg-blue-50 transition duration-200 ease-in-out">
                                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{item.CnNumber}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{item.Customer_Name_Int}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{item.Customer_Country_Name}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{item.Service_Type}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{item.Item_Type}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{item.bookingDate}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-center">
                                    <button
                                        onClick={() => handleViewMore(item)}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                                    >
                                        View Details
                                    </button>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-center">
                                    <button
                                         onClick={()=>print(item)}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                                    >
                                        Print
                                    </button>
                                </td>
                            </tr>
                            
                        ))}
                         <InterNationalPrintModal_Branch
                closeModal={closeModalPrint}
                isOpen={isOpen}
                offlineBookingShow={offlineBookingShow}
                bookingInfo={offlineBookingShow}
            ></InterNationalPrintModal_Branch>
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && selectedItem && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fade-in">
                    <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transition transform duration-300">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-3xl font-bold p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                            &times;
                        </button>
                        <div className="p-6 sm:p-8 lg:p-10">
                            <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900 border-b-2 pb-3 border-blue-500">Booking Full Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700 text-base">
                                {Object.entries(selectedItem).map(([key, value]) => (
                                    <div key={key} className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 break-words">
                                        <span className="font-semibold text-blue-700 block mb-1">{key.replace(/_/g, ' ')}:</span>
                                        <span className="text-gray-800">{value || 'N/A'}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InterNational_Booking_Branch_Admin;