import  { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useUsersData from "../../../../hooks/useUsersData/useUsersData";
import axiosSecure from "../../../../api/axiosSecure";
import Swal from "sweetalert2";

const SelectMotherHub = () => {
  const [verifiedUser] = useUsersData();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showSelectBranchModal, setShowSelectBranchModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [note, setNote] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    }
  });

  const { data: Verify_Admin_MotherHub = [], refetch } = useQuery({
    queryKey: ["Verify_Admin_MotherHub", verifiedUser?.email],
    enabled: !!verifiedUser?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/package/email/${verifiedUser?.email}`);
      return Array.isArray(res.data) ? res.data : [res.data];
    },
  });

  

  const handleAccept = async (pkgId) => {
    try {
      await axiosSecure.post(`/package/accept/${pkgId}`);
      Swal.fire({
        icon: "success",
        title: "Parcel Accepted",
        text: "The parcel has been successfully accepted!",
      });
      refetch();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to accept the package. Please try again.",
      });
    }
  };

  const handleSelectBranch = async () => {
    if (!selectedBranch || !note) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Information",
        text: "Please fill in both the branch and the note!",
      });
      return;
    }

    try {
      await axiosSecure.post(`/package/select-branch/${selectedPackage._id}`, {
        Tracking_MotherHub_Branch_Select_Dest_Branch_Name: selectedBranch,
        Tracking_MotherHub_Branch_Note: note,
        Tracking_MotherHub_Branch_Select_Dest_Branch_Date: new Date()
      });
      Swal.fire({
        icon: "success",
        title: "Branch Selected",
        text: "The destination branch has been successfully selected!",
      });
      setShowSelectBranchModal(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to select the branch. Please try again.",
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Package Details</h1>
      {Array.isArray(Verify_Admin_MotherHub) && Verify_Admin_MotherHub.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-blue-500 w-full text-sm md:text-base">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="border border-blue-500 px-4 py-2">SL</th>
                <th className="border border-blue-500 px-4 py-2">Date</th>
                <th className="border border-blue-500 px-4 py-2">Sender Name</th>
                <th className="border border-blue-500 px-4 py-2">Recipient Name</th>
                <th className="border border-blue-500 px-4 py-2">Sender Mobile</th>
                <th className="border border-blue-500 px-4 py-2">Recipient Mobile</th>
                <th className="border border-blue-500 px-4 py-2">Product Details</th>
                <th className="border border-blue-500 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Verify_Admin_MotherHub.map((pkg, idx) => (
                <tr key={pkg._id} className="hover:bg-blue-100">
                  <td className="border border-blue-500 px-4 py-2">{idx + 1}</td>
                  <td className="border border-blue-500 px-4 py-2">
                    {new Date(pkg.booking).toLocaleDateString()}
                  </td>
                  <td className="border border-blue-500 px-4 py-2">{pkg.senderName}</td>
                  <td className="border border-blue-500 px-4 py-2">{pkg.recipientName}</td>
                  <td className="border border-blue-500 px-4 py-2">{pkg.senderMobile}</td>
                  <td className="border border-blue-500 px-4 py-2">{pkg.recipientMobile}</td>
                  <td className="border border-blue-500 px-4 py-2">{pkg.productDetails}</td>
                  <td className="border border-blue-500 px-4 py-2 flex flex-wrap gap-2">
                    {pkg?.Tracking_MotherHub_Received_Parcel ? (
                      <h1 className="text-green-500 border p-1 border-green-500">Accepted</h1>
                    ) : (
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded"
                        onClick={() => handleAccept(pkg._id)}
                      >
                        Accept
                      </button>
                    )}
                    {pkg?.Tracking_MotherHub_Branch_Select_Dest_Branch_Name ? (
                      <h1 className="text-green-500 border p-1 border-green-500">
                        Already Selected Dest. Branch
                      </h1>
                    ) : (
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => {
                          setSelectedPackage(pkg);
                          setShowSelectBranchModal(true);
                        }}
                      >
                        Select Dest. Branch
                      </button>
                    )}
                    <button
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                      onClick={() => {
                        setSelectedPackage(pkg);
                        setShowViewModal(true);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No packages found!</div>
      )}

      {/* Modal for Viewing Package */}
      {showViewModal && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Package Details</h2>
          <ul className="list-disc pl-6">
            {Object.entries(selectedPackage).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            onClick={() => setShowViewModal(false)}
          >
            Close
          </button>
        </div>
      </div>
      
      )}

      {/* Modal for Selecting Branch */}
      {showSelectBranchModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Select Destination Branch</h2>
            <div className="mb-4">
              <label className="block mb-1">Branch:</label>
              <select
                className="border p-2 w-full"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
              >
                <option value="">Select Destination Branch</option>
                {users
                  .filter((user) => user?.role === "host")
                  .map((user) => (
                    <option key={user._id} value={user?.email}>
                      {`${user?.name || "No Name Found"} (${user?.email})`}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Note:</label>
              <textarea
                className="border border-gray-300 p-2 w-full rounded"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleSelectBranch}
            >
              Submit
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setShowSelectBranchModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectMotherHub;
