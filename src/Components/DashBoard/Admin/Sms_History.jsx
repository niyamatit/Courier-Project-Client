import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../api/axiosSecure";
import { useState, useEffect } from "react";
import moment from "moment"; // For date manipulation

const Sms_History = () => {
  const [todaySmsCount, setTodaySmsCount] = useState(0);
  const [selectedSms, setSelectedSms] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filterStatus, setFilterStatus] = useState("all"); // New state for status filter

  const { data: SMS_History = [], refetch: refetchSMS } = useQuery({
    queryKey: ['SMS_History'],
    queryFn: async () => {
      const res = await axiosSecure.get("/sms");
      return res.data;
    }
  });

  useEffect(() => {
    if (SMS_History.length > 0) {
      const today = moment().format('YYYY-MM-DD');
      const count = SMS_History.filter(sms =>
        moment(sms.date).format('YYYY-MM-DD') === today
      ).length;
      setTodaySmsCount(count);
    }
  }, [SMS_History]);

  const handleViewDetails = (sms) => {
    setSelectedSms(sms);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSms(null);
  };

  // Function to determine SMS status
  // Function to determine SMS status
const getSmsOverallStatus = (sms) => {
  // Check if both SMS statuses exist and have the expected structure
  const senderResponseCode = sms.SMS_Staus?.Sender?.response_code;
  const receiverResponseCode = sms.SMS_Staus?.Receiver?.response_code;

  return senderResponseCode === 202 || receiverResponseCode === 202
    ? "success"
    : "failed";
};


  // Filtered SMS history based on search term and status
  const filteredSmsHistory = SMS_History
  .filter((sms) => sms.senderMobile) 
  .filter((sms) => {
    const matchesSearchTerm =
      (String(sms.recipientMobile || '').toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
      (String(sms.senderMobile || '').toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
      (String(sms.CnNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) || '');

    const smsStatus = getSmsOverallStatus(sms);
    const matchesFilterStatus =
      filterStatus === 'all' || smsStatus === filterStatus;

    return matchesSearchTerm && matchesFilterStatus;
  });



  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">SMS History</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-blue-700">Total SMS Sent</h2>
          <p className="text-3xl font-bold text-blue-900">{filteredSmsHistory.length}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-blue-700">Today's SMS</h2>
          <p className="text-3xl font-bold text-blue-900">{todaySmsCount}</p>
        </div>
      </div>

      {/* Search and Filter Inputs */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by CN Number, Sender Mobile, or Recipient Mobile..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-5 py-3 border-b-2 border-blue-700 text-left text-sm font-semibold uppercase tracking-wider">
                SL
              </th>
              <th className="px-5 py-3 border-b-2 border-blue-700 text-left text-sm font-semibold uppercase tracking-wider">
                Date
              </th>
              <th className="px-5 py-3 border-b-2 border-blue-700 text-left text-sm font-semibold uppercase tracking-wider">
                CN Number
              </th>
              <th className="px-5 py-3 border-b-2 border-blue-700 text-left text-sm font-semibold uppercase tracking-wider">
                Purpose
              </th>
              <th className="px-5 py-3 border-b-2 border-blue-700 text-left text-sm font-semibold uppercase tracking-wider">
                Sender Mobile
              </th>
              <th className="px-5 py-3 border-b-2 border-blue-700 text-left text-sm font-semibold uppercase tracking-wider">
                Recipient Mobile
              </th>
              <th className="px-5 py-3 border-b-2 border-blue-700 text-left text-sm font-semibold uppercase tracking-wider">
                Branch Name
              </th>
              <th className="px-5 py-3 border-b-2 border-blue-700 text-left text-sm font-semibold uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 border-b-2 border-blue-700 text-left text-sm font-semibold uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSmsHistory.length > 0 ? (
              filteredSmsHistory.map((sms, index) => (
                <tr
                  key={sms._id}
                  className={`${
                    getSmsOverallStatus(sms) === "success"
                      ? "bg-green-100 hover:bg-green-100"
                      : "bg-red-100 hover:bg-red-100"
                  } odd:bg-opacity-75 even:bg-opacity-50`}
                >
                  <td className="px-5 py-5 border-b border-gray-200 text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm text-gray-900">
                    {moment(sms.date).format('DD MMMM YYYY hh:mm A')}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm text-gray-900">
                    {sms.CnNumber}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm text-gray-900">
                    {sms.Purpuse}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm text-gray-900">
                    {sms.senderMobile}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm text-gray-900">
                    {sms.recipientMobile || 'N/A'}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm text-gray-900">
                    {sms.Branch_Name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm text-gray-900">
                    {getSmsOverallStatus(sms) === "success" ? (
                      <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span aria-hidden="true" className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                        <span className="relative">Success</span>
                      </span>
                    ) : (
                      <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                        <span aria-hidden="true" className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                        <span className="relative">Failed</span>
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm text-gray-900">
                    <button
                      onClick={() => handleViewDetails(sms)}
                      className="text-blue-600 hover:text-blue-900 font-semibold"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-5 py-4 text-center text-gray-600">
                  No SMS records found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedSms && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-start justify-center z-50 overflow-y-auto py-4">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full shadow-xl">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">SMS Details</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>CN Number:</strong> {selectedSms.CnNumber}</p>
              <p><strong>Purpose:</strong> {selectedSms.Purpuse}</p>
              <p><strong>Sender Mobile:</strong> {selectedSms.senderMobile}</p>
              <p><strong>Recipient Mobile:</strong> {selectedSms.recipientMobile}</p>
              <p><strong>Branch Email:</strong> {selectedSms.Branch_Email}</p>
              <p><strong>Branch Name:</strong> {selectedSms.Branch_Name}</p>
              <p><strong>Date:</strong> {moment(selectedSms.date).format('YYYY-MM-DD HH:mm:ss')}</p>

              <h3 className="text-xl font-semibold mt-4 text-blue-700">Sender SMS Status:</h3>
              <p><strong>Response Code:</strong> {selectedSms.SMS_Staus.Sender.response_code}</p>
              <p><strong>Message ID:</strong> {selectedSms.SMS_Staus.Sender.message_id || 'N/A'}</p>
              <p><strong>Success Message:</strong> {selectedSms.SMS_Staus.Sender.success_message || 'N/A'}</p>
              <p><strong>Error Message:</strong> <span className="text-red-600">{selectedSms.SMS_Staus.Sender.error_message || 'N/A'}</span></p>

              <h3 className="text-xl font-semibold mt-4 text-blue-700">Receiver SMS Status:</h3>
              <p><strong>Response Code:</strong> {selectedSms.SMS_Staus.Receiver.response_code}</p>
              <p><strong>Message ID:</strong> {selectedSms.SMS_Staus.Receiver.message_id || 'N/A'}</p>
              <p><strong>Success Message:</strong> {selectedSms.SMS_Staus.Receiver.success_message || 'N/A'}</p>
              <p><strong>Error Message:</strong> <span className="text-red-600">{selectedSms.SMS_Staus.Receiver.error_message || 'N/A'}</span></p>

              <h3 className="text-xl font-semibold mt-4 text-blue-700">Messages:</h3>
              <p><strong>Sender Message:</strong> <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded">{selectedSms.senderMessage}</pre></p>
              <p><strong>Receiver Message:</strong> <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded">{selectedSms.receiverMessage}</pre></p>

            </div>
            <div className="mt-6 text-right">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sms_History;