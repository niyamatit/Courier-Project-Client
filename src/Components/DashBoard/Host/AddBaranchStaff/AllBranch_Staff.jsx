import axiosSecure from "../../../../api/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Modal from "../../Admin/ApplyPending/Modal";


const AllBranch_Staff = () => {
  const { data: branchStaffs = [], isLoading } = useQuery({
    queryKey: ["branchStaffs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staffkdgfdjhksgfjhkdjkjkfhfjk");
      return res.data;
    },
  });

  const [selectedDetails, setSelectedDetails] = useState(null);

  const handleViewDetails = (details) => {
    setSelectedDetails(details);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold font-rancho text-center text-blue-600 mb-4">
        Apply Pending
      </h1>
      {isLoading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : branchStaffs.length === 0 ? (
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
                {/* <th className="border border-blue-300 px-4 py-2">Email</th> */}
                <th className="border border-blue-300 px-4 py-2">District</th>
                {/* <th className="border border-blue-300 px-4 py-2">Role</th> */}
                <th className="border border-blue-300 px-4 py-2">Apply For</th>
                
                <th className="border border-blue-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {branchStaffs.map((pending, index) => (
                <tr
                  key={pending._id}
                  className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}
                >
                  <td className="border border-blue-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-blue-300 px-4 py-2">{pending.Date}</td>
                  <td className="border border-blue-300 px-4 py-2"><img
            src={pending.Customer_Image}
            alt="Customer Image"
            className="w-12 h-12 rounded-full object-cover"
          /></td>
                  <td className="border border-blue-300 px-4 py-2">{pending.Customer_Name}</td>
                  <td className="border border-blue-300 px-4 py-2">{pending.Company_Name}</td>
                  <td className="border border-blue-300 px-4 py-2">{pending.Customer_Contact_Number}</td>
                  {/* <td className="border border-blue-300 px-4 py-2">{pending.Customer_Email}</td> */}
                  <td className="border border-blue-300 px-4 py-2">{pending.Customer_District_Name}</td>
                  {/* <td className="border border-blue-300 px-4 py-2">{pending.Role}</td> */}
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
            {/* <p><strong>Role:</strong> {selectedDetails.Role}</p> */}
            <p><strong>Date:</strong> {selectedDetails.Date}</p>
            <div className="mt-4 ml-5  grid grid-cols-2 gap-4">
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

export default AllBranch_Staff;
