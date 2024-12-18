import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useUsersData from "../../../../hooks/useUsersData/useUsersData";
import axiosSecure from "../../../../api/axiosSecure";

const SelectMotherHub = () => {
  const [verifiedUser] = useUsersData();
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Fetching data
  const { data: Verify_Admin_MotherHub = [] } = useQuery({
    queryKey: ['Verify_Admin_MotherHub', verifiedUser?.email],
    enabled: !!verifiedUser?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/package/email/${verifiedUser?.email}`);
      return Array.isArray(res.data) ? res.data : [res.data];
    }
  })

  console.log("Email",Verify_Admin_MotherHub)

  // Handle loading and error states
//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading data!</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Package Details</h1>
      {Array.isArray(Verify_Admin_MotherHub) && Verify_Admin_MotherHub.length > 0 ? (
        <table className="table-auto border-collapse border border-gray-400 w-full">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">SL</th>
              <th className="border border-gray-400 px-4 py-2">Date</th>
              <th className="border border-gray-400 px-4 py-2">Sender Name</th>
              <th className="border border-gray-400 px-4 py-2">Recipient Name</th>
              <th className="border border-gray-400 px-4 py-2">Sender Mobile</th>
              <th className="border border-gray-400 px-4 py-2">Recipient Mobile</th>
              <th className="border border-gray-400 px-4 py-2">Product Details</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Verify_Admin_MotherHub.map((pkg, idx) => (
              <tr key={pkg._id}>
                <td className="border border-gray-400 px-4 py-2">{idx + 1}</td>
                <td className="border border-gray-400 px-4 py-2">
                  {new Date(pkg.booking).toLocaleDateString()}
                </td>
                <td className="border border-gray-400 px-4 py-2">{pkg.senderName}</td>
                <td className="border border-gray-400 px-4 py-2">{pkg.recipientName}</td>
                <td className="border border-gray-400 px-4 py-2">{pkg.senderMobile}</td>
                <td className="border border-gray-400 px-4 py-2">{pkg.recipientMobile}</td>
                <td className="border border-gray-400 px-4 py-2">{pkg.productDetails}</td>
                <td className="border border-gray-400 px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => setSelectedPackage(pkg)}
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

      {/* Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
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
              onClick={() => setSelectedPackage(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectMotherHub;
