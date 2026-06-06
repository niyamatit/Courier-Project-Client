// import { useQuery } from "@tanstack/react-query";
// import useUsersData from "../../../../../hooks/useUsersData/useUsersData";
// import { getAllRecharge } from "../../../../../api/auth";
// import TableHistory from "./TableHistory";

// const RechargeHistory = () => {


//     const [verifiedUser] = useUsersData()

//     const { data: recharge = [], refetch } = useQuery({
//         queryKey: ['recharge', verifiedUser?.email], // Query key includes user email
//         queryFn: () => getAllRecharge(verifiedUser?.email), // Function to fetch recharge
//         enabled: !!verifiedUser?.email, // Only run when email is available
//     });

//     console.log(recharge)
//     const rechargeProcessing = recharge.filter(user => user?.update === 'recharge');
//     return (
//         <div>
//             <div className='container mx-auto px-4 sm:px-8'>

//                 <div className='py-8'>
//                     <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
//                         <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
//                             <table className='min-w-full leading-normal'>
//                                 <thead>
//                                     <tr className="text-lg font-rancho">
//                                         <th
//                                             scope='col'
//                                             className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                                         >
//                                             Account Name
//                                         </th>
//                                         <th
//                                             scope='col'
//                                             className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                                         >
//                                             Account Number
//                                         </th>
//                                         <th
//                                             scope='col'
//                                             className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                                         >
//                                             Account Amount
//                                         </th>
//                                         <th
//                                             scope='col'
//                                             className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                                         >
//                                             Recharge Note
//                                         </th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {/* User data table row */}
//                                     {rechargeProcessing &&
//                                         rechargeProcessing.map(recharge => (
//                                             <TableHistory
//                                                 key={recharge._id}
//                                                 recharge={recharge}
//                                                 refetch={refetch}
//                                             />
//                                         ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RechargeHistory;
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../../../api/axiosSecure";
import useUsersData from "../../../../../hooks/useUsersData/useUsersData";

const RechargeHistory = () => {
    const { data: historys_user = [] } = useQuery({
        queryKey: ['historys_user'],
        queryFn: async () => {
            const res = await axiosSecure.get("/history");
            return res.data;
        }
    });
 const [verifiedUser] = useUsersData()
 const rechargeProcessing = historys_user.filter(user => user?.Branch_Email === verifiedUser?.email);
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recharge History of <span className="font-bold text-blue-700">{verifiedUser?.name}</span></h2>
            
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Branch Balance (৳)</th>
                             <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Now Added (৳)</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                            
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {rechargeProcessing.map(history => (
                            <tr key={history._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{history.Branch_Name}</div>
                                    <div className="text-sm text-gray-500">{history.Branch_Email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {history.Account_Name || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                    {parseInt(history.Total_Amount_Branch).toLocaleString() || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                    {history.Amount_Now_Added.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {history.Note || '-'}
                                </td>
                                {/* <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {history.Status.includes('Added') ? 'Completed' : 'Pending'}
                                    </span>
                                </td> */}
                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
  {new Date(history.Date).toLocaleString('en-BD', {
    day: 'numeric',
    month: 'numeric',
    year: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).replace(/,/, ' (') + ')'}
</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {history.Status || ""}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {rechargeProcessing.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No recharge history available
                </div>
            )}
        </div>
    );
};

export default RechargeHistory;