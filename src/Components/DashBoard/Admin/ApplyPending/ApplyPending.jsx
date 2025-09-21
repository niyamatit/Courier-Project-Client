import axiosSecure from "../../../../api/axiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Modal from "./Modal"; 
import Swal from "sweetalert2";

const ApplyPending = () => {
  const queryClient = useQueryClient();
  const { data: pendings = [], isLoading } = useQuery({
    queryKey: ["pendings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/hdfjkshfjjkcxcbmbxbcb1");
      return res.data;
    },
  });

  const [selectedDetails, setSelectedDetails] = useState(null);
  const [note, setNote] = useState("");

  const handleViewDetails = (details) => {
    setSelectedDetails(details);
    setNote(details.Note || ""); // Load existing note if any
  };

  const handleSaveNote = async () => {
    try {
      await axiosSecure.patch(`/hdfjkshfjjkcxcbmbxbcb1/${selectedDetails._id}`, {
        Note: note,
      });

      // Update local cache to reflect new note
      queryClient.setQueryData(["pendings"], (oldData) =>
        oldData.map((item) =>
          item._id === selectedDetails._id ? { ...item, Note: note } : item
        )
      );

      alert("Note saved successfully!");
      setSelectedDetails({ ...selectedDetails, Note: note });
    } catch (error) {
      console.error(error);
      alert("Failed to save note.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold font-rancho text-center text-blue-600 mb-4">
        Apply Pending
      </h1>
      {isLoading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : pendings.length === 0 ? (
        <p className="text-center text-gray-600">No pending applications.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-blue-300">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="border border-blue-300 px-4 py-2">SL</th>
                <th className="border border-blue-300 px-4 py-2">Apply Date</th>
                <th className="border border-blue-300 px-4 py-2">Image</th>
                <th className="border border-blue-300 px-4 py-2">Customer Name</th>
                <th className="border border-blue-300 px-4 py-2">Company Name</th>
                <th className="border border-blue-300 px-4 py-2">Contact</th>
                <th className="border border-blue-300 px-4 py-2">District</th>
                <th className="border border-blue-300 px-4 py-2">Apply For</th>
                <th className="border border-blue-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendings.map((pending, index) => (
                <tr
                  key={pending._id}
                  className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}
                >
                  <td className="border border-blue-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-blue-300 px-4 py-2">{pending.Date}</td>
                  <td className="border border-blue-300 px-4 py-2">
                    <img
                      src={pending.Customer_Image}
                      alt="Customer Image"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="border border-blue-300 px-4 py-2">{pending.Customer_Name}</td>
                  <td className="border border-blue-300 px-4 py-2">{pending.Company_Name}</td>
                  <td className="border border-blue-300 px-4 py-2">{pending.Customer_Contact_Number}</td>
                  <td className="border border-blue-300 px-4 py-2">{pending.Customer_District_Name}</td>
                  <td className="border border-blue-300 px-4 py-2">{pending.Customer_Apply_For}</td>
                  <td className="border border-blue-300 px-4 py-2">
                    <button
                      onClick={() => handleViewDetails(pending)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedDetails && (
        <Modal
          title="Application Details"
          onClose={() => setSelectedDetails(null)}
        >
          <div className="text-gray-700 ">
            <p><strong>Customer Name:</strong> {selectedDetails.Customer_Name}</p>
            <p><strong>Contact:</strong> {selectedDetails.Customer_Contact_Number}</p>
            <p><strong>Email:</strong> {selectedDetails.Customer_Email}</p>
            <p><strong>Father's Name:</strong> {selectedDetails.Customer_Father_Name}</p>
            <p><strong>Mother's Name:</strong> {selectedDetails.Customer_Mother_Name}</p>
            <p><strong>Current Address:</strong> {selectedDetails.Customer_Current_Address}</p>
            <p><strong>Permanent Address:</strong> {selectedDetails.Customer_Permanant_Address}</p>
            <p><strong>Date of Birth:</strong> {selectedDetails.Customer_Date_Of_Birth}</p>
            <p><strong>Marital Status:</strong> {selectedDetails.Customer_Married_Status}</p>
            <p><strong>District:</strong> {selectedDetails.Customer_District_Name}</p>
            <p><strong>Area:</strong> {selectedDetails.Customer_Area}</p>
            <p><strong>Applied For:</strong> {selectedDetails.Customer_Apply_For}</p>
            <p><strong>Company Name:</strong> {selectedDetails.Company_Name}</p>
            <p><strong>TIN/BIN:</strong> {selectedDetails.TIN_BIN}</p>
            <p><strong>Reference:</strong> {selectedDetails.Reference}</p>
            <p><strong>Business Address:</strong> {selectedDetails.Business_Address}</p>
            <p><strong>Date:</strong> {selectedDetails.Date}</p>

            {/* Editable Note */}
            <div className="mt-4">
              <label className="block font-semibold mb-1">Note:</label>
              <textarea
                className="w-full border border-gray-300 rounded p-2"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
              />
              <button
                onClick={async () => {
                  try {
                    await axiosSecure.patch(`/hdfjkshfjjkcxcbmbxbcb1/${selectedDetails._id}`, { Note: note });
                     Swal.fire({
    icon: "success",
    title: "Saved!",
    text: "Note saved successfully!",
    timer: 2000,
    showConfirmButton: false,
  });
                    setSelectedDetails({ ...selectedDetails, Note: note });
                  } catch (err) {
                    console.error(err);
                    Swal.fire({
    icon: "error",
    title: "Failed!",
    text: "Failed to save note",
  });
                  }
                }}
                className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
              >
                Save Note
              </button>
            </div>

            <div className="mt-4 ml-5 grid grid-cols-2 gap-4">
              <div>
                <p><strong>Customer Images:</strong></p>
                <img src={selectedDetails.Customer_Image} alt="Customer" className="w-64 h-64 rounded mt-2" />
              </div>
              <div>
                <p><strong>NID Front:</strong></p>
                <img src={selectedDetails.NID_Front_Image} alt="NID Front" className="w-64 h-64 rounded mt-2" />
              </div>
              <div>
                <p><strong>NID Back:</strong></p>
                <img src={selectedDetails.NID_Back_Image} alt="NID Back" className="w-64 h-64 rounded mt-2" />
              </div>
              <div>
                <p><strong>Trade License:</strong></p>
                <img src={selectedDetails.TradeLicense_Image} alt="Trade License" className="w-64 h-64 rounded mt-2" />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ApplyPending;
