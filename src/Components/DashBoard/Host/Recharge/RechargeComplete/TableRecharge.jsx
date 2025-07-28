import { useEffect, useState } from "react";
import axiosSecure from "../../../../../api/axiosSecure";
import useUsersData from "../../../../../hooks/useUsersData/useUsersData";
import axios from "axios";


const TableRecharge = ({ recharge, refetch }) => {
  const [status, setStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [note, setNote] = useState('');
  const [amount, setAmount] = useState('');
  const [verifiedUser] = useUsersData();  
  useEffect(() => {
    console.log(recharge?.Status);
    if (!status) {
      setStatus(recharge?.Status || "processing");
    }
  }, [recharge]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    openModal(); // Open modal when status changes
  };


  const handleModalSubmit = async () => {
    try {
      // Step 1: Update the recharge details using a PUT request
      const updateResponse = await axiosSecure.put(`/recharge/${recharge._id}`, {
        Status: status,
        Note: note,
        Amount: amount,
        Branch_Email: recharge?.Branch_Email,
        Branch_Name: recharge?.Branch_Name,
        Account_Name: recharge?.Account_Name,
        Branch_Request_Amount:recharge?.Branch_Request_Amount,
        Date: new Date(),
        Accept_Account_Email: verifiedUser?.email,
        Accept_Account_Name: verifiedUser?.name,
        Account_Number: recharge?.Account_Number,
        Branch_Request_Note: recharge?.Recharge_Note,
        done: 'done',
        
      });
  
      console.log('Update Response:', updateResponse.data);
  
      // Step 2: If the status is "cancel", delete the data
      if (status === "cancel" || status == "accept") {
        const deleteResponse = await axiosSecure.delete(`/recharge/${recharge._id}`);
        
        const { data } = await axiosSecure.post(`/history`, {
          Total_Amount_Branch: recharge?.Amount || 'N/A',
          Branch_Email:recharge?.Branch_Email,
          Branch_Name:recharge?.Branch_Name,
          Account_Name: recharge?.Account_Name,
          Branch_Request_Amount:parseFloat(recharge?.Branch_Request_Amount),
          Branch_Number:recharge?.Branch_Number || 'N/A',
          Amount_Now_Added:parseFloat(amount),
          Status:`Amount Added By Admin Through Branch Request (Name: ${verifiedUser?.name})`,
          Added_Admin_Name:verifiedUser?.name,
          Added_Admin_Email:verifiedUser?.email,
          Date: new Date(),
          Note:note,
          isRechargeComplete: true
          
         
      });
       // ============================================SMS=======================================
             // Step 5: Send SMS using BulkSMSBD
const SMS_API = "https://bulksmsbd.net/api/smsapi";
const API_KEY = "VSkytluAnQbG0vsCEbHQ";
const SENDER_ID = "8809617624950";

// Build message
const senderMessage = `Dear ${recharge?.Branch_Name}, your recharge request (A/C No: ${recharge?.Account_Number}) of ৳ ${amount} has been approved and added to your balance.

Thank you for choosing Niyamat Express Courier & Parcel Service.

 
`;


// Build URLs
const senderUrl = `${SMS_API}?api_key=${API_KEY}&type=text&number=${Number(recharge?.Account_Number)}&senderid=${SENDER_ID}&message=${encodeURIComponent(senderMessage)}`;
// const receiverUrl = `${SMS_API}?api_key=${API_KEY}&type=text&number=${Number(recipientMobile)}&senderid=${SENDER_ID}&message=${encodeURIComponent(receiverMessage)}`;
      const [senderRes, receiverRes] = await Promise.all([
    axios.get(senderUrl),
    
  ]); 

  const MessageInfo = {
    senderMessage:senderMessage,
    
    SMS_Staus: {
      Sender: senderRes.data,
        Receiver: receiverRes.data  
    },
    senderMobile: recharge?.Account_Number,
    
    
    Purpuse: "Admin Approve Recharge Request of Branch",
    Branch_Email: verifiedUser?.email,
    Branch_Name: verifiedUser?.name,
    date : new Date().toISOString(),
}
const SMSResponse = await axiosSecure.post("/sms", MessageInfo);
        if (deleteResponse.status === 200) {
          console.log('Recharge successfully deleted.');
        }
      }
  
      // Refresh the data and close the modal
      refetch();
      closeModal();
    } catch (error) {
      console.error('Error in PUT/DELETE operations:', error.message);
    }
  };
  

  return (
    <>
      <tr className="font-rancho w-full">
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <div className='block relative'>
                <p className='text-gray-900 whitespace-no-wrap'>
                  {recharge?.Account_Name}
                </p>
              </div>
            </div>
          </div>
        </td>

        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>
            {recharge?.Account_Number}
          </p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>
            {recharge?.Branch_Request_Amount}
          </p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>
            {recharge?.Recharge_Note}
          </p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>
            <select onChange={handleStatusChange} value={status} className="focus:outline-none">
              <option value="processing">Processing</option>
              <option value="accept">Accepted</option>
              <option value="cancel">Cancel</option>
            </select>
          </p>
        </td>
      </tr>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">Update Recharge Details</h2>
            <label className="block mb-2">
              Note:
              <textarea
                className="w-full p-2 border rounded mt-1"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note"
              />
            </label>
            <label className="block mb-2">
              Amount:
              <input
                type="number"
                className="w-full p-2 border rounded mt-1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Add amount"
              />
            </label>
            <button
              onClick={handleModalSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600"
            >
              Submit
            </button>
            <button
              onClick={closeModal}
              className="text-gray-500 mt-2 hover:underline ml-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TableRecharge;
