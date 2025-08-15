import { useState } from "react";
import { FaEdit, FaEye, FaTimes } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import axiosSecure from "../../../api/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

export default function Show_Int_Booking_Rate() {
  const [selectedRate, setSelectedRate] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: BranchesForRate_Int = [], refetch, isLoading } = useQuery({
    queryKey: ["BranchesForRate_Int"],
    queryFn: async () => {
      const res = await axiosSecure.get("/rate");
      return res.data;
    },
  });

  // View Popup - Styled with a more professional look
  const handleView = (rate) => {
    Swal.fire({
      title: `<strong class="text-2xl text-gray-800">Rate Details</strong>`,
      html: `
        <div class="text-left p-4 space-y-4">
          <div class="grid grid-cols-2 gap-4 bg-blue-50 p-3 rounded-lg">
            <p><strong>From:</strong></p><p>${rate.From_Country}</p>
            <p><strong>To:</strong></p><p>${rate.To_Country}</p>
            <p><strong>Product:</strong></p><p>${rate.products}</p>
            <p><strong>Delivery Time:</strong></p><p>${rate.deliveryTime}</p>
            <p><strong>Branch:</strong></p><p>${rate.branch_Name}</p>
            <p><strong>Support Co:</strong></p><p>${rate.Support_Company}</p>
          </div>
          <hr/>
          <h3 class="mt-2 mb-1 font-bold text-lg text-gray-700">Pricing Tiers</h3>
          <div class="space-y-2">
            ${rate.amounts
              .map(
                (a) => `
              <div class="grid grid-cols-2 gap-x-4 p-2 border rounded-md">
                <p><strong>Weight:</strong></p><p>${a.ProductWeight} </p>
                <p><strong>Custom:</strong></p><p>৳${a.customAmount}</p>
                <p><strong>Merchant:</strong></p><p>৳${a.merchantAmount}</p>
                <p><strong>Customer:</strong></p><p>৳${a.customerAmount}</p>
                <p><strong>Others Company:</strong></p><p>৳${a.othersCompanyAmount}</p>
              </div>`
              )
              .join("")}
          </div>
        </div>
      `,
      confirmButtonText: "Close",
      confirmButtonColor: "#3B82F6", // Blue-500
      width: '600px',
    });
  };

  // Open Edit Modal
  const handleEdit = (rate) => {
    setSelectedRate({ ...rate }); // Deep copy for safe editing
    setIsEditModalOpen(true);
  };

  // Save Changes
  const handleSave = async () => {
    try {
      // Construct the payload with only the fields that can be updated
      const updatedData = {
        deliveryTime: selectedRate.deliveryTime,
        products: selectedRate.products,
        amounts: selectedRate.amounts.map(amt => ({
          ProductWeight: amt.ProductWeight,
          customAmount: amt.customAmount,
          othersCompanyAmount: amt.othersCompanyAmount,
          agentAmount: amt.agentAmount,
          customerAmount: amt.customerAmount,
          merchantAmount: amt.merchantAmount,
        })),
      };

      await axiosSecure.put(`/rate/${selectedRate._id}`, updatedData);
      
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Rate details have been updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      setIsEditModalOpen(false);
      refetch();
    } catch (err) {
      Swal.fire("Error", "Failed to update the rate. Please try again.", "error");
    }
  };

  const handleAmountChange = (index, field, value) => {
    const updatedAmounts = [...selectedRate.amounts];
    updatedAmounts[index][field] = value;
    setSelectedRate({ ...selectedRate, amounts: updatedAmounts });
  };


  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800">International Booking Rates</h2>
            <p className="text-gray-500 mt-1">Manage and view rates for international shipments.</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-6 text-left font-semibold">From</th>
                  <th className="py-3 px-6 text-left font-semibold">To</th>
                  <th className="py-3 px-6 text-left font-semibold">Product</th>
                  <th className="py-3 px-6 text-left font-semibold">Delivery Time</th>
                  <th className="py-3 px-6 text-left font-semibold">Branch</th>
                  <th className="py-3 px-6 text-left font-semibold">Support Company</th>
                  <th className="py-3 px-6 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                    <tr>
                        <td colSpan="7" className="text-center p-10 text-gray-500">Loading rates...</td>
                    </tr>
                ) : BranchesForRate_Int.length > 0 ? (
                  BranchesForRate_Int.map((rate) => (
                    <tr key={rate._id} className="hover:bg-blue-50 transition-colors duration-200">
                      <td className="py-4 px-6 whitespace-nowrap">{rate.From_Country}</td>
                      <td className="py-4 px-6 whitespace-nowrap">{rate.To_Country}</td>
                      <td className="py-4 px-6 whitespace-nowrap">{rate.products}</td>
                      <td className="py-4 px-6 whitespace-nowrap">{rate.deliveryTime}</td>
                      <td className="py-4 px-6 whitespace-nowrap">{rate.branch_Name}</td>
                      <td className="py-4 px-6 whitespace-nowrap">{rate.Support_Company}</td>
                      <td className="py-4 px-6">
                        <div className="flex justify-center items-center gap-3">
                           <button
                            onClick={() => handleView(rate)}
                            className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-100 transition-colors duration-200"
                            title="View Details"
                          >
                            <FaEye size={18} />
                          </button>
                          <button
                            onClick={() => handleEdit(rate)}
                            className="text-green-500 hover:text-green-700 p-2 rounded-full hover:bg-green-100 transition-colors duration-200"
                            title="Edit Rate"
                          >
                            <FaEdit size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center p-10">
                        <div className="flex flex-col items-center text-gray-500">
                            <FiAlertCircle className="w-12 h-12 mb-2 text-blue-400" />
                            <h3 className="text-xl font-semibold">No Rates Found</h3>
                            <p>There are currently no international rates to display.</p>
                        </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && selectedRate && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 bg-blue-600 text-white rounded-t-xl">
              <h3 className="text-xl font-bold">Edit Rate: {selectedRate.products}</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-full hover:bg-blue-700 transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                  <input
                    type="text"
                    value={selectedRate.products}
                    onChange={(e) => setSelectedRate({ ...selectedRate, products: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Time</label>
                  <input
                    type="text"
                    value={selectedRate.deliveryTime}
                    onChange={(e) => setSelectedRate({ ...selectedRate, deliveryTime: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Amounts Editing */}
              <div className="space-y-4">
                <h4 className="font-bold text-lg text-gray-800 border-b pb-2">Pricing Tiers</h4>
                <div className="grid grid-cols-5 gap-x-3 text-center text-sm font-medium text-gray-600 px-2">
                    <span>Weight (kg)</span>
                    <span>Custom</span>
                    <span>Others Co.</span>
                    <span>Agent</span>
                    <span>Customer</span>
                </div>
                {selectedRate.amounts.map((amt, index) => (
                  <div key={index} className="grid grid-cols-5 gap-x-3 items-center">
                    <input type="text" value={amt.ProductWeight} onChange={(e) => handleAmountChange(index, 'ProductWeight', e.target.value)} className="w-full text-center border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                    <input type="text" value={amt.customAmount} onChange={(e) => handleAmountChange(index, 'customAmount', e.target.value)} className="w-full text-center border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                    <input type="text" value={amt.othersCompanyAmount} onChange={(e) => handleAmountChange(index, 'othersCompanyAmount', e.target.value)} className="w-full text-center border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                    <input type="text" value={amt.agentAmount} onChange={(e) => handleAmountChange(index, 'agentAmount', e.target.value)} className="w-full text-center border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                    <input type="text" value={amt.customerAmount} onChange={(e) => handleAmountChange(index, 'customerAmount', e.target.value)} className="w-full text-center border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                    <input type="text" value={amt.merchantAmount} onChange={(e) => handleAmountChange(index, 'merchantAmount', e.target.value)} className="w-full text-center border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-4 p-5 bg-gray-50 rounded-b-xl">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}