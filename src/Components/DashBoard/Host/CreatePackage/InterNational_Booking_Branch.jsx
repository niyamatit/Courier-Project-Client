import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

import SelectField from "./BookingForm/SelectField";
import InputField from "./BookingForm/InputField";
import axiosSecure from "../../../../api/axiosSecure";
import Swal from "sweetalert2";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Section from "./BookingForm/Section";
import useUsersData from "../../../../hooks/useUsersData/useUsersData";
import UseStaffVerify from "../../../../hooks/UseStaffVerify/UseStaffVerify";

import InterNationalPrintModal_Branch from "./InterNationalPrintModal_Branch";
import axios from "axios";

const InterNational_Booking_Branch = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const watchValues = watch();
  const [countryId, setCountryId] = useState(null);
  const [stateId, setStateId] = useState(null);
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
  const [isManualTotal, setIsManualTotal] = useState(false);
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
  const [WeightPackage, setWeightPackage] = useState("");

  const [ServiceType, setServiceType] = useState("");
  const [ItemType, setItemType] = useState("");



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

        if (response.data && response.data?.length > 0 && response.data[0].Branch_Int_Booking_Cn_Number) {
          // Access the first item in the array and set the CnNumber
          setCnNumber(response.data[0].Branch_Int_Booking_Cn_Number);
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
        

        Customer_Name_Int: data.CustomerNameInt || senderInfo.name,
        Customer_address_Int: data.Customeraddress || senderInfo.address,
        Customer_Country_Name: data?.country?.name || "",
        Customer_Country_Currency: data?.country?.currency_name || "",
        Customer_Country_Capital_Name: data?.country?.capital || "",
        Customer_State: data?.state?.name || "",
        Customer_City: data?.city?.name || "",
        Sender_Contact_Number_Int: data.SenderContactINT || "",
        Sender_NID_Int: data.Sender_NID_INT || "",
        Sender_Purpose_Int: data.Sender_Purpose || "",
        Sender_Name_Int: data.Sender_Name_Int || receiverInfo.ReceiverName,
        Sender_Address_Int: data.Senderaddress_Int || receiverInfo.ReceiverAddress,
        Destbranch: data.branch,
        Additional_Info: data.addition_info,
        Tax_Number_Int:data?.TaxNumber || "",
        email: verifiedUser?.email,
        Booking_Staff_Name:verifiedStaff?.Staff_Name,
        Booking_Staff_ID:verifiedStaff?.Staff_User_ID,
        Booking_Staff_Post:verifiedStaff?.Staff_post,
        Booking_Staff_Number:verifiedStaff?.Staff_Contact_Number,
        Parcel_Weight: parseFloat(data?.weightPackage) || "",
        Total_Collection_Amount: parseFloat(data?.totalAmount) || "",
        Service_Type: data?.serviceType || "",
        Item_Type: data?.itemType || "",
        Product_Value: parseFloat(data?.productValue) || "",
        Product_Quantity: parseFloat(data?.productQuantity) || "",
        Product_Details: data?.productDetails || "",
        Product_Remark: data?.remark || "",
        Cod_Perchent: 0 || "",
        Weight_Charge: 0 || "",
        Cod_Charge: 0 || "",
        Delivary_Charge: 70 || "",
        Total_Charge: totalCharge || "",
       
        International_Parcel_Branch: "International_Branch",
        
        
        Customer_Contact_Number_Int: data.CustomerContactNo || "",
        
       
        CnNumber: data.CnNumber,
        bookingDate: data.bookingDate || "",
        bookingBranch: data.bookingBranch || "",
        department: data.department || "",
        inputUser: data.inputUser || "",
        serviceType: data.serviceType || "",
        paymentMethod: data.paymentMethod || "",
        product: data.product || "",
       

       
        Date: new Date().toISOString().split('T')[0],
        
        Branch_Name:verifiedUser?.name,
        Branch_Number:verifiedUser?.Branch_Number,
        Branch_Address:verifiedUser?.Branch_Address,
        Branch_District_Name:verifiedUser?.Branch_District_Name,
        Branch_Area:verifiedUser?.Branch_Area,
      };
  
      // Submit booking information
      const ParcelProductDetails = await axiosSecure.post("/int", Bookinginfo);
  
      if (ParcelProductDetails.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Parcel Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
  
        // Increment the CN number
        const response = await axiosSecure.put("/Branch/Int/CnNmber");
        setCnNumber(response.data.nextNumber);
        setBookingInfo(Bookinginfo);

        // ------------------------------------SMS------------------------------------------
          // Step 5: Send SMS using BulkSMSBD
const SMS_API = "https://bulksmsbd.net/api/smsapi";
const API_KEY = "VSkytluAnQbG0vsCEbHQ";
const SENDER_ID = "8809617624950";

// Build message
const senderMessage = `Your Parcel ${verifiedUser?.name} Booking (Tracking Number: ${data?.CnNumber}) is Successful.
Thanks Niyamat Express Courier and Parcel Service
For Tracking visit: https://www.niyamatexpress.com/tracking 
`;
// const senderMessage = `Your  booking is confirmed! CN Number: ${Bookinginfo.CnNumber}`;
// const receiverMessage = `Your Parcel ${verifiedUser?.name} Booking (Tracking Number: ${CnNumber}) is Successful.
// Thanks Niyamat Express Courier and Parcel Service
// For Tracking visit: https://www.niyamatexpress.com/tracking 
// `;
// const receiverMessage = `Hello ${Bookinginfo.receiverName}, Your Parcel : ${bookingInfo?.product}, Your parcel booking (CN: ${Bookinginfo.CnNumber}) is successful.`;

// Build URLs
const senderUrl = `${SMS_API}?api_key=${API_KEY}&type=text&number=${Number(data?.SenderContactINT)}&senderid=${SENDER_ID}&message=${encodeURIComponent(senderMessage)}`;
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
    senderMobile: Number(data?.SenderContactINT),
     Purpuse: "International Booking",
    CnNumber: data.CnNumber,
    Branch_Email: verifiedUser?.email,
    Branch_Name: verifiedUser?.name,
    date : new Date().toISOString(),
}
const SMSResponse = await axiosSecure.post("/sms", MessageInfo);
  
      }
    } catch (error) {
      console.error("Error adding parcel:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while processing the booking.",
      });
    }
  
    setIsOpen(true); 
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
        <h1 className="text-xl sm:text-xl md:text-3xl text-center font-bold mb-4 sm:mb-6 md:mb-6 text-blue-700">
         International Booking
        </h1>
        <div className="grid lg:grid-cols-2 gap-2">
          <div>
            

            {/* Sender Information Section */}
            <Section title="Customer Information" additionalClasses="mt-6 mb-4">
              <InputField
                watchValues={watchValues}
                register={register}
                name={"CustomerContactNo"}
                registerOptions={{ required: true }}
                errors={errors}
                label="Contact No."
                placeholder="Customer contact no."
                required
                onChange={(e) => setSenderContactNo(e.target.value)}
                type="number"
                //minLength={11}={11}
                minLength={11}

              />
              <InputField
                watchValues={watchValues}
                register={register}
                name={"CustomerNameInt"}
                registerOptions={{ required: senderInfo.name ? false : true }}
                errors={errors}
                label="Customer Name"
                placeholder="Enter Customer Name"
                 defaultValue={senderInfo.name}
              />
              <InputField
                watchValues={watchValues}
                register={register}
                name="Customeraddress"
                registerOptions={{ required: !senderInfo.address }}

                errors={errors}
                label="Customer Full Address"
                placeholder="Enter Customer Full Address"
                defaultValue={senderInfo.address || ""}
                required={!!senderInfo.address}
              />
              {/* Country Plugin */}
               <div className="col-span-2 md:col-span-2 lg:col-span-1">
  <label className="label-text block text-gray-500 font-semibold mt-2 mb-1">
    Country*
  </label>
  <CountrySelect
    onChange={(value) => {
      setCountryId(value?.id);
      setValue("country", value);
    }}
    className={`select select-bordered w-full p-2 rounded-lg border bg-[#E8F0FE] text-black ${
      errors.country ? "border-red-500" : "border-gray-300"
    }`}
    placeHolder="Select Country"
  />
  {errors.country && (
    <span className="text-red-500">This field is required</span>
  )}
</div>

<div className="col-span-2 md:col-span-2 lg:col-span-1">
  <label className="mt-2 label-text block text-gray-500 font-semibold mb-1">
    State*
  </label>
  <StateSelect
    countryid={countryId}
    onChange={(value) => {
      setStateId(value?.id);
      setValue("state", value);
    }}
    className={`select select-bordered w-full p-2 rounded-lg border bg-[#E8F0FE] text-black ${
      errors.state ? "border-red-500" : "border-gray-300"
    }`}
    placeHolder="Select State"
  />
  {errors.state && (
    <span className="text-red-500">This field is required</span>
  )}
</div>

<div className="col-span-2">
  <label className="mt-2 label-text block text-gray-500 font-semibold mb-1">
    City*
  </label>
  <CitySelect
    countryid={countryId}
    stateid={stateId}
    onChange={(value) => {
      setValue("city", value);
    }}
    className="select select-bordered w-full p-2 rounded-lg border bg-[#E8F0FE] text-black"
    placeHolder="Select City"
  />
  {errors.city && (
    <span className="text-red-500">This field is required</span>
  )}
</div>

            </Section>

            {/* Reference Section */}
            {/* <Section>
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

            </Section> */}
            {/* <Section additionalClasses="mt-4">
              
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
            </Section> */}

            {/* Sender Information Section */}
            <Section title="Sender Information" additionalClasses="mt-6">
              <InputField
                watchValues={watchValues}
                register={register}
                name={"SenderContactINT"}
                registerOptions={{ required: true }}
                errors={errors}
                label="Sender Contact Number"
                placeholder="Enter Sender Contact Number"
                onChange={(e) => setReceiverContactNo(e.target.value)}
                type="number"
                //minLength={11}={11}
                minLength={11}
              />
              <InputField
                watchValues={watchValues}
                register={register}
                name={"Sender_Name_Int"}
                registerOptions={{
                  required: receiverInfo.ReceiverName ? false : true,
                }}
                errors={errors}
                label="Sender Name"
                placeholder="Enter Sender Name"
                defaultValue={receiverInfo.ReceiverName}
              />
              <InputField
                watchValues={watchValues}
                register={register}
                name={"Senderaddress_Int"}
                registerOptions={{
                  required: receiverInfo.ReceiverAddress ? false : true,
                }}
                errors={errors}
                label="Sender Address"
                placeholder="Enter Sender Address"
                defaultValue={receiverInfo.ReceiverAddress}
              />
              <InputField
                watchValues={watchValues}
                register={register}
                name={"Sender_NID_INT"}
                registerOptions={{
                  required:  true,
                }}
                errors={errors}
                label="Sender NID Number"
                placeholder="Enter Sender NID Number"
                // defaultValue={receiverInfo.ReceiverAddress}
              />
              <InputField
                watchValues={watchValues}
                register={register}
                name={"Sender_Purpose"}
                registerOptions={{
                  required: false,
                }}
                errors={errors}
                label="Sender Purpose (Optional)"
                placeholder="Enter Sender Purpose"
                // defaultValue={receiverInfo.ReceiverAddress}
              />
            </Section>
          </div>

          <div>
            {/* Parcel Information Section */}
            <Section title="Parcel Information">

              <div className="grid grid-cols-2 gap-2">
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
              </div>

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
              <div className="">
               {/* Parcel Area */}
              <div className="">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="col-span-2 md:col-span-2 lg:col-span-1">
                    <label className="label-text text-gray-500 font-semibold mt-2 mb-1">
                      Weight Package*
                    </label>

                    <select
                      {...register("weightPackage", { required: true })}
                      className={`select select-bordered w-full p-2 rounded-lg border bg-[#E8F0FE] text-black ${
                        errors.weightPackage
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      onChange={(e) => setWeightPackage(e.target.value)}
                    >
                      <option value="">Select Weight Package</option>
                      <option value="0.5">0.5kg</option>
                      <option value="1">1 kg</option>
                      <option value="2">2 kg</option>
                      <option value="3">3 kg</option>
                      <option value="4">4 kg</option>
                    </select>
                    {errors.weightPackage && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="col-span-2 md:col-span-2 lg:col-span-1">
                    <label className="label-text text-gray-500 font-semibold mb-1">
                      Total Collection Amount*
                    </label>
                    <input
                      type="text"
                      {...register("totalAmount", { required: true })}
                      className={`input input-bordered w-full p-2 rounded-lg border bg-[#E8F0FE] text-black ${
                        errors.totalAmount
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.totalAmount && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="col-span-2 md:col-span-2 lg:col-span-1">
                    <label className="label-text text-gray-500 font-semibold mb-1">
                      Service Type*
                    </label>
                    <select
                      {...register("serviceType", { required: true })}
                      className={`select select-bordered w-full p-2 rounded-lg border bg-[#E8F0FE] text-black ${
                        errors.serviceType
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      onChange={(e) => setServiceType(e.target.value)}
                    >
                      <option value="">Select Service</option>
                      <option value="Ship Delivery">Ship Delivery</option>
                      <option value="Air Delivery">Air Delivery</option>
                    </select>
                    {errors.serviceType && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="col-span-2 md:col-span-2 lg:col-span-1">
                    <label className="label-text text-gray-500 font-semibold mb-1">
                      Item Type*
                    </label>
                    <select
                      {...register("itemType", { required: true })}
                      className={`select select-bordered w-full p-2 rounded-lg border bg-[#E8F0FE] text-black ${
                        errors.itemType ? "border-red-500" : "border-gray-300"
                      }`}
                      onChange={(e) => setItemType(e.target.value)}
                    >
                      <option value="">Select Item Type</option>
                      <option value="Parcel">Parcel</option>
                      <option value="Documents">Documents</option>
                      <option value="Fragile">Fragile</option>
                      <option value="Medicine">Medicine</option>
                      <option value="Food">Food</option>
                      <option value="Device">Device</option>
                    </select>
                    {errors.itemType && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="col-span-2">
                    <label className="label-text text-gray-500 font-semibold mb-1">
                      Product Value*
                    </label>
                    <input
                      type="text"
                      {...register("productValue", { required: true })}
                      className={`input input-bordered w-full p-2 rounded-lg border bg-[#E8F0FE] text-black ${
                        errors.productValue
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.productValue && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="col-span-2">
                    <label className="label-text text-gray-500 font-semibold mb-1">
                      Tax Number(Optional)
                    </label>
                    <input
                      type="text"
                      {...register("TaxNumber")}
                      className={`input input-bordered w-full p-2 rounded-lg border bg-[#E8F0FE] text-black ${
                        errors.TaxNumber
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.TaxNumber && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="col-span-2">
                    <label className="label-text text-gray-500 font-semibold mb-1">
                      Quantity*
                    </label>
                    <textarea
                      {...register("productQuantity", { required: true })}
                      className="textarea textarea-bordered w-full p-2 rounded-lg bg-[#E8F0FE] text-black border-gray-300"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="label-text text-gray-500 font-semibold mb-1">
                      Product Details*
                    </label>
                    <textarea
                      {...register("productDetails", { required: true })}
                      className="textarea textarea-bordered w-full p-2 rounded-lg bg-[#E8F0FE] text-black border-gray-300"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="label-text text-gray-500 font-semibold mb-1">
                      Additional Information (Optional)
                    </label>
                    <textarea
                      {...register("addition_info")}
                      className="textarea textarea-bordered w-full p-2 rounded-lg bg-[#E8F0FE] text-black border-gray-300"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="label-text text-gray-500 font-semibold mb-1">
                      Remark
                    </label>
                    <textarea
                      {...register("remark")}
                      className="textarea textarea-bordered w-full h-[26px] p-2 rounded-lg bg-[#E8F0FE] text-black border-gray-300"
                    />
                  </div>
                </div>
              </div>
              </div>
            </Section>

            {/* Parcel Charge Section */}
            

            {/* COD Section */}
           

            
          </div>
        </div>
        {/* Parcel Charge Section */}
<Section title="Parcel Charge" additionalClasses="mt-4">
  <div className="bg-[#E8F0FE] text-black p-4 rounded-lg shadow-md w-full">
    <div className="grid grid-cols-2 gap-y-3 text-sm md:text-base">
      {/* Rows */}
      <div className="text-gray-700">Weight Package</div>
      <div className="text-gray-500 text-right">{WeightPackage || "Not Confirm"} kg</div>

      <div className="text-gray-700">Service Type</div>
      <div className="text-gray-500 text-right">{ServiceType || "Not Confirm"}</div>

      <div className="text-gray-700">Item Type</div>
      <div className="text-gray-500 text-right">{ItemType || "Not Confirm"}</div>

      <div className="text-gray-700">Collection Amount</div>
      <div className="text-gray-500 text-right">0.00</div>

      <div className="text-gray-700">Cod Percent</div>
      <div className="text-gray-500 text-right">0 %</div>

      <div className="text-gray-700">Weight Charge</div>
      <div className="text-gray-500 text-right">0.00</div>

      <div className="text-gray-700">Cod Charge</div>
      <div className="text-gray-500 text-right">0.00</div>

      <div className="text-gray-700">Delivery Charge</div>
      <div className="text-gray-500 text-right">0.00</div>

      {/* Total Charge Row */}
      <div className="col-span-2 border-t pt-3 mt-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-semibold">Total Charge</span>
          <div className="flex items-center gap-2">
            {isManualTotal ? (
              <input
                type="number"
                value={totalCharge}
                onChange={(e) => {
                  setIsManuallyEditing(true);
                  setTotalCharge(parseFloat(e.target.value) || 0);
                }}
                className="w-24 px-2 py-1 border rounded text-right"
              />
            ) : (
              <span className="text-gray-500 font-semibold">
                {totalCharge.toFixed(2)}
              </span>
            )}
            <button
              type="button"
              onClick={() => setIsManualTotal(!isManualTotal)}
              className="text-blue-500 text-sm hover:underline"
            >
              {isManualTotal ? "Lock" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</Section>

        {/* Submit Button */}
        <div className="flex gap-5 mt-2 justify-center">
          <button className="btn bg-[#E8F0FE] w-1/2 hover:bg-blue-300">Submit</button>
        </div>
      </form>
      <InterNationalPrintModal_Branch
        closeModal={closeModal}
        isOpen={isOpen}
        bookingInfo={bookingInfo}
      />
    </div>
  );
};

export default InterNational_Booking_Branch;
