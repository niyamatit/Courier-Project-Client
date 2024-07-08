const OrdersTable = ({ orders }) => {
    return (
        <div className="overflow-x-auto bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Latest Orders</h2>
            <table className="min-w-full bg-white rounded-lg shadow-lg">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-4 text-left font-semibold text-gray-600">Order ID</th>
                        <th className="p-4 text-left font-semibold text-gray-600">Customer Name</th>
                        <th className="p-4 text-left font-semibold text-gray-600">Phone</th>
                        <th className="p-4 text-left font-semibold text-gray-600">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id} className="hover:bg-gray-50">
                            <td className="p-4 border-t">{order.id}</td>
                            <td className="p-4 border-t">{order.customerName}</td>
                            <td className="p-4 border-t">{order.phone}</td>
                            <td className="p-4 border-t">
                                <span
                                    className={`px-3 py-1 rounded-full text-white ${
                                        order.status === 'On The Way To Delivery Hub'
                                            ? 'bg-blue-500'
                                            : order.status === 'Out For Delivery'
                                            ? 'bg-green-500'
                                            : 'bg-gray-500'
                                    }`}
                                >
                                    {order.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between mt-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Place New Order
                </button>
                <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                    View All Orders
                </button>
            </div>
        </div>
    );
};

export default OrdersTable;
