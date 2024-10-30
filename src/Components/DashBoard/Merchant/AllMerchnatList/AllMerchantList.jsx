import React from 'react';

const AllMerchantList = () => {
    const merchants = [
        {
            id: 1022242128,
            name: 'Mahi',
            email: 'mahi.com',
            password: 'QWEqwe123',
            image: 'https://i.ibb.co.com/yhFWsqX/Use-case-diagram.png',
        },
        
      
        // Add more merchants to demonstrate scrolling
     
    ];

    const handleRemove = (id) => {
        console.log(`Remove merchant with ID: ${id}`);
        // Add remove logic here
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-100 shadow-xl rounded-lg">
            <h1 className="text-3xl font-bold text-blue-600 mb-5 text-center">All Merchant List</h1>
            <div className="overflow-auto rounded-lg border border-gray-200 shadow">
                <table className="min-w-full bg-white">
                    <thead className="bg-blue-600 text-white text-left">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Image</th>
                            <th className="px-6 py-4 font-semibold">Merchant ID</th>
                            <th className="px-6 py-4 font-semibold">Name</th>
                            <th className="px-6 py-4 font-semibold">Email</th>
                            <th className="px-6 py-4 font-semibold">Password</th>
                            <th className="px-6 py-4 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 divide-y divide-gray-200">
                        {merchants.map((merchant) => (
                            <tr key={merchant.id} className="hover:bg-gray-100">
                                <td className="px-6 py-4">
                                    <img
                                        src={merchant.image}
                                        alt={merchant.name}
                                        className="w-12 h-12 rounded-full border border-gray-300 shadow-sm"
                                    />
                                </td>
                                <td className="px-6 py-4">{merchant.id}</td>
                                <td className="px-6 py-4">{merchant.name}</td>
                                <td className="px-6 py-4">{merchant.email}</td>
                                <td className="px-6 py-4">{merchant.password}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleRemove(merchant.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-lg shadow"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllMerchantList;
