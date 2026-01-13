import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import axiosSecure from "../../../../api/axiosSecure";

const AllMerchantAccountList_Admin = () => {

  
  const {
    data: accounts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allMerchantAccounts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/mer-add-account");
      return res.data;
    },
  });


  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Account?",
      text: "This account will be permanently removed",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/merchant-accounts/${id}`);
      Swal.fire("Deleted", "Account removed successfully", "success");
      refetch();
    } catch {
      Swal.fire("Error", "Failed to delete account", "error");
    }
  };


  
  if (isLoading) {
    return <div className="text-center py-10">Loading accounts...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-blue-600 mb-6">
        All Merchant Accounts
      </h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm">Merchant</th>
              <th className="px-4 py-2 text-left text-sm">Method</th>
              <th className="px-4 py-2 text-left text-sm">Account Details</th>
             
              <th className="px-4 py-2 text-center text-sm">Actions</th>
            </tr>
          </thead>

          <tbody>
            {accounts.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No merchant accounts found
                </td>
              </tr>
            ) : (
              accounts.map((acc) => (
                <tr key={acc._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm">
                    <p className="font-medium">{acc.addedByName}</p>
                    <p className="text-xs text-gray-500">{acc.addedBy}</p>
                  </td>

                  <td className="px-4 py-2 text-sm capitalize">
                    {acc.paymentMethod}
                  </td>

                  <td className="px-4 py-2 text-sm">
                    {acc.paymentMethod === "bank" ? (
                      <>
                        <p><b>Bank:</b> {acc.bankName}</p>
                        <p><b>Acc No:</b> {acc.accountNo}</p>
                        <p><b>Routing:</b> {acc.routingNo}</p>
                      </>
                    ) : (
                      <p><b>Mobile:</b> {acc.personalNumber}</p>
                    )}
                  </td>

                  

                  <td className="px-4 py-2 text-center space-x-2">
                    

                   

                    <button
                      onClick={() => handleDelete(acc._id)}
                      className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllMerchantAccountList_Admin;
