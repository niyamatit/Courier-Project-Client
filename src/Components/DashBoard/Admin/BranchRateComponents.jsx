// BranchRateEditor.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../../api/axiosSecure";
import Swal from "sweetalert2";


export default function BranchRateEditor() {
  const queryClient = useQueryClient();
  const [selectedBranch, setSelectedBranch] = useState(null);

  // Fetch branches
  const { data: BranchesForRate = [] } = useQuery({
    queryKey: ["BranchesForRate"],
    queryFn: async () => {
      const res = await axiosSecure.get("/int-add-products");
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Patch mutation
  const mutation = useMutation({
    mutationFn: async (updatedData) => {
      try {
        const res = await axiosSecure.patch(
          `/int-add-products/${selectedBranch._id}`,
          updatedData
        );
        return res.data;
      } catch (err) {
        if (err.response?.status === 400) {
          // Throw custom error to handle in onError
          throw { type: "duplicate", message: err.response.data.message };
        }
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["BranchesForRate"]);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Branch updated successfully!",
        confirmButtonColor: "#3085d6",
      });
    },
    onError: (error) => {
      if (error.type === "duplicate") {
        Swal.fire({
          icon: "error",
          title: "Already Added",
          text: error.message || "already added this branch data !",
          confirmButtonColor: "#d33",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.message || "Something went wrong!",
          confirmButtonColor: "#d33",
        });
      }
    },
  });

  const onSubmit = (data) => {
    if (!selectedBranch) {
      alert("Please select a branch first!");
      return;
    }

    const updatedData = {
      ...data,
      branchId: selectedBranch.branchId,
    };

    mutation.mutate(updatedData);
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-lg border border-blue-200">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 border-b-2 pb-2 border-blue-500">Branch Rate Editor</h2>

      {/* Select Branch */}
      <div className="mb-6">
        <label className="block text-lg font-semibold text-blue-700 mb-2">Select Branch</label>
        <select
          className="border border-blue-400 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          onChange={(e) => {
            const branch = BranchesForRate.find(
              (b) => b._id === e.target.value
            );
            setSelectedBranch(branch || null);
            reset(); // clear form when changing branch
          }}
        >
          <option value="">-- Select Branch --</option>
          {BranchesForRate.map((branch) => (
            <option key={branch._id} value={branch._id}>
              {branch.branchId}
            </option>
          ))}
        </select>
      </div>

      {/* Show products table */}
      {selectedBranch && (
        <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-300">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Products for {selectedBranch.branchId}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-blue-400 text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3 border border-blue-400">Name</th>
                  <th className="p-3 border border-blue-400">Unit</th>
                  <th className="p-3 border border-blue-400">Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedBranch.products.map((prod, i) => (
                  <tr key={i} className="odd:bg-white even:bg-blue-100 transition-colors duration-200">
                    <td className="p-3 border border-blue-300 text-center">{prod.name}</td>
                    <td className="p-3 border border-blue-300 text-center">{prod.unit}</td>
                    <td className="p-3 border border-blue-300 text-center">{prod.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Form for new fields and amounts */}
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* New fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From Country</label>
          <input
            placeholder="From Country"
            type="text"
            {...register("fromCountry", { required: "This field is required." })}
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.fromCountry && (
            <p className="text-red-500 text-sm mt-1">{errors.fromCountry.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To Country</label>
          <input
            placeholder="To Country"
            type="text"
            {...register("toCountry", { required: "This field is required." })}
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.toCountry && (
            <p className="text-red-500 text-sm mt-1">{errors.toCountry.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Company</label>
          <input
            placeholder="Delivery Company"
            type="text"
            {...register("deliveryCompany", { required: "This field is required." })}
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.deliveryCompany && (
            <p className="text-red-500 text-sm mt-1">{errors.deliveryCompany.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Time</label>
          <input
            placeholder="Delivery Time"
            type="text"
            {...register("deliveryTime", { required: "This field is required." })}
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.deliveryTime && (
            <p className="text-red-500 text-sm mt-1">{errors.deliveryTime.message}</p>
          )}
        </div>

        {/* Existing Amount fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Custom Amount</label>
          <input
            placeholder="Custom Amount"
            type="number"
            {...register("customAmount", { required: "Required" })}
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.customAmount && (
            <p className="text-red-500 text-sm mt-1">{errors.customAmount.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Others Company Amount</label>
          <input
            placeholder="Others Company Amount"
            type="number"
            {...register("othersCompanyAmount", { required: "Required" })}
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Agent Amount</label>
          <input
            placeholder="Agent Amount"
            type="number"
            {...register("agentAmount", { required: "Required" })}
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Merchant Amount</label>
          <input
            placeholder="Merchant Amount"
            type="number"
            {...register("merchantAmount", { required: "Required" })}
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Customer Amount</label>
          <input
            placeholder="Customer Amount"
            type="number"
            {...register("customerAmount", { required: "Required" })}
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isLoading}
          className="col-span-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:bg-blue-400"
        >
          {mutation.isLoading ? "Updating..." : "Update Branch"}
        </button>
      </form>
    </div>
  );
}