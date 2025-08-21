import { useState } from "react";

const BookingModal_Branch = ({ booking, onClose, onSave }) => {
  const [amount, setAmount] = useState(booking?.amount || 0);

  // ✅ Define only the fields you want to show
  const visibleFields = [
    "packageTrackingNumber",
    "senderName",
    "senderMobile",
    "recipientName",
    "recipientMobile",
    "productDetails",
    "qty",
    "Dept",
    "weight_kg",
    "Post_Code",
    "selectedArea",
    "wordAmount",
    "booking",
    "update",
    "District_ID",
    "conditionCharge",
    "deliveryOption",
    "paymentOption",
    "condition",
    "Receiver_Full_Adress",
    "sender_Full_Adress",
    "CnNumber",
    "districtName",
    "email",
    "Branch_Name",
    "Branch_Number",
    "Branch_Address",
    "Branch_District_Name",
    "Branch_Area",
    "Booking_Staff_Name",
    "Booking_Staff_ID",
    "Booking_Staff_Post",
    "Booking_Staff_Number",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...booking, amount });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Booking Details</h2>

        <div className="max-h-[450px] overflow-y-auto border p-4 rounded">
          <table className="w-full text-sm">
            <tbody>
              {visibleFields.map((field) => (
                <tr key={field} className="border-b">
                  <td className="font-medium pr-4 py-1 capitalize">
                    {field.replace(/_/g, " ")}
                  </td>
                  <td className="py-1">{String(booking?.[field] ?? "-")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Editable amount */}
        <form onSubmit={handleSubmit} className="mt-4">
          <label className="block mb-2 font-medium">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />

          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal_Branch;
