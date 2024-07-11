const OrdersTable = ({ orders }) => {
    return (
        <div className="overflow-x-auto bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Latest Orders</h2>
            <table className="min-w-full bg-white rounded-lg shadow-lg">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="p-4 text-left font-semibold">Order ID</th>
                        <th className="p-4 text-left font-semibold">Customer Name</th>
                        <th className="p-4 text-left font-semibold">Phone</th>
                        <th className="p-4 text-left font-semibold">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr
                            key={order.id}
                            className={`${
                                index % 2 === 0 ? 'bg-blue-50' : 'bg-orange-50'
                            } hover:bg-gray-50`}
                        >
                            <td className="p-4">{order.id}</td>
                            <td className="p-4">{order.customerName}</td>
                            <td className="p-4">{order.phone}</td>
                            <td className="p-4">
                                <span
                                    className={`hidden lg:inline-block px-3 py-1 rounded-full text-white ${
                                        order.status === 'On The Way To Delivery Hub'
                                            ? 'bg-blue-500'
                                            : order.status === 'Out For Delivery'
                                            ? 'bg-green-500'
                                            : 'bg-gray-500'
                                    }`}
                                >
                                    {order.status}
                                </span>
                                <span className="inline-block lg:hidden">{order.status}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex  md:gap-20 lg:gap-20 justify-between mt-4">
                <button className="px-2 md:px-4 lg:px-4 text-xs md:text-base lg:text-base py-2 md:py-2 lg:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Place New Order
                </button>
                <button className="px-2 md:px-4 lg:px-4 text-xs md:text-base lg:text-base  py-2 md:py-2 lg:py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                    View All Orders
                </button>
            </div>
        </div>
    );
};

export default OrdersTable;
