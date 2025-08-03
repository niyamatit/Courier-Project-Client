import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../../api/axiosSecure";
import moment from 'moment';

const Cost_History = () => {
    const [searchName, setSearchName] = useState("");
    const [searchDate, setSearchDate] = useState("");

    const { data: cost_history = [], isLoading, isError } = useQuery({
        queryKey: ['cost_history'],
        queryFn: async () => {
            const res = await axiosSecure.get("/cost");
            return res.data;
        }
    });

    const handleNameChange = (e) => {
        setSearchName(e.target.value);
    };

    const handleDateChange = (e) => {
        setSearchDate(e.target.value);
    };

    const filteredHistory = cost_history.filter(item => {
        const matchesName = item.cost_name.toLowerCase().includes(searchName.toLowerCase());
        const matchesDate = searchDate === "" || moment(item.date).format("YYYY-MM-DD") === searchDate;
        return matchesName && matchesDate;
    });

    if (isLoading) {
        return <div className="text-center p-8 text-xl text-gray-700">Loading cost history...</div>;
    }

    if (isError) {
        return <div className="text-center p-8 text-xl text-red-600">Error loading cost history. Please try again later.</div>;
    }

    return (
        <div className="container mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-600 mb-6 md:mb-10">Cost History</h1>
            
            {/* Search and Filter Inputs */}
            <div className="mb-8 flex flex-col md:flex-row items-center justify-center gap-4">
                <input 
                    type="text"
                    placeholder="Search by cost name..."
                    value={searchName}
                    onChange={handleNameChange}
                    className="w-full md:w-1/3 p-3 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />
                <input 
                    type="date"
                    value={searchDate}
                    onChange={handleDateChange}
                    className="w-full md:w-1/3 p-3 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />
            </div>

            {/* Table or No Results Message */}
            {filteredHistory.length === 0 ? (
                <div className="text-center text-gray-500 text-lg mt-12">
                    No cost entries found matching your search.
                </div>
            ) : (
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                                        SL
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                                        Cost Name
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                                        Note
                                    </th>
                                    
                                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                                        Added By
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredHistory.map((item, index) => (
                                    <tr key={item._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {index+1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {moment(item.date).format("MMMM D, YYYY")}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {item.cost_name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-bold">
                                            ৳ {item.amount.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {item.note || "N/A"}
                                        </td>
                                        
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {item.Who_Added_Name}({item.Who_Added})
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cost_History;