import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axiosSecure from "../../../../../api/axiosSecure";
import useAuth from "../../../../../hooks/useAuth";
import useUsersData from "../../../../../hooks/useUsersData/useUsersData";
import axios from "axios";


const RechargeApply = () => {
    const [verifiedUser] = useUsersData();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // const onSubmit = (data) => {
    //     console.log(data);
    // };

    const onSubmit = async (data) => {

        const ApplyRechargeInformation = {
            Account_Name: data?.accountName || "",
            Branch_Email: verifiedUser?.email || "",
            Branch_Name: verifiedUser?.name || "",
            Account_Number: data?.accountNumber || "",
            Branch_Request_Amount: data?.accountAmount || "",
            Recharge_Note: data?.rechargenote || "",
            Mobile_Number: data?.mobile_Number || "",
            Date: new Date().toISOString().split('T')[0],
            Status: "processing",
            update: "recharge"
        };

        const ApplyRechargeInfo = await axiosSecure.post("/recharge", ApplyRechargeInformation);

        if (ApplyRechargeInfo.data.insertedId) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Account Added Successfully",
                showConfirmButton: false,
                timer: 1500,
            });

            // ============================================SMS=======================================
             // Step 5: Send SMS using BulkSMSBD
const SMS_API = "http://bulksmsbd.net/api/smsapi";
const API_KEY = "VSkytluAnQbG0vsCEbHQ";
const SENDER_ID = "8809617624950";

// Build message
const senderMessage = `Dear ${verifiedUser?.name}, Your recharge request (A/C No: ${data?.accountNumber}) is successful.

Recharge Amount: ৳${data?.accountAmount} is waiting for waiting for admin approval.

Thank you for choosing Niyamat Express Courier & Parcel Service.
 
`;


// Build URLs
const senderUrl = `${SMS_API}?api_key=${API_KEY}&type=text&number=${Number(data?.accountNumber)}&senderid=${SENDER_ID}&message=${encodeURIComponent(senderMessage)}`;
// const receiverUrl = `${SMS_API}?api_key=${API_KEY}&type=text&number=${Number(recipientMobile)}&senderid=${SENDER_ID}&message=${encodeURIComponent(receiverMessage)}`;
      const [senderRes, receiverRes] = await Promise.all([
    axios.get(senderUrl),
    
  ]); 
        }
    };

    return (
        <div className=" bg-gradient-to-r from-gray-200 to-gray-200">
            <h2 className="font-bold text-xl text-blue-900 p-6">Recharge Apply</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 text-gray-600">
                <div className="border border-gray-300 p-8 bg-[#f0f3f7]">
                    <div>

                        {/* account Name */}
                        <div className="field mt-2">
                            <label htmlFor="account Name:" className="block mb-2">
                                Account Name
                            </label>
                            <InputText
                                id="accountName"
                                {...register("accountName", { required: "account Name is required" })}
                                className="w-full p-inputtext"
                            />
                            {errors.accountName && (
                                <span className="text-red-500">{errors.accountName.message}</span>
                            )}
                        </div>
                       

                        {/* account Number */}
                        <div className="col-span-2 md:col-span-2 lg:col-span-1">
                            <label className="block font-medium mb-1">
                                Account Number*
                            </label>
                            <input
                                type="text"
                                {...register('accountNumber', { required: true })}
                                className={`input input-bordered w-full p-2 rounded-lg border ${errors.accountNumber ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.accountNumber && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>


                        {/* amount */}
                        <div className="field mt-2">
                            <label htmlFor="account amount:" className="block mb-2">
                                Request amount
                            </label>
                            <InputText
                                id="accountAmount"
                                {...register("accountAmount", { required: "account amount is required" })}
                                className="w-full p-inputtext"
                            />
                            {errors.accountamount && (
                                <span className="text-red-500">{errors.accountamount.message}</span>
                            )}
                        </div>
                        {/* Mobile Number */}
                        {/* <div className="field mt-2">
                            <label htmlFor="account amount:" className="block mb-2">
                                Mobile Number
                            </label>
                            <InputText
                                id="mobile_Number"
                                {...register("mobile_Number", { required: "account amount is required" })}
                                className="w-full p-inputtext"
                                minLength={11}
                                maxLength={11}
                            />
                            {errors.mobile_Number && (
                                <span className="text-red-500">{errors.mobile_Number.message}</span>
                            )}
                        </div> */}
                        {/* recharge note */}
                        <div className="field mt-2">
                            <label htmlFor="recharge note:" className="block mb-2">
                                Recharge note
                            </label>
                            <InputText
                                id="rechargenote"
                                {...register("rechargenote", { required: "recharge note is required" })}
                                className="w-full p-inputtext"
                            />
                            {errors.rechargeNote && (
                                <span className="text-red-500">{errors.rechargeNote.message}</span>
                            )}
                        </div>

                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex mt-4 w-full justify-center">
                    <Button
                        label="Submit"
                        type="submit"
                        className="p-button-success border pl-6 pr-6 font-semibold text-white bg-[#2196F3] p-4 rounded-lg"
                    />
                </div>
            </form>
        </div>
    );
};

export default RechargeApply;