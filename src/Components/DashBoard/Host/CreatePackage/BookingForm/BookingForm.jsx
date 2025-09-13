import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import Section from "./Section";
import axiosSecure from "../../../../../api/axiosSecure";
import Swal from "sweetalert2";
import OfflinePrintModal from "./OfflinePrintModal";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import useUsersData from "../../../../../hooks/useUsersData/useUsersData";
import UseStaffVerify from "../../../../../hooks/UseStaffVerify/UseStaffVerify";
import axios from "axios";

const BookingForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const watchValues = watch();

  const [cnNumber, setCnNumber] = useState("");
  const [codCharge, setCodCharge] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(0);
  const [senderReceive, setSenderReceive] = useState(0);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [rate, setRate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [totalCharge, setTotalCharge] = useState(0);
  const [OtpCharge, setOthCharge] = useState(0);
  const [HDCharge, setHDCharge] = useState(0);
  const [senderContactNo, setSenderContactNo] = useState("");
  const [isManuallyEditing, setIsManuallyEditing] = useState(false);
  const [lot, setLot] = useState();
  const [PaymentOption , setSelectedPayment] = useState('');
  const [DeliveryStatusNumber , setForDeliveryContact] = useState('');
  const [DeliveryComplete , setDeliveryComplete] = useState(0);
  const [DeliveryPending , setDeliveryPending] = useState(0);
  const [Returned , setReturned] = useState(0);
  // const [receiverContactNo, setReceiverContactNo] = useState("");
  const [senderInfo, setSenderInfo] = useState({
    name: "",
    address: "",
  });
  const [receiverContactNo, setReceiverContactNo] = useState("");
  const [receiverInfo, setReceiverInfo] = useState({
    ReceiverName: "",
    ReceiverAddress: "",
  });
  const [verifiedStaff] = UseStaffVerify();
  const closeModal = () => {
    setIsOpen(false);
  };
  const queryClient = useQueryClient();

useEffect(()=>{

const fetchDeliveryRetrunData = async ()=>{
        try{
           const res = await axiosSecure.get(`/offline/for/search/${DeliveryStatusNumber}`)
           const data = res.data
           console.log(res.data,"res data");
        console.log(data,"data");
        console.log(DeliveryStatusNumber,"receiverContactNo2");
           const Total_Delivey_Complete = data.reduce((total, booking) => {
  if (booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Successful || booking?.Tracking_Rider_Offline_Booking_Delivary_Update) {
    return total + 1; 
  }
  return total; 
}, 0);
           const Total_Returned = data.reduce((total, booking) => {
  if (booking?.Tracking_Destination_Branch_Returned_Parcel || booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Returned) {
    return total + 1; 
  }
  
  return total; 
}, 0);

const DeliveryPending = data.length - (Total_Delivey_Complete + Total_Returned)

setDeliveryComplete(Total_Delivey_Complete)
setDeliveryPending(DeliveryPending)
setReturned(Total_Returned)
console.log(DeliveryComplete,"Delivery complete");
console.log(Returned,"retun complete");
console.log(DeliveryPending,"Delivery pending");

           console.log(data,"Receiver  Data");
        }catch(err){
console.log(err);
console.log(err.message,"error message");
        }
    }
fetchDeliveryRetrunData()

},[DeliveryStatusNumber,DeliveryComplete,Returned,receiverContactNo])


  useEffect(() => {
    if (!isManuallyEditing) {
      const validRate = parseFloat(rate) || 0;
      const validQuantity = parseFloat(quantity) || 0;
      const validOtpCharge = parseFloat(OtpCharge) || 0;
      const validHDCharge = parseFloat(HDCharge) || 0;
  
      const total = validRate * validQuantity + validOtpCharge + validHDCharge;
      setTotalCharge(total);
    }
  }, [rate, quantity, isManuallyEditing, OtpCharge, HDCharge]);
  







  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 10);
    setValue("bookingDate", currentDate);
  }, [setValue]);

  useEffect(() => {
    const fetchCnNumber = async () => {
      try {
        const response = await axiosSecure.get('/number');

        if (response.data && response.data?.length > 0 && response.data[0].CnNumber) {
          // Access the first item in the array and set the CnNumber
          setCnNumber(response.data[0].CnNumber);
        } else {
          console.error("CN Number not found in the response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching CN number:", error);
      }
    };

    fetchCnNumber();  // Call the function to fetch the CN number on mount
  }, []);
  
  useEffect(() => {
    if (codCharge > 0) {
      // Calculate service charge
      let calculatedServiceCharge = 20;
      if (codCharge > 1000) {
        const additionalCharge = Math.ceil((codCharge - 1000) / 1000) * 10;
        calculatedServiceCharge += additionalCharge;
      }
  
      const calculatedSenderReceive = codCharge - calculatedServiceCharge;
  
      setServiceCharge(calculatedServiceCharge);
      setSenderReceive(calculatedSenderReceive);
      setValue("serviceCharge", calculatedServiceCharge);
      setValue("senderReceive", calculatedSenderReceive);
    } else {
      setServiceCharge(0);
      setSenderReceive(0);
      setValue("serviceCharge", 0);
      setValue("senderReceive", 0);
    }
  }, [codCharge, setValue]);
  
  const handleSenderReceiveChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      // Reverse calculation
      let calculatedServiceCharge = 20;
  
      if (value > 980) { 
        const additionalCharge = Math.ceil((value - 980) / 990) * 10; 
        calculatedServiceCharge = (calculatedServiceCharge+additionalCharge);
      }
  
      const calculatedCodCharge =( value + calculatedServiceCharge);
     
      setCodCharge(calculatedCodCharge);
      setSenderReceive(value);
      
      setServiceCharge(calculatedServiceCharge);
  
      setValue("serviceCharge", calculatedServiceCharge);
      setValue("codCharge", calculatedCodCharge);
    } else {
      setSenderReceive(0);
      setCodCharge(0);
      setServiceCharge(0);
      setValue("serviceCharge", 0);
      setValue("codCharge", 0);
    }
  };
  
  
  
  const handleCodChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setCodCharge(isNaN(value) ? 0 : value);
  };
  

  
  

  const onSubmit = async (data) => {
    try {
      // If PaymentOption is "Cash", validate and update branch balance
      if (PaymentOption === "Cash") {
        if (!Array.isArray(Branch_Balance) || Branch_Balance.length === 0) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Branch balance data is not available. Please reload the page.",
          });
          return;
        }
  
        // Calculate the current and new balance
        const currentBalance = parseFloat(Branch_Balance[0]?.Amount || 0);
        const codAmount = parseFloat(data.totalCharge || totalCharge || 0);
        const newBalance = currentBalance - codAmount;
  
        if (codAmount > currentBalance) {
          Swal.fire({
            icon: "error",
            title: "Insufficient Balance",
            text: "You do not have enough balance to process this booking. Please recharge the balance.",
          });
          return;
        }
  
        // Update branch balance
        const updateBalanceResponse = await axiosSecure.put(
          `/update-branch-balance/taka/poisa/${verifiedUser?.email}`,
          { newBalance }
        );
  
        if (updateBalanceResponse.status !== 200) {
          throw new Error("Failed to update branch balance.");
        }
  
        // Invalidate cache to reflect updated balance
        queryClient.invalidateQueries(["Branch_Balance", verifiedUser?.email]);
      }
      
      // Build the booking info payload
      data.CnNumber = cnNumber;
      const Bookinginfo = {
        

        senderName: data.senderName || senderInfo.name,
        address: data.address || senderInfo.address,
        receiverName: data.receiverName || receiverInfo.ReceiverName,
        receiveraddress: data.receiveraddress || receiverInfo.ReceiverAddress,
        Destbranch: data.branch,
        email: verifiedUser?.email,
        Booking_Staff_Name:verifiedStaff?.Staff_Name,
        Booking_Staff_ID:verifiedStaff?.Staff_User_ID,
        Booking_Staff_Post:verifiedStaff?.Staff_post,
        Booking_Staff_Number:verifiedStaff?.Staff_Contact_Number,
        customerCode: data.customerCode,
        counter: data.counter,
        customerName: data.customerName,
        senderContactNo: data.senderContactNo,
        reference: data.reference,
        receiverContactNo: data.receiverContactNo,
        CnNumber: data.CnNumber,
        bookingDate: data.bookingDate,
        bookingBranch: data.bookingBranch,
        department: data.department,
        inputUser: data.inputUser,
        serviceType: data.serviceType,
        paymentMethod: data.paymentMethod,
        product: data.product,
        lot: data.lot,
        qty: data.qty,
        unit: data.unit,
        rate: data.rate,
        "H/D":data.hd,
        "Exchange":data.exchange,
        "O/D":data.od,

        totalCharge: data.totalCharge || totalCharge,
        hdCharge: data.hdCharge,
        othCharge: data.othCharge,
        receiverPay: data.receiverPay,
        serviceCharge: data.serviceCharge,
        senderReceive: data.senderReceive,
        Date: new Date().toISOString().split('T')[0],
        
        Branch_Name:verifiedUser?.name,
        Branch_Number:verifiedUser?.Branch_Number,
        Branch_Address:verifiedUser?.Branch_Address,
        Branch_District_Name:verifiedUser?.Branch_District_Name,
        Branch_Area:verifiedUser?.Branch_Area,
      };
  
      // Submit booking information
      const ParcelProductDetails = await axiosSecure.post("/offline", Bookinginfo);
  
       if (ParcelProductDetails.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Parcel Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
  
        // Increment the CN number
        const response = await axiosSecure.put("/number");
        setCnNumber(response.data.nextNumber);
        setBookingInfo(Bookinginfo);
        // Step 5: Send SMS using BulkSMSBD
   // Step 5: Send SMS using BulkSMSBD
const SMS_API = "https://bulksmsbd.net/api/smsapi";
const API_KEY = "VSkytluAnQbG0vsCEbHQ";
const SENDER_ID = "8809617624950";

// Build message
const senderMessage = `Your Parcel ${verifiedUser?.name} Booking (Trac: ${Bookinginfo.CnNumber}) is Successful.
Thanks Niyamat Express
For Tracking visit: https://www.niyamatexpress.com/tracking 
`;
// const senderMessage = `Your  booking is confirmed! CN Number: ${Bookinginfo.CnNumber}`;
const receiverMessage = `Your Parcel ${verifiedUser?.name} Booking (Trac: ${Bookinginfo.CnNumber}) is Successful.
Thanks Niyamat Express
For Tracking visit: https://www.niyamatexpress.com/tracking 
`;
// const receiverMessage = `Hello ${Bookinginfo.receiverName}, Your Parcel : ${bookingInfo?.product}, Your parcel booking (CN: ${Bookinginfo.CnNumber}) is successful.`;

// Build URLs
const senderUrl = `${SMS_API}?api_key=${API_KEY}&type=text&number=${Number(data?.senderContactNo)}&senderid=${SENDER_ID}&message=${encodeURIComponent(senderMessage)}`;
const receiverUrl = `${SMS_API}?api_key=${API_KEY}&type=text&number=${Number(data.receiverContactNo)}&senderid=${SENDER_ID}&message=${encodeURIComponent(receiverMessage)}`;
console.log(data?.senderContactNo, data.receiverContactNo, "Sender and Receiver Contact No."  );
try {
  const [senderRes, receiverRes] = await Promise.all([
    axios.get(senderUrl),
    axios.get(receiverUrl)
  ]);
  const MessageInfo = {
    senderMessage:senderMessage,
    receiverMessage:receiverMessage,
    SMS_Staus: {
      Sender: senderRes.data,
        Receiver: receiverRes.data  
    },
    senderMobile: data?.senderContactNo,
    recipientMobile: data.receiverContactNo,
    CnNumber: Bookinginfo.CnNumber,
    Purpuse: "Offline Booking",
    Branch_Email: verifiedUser?.email,
    Branch_Name: verifiedUser?.name,
    date : new Date().toISOString(),
}
const SMSResponse = await axiosSecure.post("/sms", MessageInfo);

  // Optional console for debug
  // console.log("SMS Response:", senderRes.data, receiverRes.data);

  if (senderRes.data?.error_message || receiverRes.data?.error_message) {
    const senderError = senderRes.data?.error_message || '';
    const receiverError = receiverRes.data?.error_message || '';
    
    Swal.fire({
      icon: "warning",
      title: "SMS Error",
      html: `<b>Sender SMS:</b> ${senderError}<br><b>Receiver SMS:</b> ${receiverError}`,
    });
  } else {
    console.log("SMS sent successfully");
  }
} catch (smsError) {
  console.error("SMS sending failed:", smsError);
  Swal.fire({
    icon: "error",
    title: "SMS Failed",
    text: "Failed to send SMS due to network or API issue.",
  });
}
      }
    } catch (error) {
      console.error("Error adding parcel:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while processing the booking.",
      });
    }
  
    setIsOpen(true); // Open the modal after successful submission
  };
  






  useEffect(() => {
    const fetchCustomerDetails = async () => {
      if (senderContactNo) {
        try {
          const response = await axiosSecure.get(`/offline/mahi/hossain/${senderContactNo}`);




          if (response.data && response.data?.length > 0) {

            const sortedData = response.data.sort((a, b) => {
              return parseInt(b.CnNumber.slice(-4)) - parseInt(a.CnNumber.slice(-4));
            });

            const latestData = sortedData[sortedData?.length - 1];
            console.log("Letest Data", latestData)
            setSenderInfo({
              name: latestData.senderName,
              address: latestData.address,
            });
          } else if (response.data) {

            setSenderInfo({
              name: response.data.senderName,
              address: response.data.address,
            });
          } else {

            setSenderInfo({ name: "", address: "" });
          }
        } catch (error) {
          console.error("Error fetching sender details:", error);
          setSenderInfo({ name: "", address: "" });
        }
      }
    };

    fetchCustomerDetails();
  }, [senderContactNo]);

  useEffect(() => {
    const fetchReceiverDetails = async () => {
      if (receiverContactNo) {
        try {
          const response = await axiosSecure.get(`/offline/receiver/${receiverContactNo}`);

          // Log the response to check its structure


          if (response.data && response.data?.length > 0) {

            const sortedData = response.data.sort((a, b) => {
              return parseInt(a.CnNumber.slice(-4)) - parseInt(b.CnNumber.slice(-4));
            });
            console.log("sorted data", (sortedData || 0))

            const latestData = sortedData[sortedData?.length - 1];
            console.log("letest data:", latestData)
            setReceiverInfo({
              ReceiverName: latestData.receiverName,
              ReceiverAddress: latestData.receiveraddress,
            });
          } else if (response.data) {

            setReceiverInfo({
              ReceiverName: response.data.receiverName,
              ReceiverAddress: response.data.receiveraddress,
            });
          } else {

            setReceiverInfo({ ReceiverName: "", ReceiverAddress: "" });
          }


          
        } catch (error) {
          console.error("Error fetching receiver details:", error);
          setReceiverInfo({ ReceiverName: "", ReceiverAddress: "" });
        }
      }
    };

    fetchReceiverDetails();
  }, [receiverContactNo]);




  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get("/shfjksdhfjdjkfhxnbcnbc67437gch");
      return res.data;
    }
  })
  const [verifiedUser] = useUsersData();
  // Amount 
  const { data: Branch_Balance = [] } = useQuery({
    queryKey: ['Branch_Balance', verifiedUser?.email],
    enabled: !!verifiedUser?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/recharge/taka/${verifiedUser?.email}`);
      return res.data;
    }
  })


  
  return (
    <div className="p-4 sm:p-8 md:p-8 bg-gradient-to-r from-gray-200 to-gray-200 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-6xl w-full mx-auto shadow-lg p-4 sm:p-6 md:p-6 bg-white rounded-lg border-[2px] border-blue-400"
      >
        <h1 className="text-xl sm:text-xl md:text-xl font-bold mb-4 sm:mb-6 md:mb-6 text-blue-700">
         Offline Booking
        </h1>
        <div className="grid lg:grid-cols-2 gap-2">
          <div>
            <Section>
              <div className="grid grid-cols-2 gap-2">
                <InputField
                  watchValues={watchValues}
                  register={register}
                  name={"customerCode"}
                  registerOptions={{ required: false }}
                  errors={errors}
                  label="Customer Code"
                  placeholder="customer code"

                />
                <SelectField
                  watchValues={watchValues}
                  register={register}
                  name={"counter"}
                  registerOptions={{ required: false }}
                  errors={errors}
                  label="Select Counter"
                  options={["Counter 1", "Counter 2", "Counter 3"]}
                />
              </div>
              <InputField
                watchValues={watchValues}
                register={register}
                name={"customerName"}
                registerOptions={{ required: false }}
                errors={errors}
                label="Customer Name"
                placeholder="customer name"

              />
            </Section>

            {/* Sender Information Section */}
            <Section title="Sender Information" additionalClasses="mt-6 mb-4">
              <InputField
                watchValues={watchValues}
                register={register}
                name={"senderContactNo"}
                registerOptions={{ required: true }}
                errors={errors}
                label="Contact No."
                placeholder="sender contact no."
                required
                onChange={(e) => setSenderContactNo(e.target.value)}
                type="number"
                //minLength={11}={11}
                minLength={11}

              />
              <InputField
                watchValues={watchValues}
                register={register}
                name={"senderName"}
                registerOptions={{ required: senderInfo.name ? false : true }}
                errors={errors}
                label="Name"
                placeholder="sender name"
                 defaultValue={senderInfo.name}
              />
              <InputField
                watchValues={watchValues}
                register={register}
                name="address"
                registerOptions={{ required: !senderInfo.address }}

                errors={errors}
                label="Address"
                placeholder="Sender Address"
                defaultValue={senderInfo.address || ""}
                required={!!senderInfo.address}
              />
            </Section>

            {/* Reference Section */}
            <Section>
              <InputField
                watchValues={watchValues}
                register={register}
                name={"reference"}
                errors={errors}
                label="Reference"
                placeholder="reference"

              />
              <div className="flex gap-2 mt-4">
  <input
    type="checkbox"
    className="checkbox mt-1"
    {...register("hd")} // Register for "H/D"
  />
  <h2 className="text-blue-800 font-semibold text-xl">H/D</h2>
  <input
    type="checkbox"
    className="checkbox mt-1"
    {...register("exchange")} // Register for "Exchange"
  />
  <h2 className="text-blue-800 font-semibold text-xl">Exchange</h2>
  <input
    type="checkbox"
    className="checkbox mt-1"
    {...register("od")} // Register for "Exchange"
  />
  <h2 className="text-blue-800 font-semibold text-xl">O/D</h2>
</div>

            </Section>
            <Section additionalClasses="mt-4">
              {/* <InputField
                watchValues={watchValues}
                register={register}
                name={"branch"}
                registerOptions={{ required: true }}
                errors={errors}
                label="Dest. Branch"
                placeholder=""
                required
              /> */}
              <div className="col-span-2 md:col-span-2 lg:col-span-1">
                <label className="label-text ml-1 text-gray-500 font-semibold">
                  Select Dest. Branch*
                </label>
                <select
                  {...register('branch', { required: true })}
                  className={`select select-bordered mt-2  bg-[#E8F0FE] text-black w-full p-2 rounded-lg border ${errors.branch ? 'border-red-500' : 'border-gray-300'
                    }`}
                  required
                >
                  <option value="123">Select Dest. Branch</option>
                  {
                    users.filter(user => user?.role === 'host').map(user => (
                      <option key={user._id} value={user?.name}>
                        {user?.name || "No Name Found"}
                      </option>
                    ))
                  }

                </select>
                {errors.select_branch_name && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </Section>

            {/* Receiver Information Section */}
            <Section title="Receiver Information" additionalClasses="mt-6">
              <InputField
                watchValues={watchValues}
                register={register}
                name={"receiverContactNo"}
                registerOptions={{ required: true }}
                errors={errors}
                label="Contact No."
                placeholder="receiver contact no."
               onChange={(e) => {
  setReceiverContactNo(e.target.value);
  setForDeliveryContact(e.target.value);
}}

                type="number"
                //minLength={11}={11}
                minLength={11}
              
              />
                {
   DeliveryStatusNumber.length > 10 &&
        <div className="flex gap-3 mt-1">
            <p className="text-green-500 mt-1"> Delivery Completed: {DeliveryComplete},</p>
        <p className="text-yellow-800 mt-1"> Delivery Pending: {DeliveryPending}</p>
        <p className="text-red-800 mt-1"> Returned: {Returned}</p>
        </div>
    
}
              <InputField
                watchValues={watchValues}
                register={register}
                name={"receiverName"}
                registerOptions={{
                  required: receiverInfo.ReceiverName ? false : true,
                }}
                errors={errors}
                label="Name"
                placeholder="receiver name"
                defaultValue={receiverInfo.ReceiverName}
              />
              <InputField
                watchValues={watchValues}
                register={register}
                name={"receiveraddress"}
                registerOptions={{
                  required: receiverInfo.ReceiverAddress ? false : true,
                }}
                errors={errors}
                label="Address"
                placeholder="receiver address"
                defaultValue={receiverInfo.ReceiverAddress}
              />
            </Section>
          </div>

          <div>
            {/* Booking Information Section */}
            <Section title="Booking Information">

              {/* <div className="grid grid-cols-2 gap-2">
                <InputField
                  watchValues={watchValues}
                  register={register}
                  name={"CnNumber"}
                  registerOptions={{ required: true }}
                  errors={errors}
                  label="CN Number"
                  placeholder="CN no."
                  required
                  value={cnNumber || 'Loading.....'}
                  className="w-full"
                  readOnly
                />
                <textarea
                  placeholder=""
                  className="textarea textarea-bordered textarea-sm mt-6 bg-[#f9f5f1] text-black w-full max-w-xs"
                ></textarea>
              </div> */}

              {/* Auto-generated booking date */}
              <InputField
                watchValues={watchValues}
                register={register}
                name={"bookingDate"}
                errors={errors}
                label="Booking Date"
                required
                readOnly
              />
              <InputField
                watchValues={watchValues}
                register={register}
                name={"bookingBranch"}
                registerOptions={{ required: true }}
                errors={errors}
                label="Booking Branch"
                placeholder="CRD"
                required
                value={verifiedUser?.name || "No Branch Name Found"}
                readOnly
              />
              <div className="grid grid-cols-2 gap-1">
                {/* <InputField
                  watchValues={watchValues}
                  register={register}
                  name={"department"}
                  registerOptions={{ required: true }}
                  errors={errors}
                  label="Department"
                  placeholder="Department name"
                  required
                /> */}
                <SelectField
                  watchValues={watchValues}
                  register={register}
                  name={"department"}
                  registerOptions={{ required: false }}
                  errors={errors}
                  label="Select Department"
                  options={["Document", "Parcel", "Food item", "Mobile/Laptop", "Electrical", "Home/Office Accessories"]}
                />
                {/* <InputField
                  watchValues={watchValues}
                  register={register}
                  name={"inputUser"}
                  registerOptions={{ required: true }}
                  errors={errors}
                  label="Input User"
                  placeholder="Input user"
                  required
                /> */}
                <SelectField
                  watchValues={watchValues}
                  register={register}
                  name={"inputUser"}
                  registerOptions={{ required: true }}
                  errors={errors}
                  label="Input User"
                  options={["New Customer", "Customer", "Merchant", "Corporate"]}
                />
                <SelectField
                  watchValues={watchValues}
                  register={register}
                  name={"serviceType"}
                  registerOptions={{ required: true }}
                  errors={errors}
                  label="Service Type"
                  options={["Regular delivery", "Express delivery"]}
                />
                {/* Payment Method Dropdown */}
                <SelectField
                  watchValues={watchValues}
                  register={register}
                  name={"paymentMethod"}
                  registerOptions={{ required: true }}
                  errors={errors}
                  label="Payment Method"
                  options={["Cash", "To Pay", "Credit"]}
                  onChange={(e) => {
                    // console.log("Selected value:", e.target.value); // Debugging log
                    setSelectedPayment(e.target.value);
                  }}
                  required
                />
              </div>
            </Section>
            {/* Product Section */}
            <Section title="Product" additionalClasses="mt-4">
              <div className="grid grid-cols-4 gap-2">
                <InputField
                  watchValues={watchValues}
                  register={register}
                  name={"product"}
                  registerOptions={{ required: true }}
                  errors={errors}
                  label="Product"
                  placeholder="product"
                  required
                  className="col-span-3"
                />
                <InputField
                  watchValues={watchValues}
                  register={register}
                  name={"lot"}
                  registerOptions={{ required: false }}
                  errors={errors}
                  label="LOT"
                  placeholder="lot"

                  readOnly
                  value={quantity

                  }
                  type="number"

                />
              </div>
              <div className="grid grid-cols-3 gap-1">
                <InputField
                  watchValues={watchValues}
                  register={register}
                  name={"qty"}
                  registerOptions={{ required: true }}
                  errors={errors}
                  label="Qty"
                  placeholder="quantity"
                  required


                  type="number"
                  onChange={(e) => {
                    setQuantity(e.target.value);
                    setIsManuallyEditing(false);
                  }}
                />
                <SelectField
                  watchValues={watchValues}
                  register={register}
                  name={"unit"}
                  registerOptions={{ required: true }}
                  errors={errors}
                  label="Unit"
                  placeholder="unit"
                  required
                  options={["Kg", "PCS", "Carton", "BOSTA"]}
                />
                <InputField
                  watchValues={watchValues}
                  register={register}
                  name={"rate"}
                  registerOptions={{ required: true }}
                  errors={errors}
                  label="Rate"
                  placeholder="rate"
                  required
                  type="number"
                  onChange={(e) => {
                    setRate(e.target.value);
                    setIsManuallyEditing(false);
                  }}

                />
                
               
                <InputField
                  watchValues={watchValues}
                  register={register}
                  name={"hdCharge"}
                  registerOptions={{ required: false }}
                  errors={errors}
                  label="H/D Charge"
                  placeholder="Home Delivery Charge"
                  type="number"
                  onChange={(e) => {
                    setHDCharge(e.target.value);
                    
                  }}

                />
                <InputField
                  watchValues={watchValues}
                  register={register}
                  name={"othCharge"}
                  registerOptions={{ required: false }}
                  errors={errors}
                  label="Oth. Charge"
                  placeholder="Other Charge"
                  type="number"
                  onChange={(e) => {
                    setOthCharge(e.target.value);
                    
                  }}

                />
                 <InputField
                  watchValues={watchValues}
                  register={register}
                  name={"TotalCharge"}
                  registerOptions={{
                    required: "This field is required",
                    validate: {
                      minValue: (value) => value >= 80 || "pay cannot be less than 80",
                    },
                  }}
                  errors={errors}
                  label="Total Charge"
                  placeholder="total charge"
                  required
                  type="number"
                  value={totalCharge}
                  onChange={(e) => {
                    setTotalCharge(e.target.value);
                    setIsManuallyEditing(true);
                  }}
                />
              </div>
            </Section>
            {/* COD Section */}
            <Section additionalClasses="mt-2">
    <div className="grid grid-cols-2 gap-2">
    <div>
    <InputField
  watchValues={watchValues}
  register={register}
  name={"receiverPay"}
  registerOptions={{
    required: "This field is required",
    // validate: {
    //   minValue: (value) => value >= 80 || "COD receiver pay cannot be less than 80",
    // },
  }}
  errors={errors}
  label="COD (Receiver will pay)"
  placeholder="Condition Amount"
  onChange={handleCodChange}
  value={codCharge}
/>
{/* Error Message */}
{errors.receiverPay && (
  <span className="error-text text-red-500 mt-1 text-sm">
    {errors.receiverPay.message}
  </span>
)}
    </div>

      <InputField
        watchValues={watchValues}
        register={register}
        name={"serviceCharge"}
        registerOptions={{ required: true }}
        errors={errors}
        label="COD Service charge"
        placeholder=""
        required
        value={serviceCharge}
        readOnly
      />
    </div>
    <InputField
      watchValues={watchValues}
      register={register}
      name={"senderReceive"}
      registerOptions={{ required: true }}
      errors={errors}
      label="Sender will receive"
      placeholder=""
      required
      onChange={handleSenderReceiveChange} 
      value={senderReceive} 
    />
  </Section>

            .
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-5 mt-2 justify-center">
          <button className="btn bg-[#E8F0FE]">Submit</button>
        </div>
      </form>
      <OfflinePrintModal
        closeModal={closeModal}
        isOpen={isOpen}
        bookingInfo={bookingInfo}
      />
    </div>
  );
};

export default BookingForm;
