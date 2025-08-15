import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../../api/axiosSecure";
import Swal from "sweetalert2";
import { FaPlus, FaTimes } from "react-icons/fa";
import useUsersData from "../../../hooks/useUsersData/useUsersData";

export default function BranchRateEditor() {
  const queryClient = useQueryClient();
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState("");
  const [verifiedUser]= useUsersData()

  // Fetch branches for rate
  const { data: BranchesForRate = [] } = useQuery({
    queryKey: ["BranchesForRate"],
    queryFn: async () => {
      const res = await axiosSecure.get("/int-add-products");
      return res.data;
    },
  });

  const FilterProducts = selectedBranch?.products || [];

  // Fetch all users (hosts)
  const { data: Allusers = [] } = useQuery({
    queryKey: ["Allusers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/shfjksdhfjdjkfhxnbcnbc67437gch");
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fromCountry: "",
      toCountry: "",
      deliveryCompany: "",
      deliveryTime: "",
      amounts: [
        {
          ProductWeight: "",
          customAmount: "",
          othersCompanyAmount: "",
          agentAmount: "",
          merchantAmount: "",
          customerAmount: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "amounts",
  });

  // Patch mutation
  const mutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.post(
        `/int-add-products/${selectedBranch._id}`,
        updatedData
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["BranchesForRate"]);
      Swal.fire("Success!", "Branch updated successfully!", "success");
    },
    onError: (err) => {
      Swal.fire("Error", err?.response?.data?.message || "Something went wrong", "error");
    },
  });

  const onSubmit = (data) => {
    if (!selectedBranch) {
      Swal.fire("Select branch", "Please select a branch first!", "warning");
      return;
    }
    mutation.mutate({
      ...data,
      products: selectedProducts,
      branchId: selectedBranch.branchId,
      date : new Date().toISOString(),
      who_Added:verifiedUser?.email,
      Who_Added_Name:verifiedUser?.name,
      Who_Added_Role:verifiedUser?.role,
    });
  };

  return (
    <div className="p-4 sm:p-6 bg-white shadow-xl rounded-lg border border-blue-200">
      <h2 className="text-xl sm:text-3xl font-bold text-blue-800 mb-6 border-b-2 pb-2 border-blue-500">
        Add Branch Rate (International)
      </h2>

      {/* Select Branch */}
      <div className="mb-6">
        <label className="block text-base font-semibold text-blue-700 mb-2">
          Select Branch
        </label>
        <select
          className="border border-blue-400 p-2 sm:p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            const branch = Allusers.find((b) => b._id === e.target.value);
            setSelectedBranch(branch || null);
            setSelectedProducts("");
            reset();
          }}
        >
          <option value="">-- Select Branch --</option>
          {Allusers.filter((b) => b.role === "host").map((branch) => (
            <option key={branch._id} value={branch._id}>
              {branch?.email}
            </option>
          ))}
        </select>
      </div>

      {/* Select Products */}
      <div className="mb-6">
        <label className="block text-base font-semibold text-blue-700 mb-2">
          Select Products
        </label>
        <select
          className="border border-blue-400 p-2 sm:p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedProducts}
          onChange={(e) => setSelectedProducts(e.target.value)}
        >
          <option value="">-- Select Products --</option>
          {FilterProducts.map((p) => (
            <option key={p._id} value={p.name}>
              {p.name} - (Max: {p.maxWeight}) {p.unit}
            </option>
          ))}
        </select>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4 sm:gap-6"
      >
        {/* Basic Info Fields */}
        {["fromCountry", "toCountry", "deliveryCompany", "deliveryTime"].map((field) => (
          <div key={field}>
            <input
              placeholder={
                field === "fromCountry"
                  ? "From Country"
                  : field === "toCountry"
                  ? "To Country"
                  : field === "deliveryCompany"
                  ? "Delivery Company"
                  : "Delivery Time"
              }
              {...register(field, { required: "This field is required" })}
              className="border p-2 sm:p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors[field] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[field].message}
              </p>
            )}
          </div>
        ))}

        {/* Amount Fields */}
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 p-3 border rounded-lg relative"
          >
            {[
              "ProductWeight",
              "customAmount",
              "othersCompanyAmount",
              "agentAmount",
              "merchantAmount",
              "customerAmount",
            ].map((name) => (
              <input
                key={name}
                placeholder={name.replace(/([A-Z])/g, " $1").trim()}
                type="number"
                {...register(`amounts.${index}.${name}`, {
                  required: "Required",
                })}
                className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1"
              >
                <FaTimes />
              </button>
            )}
          </div>
        ))}

        {/* Add Amount Row */}
        <button
          type="button"
          onClick={() =>
            append({
              ProductWeight: "",
              customAmount: "",
              othersCompanyAmount: "",
              agentAmount: "",
              merchantAmount: "",
              customerAmount: "",
            })
          }
          className="flex items-center gap-2 bg-green-500 text-white px-3 sm:px-4 py-2 rounded hover:bg-green-600"
        >
          <FaPlus /> Add More Amounts
        </button>

        {/* Submit */}
        <button
          type="submit"
          disabled={mutation.isLoading}
          className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
        >
          {mutation.isLoading ? "Updating..." : "Update Branch"}
        </button>
      </form>
    </div>
  );
}
