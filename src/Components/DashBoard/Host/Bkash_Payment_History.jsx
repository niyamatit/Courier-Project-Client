import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../api/axiosSecure";
import useUsersData from "../../../hooks/useUsersData/useUsersData";

const Bkash_Payment_History = () => {
  const [verifiedUser] = useUsersData();

  const { data: Payment_History = [], isLoading, isError } = useQuery({
    queryKey: ['Payment_History', verifiedUser?.email], // Add email to queryKey for better caching
    queryFn: async () => {
      if (!verifiedUser?.email) {
        return []; // Return empty if no email is available yet
      }
      const res = await axiosSecure.get(`/bkash/${verifiedUser.email}`);
      return res.data;
    },
    enabled: !!verifiedUser?.email, // Only run the query if email is available
  });

  if (isLoading) {
    return <div className="text-center py-4">Loading payment history...</div>;
  }

  if (isError) {
    return <div className="text-center py-4 text-red-500">Error loading payment history.</div>;
  }

  if (Payment_History.length === 0) {
    return <div className="text-center py-4">No payment history found.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Bkash Payment History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-blue-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider border-b border-blue-700 rounded-tl-lg">SL</th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider border-b border-blue-700 rounded-tl-lg">Time</th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider border-b border-blue-700">Amount(৳)</th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider border-b border-blue-700">Account Number</th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider border-b border-blue-700">Transaction ID</th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider border-b border-blue-700">Status</th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider border-b border-blue-700 rounded-tr-lg">Payment Status</th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider border-b border-blue-700 rounded-tr-lg">Admin Note</th>
            </tr>
          </thead>
          <tbody>
            {Payment_History.map((payment,index) => (
              <tr key={payment._id} className="hover:bg-blue-50 transition duration-200 even:bg-blue-50 odd:bg-white">
                <td className="py-3 px-6 border-b border-blue-200 text-gray-800">{index+1}</td>
                <td className="py-3 px-6 border-b border-blue-200 text-gray-800">{payment.date}</td>
                <td className="py-3 px-6 border-b border-blue-200 text-gray-800 font-bold">৳ {payment.amount} </td>
                <td className="py-3 px-6 border-b border-blue-200 text-gray-800">{payment.accountNumber}</td>
                <td className="py-3 px-6 border-b border-blue-200 text-gray-800">{payment.transactionId}</td>
                <td className="py-3 px-6 border-b border-blue-200">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    payment.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                    payment.status === 'confirmed' ? 'bg-green-200 text-green-800' :
                    payment.status === 'rejected' ? 'bg-red-200 text-white-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="py-3 px-6 border-b border-blue-200 text-gray-800">{payment.status === 'pending' ? <>
                    <span className="text-red-500">Wait For Admin Confirmation</span>
                </> : <>
                
                 {
                    payment.status === 'confirmed' ? (
                    <span className="text-green-500">Payment Confirmed</span>) : (<span className="text-red-500">Payment Rejected</span>)
                 }
                </>}</td>
                <td className="py-3 px-6 border-b border-blue-200 text-gray-800">{payment.note || 'No Note'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bkash_Payment_History;