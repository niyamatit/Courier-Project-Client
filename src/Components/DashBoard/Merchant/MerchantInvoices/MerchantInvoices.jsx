
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";  
import axiosSecure from "../../../../api/axiosSecure";
import useUsersData from "../../../../hooks/useUsersData/useUsersData";

const MerchantInvoices = () => {
  const[verifiedUser] = useUsersData()

  const { data: InvoiceData = [], isLoading } = useQuery({
    queryKey: ["InvoiceData", verifiedUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcelhkdbjsbdjkshujsbh");
      return res.data;
    },
    enabled: !!verifiedUser?.email,
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-4">All Invoices</h1>
      <div className="bg-white p-4 shadow rounded-lg">
        {isLoading ? ( 
          <div className="flex justify-center items-center h-64">
            <ClipLoader color="blue" loading={isLoading} size={50} /> 
          </div>
        ) : (
          <>
            <div className="flex justify-between mb-4">
              <div>
                <input
                  type="text"
                  className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search..."
                />
              </div>
            </div>
            <table className="min-w-full bg-white">
              <thead className="bg-blue-600">
                <tr>
                  <th className="py-3 px-6 text-left text-sm border-b font-semibold text-white">DATE</th>
                  <th className="py-3 px-6 text-left text-sm border-b font-semibold text-white">PAYMENT ID</th>
                  <th className="py-3 px-6 text-left text-sm border-b font-semibold text-white">TOTAL PARCEL</th>
                  <th className="py-3 px-6 text-left text-sm border-b font-semibold text-white">AMOUNT TO BE COLLECT</th>
                  <th className="py-3 px-6 text-left text-sm border-b font-semibold text-white">COLLECTED</th>
                  <th className="py-3 px-6 text-left text-sm border-b font-semibold text-white">TOTAL CHARGE</th>
                  <th className="py-3 px-6 text-left text-sm border-b font-semibold text-white">PAYMENT AMOUNT</th>
                  <th className="py-3 px-6 text-left text-sm border-b font-semibold text-white">STATUS</th>
                  <th className="py-3 px-6 text-left text-sm border-b font-semibold text-white">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {InvoiceData.map((invoice, index) => (
                  <tr key={index}>
                    <td className="py-4 px-4 border-b">{invoice.Date}</td>
                    <td className="py-4 px-4 border-b">{invoice._id.slice(-6)}</td>
                    <td className="py-4 px-8 border-b">{invoice.Parcel_Weight} kg</td>
                    <td className="py-4 px-8 border-b">
                      {invoice.Total_Collection_Amount}
                    </td>
                    <td className="py-4 px-8 border-b">{invoice.Total_Collection_Amount}</td>
                    <td className="py-4 px-8 border-b">{invoice.Total_Charge}</td>
                    <td className="py-4 px-8 border-b">{invoice.Total_Collection_Amount - invoice.Total_Charge}</td>
                    <td className="py-4 px-6 border-b">
                      <span className={`px-2 py-1 rounded ${invoice.deliveryStatus === "Delivered" ? "bg-green-200 text-green-800" : invoice.deliveryStatus === "Ongoing" ? "bg-yellow-200 text-yellow-800" : "bg-gray-200 text-gray-800"}`}>
                        {invoice.deliveryStatus || "Pending"}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <div className="flex justify-between mt-4">
              <div>
                <select className="border rounded p-2">
                  <option>Show 10</option>
                  <option>Show 20</option>
                  <option>Show 50</option>
                </select>
              </div>
              <div>
                <button className="px-4 py-2 bg-gray-300 rounded">Previous</button>
                <span className="px-4 py-2">Page 1 of 1</span>
                <button className="px-4 py-2 bg-gray-300 rounded">Next</button>
              </div>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default MerchantInvoices;
