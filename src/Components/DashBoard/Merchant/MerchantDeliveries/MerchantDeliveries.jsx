import { useState } from "react";

import { MdPrint } from "react-icons/md";
import { FaEye } from "react-icons/fa";

const MerchantDeliveries = () => {
  const [status, setStatus] = useState("all");
  const [dateRange, setDateRange] = useState("");

  const deliveries = [
    {
      invoice: "240713GIQ9496",
      date: "7/13/2024",
      companyName: "Niyamat Express",
      storeName: "Niyamat Express",
      orderId: "M-0368",
      serviceType: "Regular Delivery",
      customer: {
        name: "Anik Khan",
        number: "01316187667",
        district: "Narail",
        area: "Narail Sadar",
        address: "Barashula, Khanpara, Tematha Mor, Narail Sadar",
      },
      amount: {
        cod: 0,
        collected: 0,
        deliveryCharge: 0,
      },
    },
    {
      invoice: "240713GIQ9496",
      date: "7/05/2024",
      companyName: "Express",
      storeName: "Express",
      orderId: "M-0368",
      serviceType: "Regular",
      customer: {
        name: "Anik Khan",
        number: "+8801316187667",
        district: "Narail Sadar",
        area: "Narail Sadar",
        address: "Barashula, Khanpara, Tematha Mor, Narail Sadar",
      },
      amount: {
        cod: 20,
        collected: 10,
        deliveryCharge: 30,
      },
    },
  ];

  return (
    <div className="p-6 sm:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">
        Recent Deliveries Last 90 Days | {deliveries.length} Orders
      </h1>
      <div className="bg-white p-6 shadow-xl rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between mb-6 space-y-4 sm:space-y-0">
          <div className="flex space-x-4">
            <button
              className={`px-6 py-2 rounded-full font-semibold ${
                status === "all" ? "bg-blue-600 text-white" : "bg-gray-300"
              }`}
              onClick={() => setStatus("all")}
            >
              All
            </button>
            <button
              className={`px-6 py-2 rounded-full font-semibold ${
                status === "active" ? "bg-blue-600 text-white" : "bg-gray-300"
              }`}
              onClick={() => setStatus("active")}
            >
              Active
            </button>
            <button
              className={`px-6 py-2 rounded-full font-semibold ${
                status === "delivered" ? "bg-blue-600 text-white" : "bg-gray-300"
              }`}
              onClick={() => setStatus("delivered")}
            >
              Delivered
            </button>
            <button
              className={`px-6 py-2 rounded-full font-semibold ${
                status === "returned" ? "bg-blue-600 text-white" : "bg-gray-300"
              }`}
              onClick={() => setStatus("returned")}
            >
              Returned
            </button>
          </div>
          <div className="flex space-x-4">
            <input
              type="text"
              className="border rounded-full p-2 shadow-sm"
              placeholder="Search.."
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-blue-600">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold text-white">SL</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-white">INVOICE</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-white">PARCEL</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-white">CUSTOMER</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-white">AMOUNT</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-white">PAYMENT/RETURN STATUS</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-white">PRINT</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-white">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map((delivery, index) => (
                <tr key={index} className="border-b last:border-0">
                  <td className="py-4 px-6 text-base text-gray-700">{index + 1}</td>
                  <td className="py-4 px-6 text-base text-gray-700">{delivery.invoice}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    <div className="bg-green-100 mr-2 text-green-800 px-3 py-1 rounded-full inline-block">
                      Pickup Request
                    </div>
                    <div className="mt-1 ml-2 text-gray-500">{delivery.date}</div>
                  </td>
                  <td className="py-4 px-8 text-base text-gray-700">
                    <div><strong>Name:</strong> {delivery.customer.name}</div>
                    <div><strong>Number:</strong> {delivery.customer.number}</div>
                    <div><strong>District:</strong> {delivery.customer.district}</div>
                    <div><strong>Area:</strong> {delivery.customer.area}</div>
                    <div><strong>Address:</strong> {delivery.customer.address}</div>
                  </td>
                  <td className="py-4 px-6 text-base text-gray-700">
                    <div><strong>COD:</strong> {delivery.amount.cod}</div>
                    <div><strong>Collected:</strong> {delivery.amount.collected}</div>
                    <div><strong>Delivery Charge:</strong> {delivery.amount.deliveryCharge}</div>
                  </td>
                  <td className="py-4 px-6 text-base text-gray-700">Pending</td>
                  <td className="py-4 px-6 text-base text-gray-700">
                    <button className="px-4 py-2">
                      <MdPrint className="text-2xl text-blue-500"/>
                    </button>
                  </td>
                  <td className="py-4 px-6 text-base text-gray-700">
                    <button className="px-4 py-2">
                      <FaEye className="text-2xl text-blue-500"/>
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
