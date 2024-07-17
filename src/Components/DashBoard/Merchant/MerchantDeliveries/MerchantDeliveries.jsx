import { useState } from "react";
import { Link } from "react-router-dom";

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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-4">
        Recent Deliveries Last 90 Days | {deliveries.length} Orders
      </h1>
      <div className="bg-white p-4 shadow rounded-lg">
        <div className="flex justify-between mb-4">
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded ${
                status === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setStatus("all")}
            >
              All
            </button>
            <Link to="/dashboard/MerchantDeliveries">
            <button
              className={`px-4 py-2 rounded ${
                status === "active" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setStatus("active")}
            >
              Active
            </button>
            </Link>
            <button
              className={`px-4 py-2 rounded ${
                status === "delivered"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setStatus("delivered")}
            >
              Delivered
            </button>
            <button
              className={`px-4 py-2 rounded ${
                status === "returned" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setStatus("returned")}
            >
              Returned
            </button>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              className="border rounded p-2"
              placeholder="Date/Date Range"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              Excel
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              Print
            </button>
          </div>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">SL</th>
              <th className="py-2 px-4 border-b">INVOICE</th>
              <th className="py-2 px-4 border-b">PARCEL</th>
              <th className="py-2 px-4 border-b">CUSTOMER</th>
              <th className="py-2 px-4 border-b">AMOUNT</th>
              <th className="py-2 px-4 border-b">PAYMENT / RETURN STATUS</th>
              <th className="py-2 px-4 border-b">CHANGE STATUS</th>
              <th className="py-2 px-4 border-b">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{delivery?.invoice}</td>
                <td className="py-2 px-4 border-b">
                  <div className="bg-green-200 text-green-800 px-2 py-1 rounded">
                    Pickup Request
                  </div>
                  <div>{delivery?.date}</div>
                </td>
                <td className="py-2 px-8 border-b">
                  <div>
                    <strong>Name:</strong> {delivery?.customer.name}
                  </div>
                  <div>
                    <strong>Number:</strong> {delivery?.customer.number}
                  </div>
                  <div>
                    <strong>District:</strong> {delivery?.customer.district}
                  </div>
                  <div>
                    <strong>Area:</strong> {delivery?.customer.area}
                  </div>
                  <div>
                    <strong>Address:</strong> {delivery.customer.address}
                  </div>
                </td>
                <td className="py-2 px-4 border-b">
                  <div>
                    <strong>COD:</strong> {delivery.amount.cod}
                  </div>
                  <div>
                    <strong>Collected:</strong> {delivery.amount.collected}
                  </div>
                  <div>
                    <strong>Delivery Charge:</strong>{" "}
                    {delivery.amount.deliveryCharge}
                  </div>
                </td>
                <td className="py-2 px-4 border-b">Pending</td>
                <td className="py-2 px-4 border-b">
                  <button className="px-4 py-2 bg-yellow-500 text-white rounded">
                    Change Status
                  </button>
                </td>
                <td className="py-2 px-4 border-b">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded">
                    Action
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MerchantDeliveries;
