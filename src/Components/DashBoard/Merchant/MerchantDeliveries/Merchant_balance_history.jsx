import { useQuery } from "@tanstack/react-query";
import useUsersData from "../../../../hooks/useUsersData/useUsersData";
import axiosSecure from "../../../../api/axiosSecure";

const Merchant_balance_history = () => {
  const [verifiedUser] = useUsersData();

  // Parcel History
  const { data: Balance_History = [] } = useQuery({
    queryKey: ["Balance_History", verifiedUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcelhkdbjsbdjkshujsbh/verfied?email=${verifiedUser?.email}`
      );
      return res.data;
    },
    enabled: !!verifiedUser?.email,
  });

  // Recharge History
  const { data: BalanceApply_History = [] } = useQuery({
    queryKey: ["BalanceApply_History", verifiedUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/Merchant_Recharge/verfied/again?email=${verifiedUser?.email}`
      );
      return res.data;
    },
    enabled: !!verifiedUser?.email,
  });

  // Admin Add / Minus Balance
  const { data: Admin_Add_Balance_Mer = [] } = useQuery({
    queryKey: ["Admin_Add_Balance_Mer", verifiedUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/mer-add-balance-admin/verfied/again?email=${verifiedUser?.email}`
      );
      return res.data;
    },
    enabled: !!verifiedUser?.email,
  });

  // Normalize All Data
  const normalizeData = (item) => {
    return {
      _id: item._id,

      date: item.Date || item.transaction_date || item.date,

      CnNumber: item.CnNumber || "Admin Adjustment",

      Customer_Name:
        item.Customer_Name || item.Merchant_name || "N/A",

      Customer_District_Name: item.Customer_District_Name || "N/A",

      Customer_Area: item.Customer_Area || "",

      Item_Type:
        item.Item_Type || item.Admin_Note || item.Note || "N/A",

      Parcel_Weight: item.Parcel_Weight || "",

      Calculate_Charge_Merchant:
        item.Calculate_Charge_Merchant ??
        item.ApplyAMount ??
        item.Amount_Added ??
        0,

      status: item.status || item.Added_By_Admin || "Completed",

      ApplyAMount: item.ApplyAMount,
    };
  };

  
  const CombinedHistory = [
    ...Balance_History,
    ...BalanceApply_History,
    ...Admin_Add_Balance_Mer,
  ]
    .map(normalizeData)
    .sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-blue-600 font-bold text-2xl mb-4">
        Balance History ({CombinedHistory.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left rounded-tl-lg">
                Date
              </th>
              <th className="px-4 py-3 text-left">
                CN Number
              </th>
              <th className="px-4 py-3 text-left">
                Customer Name
              </th>
              <th className="px-4 py-3 text-left">
                Address
              </th>
              <th className="px-4 py-3 text-left">
                Item Type/Admin Note
              </th>
              <th className="px-4 py-3 text-left">
                Weight
              </th>

              <th className="px-4 py-3 text-right rounded-tr-lg">
                Amount
              </th>
              <th className="px-4 py-3 text-right rounded-tr-lg">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {CombinedHistory.map((parcel) => (
              <tr
                key={parcel._id}
                className={`hover:bg-gray-50 even:bg-gray-50 ${
                  parcel?.ApplyAMount
                    ? "border bg-red-100"
                    : ""
                }`}
              >
                {/* Date */}
                <td className="px-4 py-3 text-gray-700">
                  {parcel.date
                    ? new Date(
                        parcel.date
                      ).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )
                    : "N/A"}
                </td>

              
                <td className="px-4 py-3 text-gray-700 font-medium">
                  {parcel.CnNumber}
                </td>

               
                <td className="px-4 py-3 text-gray-600">
                  {parcel.Customer_Name}
                </td>

              
                <td className="px-4 py-3 text-gray-600">
                  {parcel.Customer_District_Name},{" "}
                  {parcel.Customer_Area}
                </td>

                
                <td className="px-4 py-3 text-gray-600 capitalize">
                  {parcel.Item_Type}
                </td>

             
                <td className="px-4 py-3 text-gray-700">
                  {parcel.Parcel_Weight}{" "}
                  {parcel.Parcel_Weight && "kg"}
                </td>

             
                <td
                  className={`px-4 py-3 text-right font-semibold ${
                    parcel.Calculate_Charge_Merchant <
                    0
                      ? "text-red-500"
                      : parcel.Calculate_Charge_Merchant ===
                        0
                      ? "text-blue-500"
                      : "text-green-600"
                  }`}
                >
                  {parcel.Calculate_Charge_Merchant} ৳
                </td>

           
                <td
                  className={`capitalize font-semibold ${
                    parcel.status ===
                    "In process"
                      ? "text-yellow-800"
                      : parcel.status ===
                        "Hand over Bank"
                      ? "text-blue-600"
                      : parcel.status ===
                        "Paid Successful"
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  {parcel.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

   
      {CombinedHistory.length === 0 && (
        <p className="text-center text-gray-500 py-6">
          No balance transactions available
        </p>
      )}
    </div>
  );
};

export default Merchant_balance_history;
