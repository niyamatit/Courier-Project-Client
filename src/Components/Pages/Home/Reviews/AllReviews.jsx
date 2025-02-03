

import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../../api/axiosSecure";
import TableReviews from "./TableReviews";

const AllReviews = () => {
    const { data: rates = [], isLoading, refetch, error } =
        useQuery({
            queryKey: ["rate"],
            queryFn: async () => {
                const response = await axiosSecure.get("/rate");
                return response.data || []; // Ensure it always returns an array
            },
        });

    // Handle loading state
    if (isLoading) {
        return <p className="text-center text-gray-600">Loading sponsors...</p>;
    }

    // Handle error state
    if (error) {
        return <p className="text-center text-red-600">Error fetching sponsors: {error.message}</p>;
    }

    return (
        <div className='container mx-auto px-4 sm:px-8'>
            <div className='py-8'>
                <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                        <table className='min-w-full leading-normal'>
                            <thead>
                                <tr>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        Rating
                                    </th>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        comment
                                    </th>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {rates.length > 0 ? (
                                    rates.map((rate) => (
                                        <TableReviews key={rate._id} rate={rate} refetch={refetch} />
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center py-4 text-gray-600">
                                            No reviwe available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllReviews;

