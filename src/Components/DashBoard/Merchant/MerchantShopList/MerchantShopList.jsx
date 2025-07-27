import  { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../../api/axiosSecure";
import ClipLoader from "react-spinners/ClipLoader";
import useUsersData from "../../../../hooks/useUsersData/useUsersData";

const MerchantShopList = () => {
  const[verifiedUser] = useUsersData()
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);

  const { data: shopData = [], refetch, isLoading } = useQuery({
    queryKey: ["shopData", verifiedUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`store/${verifiedUser?.email}`);
      return res.data;
    },
    enabled: !!verifiedUser?.email,
  });

  const handleEditStore = async () => {
    try {
      const { _id, ...updatedData } = editData;
      await axiosSecure.put(`/store/${_id}`, updatedData);
      refetch(); 
      setEditMode(false);
      setEditData(null);
    } catch (error) {
      console.error("Error updating store:", error);
    }
  };

  const handleToggleStatus = async (id, status) => {
    try {
      await axiosSecure.put(`/store/${id}/active`, { Status: status });
      refetch(); 
    } catch (error) {
      console.error("Error updating store status:", error);
    }
  };

  const handleSetDefaultPickupStore = async (id) => {
    try {
      await axiosSecure.put(`/store/${id}/default`);
      refetch(); 
    } catch (error) {
      console.error("Error setting default pickup store:", error);
    }
  };

  const startEdit = (shop) => {
    setEditMode(true);
    setEditData(shop);
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEditData(null);
  };

  if(shopData.length === 0 ) {
    return (
      <div className="text-center text-gray-500 mt-8">
        No shops found. Please create a shop.<Link to="/dashboard/CreateStore">
          <h1 className="underline text-blue-600">Create Shop</h1>
        </Link>
      </div>
    );

  }

  return (
    <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-full mt-8 border border-gray-200">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Shop List of {verifiedUser?.name}
      </h1>

      <div className="flex justify-end mb-4">
        <Link to="/dashboard/CreateStore">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md shadow-md transition duration-300">
            Create Store
          </button>
        </Link>
      </div>

      {/* Loader */}
      {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader color="blue" loading={isLoading} size={50} />
          </div>
        ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-100 rounded-lg border border-gray-200">
            <thead>
              <tr className="bg-blue-100 text-left text-blue-600">
                <th className="py-3 px-6">SL</th>
                <th className="py-3 px-6">Shop Name</th>
                <th className="py-3 px-6">Shop Address</th>
                <th className="py-3 px-6">Contact Number</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {shopData.map((shop, index) => (
                <tr
                  key={shop._id}
                  className="border-b border-gray-200 hover:bg-blue-50 transition duration-300"
                >
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6">
                    {editMode && editData._id === shop._id ? (
                      <input
                        type="text"
                        value={editData.Store_Name}
                        onChange={(e) =>
                          setEditData({ ...editData, Store_Name: e.target.value })
                        }
                        className="border px-2 py-1"
                      />
                    ) : (
                      shop.Store_Name
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {editMode && editData._id === shop._id ? (
                      <input
                        type="text"
                        value={editData.Store_Address}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            Store_Address: e.target.value,
                          })
                        }
                        className="border px-2 py-1"
                      />
                    ) : (
                      shop.Store_Address
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {editMode && editData._id === shop._id ? (
                      <input
                        type="text"
                        value={editData.Store_Contact_Number}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            Store_Contact_Number: e.target.value,
                          })
                        }
                        className="border px-2 py-1"
                      />
                    ) : (
                      shop.Store_Contact_Number
                    )}
                  </td>
                  <td className="py-4 px-6 flex space-x-2">
                    {editMode && editData._id === shop._id ? (
                      <>
                        <button
                          onClick={handleEditStore}
                          className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded-md shadow-md transition duration-300"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded-md shadow-md transition duration-300"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(shop)}
                          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md shadow-md transition duration-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleToggleStatus(
                              shop._id,
                              shop.Status === "Active" ? "Inactive" : "Active"
                            )
                          }
                          className={`${
                            shop.Status === "Active"
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-green-500 hover:bg-green-600"
                          } text-white py-1 px-4 rounded-md shadow-md transition duration-300`}
                        >
                          {shop.Status === "Active" ? "Deactivate" : "Activate"}
                        </button>
                        <button
                          onClick={() => handleSetDefaultPickupStore(shop._id)}
                          className={`${
                            shop.isDefaultPickupStore
                              ? "bg-gray-500 hover:bg-gray-600"
                              : "bg-blue-500 hover:bg-blue-600"
                          } text-white py-1 px-4 rounded-md shadow-md transition duration-300`}
                        >
                          {shop.isDefaultPickupStore
                            ? "Default Store"
                            : "Set as Default"}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MerchantShopList;
