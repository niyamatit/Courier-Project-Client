import { useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import axiosSecure from "../../../api/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

export default function Show_Int_Booking_Rate() {
  const [selectedRate, setSelectedRate] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: BranchesForRate_Int = [], refetch } = useQuery({
    queryKey: ["BranchesForRate_Int"],
    queryFn: async () => {
      const res = await axiosSecure.get("/rate");
      return res.data;
    },
  });

  // View Popup
  const handleView = (rate) => {
    Swal.fire({
      title: `<strong>Details for ${rate.products}</strong>`,
      html: `
        <p><b>From:</b> ${rate.From_Country}</p>
        <p><b>To:</b> ${rate.To_Country}</p>
        <p><b>Delivery Time:</b> ${rate.deliveryTime}</p>
        <p><b>Branch:</b> ${rate.branch_Name}</p>
        <p><b>Support Company:</b> ${rate.Support_Company}</p>
        <hr/>
        <h3 class="mt-2 mb-1 font-semibold">Amounts</h3>
        ${rate.amounts
          .map(
            (a) => `
          <p>Weight: ${a.ProductWeight}kg | Custom: ${a.customAmount} | Merchant: ${a.merchantAmount} | Customer: ${a.customerAmount}</p>
        `
          )
          .join("")}
      `,
      icon: "info",
      confirmButtonText: "Close",
    });
  };

  // Open Edit Modal
  const handleEdit = (rate) => {
    setSelectedRate({ ...rate }); // Copy data for editing
    setIsEditModalOpen(true);
  };

  // Save Changes
  const handleSave = async () => {
    try {
      const updatedData = {
        deliveryTime: selectedRate.deliveryTime,
        products: selectedRate.products,
        amounts: selectedRate.amounts,
        merchantAmount: selectedRate.merchantAmount,
        customerAmount: selectedRate.customerAmount,
      };
      await axiosSecure.put(`/rate/${selectedRate._id}`, updatedData);
      Swal.fire("Updated!", "Rate details updated successfully", "success");
      setIsEditModalOpen(false);
      refetch();
    } catch (err) {
      Swal.fire("Error", "Failed to update rate", "error");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">International Booking Rates</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">From</th>
              <th className="p-3 text-left">To</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Delivery Time</th>
              <th className="p-3 text-left">Branch</th>
              <th className="p-3 text-left">Support Company</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {BranchesForRate_Int.length > 0 ? (
              BranchesForRate_Int.map((rate) => (
                <tr key={rate._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{rate.From_Country}</td>
                  <td className="p-3">{rate.To_Country}</td>
                  <td className="p-3">{rate.products}</td>
                  <td className="p-3">{rate.deliveryTime}</td>
                  <td className="p-3">{rate.branch_Name}</td>
                  <td className="p-3">{rate.Support_Company}</td>
                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => handleView(rate)}
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleEdit(rate)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg"
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-4 text-gray-500 italic"
                >
                  No rates found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && selectedRate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">
              Edit Rate for {selectedRate.products}
            </h3>

            <div className="space-y-3">
              <input
                type="text"
                value={selectedRate.products}
                onChange={(e) =>
                  setSelectedRate({ ...selectedRate, products: e.target.value })
                }
                className="w-full border rounded p-2"
                placeholder="Product"
              />

              <input
                type="text"
                value={selectedRate.deliveryTime}
                onChange={(e) =>
                  setSelectedRate({
                    ...selectedRate,
                    deliveryTime: e.target.value,
                  })
                }
                className="w-full border rounded p-2"
                placeholder="Delivery Time"
              />

              {/* Amounts Editing */}
              <div>
                <h4 className="font-semibold mb-2">Amounts</h4>
                {selectedRate.amounts.map((amt, index) => (
                  <div key={index} className="grid grid-cols-5 gap-2 mb-2">
                    <input
                      type="text"
                      value={amt.ProductWeight}
                      onChange={(e) => {
                        const updated = [...selectedRate.amounts];
                        updated[index].ProductWeight = e.target.value;
                        setSelectedRate({ ...selectedRate, amounts: updated });
                      }}
                      className="border rounded p-1"
                      placeholder="Weight"
                    />
                    <input
                      type="text"
                      value={amt.customAmount}
                      onChange={(e) => {
                        const updated = [...selectedRate.amounts];
                        updated[index].customAmount = e.target.value;
                        setSelectedRate({ ...selectedRate, amounts: updated });
                      }}
                      className="border rounded p-1"
                      placeholder="Custom"
                    />
                    <input
                      type="text"
                      value={amt.othersCompanyAmount}
                      onChange={(e) => {
                        const updated = [...selectedRate.amounts];
                        updated[index].othersCompanyAmount = e.target.value;
                        setSelectedRate({ ...selectedRate, amounts: updated });
                      }}
                      className="border rounded p-1"
                      placeholder="Others"
                    />
                    <input
                      type="text"
                      value={amt.agentAmount}
                      onChange={(e) => {
                        const updated = [...selectedRate.amounts];
                        updated[index].agentAmount = e.target.value;
                        setSelectedRate({ ...selectedRate, amounts: updated });
                      }}
                      className="border rounded p-1"
                      placeholder="Agent"
                    />
                    <input
                      type="text"
                      value={amt.customerAmount}
                      onChange={(e) => {
                        const updated = [...selectedRate.amounts];
                        updated[index].customerAmount = e.target.value;
                        setSelectedRate({ ...selectedRate, amounts: updated });
                      }}
                      className="border rounded p-1"
                      placeholder="Customer"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
