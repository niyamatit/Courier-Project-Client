import { useForm } from "react-hook-form";
import axiosSecure from "../../../api/axiosSecure";
import useUsersData from "../../../hooks/useUsersData/useUsersData";
import Swal from "sweetalert2";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Merchant_recharge_apply = () => {
    const [verifiedUser, isLoading, refetch] = useUsersData(); // Assuming useUsersData returns refetch too
    const { register, handleSubmit, reset } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mobile, setMobile] = useState("");
     const {
    data: accounts = [],
   
  } = useQuery({
    queryKey: ["merchantAccounts", verifiedUser?.email],
    enabled: !!verifiedUser?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/merchant-accounts?email=${verifiedUser.email}`
      );
      return res.data;
    },
  });
   const onSubmit = async () => {
    if (verifiedUser?.Merchant_Balance < 0) return;

    try {
        setIsSubmitting(true);

        // PUT: Reset balance
        const putResponse = await axiosSecure.put(`/merchants/${verifiedUser._id}/balance`, {
            Merchant_Balance: 0
        });

        const putSuccess = putResponse?.data?.success === true;
        console.log("PUT response:", putResponse.data); // Debug log

        if (!putSuccess) {
            throw new Error("Balance reset failed. Aborting transaction.");
        }

        // POST: Log recharge application
        const postData = {
            ApplyAMount: verifiedUser?.Merchant_Balance || 0,
            merchantID: verifiedUser?.merchantID,
            Merchant_email: verifiedUser?.email,
            Merchant_Name: verifiedUser?.name,
            Mobile_Number: autoMobile,
            Account_Total_info: accounts,
            Note: `Apply Recharge ${verifiedUser?.name}`,
            transaction_date: new Date(),
            transaction_type: "recharge",
            status: "pending"
        };

        const postResponse = await axiosSecure.post("/apply_amount_merchant", postData);
        const postSuccess = postResponse?.data?.success === true;
        console.log("POST response:", postResponse.data); // Debug log

        if (!postSuccess) {
            throw new Error("Recharge log failed.");
        }

        // SUCCESS: Both operations succeeded
        Swal.fire({
            icon: "success",
            title: "Recharge Applied!",
            text: "Balance reset and transaction recorded successfully.",
        });
        reset();
        refetch();
          // Step 5: Send SMS using BulkSMSBD
const SMS_API = "https://bulksmsbd.net/api/smsapi";
const API_KEY = "VSkytluAnQbG0vsCEbHQ";
const SENDER_ID = "8809617624950";

// Build message
const senderMessage = `Dear ${verifiedUser?.name}, Your recharge request  is successful.
Recharge Amount: ৳${verifiedUser?.Merchant_Balance} is waiting for waiting for admin approval.

Thank you for choosing Niyamat Express Courier & Parcel Service.
 
`;


// Build URLs
const senderUrl = `${SMS_API}?api_key=${API_KEY}&type=text&number=${Number(autoMobile)}&senderid=${SENDER_ID}&message=${encodeURIComponent(senderMessage)}`;
// const receiverUrl = `${SMS_API}?api_key=${API_KEY}&type=text&number=${Number(recipientMobile)}&senderid=${SENDER_ID}&message=${encodeURIComponent(receiverMessage)}`;
      const [senderRes, receiverRes] = await Promise.all([
    axios.get(senderUrl),
    
  ]); 
  const MessageInfo = {
    senderMessage:senderMessage,
    
    SMS_Staus: {
      Sender: senderRes.data,
        Receiver: receiverRes?.data || '' || {}  
    },
    senderMobile: autoMobile,
    
    
    Purpuse: "Merchant Recharge Apply",
    Branch_Email: verifiedUser?.email,
    Branch_Name: verifiedUser?.name,
    date : new Date().toISOString(),
}
const SMSResponse = await axiosSecure.post("/sms", MessageInfo);

    } catch (error) {
        console.error("Recharge error:", error);
        Swal.fire({
            icon: "error",
            title: "Operation Failed",
            text: error.response?.data?.message || error.message || "Recharge could not be completed.",
        });
    } finally {
        setIsSubmitting(false);
    }
};



    if (isLoading) return <div className="text-center py-8">Loading merchant data...</div>;

    const isButtonDisabled = verifiedUser?.Merchant_Balance < 0 || verifiedUser?.Merchant_Balance <= 0 || isSubmitting;
const account = accounts?.[0]; // only one account allowed

const autoMobile =
  account?.personalNumber ||
  account?.accountNo ||
  "";

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
                    Merchant Recharge Application
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Current Balance */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Balance
                        </label>
                        <input
                            type="number"
                            value={verifiedUser?.Merchant_Balance || 0}
                            readOnly
                            className="w-full px-4 py-2 border border-blue-200 rounded-lg bg-gray-100"
                        />
                        {verifiedUser?.Merchant_Balance < 0 && (
                            <p className="text-red-500 text-sm mt-1">Balance is negative. Recharge not allowed.</p>
                        )}
                    </div>
                    <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Mobile Number
  </label>

  <input
    type="text"
    value={autoMobile}
    readOnly
    className="w-full px-4 py-2 border border-blue-200 rounded-lg bg-gray-100"
  />

  {!autoMobile && (
    <p className="text-red-500 text-sm mt-1">
      No mobile number found in account
    </p>
  )}
</div>


                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isButtonDisabled}
                        className={`w-full text-white py-3 rounded-lg transition-colors font-semibold ${
                            isButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {isSubmitting ? "Submitting..." : "Apply Recharge"}
                    </button>
                </form>

                <div className="mt-4 text-sm text-gray-600">
                    <p>Merchant ID: {verifiedUser?.merchantID}</p>
                    <p>District: {verifiedUser?.Merchant_District}</p>
                    <p>Branch: {verifiedUser?.Merchant_Branch || "N/A"}</p>
                </div>
            </div>
        </div>
    );
};

export default Merchant_recharge_apply;
