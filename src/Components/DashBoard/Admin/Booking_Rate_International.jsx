import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaPlus, FaTimes } from "react-icons/fa";
import axiosSecure from "../../../api/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import BranchProductManager from "./BranchProductManager";
import BranchRateComponents from "./BranchRateComponents";
import BranchViewModal from "./BranchViewModal";

const Booking_Rate_International = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const {
    register: registerProduct,
    handleSubmit: handleProductSubmit,
    reset: resetProduct,
    formState: { errors: productErrors },
  } = useForm();

  const [activeSection, setActiveSection] = useState("branchRate");
  const [branchList, setBranchList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
const [productFields, setProductFields] = useState([
  { name: "", unit: "", price: "" }
]);
// Add these new state variables at the top of the component
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedBranchData, setSelectedBranchData] = useState(null);
const handleViewBranch = (branch) => {
  setSelectedBranchData(branch);
  setIsModalOpen(true);
};
const addProductField = () => {
  setProductFields([...productFields, { name: "", unit: "", price: "" }]);
};

const removeProductField = (index) => {
  const updatedFields = productFields.filter((_, i) => i !== index);
  setProductFields(updatedFields);
};
const handleProductChange = (index, field, value) => {
  const updatedFields = [...productFields];
  updatedFields[index][field] = value;
  setProductFields(updatedFields);
};
 const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBranchData(null);
  };

  // Fetch Branch Data
  const fetchBranches = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/branches");
      setBranchList(res.data);
    } catch (error) {
      console.error("Failed to fetch branches:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/products");
      setProductList(res.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeSection === "showBranch") fetchBranches();
    if (activeSection === "addProduct") fetchProducts();
  }, [activeSection]);

  // Save or Update Branch Rate
  const onSubmitBranch = async (formData) => {
    setLoading(true);
    try {
      if (editId) {
        await axios.put(`/api/branches/${editId}`, formData);
        setEditId(null);
      } else {
        await axios.post("/api/branches", formData);
      }
      reset();
      setSubmitSuccess(true);
      fetchBranches();
    } catch (error) {
      console.error("Failed to save/update branch:", error);
    } finally {
      setLoading(false);
    }
  };

  // Save Product
  const onSubmitProducts = async (e) => {
  e.preventDefault();


  const ProductsInfo = {
    branchId: selectedBranch,
      products: productFields,
      date: new Date().toISOString(),
  }
  try {
    const response = await axiosSecure.post("/api/products/bulk", ProductsInfo);
    setSelectedBranch("");
    setProductFields([{ name: "", unit: "", price: "" }]);
    if (response.status === 201) {
      Swal.fire("✅ Success!", "Products added successfully.", "success");
      setSelectedBranch("");
      setProductFields([{ name: "", unit: "", price: "" }]);
      fetchProducts();
    }
  } catch (error) {
   if (error.response) {
      if (error.response.status === 409) {
        Swal.fire("⚠️ Duplicate!", "Branch data already exists.", "warning");
      } else if (error.response.status === 500) {
        Swal.fire("❌ Error!", "Failed to add products. Please try again.", "error");
      } else {
        Swal.fire("❌ Error!", "Unexpected error occurred.", "error");
      }
    } else {
      Swal.fire("❌ Error!", "Network error. Please check your connection.", "error");
    }
  }
};



  // Edit Branch
  const handleEditBranch = (branch) => {
    setEditId(branch._id);
    reset(branch);
    setActiveSection("branchRate");
  };

  // Delete Branch
  const handleDeleteBranch = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          await axios.delete(`/api/branches/${id}`);
          fetchBranches();
          Swal.fire("Deleted!", "Your branch rate has been deleted.", "success");
        } catch (error) {
          console.error("Failed to delete branch:", error);
          Swal.fire("Error!", "Failed to delete the branch rate.", "error");
        } finally {
          setLoading(false);
        }
      }
    });
  };

  // Delete Product
  


   const {  data: Branch = []} = useQuery({
        queryKey: ['Branch'],
        queryFn: async() => {
            const res = await axiosSecure.get("/shfjksdhfjdjkfhxnbcnbc67437gch");
            return res.data;
        }

    });
  

    const branches = Branch.filter(branch => branch?.role === "host");

const {  data: BranchesForRate = []} = useQuery({
        queryKey: ['BranchesForRate'],
        queryFn: async() => {
            const res = await axiosSecure.get("/int-add-products");
            return res.data;
        }

    });


     

  return (
    <div className="bg-gray-50 min-h-screen w-full p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center md:text-left">
          International Booking Rate Management
        </h1>

        {/* Top Navigation Buttons */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-10">
          <button
            onClick={() => {
              setActiveSection("branchRate");
              setEditId(null);
              reset();
            }}
            className={`flex-1 md:flex-none px-8 py-3 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 ${
              activeSection === "branchRate"
                ? "bg-blue-600 text-white font-semibold"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
            }`}
          >
            Add Branch Rate
          </button>
          <button
            onClick={() => setActiveSection("showBranch")}
            className={`flex-1 md:flex-none px-8 py-3 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 ${
              activeSection === "showBranch"
                ? "bg-blue-600 text-white font-semibold"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
            }`}
          >
            View All Branches
          </button>
          <button
            onClick={() => setActiveSection("addProduct")}
            className={`flex-1 md:flex-none px-8 py-3 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 ${
              activeSection === "addProduct"
                ? "bg-blue-600 text-white font-semibold"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
            }`}
          >
            Manage Products
          </button>
        </div>

        {/* Dynamic Section Content */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl">
          {/* Success Message */}
          {submitSuccess && (
            <div
              className="bg-green-50 border-l-4 border-green-400 text-green-700 p-4 mb-6 rounded-lg"
              role="alert"
            >
              <p className="font-bold">Success!</p>
              <p>Your data has been saved successfully.</p>
            </div>
          )}

          {/* Add Branch Rate Form */}
          {activeSection === "branchRate" && (
            // <div>
            //   <h2 className="text-2xl font-bold text-gray-800 mb-6">
            //     {editId ? "Edit Branch Rate" : "Add a New Branch Rate"}
            //   </h2>
            //   <form onSubmit={handleSubmit(onSubmitBranch)} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            //     <div className="col-span-1">
            //       <label className="block text-gray-700 font-medium mb-1">From Country</label>
            //       <input
            //         placeholder="e.g., USA"
            //         {...register("from", { required: "From Country is required" })}
            //         className={`w-full border ${errors.from ? "border-red-500" : "border-gray-300"} p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            //       />
            //       {errors.from && (
            //         <p className="text-red-500 text-sm mt-1">{errors.from.message}</p>
            //       )}
            //     </div>
            //     <div className="col-span-1">
            //       <label className="block text-gray-700 font-medium mb-1">To Country</label>
            //       <input
            //         placeholder="e.g., Canada"
            //         {...register("to", { required: "To Country is required" })}
            //         className={`w-full border ${errors.to ? "border-red-500" : "border-gray-300"} p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            //       />
            //       {errors.to && (
            //         <p className="text-red-500 text-sm mt-1">{errors.to.message}</p>
            //       )}
            //     </div>
            //     <div className="col-span-1">
            //       <label className="block text-gray-700 font-medium mb-1">Delivery Time</label>
            //       <input
            //         placeholder="e.g., 2-3 Days"
            //         {...register("deliveryTime", { required: "Delivery Time is required" })}
            //         className={`w-full border ${errors.deliveryTime ? "border-red-500" : "border-gray-300"} p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            //       />
            //       {errors.deliveryTime && (
            //         <p className="text-red-500 text-sm mt-1">{errors.deliveryTime.message}</p>
            //       )}
            //     </div>
            //     <div className="col-span-1">
            //       <label className="block text-gray-700 font-medium mb-1">Courier Company</label>
            //       <input
            //         placeholder="e.g., FedEx"
            //         {...register("courier", { required: "Courier Company is required" })}
            //         className={`w-full border ${errors.courier ? "border-red-500" : "border-gray-300"} p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            //       />
            //       {errors.courier && (
            //         <p className="text-red-500 text-sm mt-1">{errors.courier.message}</p>
            //       )}
            //     </div>
            //     <div className="col-span-1">
            //       <label className="block text-gray-700 font-medium mb-1">Amount</label>
            //       <input
            //         placeholder="e.g., 50.00"
            //         {...register("amount", {
            //           required: "Amount is required",
            //           valueAsNumber: true,
            //           min: { value: 0, message: "Amount must be a positive number" },
            //         })}
            //         type="number"
            //         className={`w-full border ${errors.amount ? "border-red-500" : "border-gray-300"} p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            //       />
            //       {errors.amount && (
            //         <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
            //       )}
            //     </div>
            //     <div className="col-span-full md:col-span-1 md:col-start-3 self-end">
            //       <button
            //         type="submit"
            //         className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold shadow-lg"
            //         disabled={loading}
            //       >
            //         {loading ? "Processing..." : editId ? "Update Branch" : "Save Branch"}
            //       </button>
            //     </div>
            //   </form>
            // </div>
            <BranchRateComponents/>
          )}

          {/* Show Branch Table */}
          {activeSection === "showBranch" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">All Branches</h2>
              {loading ? (
                <p className="text-center text-gray-500 py-8">Loading branches...</p>
              ) : BranchesForRate.length > 0 ? (
                <div className="overflow-x-auto rounded-lg shadow-sm">
                  <table className="w-full table-auto">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                      <tr className="border-b border-gray-200">
                        <th className="py-4 px-6 text-left">From</th>
                        <th className="py-4 px-6 text-left">To</th>
                        <th className="py-4 px-6 text-left">Delivery Time</th>
                        <th className="py-4 px-6 text-left">Courier</th>
                        <th className="py-4 px-6 text-left">Custom Amount</th>
                        <th className="py-4 px-6 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white text-gray-700 text-sm">
                      {BranchesForRate.map((b) => (
                        <tr key={b._id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-6 font-medium whitespace-nowrap">{b.fromCountry}</td>
                          <td className="py-4 px-6">{b.toCountry}</td>
                          <td className="py-4 px-6">{b.deliveryTime}</td>
                          <td className="py-4 px-6">{b.deliveryCompany}</td>
                          <td className="py-4 px-6">৳{b.customAmount}</td>
                          <td className="py-4 px-6 text-center space-x-2">
                            <button
                              onClick={() => handleEditBranch(b)}
                              className="bg-yellow-500 text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-yellow-600 transition-colors shadow-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleViewBranch(b)}
                              className="bg-green-500 text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-green-600 transition-colors shadow-sm"
                            >
                              view
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">No branches found. Add a new branch rate to get started.</p>
              )}
            </div>
          )}

          {/* Add Product Form and List */}
          {activeSection === "addProduct" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Products</h2>
              <div className="bg-gray-50 p-6 rounded-xl mb-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-700 mb-4">Add a New Product</h3>
                <form onSubmit={onSubmitProducts} className="space-y-4">
  {/* Select Branch */}
  <div>
    <label className="block font-medium mb-1">Select Branch</label>
    <select
      value={selectedBranch}
      onChange={(e) => setSelectedBranch(e.target.value)}
      required
      className="border p-2 rounded w-full"
    >
      <option value="">-- Choose Branch --</option>
      {branches.map((branch) => (
        <option key={branch.id} value={branch.email}>
          {branch.name}({branch.email})
        </option>
      ))}
    </select>
  </div>

  {/* Dynamic Product Fields */}
  {productFields.map((field, index) => (
    <div
      key={index}
      className="grid grid-cols-4 gap-4 items-center border p-3 rounded-lg bg-gray-50"
    >
      <input
        placeholder="Product Name"
        value={field.name}
        onChange={(e) => handleProductChange(index, "name", e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        placeholder="Unit"
        value={field.unit}
        onChange={(e) => handleProductChange(index, "unit", e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        placeholder="Price"
        type="number"
        value={field.price}
        onChange={(e) => handleProductChange(index, "price", e.target.value)}
        className="border p-2 rounded"
        required
      />
      <div className="flex items-center justify-center space-x-2">
        {index === productFields.length - 1 && (
          <button
            type="button"
            onClick={addProductField}
            className="bg-green-500 text-white p-2 rounded-full"
          >
            <FaPlus />
          </button>
        )}
        {productFields.length > 1 && (
          <button
            type="button"
            onClick={() => removeProductField(index)}
            className="bg-red-500 text-white p-2 rounded-full"
          >
            <FaTimes />
          </button>
        )}
      </div>
    </div>
  ))}

  {/* Submit */}
  <button
    type="submit"
    className="bg-blue-600 text-white py-2 px-6 rounded-lg"
  >
    Save All Products
  </button>
</form>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-4">Product List</h3>
              {loading ? (
                <p className="text-center text-gray-500 py-8">Loading products...</p>
              ) : productList.length > 0 ? (
                <BranchProductManager />
              ) : (
                <p className="text-center text-gray-500 py-8">No products found. Add a new product to get started.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <BranchViewModal 
              isOpen={isModalOpen}
              onClose={closeModal}
              branchData={selectedBranchData}
            />
    </div>
  );
};

export default Booking_Rate_International;