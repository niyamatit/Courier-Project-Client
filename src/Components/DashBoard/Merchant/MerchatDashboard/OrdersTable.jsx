import React, { useState } from "react";

const OrdersTable = ({ parcels }) => {
    // Pagination states
    const itemsPerPage = 5; // You can adjust this number
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the start and end index for pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Get the paginated data
    const paginatedOrders = parcels.slice(startIndex, endIndex);

    // Calculate total pages
    const totalPages = Math.ceil(parcels.length / itemsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="overflow-x-auto bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Latest Orders</h2>
            <table className="min-w-full bg-white rounded-lg shadow-lg">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="p-4 text-left font-semibold">SL</th>
                        <th className="p-4 text-left font-semibold">Order ID</th>
                        <th className="p-4 text-left font-semibold">Customer Name</th>
                        <th className="p-4 text-left font-semibold">Phone</th>
                        <th className="p-4 text-left font-semibold">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedOrders.map((order, index) => (
                        <tr
                            key={order.id}
                            className={`${
                                index % 2 === 0 ? 'bg-blue-50' : 'bg-orange-50'
                            } hover:bg-gray-50`}
                        >
                            <td className="p-4">{startIndex + index + 1}</td>
                            <td className="p-4">{order?.CnNumber}</td>
                            <td className="p-4">{order.Customer_Name}</td>
                            <td className="p-4">{order.Customer_Contact_Number}</td>
                            <td className="p-4">
                                <span
                                    className={`hidden lg:inline-block px-3 py-1 rounded-full text-white ${
                                        (!order.Tracking_Rider_Merchant_Delivary_Update_Return_Time ||
                                        !order?.Tracking_Rider_Merchant_Delivary_Update_Time)
                                            ? 'bg-blue-500'
                                            : order.status === 'Out For Delivery'
                                            ? 'bg-green-500'
                                            : 'bg-gray-500'
                                    }`}
                                >
                                    <div>
                                        {(!order.Tracking_Rider_Merchant_Delivary_Update_Return_Time ||
                                          !order?.Tracking_Rider_Merchant_Delivary_Update_Time) &&
                                          "Pending"}
                                        {order?.Tracking_Rider_Merchant_Delivary_Update_Time && "Delivered"}
                                        {order?.Tracking_Rider_Merchant_Delivary_Update_Return_Time && "Returned"}
                                    </div>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            {/* Pagination Controls */}
<div className="mt-4 flex justify-center">
  <button
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
    className={`px-4 py-2 mx-1 rounded 
      ${currentPage === 1 ? "bg-white text-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"}`}
  >
    Prev
  </button>

  <span className="px-4 py-2">{`${currentPage} of ${totalPages}`}</span>

  <button
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
    className={`px-4 py-2 mx-1 rounded 
      ${currentPage === totalPages ? "bg-white text-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"}`}
  >
    Next
  </button>
</div>

        </div>
    );
};

export default OrdersTable;
