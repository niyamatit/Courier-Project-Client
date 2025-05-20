import { useQuery, useQueryClient } from "@tanstack/react-query";
import useUsersData from "../../../hooks/useUsersData/useUsersData";
import axiosSecure from "../../../api/axiosSecure";
import Swal from "sweetalert2";

const Merchant_Recharge_Pending_Admin = () => {
  const [verifiedUser] = useUsersData();
const queryClient = useQueryClient();
  const { data: Merchant_history = [], isLoading } = useQuery({
    queryKey: ['Merchant_history'],
    queryFn: async () => {
      const res = await axiosSecure.get('/Merchant_Recharge/pending');
      return res.data;
    },
  });
   
const handleStatusChange = async (id, newStatus) => {
    try {
        
      const res = await axiosSecure.patch(`/Merchant_Recharge/update-status/${id}`, {
        status: newStatus
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Status updated successfully!", "success");
        queryClient.invalidateQueries(['Merchant_history']);
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update status", "error");
    }
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Pending Merchant Recharges</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-2 border">Merchant ID</th>
                <th className="p-2 border">Merchant Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Note</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {Merchant_history.map((item) => (
                <tr key={item._id} className="text-center">
                  <td className="border p-2">{item.merchantID}</td>
                  <td className="border p-2">{item.Merchant_Name}</td>
                  <td className="border p-2">{item.Merchant_email}</td>
                  <td className="border p-2">{item.ApplyAMount}</td>
                  <td className="border p-2">{item.Note}</td>
                  <td className="border p-2">
                    {new Date(item.transaction_date).toLocaleString()}
                  </td>
                  <td className="border p-2 capitalize">{item.status}</td>
                   <td className="border p-2">
                    <select
                      defaultValue=""
                      onChange={(e) => handleStatusChange(item._id, e.target.value)}
                      className="border border-blue-200 rounded px-2 py-1 focus:ring-1"
                    >
                      <option value="" disabled>Update Status</option>
                      <option value="In process">In process</option>
                      <option value="Hand over Bank">Hand over Bank</option>
                      <option value="Paid Successful">Paid Successful</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {Merchant_history.length === 0 && (
            <p className="text-center mt-4">No pending recharge requests.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Merchant_Recharge_Pending_Admin;
