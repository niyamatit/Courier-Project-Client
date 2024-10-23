
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import Swal from "sweetalert2";
import axiosSecure from "../../../../api/axiosSecure";
import { imageUpload } from "../../../../api/utils";
import useAuth from "../../../../hooks/useAuth";

const Rideradd = () => {
    const { user } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // const onSubmit = (data) => {
    //     console.log(data);
    // };



    const onSubmit = async (data) => {
        try {

            const riderImage = await imageUpload(data.riderImage[0]);
            const grantedNidImage = await imageUpload(data.grantedNidImage[0]);
            const grantedImage = await imageUpload(data.grantedImage[0]);

            const ApplyRiderInformation = {
                Rider_Name: data?.riderName || "",
                Branch_Email: user?.email || "",
                Rider_Number: data?.riderNumber || "",
                Rider_Nid: data?.riderNid || "",
                Rider_Address: data?.riderAddress || "",
                Rider_Branch: data?.riderBranch || "",
                Rider_Area: data?.riderArea || "",
                Rider_Commission: data?.riderCommission || "",
                Rider_Gender: data?.riderGender || "",
                Rider_Marital: data?.riderMarital || "",
                Rider_Granted: data?.riderGranted || "",
                Rider_grantedRelations: data?.grantedRelations || "",
                Rider_grantedNumber: data?.grantedNumber || "",
                Rider_grantedAddress: data?.grantedAddress || "",
                Rider_grantedOccupation: data?.grantedOccupation || "",
                Rider_Image: riderImage?.data?.display_url || "",
                Rider_grantedNidImage: grantedNidImage?.data?.display_url || "",
                Rider_grantedImage: grantedImage?.data?.display_url || "",
                Date: new Date().toISOString().split('T')[0],
            };

            const ApplyRiderInfo = await axiosSecure.post("/rider", ApplyRiderInformation);

            if (ApplyRiderInfo.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Staff Added Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Already Added the Staff",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                console.error("Unexpected Error:", error);
            }
        }

    };

    return (
        <div className=" bg-gradient-to-r from-gray-200 to-gray-200">
            <h2 className="font-bold text-xl text-blue-900 p-4">Rider Add</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="p-2 space-y-4 text-gray-600">
                <div className="grid md:grid-cols-2 gap-4 border border-gray-300 p-4 bg-[#f0f3f7]">
                    <div>
                        {/* Rider Image */}
                        <div className="field mt-3">
                            <label className="block text-gray-700 font-medium mb-1">
                                Rider Image*
                            </label>
                            <input
                                type="file"
                                {...register("riderImage", { required: true })}
                                className={`input input-bordered w-full p-2 rounded-lg border ${errors.riderImage ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.riderImage && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>

                        {/* Rider Name */}
                        <div className="col-span-2 md:col-span-2 lg:col-span-1">
                            <label className="block text-gray-700 font-medium mb-1">
                                Rider Name*
                            </label>
                            <input
                                type="text"
                                {...register('riderName', { required: true })}
                                className={`input input-bordered w-full p-2 rounded-lg border ${errors.riderName ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.riderName && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>

                        {/* Rider Number */}
                        <div className="col-span-2 md:col-span-2 lg:col-span-1">
                            <label className="block text-gray-700 font-medium mb-1">
                                Rider Number*
                            </label>
                            <input
                                type="text"
                                {...register('riderNumber', { required: true })}
                                className={`input input-bordered w-full p-2 rounded-lg border ${errors.riderNumber ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.riderNumber && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>

                        {/* Rider NID Number */}
                        <div className="field mt-3">
                            <label className="block text-gray-700 font-medium mb-1">
                                Rider NID Number*
                            </label>
                            <input
                                type="text"
                                {...register('riderNid', { required: true })}
                                className={`input input-bordered w-full p-2 rounded-lg border ${errors.riderNid ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.riderNid && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>

                        {/* Rider Address */}
                        <div className="field mt-3">
                            <label className="block text-gray-700 font-medium mb-1">
                                Rider Address*
                            </label>
                            <input
                                type="text"
                                {...register('riderAddress', { required: true })}
                                className={`input input-bordered w-full p-2 rounded-lg border ${errors.riderAddress ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.riderAddress && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>

                        {/* Rider Branch/Hub */}
                        <div className="field mt-3">
                            <label className="block text-gray-700 font-medium mb-1">
                                Rider Branch/Hub*
                            </label>
                            <input
                                type="text"
                                {...register('riderBranch', { required: true })}
                                className={`input input-bordered w-full p-2 rounded-lg border ${errors.riderBranch ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.riderBranch && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>

                        {/* Rider Area */}
                        <div className="field mt-3">
                            <label className="block text-gray-700 font-medium mb-1">
                                Rider Area*
                            </label>
                            <input
                                type="text"
                                {...register('riderArea', { required: true })}
                                className={`input input-bordered w-full p-2 rounded-lg border ${errors.riderArea ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.riderArea && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>

                        {/* Rider Salary */}
                        <div className="field mt-3">
                            <label className="block text-gray-700 font-medium mb-1">
                                Rider Salary*
                            </label>
                            <input
                                type="text"
                                {...register('riderSalary', { required: true })}
                                className={`input input-bordered w-full p-2 rounded-lg border ${errors.riderSalary ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.riderSalary && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>

                        {/* Rider Commission per Success Parcel */}
                        <div className="field mt-3">
                            <label className="block text-gray-700 font-medium mb-1">
                                Rider Commission per Success Parcel
                            </label>
                            <input
                                type="text"
                                {...register('riderCommission', { required: true })}
                                className={`input input-bordered w-full p-2 rounded-lg border ${errors.riderCommission ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.riderCommission && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>
                    </div>

                    <div>
                        {/* Rider Gender */}
                        <div className="field mt-3">
                            <label className="block text-gray-700 font-medium mb-1">
                                Rider Gender*
                            </label>
                            <select
                                {...register('riderGender', { required: true })}
                                className={`select select-bordered w-full p-2 rounded-lg border ${errors.riderGender ? 'border-red-500' : 'border-gray-300'
                                    }`}

                            >
                                <option value="">Select Type</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">others</option>

                            </select>
                            {errors.riderGender && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>

                        {/* Rider Marital Status */}
                        <div className="field mt-3">
                            <label className="block text-gray-700 font-medium mb-1">
                                Rider marital status*
                            </label>
                            <select
                                {...register('riderMarital', { required: true })}
                                className={`select select-bordered w-full p-2 rounded-lg border ${errors.riderMarital ? 'border-red-500' : 'border-gray-300'
                                    }`}

                            >
                                <option value="">Select Type</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="divorced">Divorced</option>
                                <option value="widowed">widowed</option>

                            </select>
                            {errors.riderMarital && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>

                        {/* Remaining Fields (Repeat similar approach for granted details) */}
                        {/* Rider Granted Name */}
                        <div className="field mt-3">
                            <label className="block text-gray-700 font-medium mb-1">
                                Rider Granted Name*
                            </label>
                            <input
                                type="text"
                                {...register('riderGranted', { required: true })}
                                className={`input input-bordered w-full p-2 rounded-lg border ${errors.riderGranted ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.riderGranted && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>
                        {/* Rider Granted Relations */}
                        <div className="field mt-3">
                            <label className="block text-gray-700 font-medium mb-1">
                                Rider Granted Relations*
                            </label>
                            <input
                                type="text"
                                {...register('grantedRelations', { required: true })}
                                className={`input input-bordered w-full p-2 rounded-lg border ${errors.grantedRelations ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.grantedRelations && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>
                        {/* Rider granted NID Image */}
                        <div className="field mt-3">
                            <label className="block text-gray-700 font-medium mb-1">
                                Rider Granted Image*
                            </label>
                            <input
                                type="file"
                                {...register("grantedNidImage", { required: true })}
                                className={`input input-bordered w-full p-2 rounded-lg border ${errors.grantedNidImage ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.grantedNidImage && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>

                        {/* Rider granted Number */}
                        <div className="col-span-2 md:col-span-2 lg:col-span-1">
                            <label className="block text-gray-700 font-medium mb-1">
                                Rider granted Number*
                            </label>
                            <input
                                type="text"
                                {...register('grantedNumber', { required: true })}
                                className={`input input-bordered w-full p-2 rounded-lg border ${errors.grantedNumber ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.grantedNumber && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>
                        {/* Rider granted Address */}
                        <div className="field mt-3">
                            <label className="block text-gray-700 font-medium mb-1">
                                Rider granted Address*
                            </label>
                            <input
                                type="text"
                                {...register('grantedAddress', { required: true })}
                                className={`input input-bordered w-full p-2 rounded-lg border ${errors.grantedAddress ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.grantedAddress && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>
                        {/* Rider granted occupation */}
                        <div className="field mt-3">
                            <label className="block text-gray-700 font-medium mb-1">
                                Rider Granted occupation*
                            </label>
                            <input
                                type="text"
                                {...register('grantedOccupation', { required: true })}
                                className={`input input-bordered w-full p-2 rounded-lg border ${errors.grantedOccupation ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.grantedOccupation && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>

                        {/* Rider grantedImage */}
                        <div className="field mt-3">
                            <label className="block text-gray-700 font-medium mb-1">
                                Granted Image*
                            </label>
                            <input
                                type="file"
                                {...register("grantedImage", { required: true })}
                                className={`input input-bordered w-full p-2 rounded-lg border ${errors.grantedImage ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.grantedImage && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>

                    </div>
                </div>

                <div className="flex w-full justify-center">
                    {/* Submit Button */}
                    <Button label="Submit" type="submit" className="p-button-success border pl-6 pr-6 font-semibold text-white bg-[#2196F3] p-4 rounded-lg" />
                </div>
            </form>
        </div>
    );
};

export default Rideradd;