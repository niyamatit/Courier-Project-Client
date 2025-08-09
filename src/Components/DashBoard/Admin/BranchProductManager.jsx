import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaPlus, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import axiosSecure from "../../../api/axiosSecure";

export default function BranchProductManager() {
  const [branchList, setBranchList] = useState([]);
  const [editingBranch, setEditingBranch] = useState(null);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const { data } = await axiosSecure.get("/int-add-products");
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
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`/api/products/${id}`);
        Swal.fire("Deleted!", "Branch data removed.", "success");
        fetchBranches();
      } catch (err) {
        Swal.fire("Error!", "Failed to delete branch data.", "error");
      }
    }
  };

  const handleEditBranch = (branch) => {
    // Deep clone to avoid modifying the original until save
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
      products: [...editingBranch.products, { name: "", unit: "", price: "" }],
    });
  };

  const removeProductField = (index) => {
    const updated = { ...editingBranch };
    updated.products.splice(index, 1);
    setEditingBranch(updated);
  };

  const saveEditedBranch = async () => {
    try {
      await axios.put(`/api/products/${editingBranch._id}`, {
        products: editingBranch.products,
      });
      Swal.fire("✅ Success!", "Branch data updated.", "success");
      setEditingBranch(null);
      fetchBranches();
    } catch (err) {
      Swal.fire("❌ Error!", "Failed to update branch data.", "error");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Branch Products Management</h1>

      {/* Table of Branch Data */}
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Branch ID</th>
            <th className="border p-2">Products</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {branchList.map((branch) => (
            <tr key={branch._id}>
              <td className="border p-2">{branch.branchId}</td>
              <td className="border p-2">
                {branch.products.map((prod, idx) => (
                  <div key={idx}>
                    <span className="font-medium">{prod.name}</span> - {prod.unit} - ${prod.price}
                  </div>
                ))}
              </td>
              <td className="border p-2">
                {new Date(branch.date).toLocaleString()}
              </td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => handleEditBranch(branch)}
                  className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDeleteBranch(branch._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1"
                >
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editingBranch && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">
              Edit Products for Branch: {editingBranch.branchId}
            </h2>

            {editingBranch.products.map((prod, idx) => (
              <div key={idx} className="grid grid-cols-4 gap-2 mb-2 items-center">
                <input
                  value={prod.name}
                  onChange={(e) => handleProductChange(idx, "name", e.target.value)}
                  placeholder="Name"
                  className="border p-2 rounded"
                />
                <input
                  value={prod.unit}
                  onChange={(e) => handleProductChange(idx, "unit", e.target.value)}
                  placeholder="Unit"
                  className="border p-2 rounded"
                />
                <input
                  value={prod.price}
                  type="number"
                  onChange={(e) => handleProductChange(idx, "price", e.target.value)}
                  placeholder="Price"
                  className="border p-2 rounded"
                />
                <button
                  onClick={() => removeProductField(idx)}
                  className="bg-red-500 text-white p-2 rounded-full"
                >
                  <FaTimes />
                </button>
              </div>
            ))}

            <button
              onClick={addProductField}
              className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2 mb-4"
            >
              <FaPlus /> Add Product
            </button>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingBranch(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveEditedBranch}
                className="bg-blue-600 text-white px-4 py-2 rounded"
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
