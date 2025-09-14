import { useState, useEffect } from "react";

import Swal from "sweetalert2";
import { FaPlus, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import axiosSecure from "../../../api/axiosSecure";

export default function DocumentManager() {
  const [branchList, setBranchList] = useState([]);
  const [editingBranch, setEditingBranch] = useState(null);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const { data } = await axiosSecure.get("/int-add-products-doc");
      setBranchList(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBranch = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete all products for this branch!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: 'bg-white rounded-xl shadow-2xl p-6',
        title: 'text-2xl font-bold text-gray-800',
        htmlContainer: 'text-gray-600',
        confirmButton: 'bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors',
        cancelButton: 'bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg hover:bg-gray-400 transition-colors',
      },
      buttonsStyling: false,
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/api/products/delete/doc/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Branch data removed.",
          icon: "success",
          customClass: {
            popup: 'bg-white rounded-xl shadow-2xl p-6',
            title: 'text-2xl font-bold text-gray-800',
            htmlContainer: 'text-gray-600',
            confirmButton: 'bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors',
          },
          buttonsStyling: false,
        });
        // window.reload();
        fetchBranches();
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete branch data.",
          icon: "error",
          customClass: {
            popup: 'bg-white rounded-xl shadow-2xl p-6',
            title: 'text-2xl font-bold text-gray-800',
            htmlContainer: 'text-gray-600',
            confirmButton: 'bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors',
          },
          buttonsStyling: false,
        });
      }
    }
    // window.reload();
  };

  const handleEditBranch = (branch) => {
    setEditingBranch(JSON.parse(JSON.stringify(branch)));
  };

  const handleProductChange = (index, field, value) => {
    const updated = { ...editingBranch };
    updated.products[index][field] = value;
    setEditingBranch(updated);
  };

  const addProductField = () => {
    setEditingBranch({
      ...editingBranch,
      products: [...editingBranch.products, { name: "", unit : "", maxWeight: "" }],
    });
  };

  const removeProductField = (index) => {
    const updated = { ...editingBranch };
    updated.products.splice(index, 1);
    setEditingBranch(updated);
  };

  const saveEditedBranch = async () => {
    try {
      await axiosSecure.patch(`/api/products/updated/doc/${editingBranch._id}`, {
        products: editingBranch.products,
      });
      Swal.fire({
        title: "✅ Success!",
        text: "Branch data updated.",
        icon: "success",
        customClass: {
          popup: 'bg-white rounded-xl shadow-2xl p-6',
          title: 'text-2xl font-bold text-gray-800',
          htmlContainer: 'text-gray-600',
          confirmButton: 'bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors',
        },
        buttonsStyling: false,
      });
      setEditingBranch(null);
      fetchBranches();
    } catch (err) {
      Swal.fire({
        title: "❌ Error!",
        text: "Failed to update branch data.",
        icon: "error",
        customClass: {
          popup: 'bg-white rounded-xl shadow-2xl p-6',
          title: 'text-2xl font-bold text-gray-800',
          htmlContainer: 'text-gray-600',
          confirmButton: 'bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors',
        },
        buttonsStyling: false,
      });
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 ">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 sm:mb-8 text-center">
          Branch Products Management
        </h1>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
                <tr>
                  <th className="px-4 py-3 sm:px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    SL
                  </th>
                  <th className="px-4 py-3 sm:px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Product Added
                  </th>
                  <th className="px-4 py-3 sm:px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Product Updated
                  </th>
                  {/* <th className="px-4 py-3 sm:px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Branch ID
                  </th> */}
                  <th className="px-4 py-3 sm:px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Products
                  </th>
                  <th className="px-4 py-3 sm:px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {branchList.map((branch, index) => (
                  <tr key={branch._id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm text-gray-500">
                      {new Date(branch.date).toLocaleString()}
                    </td>
                    <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm text-gray-500">
                      {new Date(branch.updateDate ).toLocaleString() }
                    </td>
                    {/* <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm font-semibold text-gray-700">
                      {branch.branchId}
                    </td> */}
                    <td className="px-4 py-4 sm:px-6 text-sm text-gray-600">
                      {branch.products.map((prod, idx) => (
                        <div key={idx} className="mb-1">
                          <span className="font-medium text-gray-800">{prod.name}</span>
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditBranch(branch)}
                          className="flex items-center gap-2 bg-blue-500 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                          title="Edit Branch"
                        >
                          <FaEdit className="text-lg" />
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteBranch(branch._id)}
                          className="flex items-center gap-2 bg-red-500 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition-colors"
                          title="Delete Branch"
                        >
                          <FaTrash className="text-lg" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingBranch && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 sm:p-8 transform transition-all duration-300 scale-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Edit Products for Branch: <span className="text-blue-600">{editingBranch.branchId}</span>
              </h2>
              <button
                onClick={() => setEditingBranch(null)}
                className="text-gray-500 hover:text-gray-800 transition-colors"
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {editingBranch.products.map((prod, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center bg-gray-100 p-4 rounded-xl shadow-sm">
                  <input
                    value={prod.name}
                    onChange={(e) => handleProductChange(idx, "name", e.target.value)}
                    placeholder="Product Name"
                    className="col-span-1 sm:col-span-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                  />
                  {/* <input
                    value={prod.unit}
                    onChange={(e) => handleProductChange(idx, "unit", e.target.value)}
                    placeholder="Unit"
                    className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                  /> */}
                  <div className="relative flex items-center">
                    {/* <span className="absolute left-3 text-gray-400 font-mono">৳</span> */}
                    {/* <input
                      value={prod.maxWeight}
                      type="number"
                      onChange={(e) => handleProductChange(idx, "maxWeight", e.target.value)}
                      placeholder="Max Weight"
                      className="w-full border border-gray-300 p-3 pl-8 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                    /> */}
                  </div>
                  <button
                    onClick={() => removeProductField(idx)}
                    className="sm:col-start-4 bg-red-500 text-white p-3 rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
                    title="Remove Product"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={addProductField}
                className="bg-green-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 hover:bg-green-600 transition-colors"
              >
                <FaPlus /> Add Product
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => setEditingBranch(null)}
                  className="bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEditedBranch}
                  className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}