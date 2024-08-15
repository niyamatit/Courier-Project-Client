import {  useState } from "react";
import { useForm } from "react-hook-form";
import "tailwindcss/tailwind.css";
import axiosSecure from "../../../../api/axiosSecure";
import Swal from "sweetalert2";
import { CitySelect, CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
const MerchantInterNationalAddParcel = () => {
  
  const [WeightPackage, setWeightPackage] = useState("");
 
  const [ServiceType, setServiceType] = useState("");
  const [ItemType, setItemType] = useState("");
  const [store, setStore] = useState("");
  const [countryId, setCountryId] = useState(null);
  const [stateId, setStateId] = useState(null);

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
    console.log("FormData:,",formData)
    const PercelInformation = {
      Customer_Contact_Number: formData?.contactNumber || "",
      Customer_Name: formData?.customerName || "",
      Customer_Address: formData?.customerAddress || "",
      Customer_Country_Name: formData?.country.name || "",
      Customer_Country_Currency: formData?.country.currency_name || "",
      Customer_Country_Capital_Name: formData?.country.capital || "",
      Customer_State: formData?.state.name || "",
      Customer_City: formData?.city.name || "",
      Store_Name: formData?.store || "",
      Merchant_Order_ID: formData?.orderId || "",
      Parcel_Weight: parseFloat(formData?.weightPackage) || "",
      Total_Collection_Amount: parseFloat(formData?.totalAmount) || "",
      Service_Type: formData?.serviceType || "",
      Item_Type: formData?.itemType || "",
      Product_Value: parseFloat(formData?.productValue) || "",
      Product_Details: formData?.productDetails || "",
      Product_Remark: formData?.remark || "",
      Cod_Perchent: 0 || "",
      Weight_Charge: 0 || "",
      Cod_Charge: 0 || "",
      Delivary_Charge: 70 || "",
      Total_Charge: 100 || "",
      Date: new Date().toISOString().split('T')[0],
      International_Parcel:"International"
    };
    console.log("Parcel Information:", PercelInformation);

    const ParcelProductDetails = await axiosSecure.post(
      "/Parcel",
      PercelInformation
    );
    console.log(ParcelProductDetails.data);
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

  return (
    <div className="p-4 sm:p-8 md:p-8 bg-gradient-to-r from-gray-200 to-gray-200 min-h-screen flex items-center justify-center">
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
                      {...register("customerName", { required: true })}
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
                      {...register("customerAddress", { required: true })}
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
          setValue('country', value);
        }}
        className={`select select-bordered w-full p-2 rounded-lg border ${
          errors.country ? 'border-red-500' : 'border-gray-300'
        }`}
        placeHolder="Select Country"
      />
      {errors.country && (
        <span className="text-red-500">This field is required</span>
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
          setValue('state', value);
        }}
        className={`select select-bordered w-full p-2 rounded-lg border ${
          errors.state ? 'border-red-500' : 'border-gray-300'
        }`}
        placeHolder="Select State"
      />
      {errors.state && (
        <span className="text-red-500">This field is required</span>
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
          setValue('city', value);
        }}
        className="select select-bordered w-full p-2 rounded-lg border-gray-300"
        placeHolder="Select City"
      />
      {errors.city && (
        <span className="text-red-500">This field is required</span>
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
                      Select Your Store*
                    </label>

                    <select
                      {...register("store", { required: true })}
                      className={`select select-bordered w-full p-2 rounded-lg border ${
                        errors.store ? "border-red-500" : "border-gray-300"
                      }`}
                      onChange={(e) => setStore(e.target.value)}
                    >
                      <option value="">Select Your Store*</option>
                      <option value="Niyamat Express">Niyamat Express</option>
                    </select>
                    {errors.store && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="col-span-2 md:col-span-2 lg:col-span-1">
                    <label className="block text-gray-700 font-medium mb-1">
                      Merchant Order ID*
                    </label>
                    <input
                      type="text"
                      {...register("orderId", { required: true })}
                      className={`input input-bordered w-full p-2 rounded-lg border ${
                        errors.orderId ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.orderId && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
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
                      <option value="Regular Delivery">Regular Delivery</option>
                      
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
            </div>

            <div className="bg-gray-100 p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-4 md:mb-6 text-blue-600">
                Parcel Charge
              </h2>
              <div className="space-y-2 md:space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-700">Store</span>
                  <span className="text-gray-500">
                    {store || "Not Confirm"}{" "}
                  </span>
                </div>
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
                  <span className="text-gray-500">0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Cod Percent</span>
                  <span className="text-gray-500">0 %</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Weight Charge</span>
                  <span className="text-gray-500">0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Cod Charge</span>
                  <span className="text-gray-500">0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Delivery Charge</span>
                  <span className="text-gray-500">0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Total Charge</span>
                  <span className="text-gray-500">0.00</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {

                reset();
                setCountryId(null); 
                setStateId(null);    
                setValue('country', null); 
                setValue('state', null);  
                setValue('city', null); 
              }
                
             

              }
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
    </div>
  );
};

export default MerchantInterNationalAddParcel;
