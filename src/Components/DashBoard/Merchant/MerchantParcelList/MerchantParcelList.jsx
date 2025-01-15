import { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import axiosSecure from '../../../../api/axiosSecure';
import useUsersData from '../../../../hooks/useUsersData/useUsersData';

const fetchParcels = async ({ queryKey }) => {
  const [, merchant_email] = queryKey;
  const response = await axiosSecure.get(`/parcels?merchant_email=${merchant_email}`);
  return response.data;
};

const updateParcel = async ({ id, updatedData }) => {
  const response = await axiosSecure.patch(`/parcels/${id}`, updatedData);
  return response.data;
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

  // const handleEdit = (parcel) => {
  //   setSelectedParcel(parcel);
  //   setIsEdit(true);
  // };

  const handleSave = (updatedData) => {
    mutation.mutate({
      id: selectedParcel._id,
      updatedData: {
        Customer_Name: selectedParcel.Customer_Name,
        Parcel_Weight: selectedParcel.Parcel_Weight,
        // Include other fields if needed
      },
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
              <th className="p-3 border">CN Number</th>
              <th className="p-3 border">Customer Phone</th>
              <th className="p-3 border">Address</th>
              <th className="p-3 border">Name</th>
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
                  <td className="p-3 border">{parcel.CnNumber}</td>
                  <td className="p-3 border">{parcel.Customer_Contact_Number}</td>
                  <td className="p-3 border">{parcel?.Customer_District_Name || 'N/A'},{parcel?.Customer_Area}</td>
                  <td className="p-3 border">{parcel.Customer_Name}</td>
                  <td className="p-3 border">{parcel.Store_Name}</td>
                  <td className="p-3 border">{parcel.Item_Type}</td>
                  <td className="p-3 border">{parcel.Parcel_Weight} kg</td>
                  <td className="p-3 border flex gap-2">
                    <button
                      onClick={() => setSelectedParcel(parcel)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                    >
                      View Details
                    </button>
                    {/* <button
                      onClick={() => handleEdit(parcel)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                    >
                      Edit
                    </button> */}
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
      {selectedParcel && (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full overflow-hidden">
      {/* Modal Header */}
      <div className="flex items-center justify-between bg-blue-600 p-4">
        <h2 className="text-xl font-semibold text-white">Parcel Details</h2>
        <button
          onClick={() => setSelectedParcel(null)}
          className="text-white text-2xl font-bold hover:text-gray-300"
        >
          &times;
        </button>
      </div>

      {/* Modal Content */}
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-700">
          <p><strong>Customer Name:</strong> {selectedParcel.Customer_Name}</p>
          <p><strong>Phone:</strong> {selectedParcel.Customer_Contact_Number}</p>
          <p><strong>Address:</strong> {selectedParcel.Customer_Address}</p>
          <p><strong>District:</strong> {selectedParcel.Customer_District_Name || 'N/A'}</p>
          <p><strong>Area:</strong> {selectedParcel.Customer_Area}</p>
          <p><strong>Store:</strong> {selectedParcel.Store_Name}</p>
          <p><strong>Parcel Weight:</strong> {selectedParcel.Parcel_Weight} kg</p>
          <p><strong>Total Collection:</strong> ৳ {selectedParcel.Total_Collection_Amount}</p>
          <p><strong>Service Type:</strong> {selectedParcel.Service_Type}</p>
          <p><strong>Item Type:</strong> {selectedParcel.Item_Type}</p>
          <p><strong>Product Value:</strong> ৳ {selectedParcel.Product_Value}</p>
          <p><strong>Product Details:</strong> {selectedParcel.Product_Details}</p>
          <p><strong>Product Remark:</strong> {selectedParcel.Product_Remark}</p>
          <p><strong>COD Percentage:</strong> {selectedParcel.Cod_Perchent} %</p>
          <p><strong>Weight Charge:</strong> ৳ {selectedParcel.Weight_Charge}</p>
          <p><strong>Delivery Charge:</strong> ৳ {selectedParcel.Delivary_Charge}</p>
          <p><strong>Total Charge:</strong> ৳ {selectedParcel.Total_Charge}</p>
          <p><strong>Date:</strong> {formatDate(selectedParcel.Date)}</p>
        </div>
      </div>

      {/* Modal Footer */}
      <div className="flex justify-end bg-blue-200 p-4">
        {/* <button
          onClick={() => setSelectedParcel(null)}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          
        </button> */}
      </div>
    </div>
  </div>
)}

      {/* Modal for Editing Parcel */}
      {isEdit && selectedParcel && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Edit Parcel</h2>
            <input
              type="text"
              className="border p-2 mb-2 rounded w-full"
              defaultValue={selectedParcel.Customer_Name}
              onChange={(e) => setSelectedParcel({ ...selectedParcel, Customer_Name: e.target.value })}
            />
            <input
              type="number"
              className="border p-2 mb-2 rounded w-full"
              defaultValue={selectedParcel.Parcel_Weight}
              onChange={(e) => setSelectedParcel({ ...selectedParcel, Parcel_Weight: parseFloat(e.target.value) })}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleSave(selectedParcel)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
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
