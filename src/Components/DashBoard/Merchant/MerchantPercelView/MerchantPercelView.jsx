import { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import axiosSecure from '../../../../api/axiosSecure';
import useUsersData from '../../../../hooks/useUsersData/useUsersData';

const fetchParcels = async () => {
    const response = await axiosSecure.get(`/merchantParcel`);
    return response.data;
  };
  

  const updateParcel = async ({ id, updatedData }) => {
    try {
      const response = await axiosSecure.patch(`/parcels/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error('Error updating parcel:', error);
      // Handle the error gracefully, e.g., by showing an alert or returning a specific error message
      throw new Error(error.response?.data?.message || 'Failed to update parcel');
    }
  };
  

const MerchantParcelList = () => {
  const [verifiedUser] = useUsersData();
  const merchantEmail = verifiedUser?.email;
  const queryClient = useQueryClient();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ['parcels', merchantEmail],
    queryFn: fetchParcels,
  });

  const mutation = useMutation({
    mutationFn: updateParcel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parcels', merchantEmail] });
    },
  });

  const [selectedParcel, setSelectedParcel] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  if (isLoading) return <p>Loading...</p>;

  const handleEdit = (parcel) => {
    setSelectedParcel(parcel);
    setIsEdit(true);
  };

  const handleSave = (updatedData) => {
    const { _id, ...dataToUpdate } = updatedData; 
    mutation.mutate({
      id: _id,
      updatedData: dataToUpdate,
    });
    setIsEdit(false);
    setSelectedParcel(null); 
  };
  

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(dateString).toLocaleString('en-US', options);
  };
  const formatDateForTable = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <h1 className="text-blue-600 font-bold text-2xl mb-4">Merchant Parcel List</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white border-collapse shadow-md">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Merchant ID</th>
              <th className="p-3 border">Merchant Email</th>
              <th className="p-3 border">Merchant Branch</th>
              <th className="p-3 border">Customer Name</th>
              <th className="p-3 border">Store</th>
              <th className="p-3 border">Item</th>
              <th className="p-3 border">Weight</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.length > 0 ? (
              parcels.map(parcel => (
                <tr key={parcel._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{formatDateForTable(parcel.Date)}</td>
                  <td className="p-3 border">{parcel.Merchant_ID || 'N/A'}</td>
                  <td className="p-3 border">{parcel?.Merchant_email || 'N/A'}</td>
                  <td className="p-3 border">{parcel?.Merchant_Branch_Name || 'N/A'}</td>
                  <td className="p-3 border">{parcel.Customer_Name}</td>
                  <td className="p-3 border">{parcel.Store_Name}</td>
                  <td className="p-3 border">{parcel.Item_Type}</td>
                  <td className="p-3 border">{parcel.Parcel_Weight} kg</td>
                  <td className="p-3 border flex gap-2">
                  <button
    onClick={() => {
      setSelectedParcel(parcel);
      setIsEdit(false); 
    }}
    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
  >
    View Details
  </button>
                    <button
                      onClick={() => handleEdit(parcel)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4">No parcels found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Parcel Details */}
      {selectedParcel && !isEdit && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-2xl w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[80vh] overflow-auto">
      {/* Modal Header */}
      <div className="bg-blue-600 p-4 md:p-6 rounded-t-lg">
        <h2 className="text-xl md:text-2xl font-bold text-white text-center">Parcel Details</h2>
      </div>

      {/* Modal Content */}
      <div className="p-4 md:p-8 space-y-4 md:space-y-6 text-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-2 md:gap-y-4">
          <p><span className="font-bold">Customer Name:</span> {selectedParcel.Customer_Name}</p>
          <p><span className="font-bold">Phone:</span> {selectedParcel.Customer_Contact_Number}</p>
          <p><span className="font-bold">Address:</span> {selectedParcel.Customer_Address}</p>
          <p><span className="font-bold">Area:</span> {selectedParcel.Customer_Area}</p>
          <p><span className="font-bold">District:</span> {selectedParcel.Customer_District_Name}</p>
          <p><span className="font-bold">Store:</span> {selectedParcel.Store_Name}</p>
          <p><span className="font-bold">Parcel Weight:</span> {selectedParcel.Parcel_Weight} kg</p>
          <p><span className="font-bold">Total Collection:</span> ${selectedParcel.Total_Collection_Amount}</p>
          <p><span className="font-bold">Service Type:</span> {selectedParcel.Service_Type}</p>
          <p><span className="font-bold">Item Type:</span> {selectedParcel.Item_Type}</p>
          <p><span className="font-bold">Product Value:</span> ৳{selectedParcel.Product_Value}</p>
          <p><span className="font-bold">Product Details:</span> {selectedParcel.Product_Details}</p>
          <p><span className="font-bold">Product Remark:</span> {selectedParcel.Product_Remark}</p>
          <p><span className="font-bold">COD Percentage:</span> {selectedParcel.Cod_Perchent}%</p>
          <p><span className="font-bold">Weight Charge:</span> ৳{selectedParcel.Weight_Charge}</p>
          <p><span className="font-bold">Delivery Charge:</span> ৳{selectedParcel.Delivary_Charge}</p>
          <p><span className="font-bold">Total Charge:</span> ৳{selectedParcel.Total_Charge}</p>
          <p><span className="font-bold">Date:</span> {formatDate(selectedParcel.Date)}</p>
        </div>
      </div>

      {/* Modal Footer */}
      <div className="bg-blue-100 p-4 flex justify-end rounded-b-lg">
        <button
          onClick={() => setSelectedParcel(null)}
          className="bg-blue-600 text-white px-4 md:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}



      {/* Modal for Editing Parcel */}
      {isEdit && selectedParcel && (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full overflow-y-auto max-h-screen">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Edit Parcel</h2>

      {/* Customer Contact Number */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-700 mb-1">Customer Contact Number</label>
        <input
          type="text"
          className="border border-blue-300 p-2 rounded w-full focus:outline-none focus:border-blue-500"
          defaultValue={selectedParcel.Customer_Contact_Number}
          onChange={(e) => setSelectedParcel({ ...selectedParcel, Customer_Contact_Number: e.target.value })}
        />
      </div>

      {/* Customer Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-700 mb-1">Customer Name</label>
        <input
          type="text"
          className="border border-blue-300 p-2 rounded w-full focus:outline-none focus:border-blue-500"
          defaultValue={selectedParcel.Customer_Name}
          onChange={(e) => setSelectedParcel({ ...selectedParcel, Customer_Name: e.target.value })}
        />
      </div>

      {/* Customer Address */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-700 mb-1">Customer Address</label>
        <input
          type="text"
          className="border border-blue-300 p-2 rounded w-full focus:outline-none focus:border-blue-500"
          defaultValue={selectedParcel.Customer_Address}
          onChange={(e) => setSelectedParcel({ ...selectedParcel, Customer_Address: e.target.value })}
        />
      </div>

      {/* Customer District Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-700 mb-1">Customer District Name</label>
        <input
          type="text"
          className="border border-blue-300 p-2 rounded w-full focus:outline-none focus:border-blue-500"
          defaultValue={selectedParcel.Customer_District_Name}
          onChange={(e) => setSelectedParcel({ ...selectedParcel, Customer_District_Name: e.target.value })}
        />
      </div>

      {/* Customer Area */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-700 mb-1">Customer Area</label>
        <input
          type="text"
          className="border border-blue-300 p-2 rounded w-full focus:outline-none focus:border-blue-500"
          defaultValue={selectedParcel.Customer_Area}
          onChange={(e) => setSelectedParcel({ ...selectedParcel, Customer_Area: e.target.value })}
        />
      </div>

      {/* Store Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-700 mb-1">Store Name</label>
        <input
          type="text"
          className="border border-blue-300 p-2 rounded w-full focus:outline-none focus:border-blue-500"
          defaultValue={selectedParcel.Store_Name}
          onChange={(e) => setSelectedParcel({ ...selectedParcel, Store_Name: e.target.value })}
        />
      </div>

      {/* Parcel Weight */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-700 mb-1">Parcel Weight (kg)</label>
        <input
          type="number"
          className="border border-blue-300 p-2 rounded w-full focus:outline-none focus:border-blue-500"
          defaultValue={selectedParcel.Parcel_Weight}
          onChange={(e) => setSelectedParcel({ ...selectedParcel, Parcel_Weight: parseFloat(e.target.value) })}
        />
      </div>

      {/* Total Collection Amount */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-700 mb-1">Total Collection Amount ($)</label>
        <input
          type="number"
          className="border border-blue-300 p-2 rounded w-full focus:outline-none focus:border-blue-500"
          defaultValue={selectedParcel.Total_Collection_Amount}
          onChange={(e) => setSelectedParcel({ ...selectedParcel, Total_Collection_Amount: parseFloat(e.target.value) })}
        />
      </div>

      {/* Save and Cancel Buttons */}
      <div className="flex justify-end gap-4">
        <button
          onClick={() => handleSave(selectedParcel)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Save Changes
        </button>
        <button
          onClick={() => setIsEdit(false)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default MerchantParcelList;
