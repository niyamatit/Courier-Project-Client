import Swal from "sweetalert2";
import useUsersData from "../../../../hooks/useUsersData/useUsersData";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../../api/axiosSecure";


const DeliverySchedule = () => {
  const [verifiedUser] = useUsersData();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showSelectBranchModal, setShowSelectBranchModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [note, setNote] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  // Single state for combined search (contact numbers and CN number)
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");


  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get("/shfjksdhfjdjkfhxnbcnbc67437gch");
      return res.data;
    }
  });

  const { data: Verify_Admin_MotherHub = [], refetch } = useQuery({
    queryKey: ["Verify_Admin_MotherHub", verifiedUser?.email],
    enabled: !!verifiedUser?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/offline/email/Branch/${verifiedUser?.email}`);
      return Array.isArray(res.data) ? res.data : [res.data];
    },
  });

  const handleAccept = async (pkgId) => {
    try {
      await axiosSecure.post(`/offline/accept/parcel/${pkgId}`);
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
        await axiosSecure.post(`/offline/select-MotherHub/branch/${selectedPackage._id}`, {
          Tracking_Booking_Branch_Select_MotherHub: selectedBranch,
        Tracking_Booking_Branch_Select_MotherHub_Note: note,
        Tracking_Booking_Branch_Select_MotherHub_Date: new Date()
      });
      Swal.fire({
        icon: "success",
        title: "MotherHub Branch Selected",
        text: "MotherHub Branch has been successfully selected!",
      });
      refetch()
      setShowSelectBranchModal(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to select the rider. Please try again.",
      });
    }
  };

  // Filtering logic
  const filteredParcels = Verify_Admin_MotherHub.filter(pkg => {
    // Convert search query to lowercase for case-insensitive search
    const lowerCaseSearchQuery = searchQuery.toLowerCase().trim();

    // Check if sender/receiver contact or CN number includes the search query
    const matchesSearchQuery = 
      pkg.senderContactNo.toLowerCase().trim().includes(lowerCaseSearchQuery) || 
      pkg.receiverContactNo.toLowerCase().trim().includes(lowerCaseSearchQuery) || 
      pkg.CnNumber.toLowerCase().trim().includes(lowerCaseSearchQuery);
    
    const bookingDate = new Date(pkg.bookingDate);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const matchesDateRange = 
      (!start || bookingDate >= start) &&
      (!end || bookingDate <= end);

    return matchesSearchQuery && matchesDateRange;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Offline Parcels of {verifiedUser?.name}</h1>

      {/* Search and Filter Section */}
      <div className="mb-4 flex justify-between  items-center">
        <input 
          type="text" 
          placeholder="Search by Contact No. or CN Number" 
          className="border border-blue-400 focus:ring-blue-500 focus:border-blue-500 p-2 rounded-md shadow-sm md:w-[70%] "
          value={searchQuery.trim()}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
       <div>
 <label className="text-gray-700">
          Start Date:
          <input 
            type="date" 
            className="border border-blue-400 focus:ring-blue-500 focus:border-blue-500 p-2 rounded-md ml-2 shadow-sm"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label className="text-gray-700">
          End Date:
          <input 
            type="date" 
            className="border border-blue-400 focus:ring-blue-500 focus:border-blue-500 p-2 rounded-md ml-2 shadow-sm"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>


       </div>
      </div>


      {Array.isArray(filteredParcels) && filteredParcels.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-blue-500 w-full text-sm md:text-base">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border border-blue-500 px-4 py-2">SL</th>
                <th className="border border-blue-500 px-4 py-2">Date</th>
                <th className="border border-blue-500 px-4 py-2">Sender Name</th>
                <th className="border border-blue-500 px-4 py-2">Recipient Name</th>
                <th className="border border-blue-500 px-4 py-2">Sender Mobile</th>
                <th className="border border-blue-500 px-4 py-2">Recipient Mobile</th>
                <th className="border border-blue-500 px-4 py-2">Product Details</th>
                <th className="border border-blue-500 px-4 py-2">CN Number</th>
                <th className="border border-blue-500 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredParcels.map((pkg, idx) => (
                <tr key={pkg._id} className="hover:bg-blue-100">
                  <td className="border border-blue-500 px-4 py-2">{idx + 1}</td>
                  <td className="border border-blue-500 px-4 py-2">
                    {new Date(pkg.bookingDate).toLocaleDateString()}
                  </td>
                  <td className="border border-blue-500 px-4 py-2">{pkg.senderName}</td>
                  <td className="border border-blue-500 px-4 py-2">{pkg.receiverName}</td>
                  <td className="border border-blue-500 px-4 py-2">{pkg.senderContactNo}</td>
                  <td className="border border-blue-500 px-4 py-2">{pkg.receiverContactNo}</td>
                  <td className="border border-blue-500 px-4 py-2">{pkg.product}</td>
                  <td className="border border-blue-500 px-4 py-2">{pkg.CnNumber}</td>
                  <td className="border border-blue-500 px-4 py-2 flex flex-wrap gap-2">
                  {pkg?.Tracking_Booking_Branch_Received_Parcel ? (
  <h1 className="text-green-600 border border-green-600 p-1 rounded-md text-sm">Accepted</h1>
) : (
  <button
    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md text-sm transition duration-200"
    onClick={() => handleAccept(pkg._id)}
  >
    Accept
  </button>
)}

{pkg?.Tracking_Booking_Branch_Received_Parcel ? (
  pkg?.Tracking_Booking_Branch_Select_MotherHub ? (
    <h1 className="text-blue-600 border border-blue-600 p-1 rounded-md text-sm">
      Already Selected
    </h1>
  ) : (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md text-sm transition duration-200"
      onClick={() => {
        setSelectedPackage(pkg);
        setShowSelectBranchModal(true);
      }}
    >
      Select MotherHub
    </button>
  )
) : (
  <button className="bg-gray-400 text-white px-2 py-1 rounded-md text-sm cursor-not-allowed">
    Accept First
  </button>
)}

<button
  className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-md text-sm transition duration-200"
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
        <div className="text-gray-600 text-lg mt-4">No packages found matching your criteria.</div>
      )}

      {/* Modal for Viewing Package */}
      {showViewModal && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform scale-95 transition-transform duration-200 ease-out">
          <h2 className="text-2xl font-bold mb-4 text-blue-700 border-b pb-2">Package Details</h2>
          <ul className="list-none p-0 space-y-2 text-gray-800">
            {selectedPackage && Object.entries(selectedPackage).map(([key, value]) => (
              <li key={key} className="flex items-start">
                <strong className="min-w-[120px] capitalize text-blue-600 mr-2">{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> 
                <span className="flex-1">
                  {key.includes("Date") && value ? new Date(value).toLocaleDateString() : (typeof value === 'object' && value !== null ? JSON.stringify(value) : value)}
                </span>
              </li>
            ))}
          </ul>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mt-6 shadow-md transition duration-200"
            onClick={() => setShowViewModal(false)}
          >
            Close
          </button>
        </div>
      </div>
      
      )}

      {/* Modal for Selecting Branch */}
      {showSelectBranchModal && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg transform scale-95 transition-transform duration-200 ease-out">
            <h2 className="text-2xl font-bold mb-4 text-blue-700 border-b pb-2">Select MotherHub</h2>
            <div className="mb-4">
              <label htmlFor="branch-select" className="block text-gray-700 font-bold mb-2">Select MotherHub Branch:</label>
              <select
                id="branch-select"
                className="border border-blue-400 focus:ring-blue-500 focus:border-blue-500 p-2 w-full rounded-md shadow-sm"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
              >
                <option value="">Select MotherHub Branch</option>
                {users
                  .filter(
                    (user) => user?.role === "host"  
                  )
                  .map((user) => (
                    <option key={user._id} value={user?.email}>
                      {`${user?.name || "No Name Found"} (${user?.email})`}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="note-textarea" className="block text-gray-700 font-bold mb-2">Note:</label>
              <textarea
                id="note-textarea"
                className="border border-blue-400 focus:ring-blue-500 focus:border-blue-500 p-2 w-full rounded-md shadow-sm resize-y min-h-[80px]"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note for the MotherHub branch..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition duration-200"
                onClick={handleSelectBranch}
              >
                Submit
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition duration-200"
                onClick={() => setShowSelectBranchModal(false)}
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

export default DeliverySchedule;
