import { useQuery } from "@tanstack/react-query";
import useUsersData from "../../../hooks/useUsersData/useUsersData";
import axiosSecure from "../../../api/axiosSecure";

const Merchant_balance_history = () => {
    const [verifiedUser] = useUsersData();
    const { data: Balance_History = [] } = useQuery({
        queryKey: ['Balance_History', verifiedUser?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcelhkdbjsbdjkshujsbh/verfied?email=${verifiedUser?.email}`);
            return res.data;
        },
        enabled: !!verifiedUser?.email,
    });
    const { data: BalanceApply_History = [] } = useQuery({
        queryKey: ['BalanceApply_History', verifiedUser?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/Merchant_Recharge/verfied/again?email=${verifiedUser?.email}`);
            return res.data;
        },
        enabled: !!verifiedUser?.email,
    });
    const CombinedHistory = [
  ...Balance_History,
  ...BalanceApply_History
].sort((a, b) => new Date(b.Date || b.transaction_date) - new Date(a.Date || a.transaction_date));



    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
       
            <h2 className="text-blue-600 font-bold text-2xl mb-4">Balance History ({CombinedHistory.length})</h2>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="px-4 py-3 text-left rounded-tl-lg">Date</th>
                            <th className="px-4 py-3 text-left">CN Number</th>
                            <th className="px-4 py-3 text-left">Customer Name</th>
                            <th className="px-4 py-3 text-left">Address</th>
                            <th className="px-4 py-3 text-left">Item Type</th>
                            <th className="px-4 py-3 text-left">Weight</th>
                            
                            <th className="px-4 py-3 text-right rounded-tr-lg">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {CombinedHistory.map(parcel => (
                            <tr key={parcel._id} className={`hover:bg-gray-50 even:bg-gray-50 ${
    parcel?.ApplyAMount ? 'border bg-red-200 ' : ''
  }`}>
                                <td className="px-4 py-3 text-gray-700">
                                    {new Date(parcel.Date || parcel?.transaction_date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </td>
                                <td className="px-4 py-3 text-gray-700 font-medium">{parcel.CnNumber}</td>
                                <td className="px-4 py-3 text-gray-600">{parcel.Customer_Name}</td>
                                <td className="px-4 py-3 text-gray-600">
                                    {parcel.Customer_District_Name}, {parcel.Customer_Area}
                                </td>
                                <td className="px-4 py-3 text-gray-600 capitalize">{parcel.Item_Type || parcel?.Note}</td>
                                <td className="px-4 py-3 text-gray-700">{parcel.Parcel_Weight} {parcel?.Parcel_Weight && "kg"}</td>
                                
                               <td className={`px-4 py-3 text-right font-semibold ${
                                    parcel.Calculate_Charge_Merchant < 0 
                                        ? 'text-red-500' 
                                        : parcel.Calculate_Charge_Merchant === 0 
                                            ? 'text-blue-500' 
                                            : 'text-green-600'
                                }`}>
                                    {parcel.Calculate_Charge_Merchant || parcel?.ApplyAMount} ৳
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {Balance_History.length === 0 && (
                <p className="text-center text-gray-500 py-6">No balance transactions available</p>
            )}
        </div>
    );
};

export default Merchant_balance_history;