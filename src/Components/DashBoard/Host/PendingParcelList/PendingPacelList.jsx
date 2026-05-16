import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useUsersData from "../../../../hooks/useUsersData/useUsersData";
import axiosSecure from "../../../../api/axiosSecure";

const PendingPacelList = () => {
  const [verifiedUser] = useUsersData();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showSelectBranchModal, setShowSelectBranchModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [note, setNote] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 100;
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedParcels, setSelectedParcels] = useState([]);
const [selectAll, setSelectAll] = useState(false);
  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get("/shfjksdhfjdjkfhxnbcnbc67437gch");
      return res.data;
    }
  });

  const { data: Verify_Admin_MotherHub_Online_Tracking = [], refetch , isLoading } = useQuery({
    queryKey: ["Verify_Admin_MotherHub_Online_Tracking", verifiedUser?.email],
    enabled: !!verifiedUser?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/package/email/Branch/${verifiedUser?.email}`);
      return Array.isArray(res.data) ? res.data : [res.data];
    },
  });

  const handleAccept = async (pkgId) => {
    try {
      await axiosSecure.post(`/package/accept/destination/${pkgId}`);
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
   const handleDelivery = async (pkgId) => {
    try {
      await axiosSecure.post(`/package/accept/destination/delivery/${pkgId}`);
      Swal.fire({
        icon: "success",
        title: "Parcel Deliveried",
        text: "The parcel has been successfully Deliveried!",
      });
      refetch();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to Deliveried the package. Please try again.",
      });
    }
  };
  const handleHold = async (pkgId) => {
    try {
      await axiosSecure.post(`/package/accept/destination/delivery/hold/${pkgId}`);
      Swal.fire({
        icon: "success",
        title: "Parcel Holded",
        text: "The parcel has been  Holded!",
      });
      refetch();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to Holded the package. Please try again.",
      });
    }
  };
  const handlReturn = async (pkgId) => {
    try {
      await axiosSecure.post(`/package/accept/destination/delivery/hold/return/${pkgId}`);
      Swal.fire({
        icon: "success",
        title: "Parcel Returned",
        text: "The parcel has been  Returned!",
      });
      refetch();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to Returned the package. Please try again.",
      });
    }
  };
  const handlExchange = async (pkgId) => {
    try {
      await axiosSecure.post(`/package/accept/destination/delivery/hold/return/Exchange/${pkgId}`);
      Swal.fire({
        icon: "success",
        title: "Parcel Exchanged",
        text: "The parcel has been  Exchanged!",
      });
      refetch();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to Exchanged the package. Please try again.",
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
      await axiosSecure.post(`/package/select-rider/rider/${selectedPackage._id}`, {
        Tracking_Destination_Branch_Select_Rider: selectedBranch,
        Tracking_Destination_Branch_Note: note,
        done:"done",
        Tracking_Destination_Branch_Select_Rider_Date: new Date()
      });
      Swal.fire({
        icon: "success",
        title: "Rider Selected",
        text: "The rider has been successfully selected!",
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
  const totalPages = Math.ceil(Verify_Admin_MotherHub_Online_Tracking.length / itemsPerPage);

const paginatedData = Verify_Admin_MotherHub_Online_Tracking.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);
const getPagination = () => {
  const pages = [];
  // const maxVisible = 5; // how many middle pages you want

  if (totalPages <= 7) {
    // show all if small
    return [...Array(totalPages)].map((_, i) => i + 1);
  }

  // always show first
  pages.push(1);

  if (currentPage > 4) {
    pages.push("...");
  }

  // middle pages
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 3) {
    pages.push("...");
  }

  // always show last
  pages.push(totalPages);

  return pages;
};

// ------------------------==Select All Handler--------------------------
const handleSelectAll = () => {
  if (selectAll) {
    setSelectedParcels([]);
  } else {
    setSelectedParcels(
      Verify_Admin_MotherHub_Online_Tracking.map((pkg) => pkg._id)
    );
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
  try {
    await axiosSecure.post("/package/bulk/accept/destination", {
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

const handleBulkDelivery = async () => {
  try {
    await axiosSecure.post("/package/bulk/delivery", {
      ids: selectedParcels,
    });

    Swal.fire({
      icon: "success",
      title: "All Parcels Delivered",
    });

    refetch();

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Bulk Delivery Failed",
    });
  }
};

const handleBulkHold = async () => {
  try {
    await axiosSecure.post("/package/bulk/hold", {
      ids: selectedParcels,
    });

    Swal.fire({
      icon: "success",
      title: "All Parcels Holded",
    });

    refetch();

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Bulk Hold Failed",
    });
  }
};

const handleBulkReturn = async () => {
  try {
    await axiosSecure.post("/package/bulk/return", {
      ids: selectedParcels,
    });

    Swal.fire({
      icon: "success",
      title: "All Parcels Returned",
    });

    refetch();

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Bulk Return Failed",
    });
  }
};

const handleBulkExchange = async () => {
  try {
    await axiosSecure.post("/package/bulk/exchange", {
      ids: selectedParcels,
    });

    Swal.fire({
      icon: "success",
      title: "All Parcels Exchanged",
    });

    refetch();

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Bulk Exchange Failed",
    });
  }
};

const handleBulkRider = async () => {

  if (!selectedBranch || !note) {
    return Swal.fire({
      icon: "warning",
      title: "Select Rider & Note",
    });
  }

  try {
    await axiosSecure.post("/package/bulk/select-rider", {
      ids: selectedParcels,
      Tracking_Destination_Branch_Select_Rider: selectedBranch,
      Tracking_Destination_Branch_Note: note,
      Tracking_Destination_Branch_Select_Rider_Date: new Date(),
      done: "done",
    });

    Swal.fire({
      icon: "success",
      title: "Rider Assigned",
    });

    setShowSelectBranchModal(false);

    setSelectedBranch("");
    setNote("");

    refetch();

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Bulk Rider Assign Failed",
    });
  }
};

// --------------------------------------Select All Handler End------------------------------------------
if (isLoading) {
  return <div>Loading...Please Wait....</div>;
}
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Select Rider For The Parcels {verifiedUser?.name}</h1>
      <div className="flex flex-wrap gap-2 mb-4">

  <button onClick={handleBulkAccept} className="bg-green-500 text-white px-3 py-2 rounded">
    Accept All
  </button>

  <button onClick={handleBulkDelivery} className="bg-blue-500 text-white px-3 py-2 rounded">
    Delivery All
  </button>

  <button onClick={handleBulkHold} className="bg-yellow-500 text-white px-3 py-2 rounded">
    Hold All
  </button>

  <button onClick={handleBulkReturn} className="bg-red-500 text-white px-3 py-2 rounded">
    Return All
  </button>

  <button onClick={handleBulkExchange} className="bg-purple-500 text-white px-3 py-2 rounded">
    Exchange All
  </button>

  <button
    onClick={() => setShowSelectBranchModal(true)}
    className="bg-indigo-500 text-white px-3 py-2 rounded"
  >
    Select Rider All
  </button>

</div>
      {Array.isArray(Verify_Admin_MotherHub_Online_Tracking) && Verify_Admin_MotherHub_Online_Tracking.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-blue-500 w-full text-sm md:text-base">
            <thead className="bg-blue-500 text-white">
              
              <tr>
                <th>
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
                {/* <th className="border border-blue-500 px-4 py-2">Sender Mobile</th> */}
                <th className="border border-blue-500 px-4 py-2">Recipient Mobile</th>
                <th className="border border-blue-500 px-4 py-2">Product Details</th>
                <th className="border border-blue-500 px-4 py-2">CN Number</th>
                <th className="border border-blue-500 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((pkg, idx) => (
                <tr key={pkg._id} className="hover:bg-blue-100">
                  <td>
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
                  {/* <td className="border border-blue-500 px-4 py-2">{pkg.senderMobile}</td> */}
                  <td className="border border-blue-500 px-4 py-2">{pkg.recipientMobile}</td>
                  <td className="border border-blue-500 px-4 py-2">{pkg.productDetails}</td>
                  <td className="border border-blue-500 px-4 py-2">{pkg.CnNumber}</td>
                  <td className="border border-blue-500 px-4 py-2 flex flex-wrap gap-2">
                    {pkg?.Tracking_Destination_Branch_Received_Parcel ? (
                      <h1 className="text-green-500 border p-1 border-green-500">Accepted</h1>
                    ) : (
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded"
                        onClick={() => handleAccept(pkg._id)}
                      >
                        Accept
                      </button>
                    )}
                    {
                      (!pkg?.done || pkg?.Tracking_Destination_Branch_Delivery_Parcel) &&
                      (pkg?.Tracking_Destination_Branch_Delivery_Parcel ? (
                        <h1 className="text-green-500 border p-1 border-green-500">Deliveried</h1>
                      ) : (
                        <button
                          className="bg-green-500 text-white px-2 py-1 rounded"
                          onClick={() => handleDelivery(pkg._id)}
                        >
                          Delivery
                        </button>
                      ))
                    }

                    {
                     ( !pkg?.done || pkg?.Tracking_Destination_Branch_Hold_Parcel) && (pkg?.Tracking_Destination_Branch_Hold_Parcel ? (
                        <h1 className="text-yellow-500 border p-1 border-green-500">Holded</h1>
                      ) : (
                        <button
                          className="bg-yellow-500 text-white px-2 py-1 rounded"
                          onClick={() => handleHold(pkg._id)}
                        >
                          Hold
                        </button>
                      ))
                    }
                    {
                      (!pkg?.done || pkg?.Tracking_Destination_Branch_Returned_Parcel) && (pkg?.Tracking_Destination_Branch_Returned_Parcel ? (
                        <h1 className="text-red-500 border p-1 border-green-500">Returned</h1>
                      ) : (
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() => handlReturn(pkg._id)}
                        >
                          Return
                        </button>
                      ))
                    }
                   {
                    (!pkg?.done || pkg?.Tracking_Destination_Branch_Exchanged_Parcel) &&  (pkg?.Tracking_Destination_Branch_Exchanged_Parcel ? (
                      <h1 className="text-yellow-500 border p-1 border-green-500">Exchanged</h1>
                    ) : (
                      <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                        onClick={() => handlExchange(pkg._id)}
                      >
                        Exchange
                      </button>
                    ))
                   }
                    {
                      (!pkg?.done || pkg?.Tracking_Destination_Branch_Select_Rider) && (pkg?.Tracking_Destination_Branch_Select_Rider ? (
                        <h1 className="text-green-500 border p-1 border-green-500">
                          Already Selected Rider
                        </h1>
                      ) : (
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                          onClick={() => {
                            setSelectedPackage(pkg);
                            setShowSelectBranchModal(true);
                          }}
                        >
                          Select Rider
                        </button>
                      ))
                    }
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
            <h2 className="text-2xl font-bold mb-4">Select Rider</h2>
            <div className="mb-4">
              <label className="block mb-1">Rider:</label>
              <select
                className="border p-2 w-full"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
              >
                <option value="">Select Destination Branch</option>
                {users
                  .filter(
                    (user) =>
                      user?.role === "rider" && user?.Rider_Branch === verifiedUser?.name
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

export default PendingPacelList;
