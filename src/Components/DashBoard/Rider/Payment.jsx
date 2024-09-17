import React from 'react';

const Payment = () => {
    const parcels = [
        {
            sl: 1,
            invoice: '240605IQQ0JXO',
            merchant: 'Merchant One',
            customerName: 'John Doe',
            customerContact: '0123456789',
            customerAddress: 'GM Vobon, Loni Hajari Road Master para, Feni',
            collectionAmount: 0,
            status: 'Delivery Run Complete',
        },
        {
            sl: 2,
            invoice: '240605IQQ0JYP',
            merchant: 'Merchant Two',
            customerName: 'Jane Smith',
            customerContact: '0987654321',
            customerAddress: 'Block B, Banani, Dhaka',
            collectionAmount: 500,
            status: 'Pending Delivery',
        },
        {
            sl: 3,
            invoice: '240605IQQ0JXM',
            merchant: 'Merchant Three',
            customerName: 'Alex Johnson',
            customerContact: '0198765432',
            customerAddress: 'Chittagong, Bangladesh',
            collectionAmount: 250,
            status: 'Delivery Run Complete',
        },
        // Add more rows as necessary
    ];

    return (
        <div className="container mx-auto p-4">
            {/* Header Section */}
            <div className="bg-white shadow-md rounded-md p-4 mb-6">
                <h1 className="text-2xl font-semibold text-blue-600">Paid Amount Parcel List</h1>
            </div>

            {/* Table Section */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium">SL</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Invoice</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Merchant Name</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Customer Name</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Customer Contact</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Customer Address</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Collection Amount</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">{parcel.sl}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{parcel.invoice}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{parcel.merchant}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{parcel.customerName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{parcel.customerContact}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{parcel.customerAddress}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{parcel.collectionAmount}</td>
                                <td
                                    className={`px-6 py-4 whitespace-nowrap font-semibold ${
                                        parcel.status === 'Delivery Run Complete'
                                            ? 'text-green-600'
                                            : 'text-yellow-500'
                                    }`}
                                >
                                    {parcel.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex items-center justify-between p-4 bg-gray-100">
                    <div className="flex items-center space-x-2">
                        <span>Show</span>
                        <select className="border rounded-md px-2 py-1 text-sm">
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                        </select>
                        <span>entries</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 bg-blue-600 text-white rounded-md">Previous</button>
                        <span className="text-sm">Page 1 of 1</span>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded-md">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
