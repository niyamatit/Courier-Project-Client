import { useState, useEffect } from "react";

const BookingModal_Branch = ({ booking, onClose, onSave }) => {
  const actualAmount = booking?.amount || 0;
  const requestStatus = booking?.requestStatus || null;
  const requestAmount = booking?.requestAmount || null;

  // If admin accepted the request, set the amount to requestAmount
  const [amount, setAmount] = useState(
    requestStatus === "accept" && requestAmount ? requestAmount : actualAmount
  );

  // Sync local amount if booking updates from outside
  useEffect(() => {
  if (requestStatus === "accept" && requestAmount != null) {
    // Sync the input amount to requestAmount
    setAmount(requestAmount);

    // Update booking object to ensure amount = requestAmount
    if (booking.amount !== requestAmount) {
      onSave({
        ...booking,
        amount: requestAmount,
        requestAmount: requestAmount,
        
      });
      window.reload(); // Reload to reflect changes
    }
  } else {
    // If not accepted, show the actualAmount
    setAmount(actualAmount);
  }
}, [booking, requestStatus, requestAmount, actualAmount,onSave]);



  const visibleFields = [
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
    "amount",
    "requestStatus",
    "requestAmount",
  ];

  // Save handler (increase or same)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount >= actualAmount) {
      onSave({
      ...booking,
       amount, // use requestAmount if accepted
      
    }); // update actual amount
      onClose();
    }
    
  };

  // Request handler (decrease)
  const handleRequest = () => {
    onSave({
      ...booking,
      requestAmount: amount, // requested amount
      requestStatus: "pending", // pending admin approval
    });
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
          <label className="block mb-2 font-medium">
            Edit Amount (
            <span className="text-red-500">
              NB: If you want to decrease amount need admin approval
            </span>
            )
          </label>
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

            {amount < actualAmount ? (
              <button
                type="button"
                onClick={handleRequest}
                disabled={requestStatus === "pending" || requestStatus === "accept"}
                title={
                  requestStatus === "pending"
                    ? "Request already sent, wait for admin approval"
                    : requestStatus === "accept"
                    ? "Request already accepted by admin"
                    : ""
                }
                className={`px-4 py-2 rounded ${
                  requestStatus === "pending" || requestStatus === "accept"
                    ? "bg-white border border-gray-400 text-gray-500 cursor-not-allowed"
                    : "bg-yellow-600 text-white hover:bg-yellow-700"
                }`}
              >
                {requestStatus === "pending"
                  ? "Pending..."
                  : requestStatus === "accept"
                  ? "Accepted"
                  : "Request"}
              </button>
            ) : (
              <button
                type="submit"
                disabled={requestStatus === "pending" || requestStatus === "accept"}
                title={
                  requestStatus === "pending"
                    ? "Wait for admin approval"
                    : requestStatus === "accept"
                    ? "Amount already updated by admin"
                    : ""
                }
                className={`px-4 py-2 rounded ${
                  requestStatus === "pending" || requestStatus === "accept"
                    ? "bg-white border border-gray-400 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {requestStatus === "pending"
                  ? "Pending..."
                  : requestStatus === "accept"
                  ? "Updated"
                  : "Save"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal_Branch;
