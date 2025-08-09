import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";

const Booking_Rate_International = () => {
  const { register, handleSubmit, reset } = useForm();
  const { register: registerProduct, handleSubmit: handleProductSubmit, reset: resetProduct } = useForm();

  const [activeSection, setActiveSection] = useState("branchRate"); // branchRate, showBranch, addProduct
  const [branchList, setBranchList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [editId, setEditId] = useState(null);

  // Fetch Branch Data
  const fetchBranches = async () => {
    const res = await axios.get("/api/branches");
    setBranchList(res.data);
  };

  // Fetch Products
  const fetchProducts = async () => {
    const res = await axios.get("/api/products");
    setProductList(res.data);
  };

  useEffect(() => {
    if (activeSection === "showBranch") fetchBranches();
    if (activeSection === "addProduct") fetchProducts();
  }, [activeSection]);

  // Save or Update Branch Rate
  const onSubmitBranch = async (formData) => {
    if (editId) {
      await axios.put(`/api/branches/${editId}`, formData);
      setEditId(null);
    } else {
      await axios.post("/api/branches", formData);
    }
    reset();
    fetchBranches();
  };

  // Save Product
  const onSubmitProduct = async (formData) => {
    await axios.post("/api/products", formData);
    resetProduct();
    fetchProducts();
  };

  // Edit Branch
  const handleEditBranch = (branch) => {
    setEditId(branch._id);
    reset(branch);
    setActiveSection("branchRate");
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Booking Rate (International)</h1>

      {/* Top Buttons */}
      <div className="flex gap-3 mb-5">
        <button
          onClick={() => setActiveSection("branchRate")}
          className={`px-4 py-2 rounded ${activeSection === "branchRate" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Add Branch Rate
        </button>
        <button
          onClick={() => setActiveSection("showBranch")}
          className={`px-4 py-2 rounded ${activeSection === "showBranch" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Show Branch
        </button>
      </div>

      {/* Add Branch Rate Form */}
      {activeSection === "branchRate" && (
        <form onSubmit={handleSubmit(onSubmitBranch)} className="grid grid-cols-3 gap-3 border p-4 rounded">
          <input placeholder="From Country" {...register("from")} className="border p-2" />
          <input placeholder="To Country" {...register("to")} className="border p-2" />
          <input placeholder="Delivery Time" {...register("deliveryTime")} className="border p-2" />
          <input placeholder="Courier Company" {...register("courier")} className="border p-2" />
          <input placeholder="Amount" {...register("amount")} type="number" className="border p-2" />
          <button type="submit" className="col-span-3 bg-blue-500 text-white py-2 rounded">
            {editId ? "Update Branch" : "Save Branch"}
          </button>
        </form>
      )}

      {/* Show Branch Table */}
      {activeSection === "showBranch" && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold">Branch List</h2>
            <button
              onClick={() => setActiveSection("addProduct")}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Add Products
            </button>
          </div>

          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">From</th>
                <th className="border p-2">To</th>
                <th className="border p-2">Delivery Time</th>
                <th className="border p-2">Courier</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {branchList.map((b) => (
                <tr key={b._id}>
                  <td className="border p-2">{b.from}</td>
                  <td className="border p-2">{b.to}</td>
                  <td className="border p-2">{b.deliveryTime}</td>
                  <td className="border p-2">{b.courier}</td>
                  <td className="border p-2">{b.amount}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleEditBranch(b)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Product Form */}
      {activeSection === "addProduct" && (
        <div>
          <h2 className="text-lg font-bold mb-3">Add Product</h2>
          <form onSubmit={handleProductSubmit(onSubmitProduct)} className="grid grid-cols-3 gap-3 border p-4 rounded">
            <input placeholder="Product Name" {...registerProduct("name")} className="border p-2" />
            <input placeholder="Unit" {...registerProduct("unit")} className="border p-2" />
            <input placeholder="Price" {...registerProduct("price")} type="number" className="border p-2" />
            <button type="submit" className="col-span-3 bg-blue-500 text-white py-2 rounded">
              Save Product
            </button>
          </form>

          {/* Product List */}
          <table className="w-full mt-5 border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Name</th>
                <th className="border p-2">Unit</th>
                <th className="border p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((p) => (
                <tr key={p._id}>
                  <td className="border p-2">{p.name}</td>
                  <td className="border p-2">{p.unit}</td>
                  <td className="border p-2">{p.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Booking_Rate_International;
