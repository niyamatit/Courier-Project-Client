
import { useForm } from "react-hook-form";
import axiosSecure from "../../../../api/axiosSecure";
import { imageUpload } from "../../../../api/utils";
import Swal from "sweetalert2";
import { FaCloudUploadAlt } from "react-icons/fa";
const SupportCompany = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            if (!data.CompanyLogo || data.CompanyLogo.length === 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Image is required",
                    showConfirmButton: false,
                    timer: 1500,
                });
                return;
            }
    
            const CompanyLogo = await imageUpload(data.CompanyLogo[0]);
    
            const ApplySpoonser = {
                Company_Name: data.CompanyName || "",
                Company_Number: data.number || "",
                Company_Office_Location: data.OfficeLocation || "",
                Company_Logo: CompanyLogo?.data?.display_url || "",
                Date: new Date(),
            };
    
            const ApplySpoonserInfo = await axiosSecure.post("/supportCompany", ApplySpoonser);
    
            if (ApplySpoonserInfo.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data?.CompanyName} Company Added Successfully`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Company already exists",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Unexpected Error",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }
    };
    

    return (
        <div className="min-h-screen bg-gray-50 border-2 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 md:p-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-blue-600 mb-2">Add Supporting Company</h1>
                    <p className="text-gray-500">Please fill in the company details below</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Company Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("CompanyName", { required: "Company name is required" })}
                            className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                                errors.CompanyName ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter company name"
                        />
                        {errors.CompanyName && (
                            <p className="mt-1 text-sm text-red-600">{errors.CompanyName.message}</p>
                        )}
                    </div>

                    {/* Logo Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company Logo <span className="text-red-500">*</span>
                        </label>
                        <div className="relative group">
                            <input
                                type="file"
                                {...register("CompanyLogo", { required: true })}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                accept="image/*"
                            />
                            <div className={`flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed rounded-lg ${
                                errors.CompanyLogo ? "border-red-500" : "border-gray-300 group-hover:border-blue-500"
                            } transition-colors`}>
                                <FaCloudUploadAlt className="w-12 h-12 text-gray-400 mb-3 group-hover:text-blue-500" />
                                <p className="text-gray-500 text-center">
                                    <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 20MB</p>
                            </div>
                        </div>
                        {errors.CompanyLogo && (
                            <p className="mt-1 text-sm text-red-600">Company logo is required</p>
                        )}
                    </div>

                    {/* Office Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Office Location
                        </label>
                        <input
                            type="text"
                            {...register("OfficeLocation")}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="Enter office address"
                        />
                    </div>

                    {/* Contact Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contact Number
                        </label>
                        <input
                            type="tel"
                            {...register("number")}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="Enter phone number"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Add Company
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SupportCompany;
