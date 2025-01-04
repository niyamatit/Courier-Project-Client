import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import { getAllUsers } from "../../../../api/auth"; // Function from auth.jsx
import TableAdmin from "./TableAdmin";

// const AllAdminList = () => {
//     const { loading } = useAuth();
//     const [admins, setAdmins] = useState([]);
//     const [initialAdmin, setInitialAdmin] = useState([]);

//     useEffect(() => {
//         if (initialAdmin.length > 0) {
//             const indexedAdmins = initialAdmin.map((p, idx) => ({ ...p, idx: idx + 1 }));
//             setAdmins(indexedAdmins);
//         }
//     }, [initialAdmin]);

//     // const {
//     //     data: users = [],
//     //     isLoading,
//     // } = useQuery({
//     //     queryKey: ['users'],
//     //     enabled: !loading,
//     //     queryFn: async () => await getAllUsers(),
//     //     onSuccess: (data) => {
//     //         const adminList = data.filter(user => user.role === "admin");
//     //         setAdmins(adminList);
//     //     },
//     // });

//     const {
//         data: users = [],
//         isLoading,
//     } = useQuery({
//         queryKey: ['users'],
//         enabled: !loading,
//         queryFn: async () => await getAllUsers(),
//         onSuccess: (data) => {
//             console.log("Fetched Users:", data); // Add this line
//             const adminList = data.filter(user => user.role === "admin");
//             setAdmins(adminList);
//             setInitialAdmin(data);
//         },
//     });


//     if (isLoading) return <p>Loading...</p>;

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
//                                         SL
//                                     </th>
//                                     <th
//                                         scope='col'
//                                         className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                                     >
//                                         Name
//                                     </th>
//                                     <th
//                                         scope='col'
//                                         className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                                     >
//                                         Number
//                                     </th>
//                                     <th
//                                         scope='col'
//                                         className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                                     >
//                                         Address
//                                     </th>
//                                     <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
//                                         Actions
//                                     </th>
//                                     <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
//                                         Remove
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {admins.map((admin, index) => (
//                                     <TableAdmin key={admin._id} admin={{ ...admin, idx: index + 1 }} />
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AllAdminList;


const AllAdminList = () => {
    const { loading } = useAuth();


    const {
        data: users = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["admin"],
        enabled: !loading,
        queryFn: async () => await getAllUsers(),
    });

    const adminUsers = users?.filter(item => item?.role === 'admin') || [];

    if (isError) {
        console.error("Error fetching users:", error);
        return <p>Error loading users: {error.message}</p>;
    }

    if (isLoading) return <p>Loading...</p>;



    return (
        <div className='container mx-auto px-4 sm:px-8'>
            <div className='py-8'>
                <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                        <table className='min-w-full leading-normal'>
                            <thead>
                                <tr>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>SL</th>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Name</th>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Number</th>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Address</th>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Actions</th>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {adminUsers?.map((admin, index) => (
                                    <TableAdmin key={admin._id} admin={{ ...admin, idx: index + 1 }} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllAdminList;
