// PrintComponent.jsx
import React from 'react';

const PrintableDeliveries = React.forwardRef((props, ref) => {
  const { deliveries } = props;

  return (
    <div ref={ref} className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recent Deliveries</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-6 text-left text-sm font-semibold">SL</th>
            <th className="py-3 px-6 text-left text-sm font-semibold">Invoice</th>
            <th className="py-3 px-6 text-left text-sm font-semibold">Customer</th>
            <th className="py-3 px-6 text-left text-sm font-semibold">Address</th>
            <th className="py-3 px-6 text-left text-sm font-semibold">Parcel Details</th>
            <th className="py-3 px-6 text-left text-sm font-semibold">Amount</th>
            <th className="py-3 px-6 text-left text-sm font-semibold">Delivery Status</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery, index) => (
            <tr key={delivery._id} className="border-b last:border-0">
              <td className="py-4 px-6 text-base text-gray-700">{index + 1}</td>
              <td className="py-4 px-6 text-base text-gray-700">{delivery._id.slice(-6)}</td>
              <td className="py-4 px-6 text-base text-gray-700">{delivery.Customer_Name}</td>
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
              <td className={`py-4 px-6 text-base ${getStatusClass(delivery.deliveryStatus)}`}>
                {delivery.deliveryStatus || "Pending"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default PrintableDeliveries;
