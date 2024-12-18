import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useUsersData from "../../../../hooks/useUsersData/useUsersData";
import axiosSecure from "../../../../api/axiosSecure";

const SelectMotherHub = () => {
  const [verifiedUser] = useUsersData();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showSelectBranchModal, setShowSelectBranchModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [note, setNote] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  // Fetching data
  const { data: Verify_Admin_MotherHub = [] } = useQuery({
    queryKey: ["Verify_Admin_MotherHub", verifiedUser?.email],
    enabled: !!verifiedUser?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/package/email/${verifiedUser?.email}`);
      return Array.isArray(res.data) ? res.data : [res.data];
    },
  });

  const handleAccept = async (pkgId) => {
    // Backend call to accept package
    await axiosSecure.post(`/package/accept/${pkgId}`);
    alert("Package accepted!");
  };

  const handleSelectBranch = async () => {
    if (!selectedBranch || !note) {
      alert("Please fill in all fields!");
      return;
    }

    // Backend call to select branch
    await axiosSecure.post(`/package/select-branch`, {
      packageId: selectedPackage._id,
      branch: selectedBranch,
      note,
    });
    alert("Destination branch selected successfully!");
    setShowSelectBranchModal(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Package Details</h1>
      {Array.isArray(Verify_Admin_MotherHub) && Verify_Admin_MotherHub.length > 0 ? (
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
                <td className="border border-blue-500 px-4 py-2 flex flex-col md:flex-row gap-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => handleAccept(pkg._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => {
                      setSelectedPackage(pkg);
                      setShowSelectBranchModal(true);
                    }}
                  >
                    Select Dest. Branch
                  </button>
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
      ) : (
        <div>No packages found!</div>
      )}

      {/* Modal for Viewing Package */}
      {showViewModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2">
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Select Destination Branch</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Branch Name:</label>
              <input
                type="text"
                className="border border-gray-300 p-2 w-full rounded"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
              />
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
