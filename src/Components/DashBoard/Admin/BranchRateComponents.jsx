import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../../api/axiosSecure";
import Swal from "sweetalert2";
import { FaPlus, FaTimes } from "react-icons/fa";
import useUsersData from "../../../hooks/useUsersData/useUsersData";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

export default function BranchRateEditor() {
  const queryClient = useQueryClient();
  const [selectedBranch, setSelectedBranch] = useState(null); // State now holds the full branch object
  const [selectedProducts, setSelectedProducts] = useState("");
  const [SelectedCompany, setSelectedCompany] = useState("");
  const [verifiedUser] = useUsersData();

  // Fetch branches for rate
  const { data: BranchesForRate = [] } = useQuery({
    queryKey: ["BranchesForRate"],
    queryFn: async () => {
      const res = await axiosSecure.get("/int-add-products");
      return res.data;
    },
  });

  const FilterProducts = BranchesForRate[0]?.products || [];

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
    setValue,
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

  // Post mutation
  const mutation = useMutation({
    mutationFn: async (newRateData) => {
      const res = await axiosSecure.post(`/rate`, newRateData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["BranchesForRate"] });
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Branch Rate added successfully!",
        timer: 1500,
        showConfirmButton: false,
      });
      reset();
      setSelectedBranch(null);
      setSelectedProducts("");
      setSelectedCompany("");
    },
    onError: (err) => {
      // Improved error handling
      if (err?.response?.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Conflict!",
          text: "This branch rate data already exists.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err?.response?.data?.message || "Something went wrong!",
        });
      }
    },
  });

  const { data: SupportCompanyList = [] } = useQuery({
    queryKey: ["SupportCompanyList"],
    queryFn: async () => {
      const response = await axiosSecure.get("/Company");
      return response.data || [];
    },
  });

  const onSubmit = (data) => {
    if (!selectedBranch) {
      Swal.fire("Warning", "Please select a branch first!", "warning");
      return;
    }
    mutation.mutate({
      ...data,
      products: selectedProducts,
      From_Country: data.FromCountry?.name || "",
      To_Country: data.Tocountry?.name || "",
      branchId: selectedBranch?.email,
      Support_Company: SelectedCompany,
      branch_Name: selectedBranch?.name,
      date: new Date().toISOString(),
      who_Added: verifiedUser?.email,
      Who_Added_Name: verifiedUser?.name,
      Who_Added_Role: verifiedUser?.role,
    });
  };

  // Common input class for consistent styling
  const inputStyle =
    "border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 bg-blue-50/50";

  return (
    <div className="p-4 sm:p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-3 border-blue-500">
        Add International Branch Rate
      </h2>

      {/* Grid for selecting branch, product, and company */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Select Branch */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Select Branch
          </label>
          <select
            className={inputStyle}
            value={selectedBranch?.email || ""}
            onChange={(e) => {
              const branch = Allusers.find((b) => b.email === e.target.value);
              setSelectedBranch(branch || null);
            }}
          >
            <option value="">-- Select a Branch --</option>
            {Allusers.filter((b) => b.role === "host").map((branch) => (
              <option key={branch._id} value={branch.email}>
                {branch.name} ({branch.email})
              </option>
            ))}
          </select>
        </div>

        {/* Select Products */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Select Product
          </label>
          <select
            className={inputStyle}
            value={selectedProducts}
            onChange={(e) => setSelectedProducts(e.target.value)}
          >
            <option value="">-- Select a Product --</option>
            {FilterProducts.map((p) => (
              <option key={p._id} value={p.name}>
                {p.name} - (Max: {p.maxWeight}) {p.unit}
              </option>
            ))}
          </select>
        </div>

        {/* Select Support Company */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Select Support Company
          </label>
          <select
            className={inputStyle}
            value={SelectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
          >
            <option value="">-- Select a Company --</option>
            {SupportCompanyList.map((company) => (
              <option key={company._id} value={company.Company_Name}>
                {company.Company_Name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* From Country */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              From Country*
            </label>
            <CountrySelect
              onChange={(value) => setValue("FromCountry", value)}
              placeHolder="Select Country"
            />
            {errors.FromCountry && (
              <span className="text-red-500 text-sm mt-1">Required</span>
            )}
          </div>

          {/* To Country */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              To Country*
            </label>
            <CountrySelect
              onChange={(value) => setValue("Tocountry", value)}
              placeHolder="Select Country"
            />
            {errors.Tocountry && (
              <span className="text-red-500 text-sm mt-1">Required</span>
            )}
          </div>
        </div>
        
        {/* Delivery Time Input */}
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Delivery Time
            </label>
            <input
              placeholder="e.g., 5-7 business days"
              {...register("deliveryTime", { required: "This field is required" })}
              className={inputStyle}
            />
            {errors.deliveryTime && (
              <p className="text-red-500 text-sm mt-1">
                {errors.deliveryTime.message}
              </p>
            )}
        </div>

        {/* Dynamic Amount Fields */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700 -mb-2">
            Rate Details
          </label>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 p-4 border border-blue-200 bg-blue-50/30 rounded-lg relative"
            >
              {[
                "ProductWeight", "customAmount", "othersCompanyAmount", 
                "agentAmount", "merchantAmount", "customerAmount",
              ].map((name) => (
                <input
                  key={name}
                  placeholder={name.replace(/([A-Z])/g, " $1").trim()}
                  type="number"
                  step="0.01"
                  {...register(`amounts.${index}.${name}`, { required: "Required" })}
                  className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              ))}
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-md hover:bg-red-600 transition-colors"
                >
                  <FaTimes size={12} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
          <button
            type="button"
            onClick={() => append({ /* default values */ })}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-100 text-blue-700 font-semibold px-4 py-3 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <FaPlus /> Add Rate Row
          </button>
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="w-full sm:w-auto bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
          >
            {mutation.isLoading ? "Saving Rate..." : "Save Branch Rate"}
          </button>
        </div>
      </form>
    </div>
  );
}