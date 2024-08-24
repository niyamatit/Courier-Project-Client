
import { Link } from 'react-router-dom';

const MerchantShopList = () => {
    return (
        <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-full mt-8 border border-gray-200">
            <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Shop List</h1>
            <div className="flex justify-end mb-4">
                <Link to="/dashboard/CreateStore">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md shadow-md transition duration-300">
                    Create Store
                </button>
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full bg-gray-100 rounded-lg border border-gray-200">
                    <thead>
                        <tr className="bg-blue-100 text-left text-blue-600">
                            <th className="py-3 px-6">SL</th>
                            <th className="py-3 px-6">Shop Name</th>
                            <th className="py-3 px-6">Shop Address</th>
                            <th className="py-3 px-6">Contact Number</th>
                            <th className="py-3 px-6">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200 hover:bg-blue-50 transition duration-300">
                            <td className="py-4 px-6">1</td>
                            <td className="py-4 px-6">Niyamat Express</td>
                            <td className="py-4 px-6">Chittagong Road, Narayanganj</td>
                            <td className="py-4 px-6">01852583209</td>
                            <td className="py-4 px-6 flex space-x-2">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md shadow-md transition duration-300">
                                    Edit
                                </button>
                                <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded-md shadow-md transition duration-300">
                                    Active
                                </button>
                                <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md shadow-md transition duration-300">
                                    Default Pickup Store
                                </button>
                            </td>
                        </tr>
                        {/* Add more rows as needed */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MerchantShopList;
