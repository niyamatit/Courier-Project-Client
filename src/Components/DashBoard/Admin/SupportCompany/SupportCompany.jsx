
import { useForm } from "react-hook-form";
import axiosSecure from "../../../../api/axiosSecure";
import { imageUpload } from "../../../../api/utils";
import Swal from "sweetalert2";

const SupportCompany = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            // Ensure the image is available
            if (!data.yourImage || data.yourImage.length === 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Image is required",
                    showConfirmButton: false,
                    timer: 1500,
                });
                return;
            }

            // Upload the image
            const CompanyLogo = await imageUpload(data.CompanyLogo[0]);

            // Construct the sponsor object
            const ApplySpoonser = {
                Name: data.name || "",
                Title: data.title || "",
                Company_Logo: CompanyLogo?.data?.display_url || "",
                Date: new Date()
            };

            // Send data to the backend
            const ApplySpoonserInfo = await axiosSecure.post("/supportCompany", ApplySpoonser);

            // Show success message
            if (ApplySpoonserInfo.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Company Added Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            // Handle errors
            if (error.response && error.response.status === 400) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Already Added",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                console.error("Unexpected Error:", error);
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
        <div className="p-4 sm:p-8 md:p-8 bg-gradient-to-r from-gray-200 to-gray-200 min-h-screen flex items-center justify-center">
            <div className="max-w-6xl w-full mx-auto shadow-lg p-4 sm:p-6 md:p-6 bg-white rounded-lg border-[2px] border-blue-400">
                <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-6 text-center text-blue-700">
                    Add Support Company
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 md:space-y-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 lg:gap-6">
                        <div className="col-span-2 space-y-4 sm:space-y-6 md:space-y-6">
                            <div className="bg-gray-100 p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
                                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-4 md:mb-6 text-blue-600">
                                    Write Company Information
                                </h2>
                                <div>
                                    {/* Image Upload */}
                                    <div className="col-span-2 md:col-span-2 lg:col-span-1 my-2">
                                        <label className="block text-gray-700 font-medium mb-1">
                                            Company Logo*
                                        </label>
                                        <input
                                            type="file"
                                            {...register("CompanyLogo", { required: true })}
                                            className={`input input-bordered w-full p-2 rounded-lg border ${errors.CompanyLogo ? "border-red-500" : "border-gray-300"
                                                }`}
                                        />
                                        {errors.CompanyLogo && (
                                            <span className="text-red-500">This field is required</span>
                                        )}
                                    </div>

                                    {/* Title */}
                                    <div className="col-span-2 md:col-span-2 lg:col-span-1">
                                        <label className="block text-gray-700 font-medium mb-1">
                                            Title <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            {...register("title", { required: "Title is required" })}
                                            className={`input input-bordered w-full p-2 rounded-lg border ${errors.title ? "border-red-500" : "border-gray-300"
                                                }`}
                                        />
                                        {errors.title && (
                                            <span className="text-red-500">{errors.title.message}</span>
                                        )}
                                    </div>

                                    {/* Name */}
                                    <div className="col-span-2 md:col-span-2 lg:col-span-1">
                                        <label className="block text-gray-700 font-medium mb-1">
                                            Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            {...register("name", { required: "Name is required" })}
                                            className={`input input-bordered w-full p-2 rounded-lg border ${errors.name ? "border-red-500" : "border-gray-300"
                                                }`}
                                        />
                                        {errors.name && (
                                            <span className="text-red-500">{errors.name.message}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn w-full hover:bg-blue-600 bg-blue-500 text-white py-2 px-4 rounded-lg"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SupportCompany;
