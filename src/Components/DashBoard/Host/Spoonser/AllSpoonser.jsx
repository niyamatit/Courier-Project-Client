// import { useQuery } from "@tanstack/react-query";
// import axiosSecure from "../../../../api/axiosSecure";
// import TableSpoonser from "./TableSpoonser";


// const AllSpoonser = () => {
//     const { data: spoonsers } = useQuery({
//         queryKey: ["spoonser"],
//         queryFn: async () => {
//             const response = await axiosSecure.get("/spoonser");
//             return response.data;
//         },
//     });

//     return (
//         <div className='container mx-auto px-4 sm:px-8'>
//             <div className='py-8'>
//                 <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
//                     <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
//                         <table className='min-w-full leading-normal'>
//                             <thead>
//                                 <tr>
//                                     <th
//                                         scope='col'
//                                         className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                                     >
//                                         Spoonser Image
//                                     </th>

//                                     <th
//                                         scope='col'
//                                         className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                                     >
//                                         Spoonser Name
//                                     </th>
//                                     <th
//                                         scope='col'
//                                         className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                                     >
//                                         Spoonser Title
//                                     </th>
//                                     {/* <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
//                                         Remove
//                                     </th> */}
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {spoonsers.map((spoonser) => (
//                                     <TableSpoonser key={spoonser._id} spoonser={{ spoonser }} />
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AllSpoonser;

import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../../api/axiosSecure";
import TableSpoonser from "./TableSpoonser";

const AllSpoonser = () => {
    const { data: spoonsers = [], isLoading, refetch, error } =
        useQuery({
            queryKey: ["spoonser"],
            queryFn: async () => {
                const response = await axiosSecure.get("/spoonser");
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
                                        Sponsor Image
                                    </th>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        Sponsor Name
                                    </th>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        Sponsor Title
                                    </th>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        Remove
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {spoonsers.length > 0 ? (
                                    spoonsers.map((spoonser) => (
                                        <TableSpoonser key={spoonser._id} spoonser={spoonser} refetch={refetch} />
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center py-4 text-gray-600">
                                            No sponsors available.
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

export default AllSpoonser;

