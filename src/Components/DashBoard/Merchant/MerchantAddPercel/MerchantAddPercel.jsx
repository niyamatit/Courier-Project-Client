import { useForm } from "react-hook-form";
import "tailwindcss/tailwind.css";

const MerchantAddParcel = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="p-8 bg-gradient-to-r from-gray-200 to-gray-200 min-h-screen flex items-center justify-center ">
      <div className="max-w-6xl w-full mx-auto shadow-lg p-6 bg-white rounded-lg border-[2px] border-blue-400">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Add New Parcel
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-blue-600">
                  Customer Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-gray-700 font-medium mb-1">
                      Customer Contact Number
                    </label>
                    <input
                      type="text"
                      {...register("contactNumber", { required: true })}
                      className={`input input-bordered w-full p-2 rounded-lg border ${
                        errors.contactNumber ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.contactNumber && (
                      <span className="text-red-500">This field is required</span>
                    )}
                  </div>
                  <div className="col-span-2">
                    <label className="block text-gray-700 font-medium mb-1">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      {...register("customerName", { required: true })}
                      className={`input input-bordered w-full p-2 rounded-lg border ${
                        errors.customerName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.customerName && (
                      <span className="text-red-500">This field is required</span>
                    )}
                  </div>
                  <div className="col-span-2">
                    <label className="block text-gray-700 font-medium mb-1">
                      Customer Address
                    </label>
                    <input
                      type="text"
                      {...register("customerAddress", { required: true })}
                      className={`input input-bordered w-full p-2 rounded-lg border ${
                        errors.customerAddress ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.customerAddress && (
                      <span className="text-red-500">This field is required</span>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Districts
                    </label>
                    <select
                      {...register("district", { required: true })}
                      className={`select select-bordered w-full p-2 rounded-lg border ${
                        errors.district ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select District</option>
                      <option value="Dhaka">Dhaka</option>
                      <option value="Chattogram">Chattogram</option>
                      {/* Add more options here */}
                    </select>
                    {errors.district && (
                      <span className="text-red-500">This field is required</span>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Area
                    </label>
                    <input
                      type="text"
                      {...register("area", { required: true })}
                      className={`input input-bordered w-full p-2 rounded-lg border ${
                        errors.area ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.area && (
                      <span className="text-red-500">This field is required</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-blue-600">
                  Parcel Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-gray-700 font-medium mb-1">
                      Merchant Order ID
                    </label>
                    <input
                      type="text"
                      {...register("orderId", { required: true })}
                      className={`input input-bordered w-full p-2 rounded-lg border ${
                        errors.orderId ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.orderId && (
                      <span className="text-red-500">This field is required</span>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Weight Package
                    </label>
                    <select
                      {...register("weightPackage", { required: true })}
                      className={`select select-bordered w-full p-2 rounded-lg border ${
                        errors.weightPackage ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select Weight Package</option>
                      <option value="0-1kg">0-1kg</option>
                      <option value="1-5kg">1-5kg</option>
                      {/* Add more options here */}
                    </select>
                    {errors.weightPackage && (
                      <span className="text-red-500">This field is required</span>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Total Collection Amount
                    </label>
                    <input
                      type="text"
                      {...register("totalAmount", { required: true })}
                      className={`input input-bordered w-full p-2 rounded-lg border ${
                        errors.totalAmount ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.totalAmount && (
                      <span className="text-red-500">This field is required</span>
                    )}
                  </div>
                  <div className="col-span-2">
                    <label className="block text-gray-700 font-medium mb-1">
                      Product Value
                    </label>
                    <input
                      type="text"
                      {...register("productValue", { required: true })}
                      className={`input input-bordered w-full p-2 rounded-lg border ${
                        errors.productValue ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.productValue && (
                      <span className="text-red-500">This field is required</span>
                    )}
                  </div>
                  <div className="col-span-2">
                    <label className="block text-gray-700 font-medium mb-1">
                      Product Details
                    </label>
                    <textarea
                      {...register("productDetails")}
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

            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-blue-600">
                Parcel Charge
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Weight Package</span>
                  <span className="text-gray-500">Not Confirm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Service Type</span>
                  <span className="text-gray-500">Not Confirm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Item Type</span>
                  <span className="text-gray-500">Not Confirm</span>
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
              onClick={() => reset()}
              className="btn btn-secondary bg-red-500 text-white py-2 px-4 rounded-lg"
            >
              Reset
            </button>
            <button
              type="submit"
              className="btn btn-primary bg-green-500 text-white py-2 px-4 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MerchantAddParcel;
