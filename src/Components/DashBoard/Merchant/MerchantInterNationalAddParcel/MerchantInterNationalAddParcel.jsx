import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "tailwindcss/tailwind.css";
import Swal from "sweetalert2";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import axiosSecure from "../../../../api/axiosSecure";
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import useUsersData from "../../../../hooks/useUsersData/useUsersData";

const MerchantInterNationalAddParcel = () => {
  const [WeightPackage, setWeightPackage] = useState("");

  const [ServiceType, setServiceType] = useState("");
  const [ItemType, setItemType] = useState("");
  // const [store, setStore] = useState("");
  const [countryId, setCountryId] = useState(null);
  const [stateId, setStateId] = useState(null);
  const [contactNumber, setContactNumber] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '', });
  const [SendercontactNumber, setSenderContactNumber] = useState('');
  const [SenderInfo, setSenderInfo] = useState({
    SenderName: '',
    SenderAddress: '', });
    const [collected, setCollected] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // All District Name

  const onSubmit = async (data) => {
    const formData = { ...data };
    
    const PercelInformation = {
      Customer_Contact_Number: formData?.contactNumber || "",
      Customer_Name: formData?.customerName || customerInfo.name ||"",
      Customer_Address: formData?.customerAddress ||customerInfo.address || "",
      Customer_Country_Name: formData?.country?.name || "",
      Customer_Country_Currency: formData?.country?.currency_name || "",
      Customer_Country_Capital_Name: formData?.country?.capital || "",
      Customer_State: formData?.state?.name || "",
      Customer_City: formData?.city?.name || "",
      Parcel_Weight: parseFloat(formData?.weightPackage) || "",
      Total_Collection_Amount: parseFloat(formData?.totalAmount) || "",
      Service_Type: formData?.serviceType || "",
      Item_Type: formData?.itemType || "",
      Product_Value: parseFloat(formData?.productValue) || "",
      Product_Details: formData?.productDetails || "",
      Product_Remark: formData?.remark || "",
      Cod_Perchent: 5 || 0,
      Weight_Charge: weightCharge || 0,
      Cod_Charge: 5000 || 0,
      Delivary_Charge: 70000 ||0,
      Total_Charge: finalCharge || 0,
      Date: new Date().toISOString().split("T")[0] || "",
      International_Parcel: "International",
      Sender_Contact_Number:formData?.SenderContactNumber || "",
      Sender_Name:formData?.SenderName || "",
      Sender_Address:formData?.SenderAddress || "",
      Sender_NID_Number:formData?.SenderNidNumber || "",
      Sender_Purpose:formData?.SenderPurpose || "",
      Tax_Number:formData?.TaxNumber || "",
    };
    // console.log("Parcel Information:", PercelInformation);

    const ParcelProductDetails = await axiosSecure.post(
      "/parcel",
      PercelInformation
    );
    // console.log(ParcelProductDetails.data);
    if (ParcelProductDetails.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Parcel Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    console.log(formData);
  };
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      if (contactNumber) {
        try {
          const response = await axiosSecure.get(`/parcel/international/${contactNumber}`);
          if (response.data) {
            setCustomerInfo({
              name: response.data.Customer_Name,
              address: response.data.Customer_Address,
              
            });
          }
        } catch (error) {
         
          setCustomerInfo({ name: '', address: '' });
        }
      }
    };

    fetchCustomerDetails();
  }, [contactNumber]);
  useEffect(() => {
    const fetchSenderDetails = async () => {
      if (SendercontactNumber) {
        try {
          const response = await axiosSecure.get(`/parcel/international/sender/${SendercontactNumber}`);
          if (response.data) {
            setSenderInfo({
              SenderName: response.data.Sender_Name,
              SenderAddress: response.data.Sender_Address,
              
            });
          }
        } catch (error) {
         
           setSenderInfo({ SenderName: '', SenderAddress: '' });
        }
      }
    };

    fetchSenderDetails();
  }, [SendercontactNumber]);
  const codCharge = 5000; 
  const deliveryCharge = 7000;
const weightCharge = (WeightPackage * 2500) || 0; 
const totalCharge = weightCharge + codCharge + deliveryCharge;
const codPercentage =totalCharge*0.05
const finalCharge = totalCharge + codPercentage
const[verifiedUser] = useUsersData()
// Approve 

const { data: requests = [],  } = useQuery({
  queryKey: ["requests", verifiedUser?.email],

  queryFn: async () => {
    const res = await axiosSecure.get(
      `/users/request/field/${verifiedUser?.email}`
    );
    // console.log(res.data);
    return res.data;
  },
});

const handleClick = async () => {
  
  
  try {
    const requestData = { InternationalBookingStatus: "Pending" };
    const MerchantRequest = await axiosSecure.patch(
      `/users/request/field/${verifiedUser?.email}`,
      requestData
    );
    console.log("UserDetails:", MerchantRequest.data);
    if (MerchantRequest.data.modifiedCount) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Request sent successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No change detected",
        showConfirmButton: false,
        timer: 1500,
      });
    }

   
  } catch (error) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Something went wrong!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
const MerchantRequest = requests.find((req) => req.email === verifiedUser?.email);

  const isPendingForInternationalBooking = MerchantRequest?.InternationalBookingStatus === "Pending";
  const isApproveForInternationalBooking = MerchantRequest?.InternationalBookingStatus === "Approve";

  const location = useLocation();
  const currentPath = location.pathname;

  // Check if the current route matches your desired path
  const isMerchantInterNationalAddParcelRoute = currentPath === "/dashboard/MerchantInterNationalAddPercel";

  // console.log("Current Path:",currentPath)

  return (
    <div>
      <div>
     {
      isApproveForInternationalBooking ? ( <div className="p-4 sm:p-8 md:p-8 bg-gradient-to-r from-gray-200 to-gray-200 min-h-screen flex items-center justify-center">
        <div className="max-w-6xl w-full mx-auto shadow-lg p-4 sm:p-6 md:p-6 bg-white rounded-lg border-[2px] border-blue-400">
          <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-6 text-center text-blue-700">
            Add International Parcel
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6 md:space-y-6"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-3 lg:gap-6">
              <div className="col-span-2 space-y-4 sm:space-y-6 md:space-y-6">
                <div className="bg-gray-100 p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-4 md:mb-6 text-blue-600">
                    Customer Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
                    <div className="col-span-2 ">
                      <label className="block text-gray-700 font-medium mb-1">
                        Customer Contact Number*
                      </label>
                      <input
                        type="text"
                        {...register("contactNumber", { required: true })}
                        className={`input input-bordered w-full p-2 rounded-lg border ${
                          errors.contactNumber
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        onChange={(e) => setContactNumber(e.target.value)}
                      />
                      {errors.contactNumber && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="col-span-2">
                      <label className="block text-gray-700 font-medium mb-1">
                        Customer Name*
                      </label>
                      <input
                        type="text"
                        defaultValue={customerInfo.name}
                        {...register('customerName', { required:  customerInfo.name? false: true })}
                        className={`input input-bordered w-full p-2 rounded-lg border ${
                          errors.customerName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.customerName && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="col-span-2">
                      <label className="block text-gray-700 font-medium mb-1">
                        Customer Address*
                      </label>
                      <input
                        type="text"
                        defaultValue={customerInfo.address}
      {...register('customerAddress', { required: !customerInfo.address ? true : false })}
                        className={`input input-bordered w-full p-2 rounded-lg border ${
                          errors.customerAddress
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.customerAddress && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                    {/* Country Code */}
                    <div className="col-span-2 md:col-span-2 lg:col-span-1">
                      <label className="block text-gray-700 font-medium mb-1">
                        Country*
                      </label>
                      <CountrySelect
                        onChange={(value) => {
                          setCountryId(value?.id);
                          setValue("country", value);
                        }}
                        className={`select select-bordered w-full p-2 rounded-lg border ${
                          errors.country ? "border-red-500" : "border-gray-300"
                        }`}
                        placeHolder="Select Country"
                      />
                      {errors.country && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="col-span-2 md:col-span-2 lg:col-span-1">
                      <label className="block text-gray-700 font-medium mb-1">
                        State*
                      </label>
                      <StateSelect
                        countryid={countryId}
                        onChange={(value) => {
                          setStateId(value?.id);
                          setValue("state", value);
                        }}
                        className={`select select-bordered w-full p-2 rounded-lg border ${
                          errors.state ? "border-red-500" : "border-gray-300"
                        }`}
                        placeHolder="Select State"
                      />
                      {errors.state && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="col-span-2">
                      <label className="block text-gray-700 font-medium mb-1">
                        City*
                      </label>
                      <CitySelect
                        countryid={countryId}
                        stateid={stateId}
                        onChange={(value) => {
                          setValue("city", value);
                        }}
                        className="select select-bordered w-full p-2 rounded-lg border-gray-300"
                        placeHolder="Select City"
                      />
                      {errors.city && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                </div>
  
                {/* Parcel Area */}
                <div className="bg-gray-100 p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-4 md:mb-6 text-blue-600">
                    Parcel Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="col-span-2 md:col-span-2 lg:col-span-1">
                      <label className="block text-gray-700 font-medium mb-1">
                        Weight Package*
                      </label>
  
                      <select
                        {...register("weightPackage", { required: true })}
                        className={`select select-bordered w-full p-2 rounded-lg border ${
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
                      <label className="block text-gray-700 font-medium mb-1">
                        Total Collection Amount*
                      </label>
                      <input
                        type="text"
                        {...register("totalAmount", { required: true })}
                        className={`input input-bordered w-full p-2 rounded-lg border ${
                          errors.totalAmount
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        onChange={(e) => setCollected(e.target.value)}
                      />
                      {errors.totalAmount && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="col-span-2 md:col-span-2 lg:col-span-1">
                      <label className="block text-gray-700 font-medium mb-1">
                        Service Type*
                      </label>
                      <select
                        {...register("serviceType", { required: true })}
                        className={`select select-bordered w-full p-2 rounded-lg border ${
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
                      <label className="block text-gray-700 font-medium mb-1">
                        Item Type*
                      </label>
                      <select
                        {...register("itemType", { required: true })}
                        className={`select select-bordered w-full p-2 rounded-lg border ${
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
                        <option value="Mobile">Mobile</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Other Device">Other Device</option>
                      </select>
                      {errors.itemType && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="col-span-2">
                      <label className="block text-gray-700 font-medium mb-1">
                        Product Value*
                      </label>
                      <input
                        type="text"
                        {...register("productValue", { required: true })}
                        className={`input input-bordered w-full p-2 rounded-lg border ${
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
                      <label className="block text-gray-700 font-medium mb-1">
                        Tax Number(Optional)
                      </label>
                      <input
                        type="text"
                        {...register("TaxNumber")}
                        className={`input input-bordered w-full p-2 rounded-lg border ${
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
                      <label className="block text-gray-700 font-medium mb-1">
                        Product Details*
                      </label>
                      <textarea
                        {...register("productDetails", { required: true })}
                        className="textarea textarea-bordered w-full p-2 rounded-lg border-gray-300"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-gray-700 font-medium mb-1">
                        Remark
                      </label>
                      <textarea
                        {...register("remark")}
                        className="textarea textarea-bordered w-full p-2 rounded-lg border-gray-300"
                      />
                    </div>
                  </div>
                </div>
                {/* Sender Info */}
                <div className="bg-gray-100 p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-4 md:mb-6 text-blue-600">
                    Sender Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
                    <div className="col-span-2 ">
                      <label className="block text-gray-700 font-medium mb-1">
                        Sender Contact Number*
                      </label>
                      <input
                        type="text"
                        {...register("SenderContactNumber", { required: true })}
                        className={`input input-bordered w-full p-2 rounded-lg border ${
                          errors.SenderContactNumber
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        onChange={(e) => setSenderContactNumber(e.target.value)}
                      />
                      {errors.SenderContactNumber && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="col-span-2">
                      <label className="block text-gray-700 font-medium mb-1">
                        Sender Name*
                      </label>
                      <input
                        type="text"
                        defaultValue={SenderInfo.SenderName}
                        {...register("SenderName", { required: SenderInfo.SenderName? false: true })}
                        className={`input input-bordered w-full p-2 rounded-lg border ${
                          errors.SenderName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.SenderName && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="col-span-2">
                      <label className="block text-gray-700 font-medium mb-1">
                        Sender Address*
                      </label>
                      <input
                        type="text"
                        defaultValue={SenderInfo.SenderAddress}
                        {...register("SenderAddress", { required: SenderInfo.SenderAddress ? false : true })}
                        className={`input input-bordered w-full p-2 rounded-lg border ${
                          errors.SenderAddress
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.SenderAddress && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="col-span-2">
                      <label className="block text-gray-700 font-medium mb-1">
                        Sender NID Number*
                      </label>
                      <input
                        type="text"
                        {...register("SenderNidNumber", { required: true })}
                        className={`input input-bordered w-full p-2 rounded-lg border ${
                          errors.SenderNidNumber
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.SenderNidNumber && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="col-span-2">
                      <label className="block text-gray-700 font-medium mb-1">
                        Purpose*
                      </label>
                      <textarea
                        {...register("SenderPurpose")}
                        className="textarea textarea-bordered w-full p-2 rounded-lg border-gray-300"
                      />
                    </div>
                    
                   
                  </div>
                </div>
              </div>
  
              <div className="bg-gray-100 p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-4 md:mb-6 text-blue-600">
                  Parcel Charge
                </h2>
                <div className="space-y-2 md:space-y-4">
                  <div className="flex justify-between"></div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Weight Package</span>
                    <span className="text-gray-500">
                      {WeightPackage || "Not Confirm"} kg
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Service Type</span>
                    <span className="text-gray-500">
                      {ServiceType || "Not Confirm"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Item Type</span>
                    <span className="text-gray-500">
                      {ItemType || "Not Confirm"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Collection Amount</span>
                    <span className="text-gray-500">{collected || 0} Tk</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Cod Percent</span>
                    <span className="text-gray-500">5 %</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Weight Charge</span>
                    <span className="text-gray-500">{weightCharge || 0} Tk</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Cod Charge</span>
                    <span className="text-gray-500">5000.00 Tk</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Delivery Charge</span>
                    <span className="text-gray-500">7000.00 Tk</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-semibold">Total Charge</span>
                    <span className="text-gray-500 font-semibold">{finalCharge} Tk</span>
                  </div>
                </div>
              </div>
  
              {/* Sender Information */}
            </div>
  
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  reset();
                  setCountryId(null);
                  setStateId(null);
                  setValue("country", null);
                  setValue("state", null);
                  setValue("city", null);
                }}
                className="btn  bg-gray-500 text-white py-2 px-4 rounded-lg"
              >
                Reset
              </button>
              <button
                type="submit"
                className="btn hover:bg-blue-600 bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>) :
     <div>
      
     {
      isPendingForInternationalBooking  ? <p className="text-center text-blue-500 text-xl font-semibold">Please Wait For Approval......</p> :  
      
      <div 
      
      className="container mx-auto flex justify-center">
       {isMerchantInterNationalAddParcelRoute && 
       (!isApproveForInternationalBooking || !isPendingForInternationalBooking) && (
        <button
          onClick={handleClick}
          className="btn hover:bg-blue-500 bg-blue-600 text-white"
        >
          Request For International Booking
        </button>
      )}
    </div>
     }

     </div>
    

     }
      </div>
    </div>
  );
};

export default MerchantInterNationalAddParcel;
