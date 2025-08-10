// BranchRateEditor.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../../api/axiosSecure";


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
      const res = await axiosSecure.patch(
        `/int-add-products/${selectedBranch._id}`,
        updatedData
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["BranchesForRate"]);
      alert("Branch updated successfully!");
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
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Branch Rate </h2>

      {/* Select Branch */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Select Branch</label>
        <select
          className="border p-2 rounded w-full"
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
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Products for {selectedBranch.branchId}</h3>
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Unit</th>
                <th className="p-2 border">Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedBranch.products.map((prod, i) => (
                <tr key={i}>
                  <td className="p-2 border">{prod.name}</td>
                  <td className="p-2 border">{prod.unit}</td>
                  <td className="p-2 border">{prod.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Form for extra amounts */}
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <input
          placeholder="Custom Amount"
          type="number"
          {...register("customAmount", { required: "Required" })}
          className="border p-2 rounded"
        />
        {errors.customAmount && (
          <p className="text-red-500">{errors.customAmount.message}</p>
        )}

        <input
          placeholder="Others Company Amount"
          type="number"
          {...register("othersCompanyAmount", { required: "Required" })}
          className="border p-2 rounded"
        />

        <input
          placeholder="Agent Amount"
          type="number"
          {...register("agentAmount", { required: "Required" })}
          className="border p-2 rounded"
        />

        <input
          placeholder="Merchant Amount"
          type="number"
          {...register("merchantAmount", { required: "Required" })}
          className="border p-2 rounded"
        />

        <input
          placeholder="Customer Amount"
          type="number"
          {...register("customerAmount", { required: "Required" })}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          disabled={mutation.isLoading}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {mutation.isLoading ? "Updating..." : "Update Branch"}
        </button>
      </form>
    </div>
  );
}
