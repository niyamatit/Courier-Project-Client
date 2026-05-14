import Swal from "sweetalert2";
import useUsersData from "../../../../hooks/useUsersData/useUsersData";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../../api/axiosSecure";


const OnlineSchedule = () => {
const [verifiedUser] = useUsersData();
const [selectedPackage, setSelectedPackage] = useState(null);
const [showSelectBranchModal, setShowSelectBranchModal] = useState(false);
const [showViewModal, setShowViewModal] = useState(false);
const [note, setNote] = useState("");
const [selectedBranch, setSelectedBranch] = useState("");
const [searchTerm, setSearchTerm] = useState("");
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 100;
const [selectedParcels, setSelectedParcels] = useState([]);
const [selectAll, setSelectAll] = useState(false);
  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get("/shfjksdhfjdjkfhxnbcnbc67437gch");
      return res.data;
    }
  });
  const { data: Verify_Admin_MotherHub = [], refetch , isLoading } = useQuery({
    queryKey: ["Verify_Admin_MotherHub", verifiedUser?.email],
    // Only enable this query if verifiedUser.email exists
    enabled: !!verifiedUser?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/pacfkagetuinvnmxbnc422445/${verifiedUser?.email}`);
      // Ensure the response is always an array
      return Array.isArray(res.data) ? res.data : [res.data];
    },
  });
  const handleAccept = async (pkgId) => {
    try {
      await axiosSecure.post(`/online/accept/parcel/${pkgId}`);
      Swal.fire({
        icon: "success",
        title: "Parcel Accepted",
        text: "The parcel has been successfully accepted!",
      });
      refetch(); // Refetch data to update the UI
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to accept the package. Please try again.",
      });
    }
  };
  const handleSelectBranch = async () => {
    // Validate that both branch and note are filled
    if (!selectedBranch || !note) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Information",
        text: "Please fill in both the branch and the note!",
      });
      return;
    }

    try {
      // Send a POST request to select the MotherHub branch
      await axiosSecure.post(`/online/select-MotherHub/branch/${selectedPackage._id}`, {
        Tracking_Admin_Select_Online_MotherHub_Branch_email: selectedBranch,
        Tracking_Admin_Select_Online_MotherHub_Branch_Note: note,
        Tracking_Admin_Select_Online_MotherHub_Branch_Date: new Date() 
      });
      Swal.fire({
        icon: "success",
        title: "MotherHub Branch Selected",
        text: "MotherHub Branch has been successfully selected!",
      });
      refetch(); 
      setShowSelectBranchModal(false); 
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to select MotherHub branch. Please try again.",
      });
    }
  };
const filteredPackages = Verify_Admin_MotherHub.filter((pkg) => {
    // Check if the package matches the search term (CN Number or mobile numbers)
    const matchesSearch =
      searchTerm === "" ||
      pkg.CnNumber.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) ||
      pkg.recipientMobile.trim().includes(searchTerm.trim()) ||
      pkg.senderMobile.trim().includes(searchTerm.trim());
    // Parse package booking date and filter dates
    const packageDate = new Date(pkg.booking);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    // Check if the package date falls within the selected date range
    const matchesDate =
      (!start || packageDate >= start) && (!end || packageDate <= end);

    return matchesSearch && matchesDate;
});
const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
const paginatedData = filteredPackages.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);
const getPagination = () => {
  const pages = [];
  // const maxVisible = 5; 

  if (totalPages <= 7) {
    return [...Array(totalPages)].map((_, i) => i + 1);
  }
  pages.push(1);

  if (currentPage > 4) {
    pages.push("...");
  }
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  if (currentPage < totalPages - 3) {
    pages.push("...");
  }
  pages.push(totalPages);

  return pages;
};

// -------------------------Select All Parcel Section-------------------------

const handleSelectAll = () => {
  if (selectAll) {
    setSelectedParcels([]);
  } else {
    setSelectedParcels(paginatedData.map((pkg) => pkg._id));
  }

  setSelectAll(!selectAll);
};
const handleSelectParcel = (id) => {
  if (selectedParcels.includes(id)) {
    setSelectedParcels(
      selectedParcels.filter((parcelId) => parcelId !== id)
    );
  } else {
    setSelectedParcels([...selectedParcels, id]);
  }
};

const handleBulkAccept = async () => {
  if (selectedParcels.length === 0) {
    return Swal.fire({
      icon: "warning",
      title: "No Parcel Selected",
    });
  }

  try {
    await axiosSecure.post("/online/bulk/accept", {
      ids: selectedParcels,
    });

    Swal.fire({
      icon: "success",
      title: "All Parcels Accepted",
    });

    setSelectedParcels([]);
    setSelectAll(false);

    refetch();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Bulk Accept Failed",
    });
  }
};

const handleBulkMotherHub = async () => {
  if (!selectedBranch || !note) {
    return Swal.fire({
      icon: "warning",
      title: "Select Branch & Note",
    });
  }

  if (selectedParcels.length === 0) {
    return Swal.fire({
      icon: "warning",
      title: "No Parcel Selected",
    });
  }

  try {
    await axiosSecure.post("/online/bulk/select-motherhub", {
      ids: selectedParcels,
      Tracking_Admin_Select_Online_MotherHub_Branch_email: selectedBranch,
      Tracking_Admin_Select_Online_MotherHub_Branch_Note: note,
      Tracking_Admin_Select_Online_MotherHub_Branch_Date: new Date(),
    });

    Swal.fire({
      icon: "success",
      title: "MotherHub Assigned Successfully",
    });

    setSelectedParcels([]);
    setSelectAll(false);

    refetch();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Bulk MotherHub Failed",
    });
  }
};


if (isLoading) {
  return <div>Loading...</div>;
}


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Online Parcels of {verifiedUser?.name}</h1>
      <div className="mb-4 p-4  rounded-lg flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by CN Number or Mobile"
          className="p-2 border border-blue-500 rounded flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm.trim()}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="date"
            className="p-2 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="p-2 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-3 mb-4">

  <button
    onClick={handleBulkAccept}
    className="bg-green-500 text-white px-4 py-2 rounded"
  >
    Accept Selected
  </button>

  <button
    onClick={() => setShowSelectBranchModal(true)}
    className="bg-blue-500 text-white px-4 py-2 rounded"
  >
    Set MotherHub Selected
  </button>

</div>
      </div>
      {Array.isArray(filteredPackages) && filteredPackages.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-blue-500 w-full text-sm md:text-base">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="border px-4 py-2">
  <input
    type="checkbox"
    checked={selectAll}
    onChange={handleSelectAll}
  />
</th>
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
              {paginatedData.map((pkg, idx) => (
                <tr key={pkg._id} className={`hover:bg-blue-100 ${ pkg.Merchant_ID ? 'bg-green-100' : ''}`}>
                  <td className="border px-4 py-2">
  <input
    type="checkbox"
    checked={selectedParcels.includes(pkg._id)}
    onChange={() => handleSelectParcel(pkg._id)}
  />
</td>
                   <td className="border px-4 py-2">
  {(currentPage - 1) * itemsPerPage + idx + 1}
</td>
                  <td className="border border-blue-500 px-4 py-2">
                    {new Date(pkg.booking).toLocaleDateString()}
                  </td>
                  <td className="border border-blue-500 px-4 py-2">{pkg.senderName}</td>
                  <td className="border border-blue-500 px-4 py-2">{pkg.recipientName}</td>
                  <td className="border border-blue-500 px-4 py-2">{pkg.senderMobile}</td>
                  <td className="border border-blue-500 px-4 py-2">{pkg.recipientMobile}</td>
                  <td className="border border-blue-500 px-4 py-2">{pkg.productDetails}</td>
                  <td className="border border-blue-500 px-4 py-2">{pkg.CnNumber}</td>
                  <td className="border border-blue-500 px-4 py-2 flex flex-wrap gap-2">
                    {pkg?.Tracking_Online_Booking_Branch_Received_Parcel ? (
                      <h1 className="text-green-500 border p-1 border-green-500">Accepted</h1>
                    ) : (
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded"
                        onClick={() => handleAccept(pkg._id)}
                      >
                        Accept
                      </button>
                    )}
                    {pkg?.Tracking_Online_Booking_Branch_Received_Parcel ? (
                      pkg?.Tracking_Admin_Select_Online_MotherHub_Branch_email ? (
                        <h1 className="text-green-500 border p-1 border-green-500">
                          Already Selected
                        </h1>
                      ) : (
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                          onClick={() => {
                            setSelectedPackage(pkg);
                            setShowSelectBranchModal(true);
                          }}
                        >
                          Select MotherHub
                        </button>
                      )
                    ) : (
                      <button className="bg-gray-500 text-white px-2 py-1 rounded">
                        Accept First
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
      {showViewModal && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Package Details</h2>
            <ul className="list-disc pl-6">
              {/* Dynamically display all key-value pairs of the selected package */}
              {Object.entries(selectedPackage).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value)}
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
            <h2 className="text-2xl font-bold mb-4">Select MotherHub</h2>
            <div className="mb-4">
              {/* Dropdown for selecting MotherHub Branch */}
              <select
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
              >
                <option value="">Select MotherHub Branch</option>
                {/* Filter users to only show those with 'host' role */}
                {users
                  .filter(
                    (user) =>
                      user?.role === "host"
                  )
                  .map((user) => (
                    <option key={user._id} value={user?.email}>
                      {`${user?.name || "No Name Found"} (${user?.email})`}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Note:</label>
              {/* Textarea for adding a note */}
              <textarea
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            {/* <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={handleSelectBranch}
            >
              Submit
            </button> */}
            <button
  className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
  onClick={() => {
    if (selectedParcels.length > 0) {
      handleBulkMotherHub();
    } else {
      handleSelectBranch();
    }
  }}
>
  Submit
</button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              onClick={() => setShowSelectBranchModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-center mt-4 space-x-2 flex-wrap">
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
  >
    Prev
  </button>

  {getPagination().map((page, index) =>
    page === "..." ? (
      <span key={index} className="px-2 py-1">
        ...
      </span>
    ) : (
      <button
        key={index}
        onClick={() => setCurrentPage(page)}
        className={`px-3 py-1 rounded ${
          currentPage === page
            ? "bg-blue-500 text-white"
            : "bg-gray-200"
        }`}
      >
        {page}
      </button>
    )
  )}

  <button
    onClick={() =>
      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    }
    disabled={currentPage === totalPages}
    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
  >
    Next
  </button>
</div>
    </div>
  );
};

export default OnlineSchedule;
