import { MdPrint } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { AiFillFileExcel } from "react-icons/ai";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../../api/axiosSecure";

const MerchantDeliveries = () => {
  const { user } = useAuth();
  const { data: deliveries = [], isLoading } = useQuery({
    queryKey: ["deliveries", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcel");
      return res.data;
    },
    enabled: !!user?.email,
  });

  const printRow = (id) => {
    const row = document.getElementById(id).outerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; }
            td, th { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>${row}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };
   

  const getStatusClass = (status) => {
    if (!status) {
      return "text-gray-800 font-bold"; 
    }
    switch (status.toLowerCase()) {
      case "delivered":
        return "text-green-600 font-bold";
      case "ongoing":
        return "text-yellow-600 font-bold";
      case "pending":
        return "text-gray-600 font-bold";
      case "cancelled":
        return "text-red-600 font-bold";
      default:
        return "text-gray-800 font-bold"; 
    }
  };

  return (
    <div className="p-6 sm:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">
        Recent Deliveries Last 90 Days | {deliveries.length} Orders
      </h1>
      <div className="bg-white p-6 shadow-xl rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-5 md:space-x-10 lg:space-x-10 text-center">
            <div>
              <p className="font-semibold text-sm">Excel</p>
              <button className="border p-1 border-blue-400 rounded-[3px]">
                <AiFillFileExcel className="text-2xl text-blue-500" />
              </button>
            </div>
            <div>
              <p className="font-semibold text-sm">Print</p>
              <button className="border p-1 border-blue-400 rounded-[3px]">
                <MdPrint className="text-[23px] text-blue-500" />
              </button>
            </div>
            <input
              type="text"
              className="border w-3/4 md:w-full lg:w-full rounded-full p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-blue-600">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold text-white">
                  SL
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-white">
                  Invoice
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-white">
                  Customer
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-white">
                  Address
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-white">
                  Parcel Details
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-white">
                  Amount
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-white">
                  Delivery Status
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-white">
                  Print
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map((delivery, index) => (
                <tr key={delivery._id} id={`row-${delivery._id}`} className="border-b last:border-0">
                  <td className="py-4 px-6 text-base text-gray-700">{index + 1}</td>
                  <td className="py-4 px-6 text-base text-gray-700">
                    {delivery._id.slice(-6)}
                  </td>
                  <td className="py-4 px-6 text-base text-gray-700">
                    {delivery.Customer_Name}
                  </td>
                  <td className="py-4 px-6 text-base text-gray-700">
                    <div>{delivery.Customer_Address}</div>
                    <div>{delivery.Customer_District_Name}</div>
                    <div>{delivery.Customer_Area}</div>
                  </td>
                  <td className="py-4 px-6 text-base text-gray-700">
                    <div><strong>Type:</strong> {delivery.Item_Type}</div>
                    <div><strong>Weight:</strong> {delivery.Parcel_Weight}kg</div>
                    <div><strong>Service:</strong> {delivery.Service_Type}</div>
                  </td>
                  <td className="py-4 px-6 text-base text-gray-700">
                    <div><strong>Total:</strong> {delivery.Total_Collection_Amount} ট</div>
                    <div><strong>Delivery Charge:</strong> {delivery.Delivary_Charge} ট</div>
                  </td>
                  <td className={`py-4 px-6 text-base text-gray-700 ${getStatusClass(delivery.deliveryStatus)}`}>
                    {delivery.deliveryStatus || "Pending"}
                  </td>
                  <td className="py-4 px-6 text-base text-gray-700">
                    <button className="px-4 py-2" onClick={() => printRow(`row-${delivery._id}`)}>
                      <MdPrint className="text-2xl text-blue-500" />
                    </button>
                  </td>
                  <td className="py-4 px-6 text-base text-gray-700">
                    <button className="px-4 py-2">
                      <FaEye className="text-2xl text-blue-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MerchantDeliveries;
