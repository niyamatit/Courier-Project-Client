
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";

const Rideradd = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    // Sample Dropdown options for gender and marital status
    const genderOptions = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
    ];

    const maritalStatusOptions = [
        { label: "Single", value: "single" },
        { label: "Married", value: "married" },
        { label: "Divorced", value: "divorced" },
        { label: "Widowed", value: "widowed" },
    ];

    return (
        <div className=" bg-gradient-to-r from-gray-200 to-gray-200">
            <h2 className="font-bold text-xl text-blue-900 p-4">Rider Add</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="p-2 space-y-4 text-gray-600">
                <div className="grid md:grid-cols-2 gap-4 border border-gray-300 p-4 bg-[#f0f3f7]">
                    <div>
                        {/* Rider Image */}
                        <div className="field mt-3">
                            <label htmlFor="riderImage" className="block mb-1">
                                Rider Image
                            </label>
                            <FileUpload
                                name="riderImage"
                                customUpload
                                {...register("riderImage", { required: "Rider Image is required" })}
                                mode="basic"
                            />
                            {errors.riderImage && (
                                <span className="text-red-500">{errors.riderImage.message}</span>
                            )}
                        </div>

                        {/* Rider Name */}
                        <div className="field mt-3">
                            <label htmlFor="riderName" className="block mb-1">
                                Rider Name
                            </label>
                            <InputText
                                id="riderName"
                                {...register("riderName", { required: "Rider Name is required" })}
                                className="w-full p-inputtext"
                            />
                            {errors.riderName && (
                                <span className="text-red-500">{errors.riderName.message}</span>
                            )}
                        </div>

                        {/* Rider Number */}
                        <div className="field mt-3">
                            <label htmlFor="riderNumber" className="block mb-1">
                                Rider Number
                            </label>
                            <InputNumber
                                id="riderNumber"
                                {...register("riderNumber", { required: "Rider Number is required" })}
                                className="w-full p-inputtext"
                            />
                            {errors.riderNumber && (
                                <span className="text-red-500">{errors.riderNumber.message}</span>
                            )}
                        </div>

                        {/* Rider NID Number */}
                        <div className="field mt-3">
                            <label htmlFor="riderNid" className="block mb-1">
                                Rider NID Number
                            </label>
                            <InputText
                                id="riderNid"
                                {...register("riderNid", { required: "Rider NID Number is required" })}
                                className="w-full p-inputtext"
                            />
                            {errors.riderNid && (
                                <span className="text-red-500">{errors.riderNid.message}</span>
                            )}
                        </div>

                        {/* Rider Address */}
                        <div className="field mt-3">
                            <label htmlFor="riderAddress" className="block mb-1">
                                Rider Address
                            </label>
                            <InputTextarea
                                id="riderAddress"
                                {...register("riderAddress", { required: "Rider Address is required" })}
                                className="w-full p-inputtext"
                                rows={2}
                            />
                            {errors.riderAddress && (
                                <span className="text-red-500">{errors.riderAddress.message}</span>
                            )}
                        </div>

                        {/* Rider Branch/Hub */}
                        <div className="field mt-3">
                            <label htmlFor="riderBranch" className="block mb-1">
                                Rider Branch/Hub
                            </label>
                            <InputText
                                id="riderBranch"
                                {...register("riderBranch", { required: "Rider Branch is required" })}
                                className="w-full p-inputtext"
                            />
                            {errors.riderBranch && (
                                <span className="text-red-500">{errors.riderBranch.message}</span>
                            )}
                        </div>

                        {/* Rider Area */}
                        <div className="field mt-3">
                            <label htmlFor="riderArea" className="block mb-1">
                                Rider Area
                            </label>
                            <InputText
                                id="riderArea"
                                {...register("riderArea", { required: "Rider Area is required" })}
                                className="w-full p-inputtext"
                            />
                            {errors.riderArea && (
                                <span className="text-red-500">{errors.riderArea.message}</span>
                            )}
                        </div>

                        {/* Rider Salary */}
                        <div className="field mt-3">
                            <label htmlFor="riderSalary" className="block mb-1">
                                Rider Salary
                            </label>
                            <InputNumber
                                id="riderSalary"
                                {...register("riderSalary", { required: "Rider Salary is required" })}
                                className="w-full p-inputtext"
                                mode="currency"
                                currency="USD"
                            />
                            {errors.riderSalary && (
                                <span className="text-red-500">{errors.riderSalary.message}</span>
                            )}
                        </div>

                        {/* Rider Commission per Success Parcel */}
                        <div className="field mt-3">
                            <label htmlFor="riderCommission" className="block mb-1">
                                Rider Commission per Success Parcel
                            </label>
                            <InputNumber
                                id="riderCommission"
                                {...register("riderCommission", {
                                    required: "Rider Commission is required",
                                })}
                                className="w-full p-inputtext"
                            />
                            {errors.riderCommission && (
                                <span className="text-red-500">{errors.riderCommission.message}</span>
                            )}
                        </div>
                    </div>

                    <div>
                        {/* Rider Gender */}
                        <div className="field mt-3">
                            <label htmlFor="riderGender" className="block mb-1">
                                Rider Gender
                            </label>
                            <Dropdown
                                id="riderGender"
                                options={genderOptions}
                                {...register("riderGender", { required: "Rider Gender is required" })}
                                className="w-full p-dropdown"
                            />
                            {errors.riderGender && (
                                <span className="text-red-500">{errors.riderGender.message}</span>
                            )}
                        </div>

                        {/* Rider Marital Status */}
                        <div className="field mt-3">
                            <label htmlFor="riderMaritalStatus" className="block mb-1">
                                Rider Marital Status
                            </label>
                            <Dropdown
                                id="riderMaritalStatus"
                                options={maritalStatusOptions}
                                {...register("riderMaritalStatus", {
                                    required: "Rider Marital Status is required",
                                })}
                                className="w-full p-dropdown"
                            />
                            {errors.riderMaritalStatus && (
                                <span className="text-red-500">{errors.riderMaritalStatus.message}</span>
                            )}
                        </div>

                        {/* Remaining Fields (Repeat similar approach for granted details) */}
                        {/* Rider Granted Name */}
                        <div className="field mt-3">
                            <label htmlFor="grantedName" className="block mb-1">
                                Rider Granted Name
                            </label>
                            <InputText
                                id="grantedName"
                                {...register("grantedName", { required: "Rider Granted Name is required" })}
                                className="w-full p-inputtext"
                            />
                            {errors.grantedName && (
                                <span className="text-red-500">{errors.grantedName.message}</span>
                            )}
                        </div>
                        {/* Rider Granted Relations */}
                        <div className="field mt-3">
                            <label htmlFor="grantedRelations" className="block mb-1">
                                Rider Granted Relations
                            </label>
                            <InputText
                                id="grantedRelations"
                                {...register("grantedRelations", { required: "Rider Granted Name is required" })}
                                className="w-full p-inputtext"
                            />
                            {errors.grantedRelations && (
                                <span className="text-red-500">{errors.grantedRelations.message}</span>
                            )}
                        </div>
                        {/* Rider granted NID Image */}
                        <div className="field mt-3">
                            <label htmlFor="grantedNID" className="block mb-1">
                                Rider granted NID
                            </label>
                            <FileUpload
                                name="grantedNID"
                                customUpload
                                {...register("grantedNID", { required: "Rider granted NID Image is required" })}
                                mode="basic"
                            />
                            {errors.grantedNID && (
                                <span className="text-red-500">{errors.grantedNID.message}</span>
                            )}
                        </div>

                        {/* Rider granted Number */}
                        <div className="field mt-3">
                            <label htmlFor="grantedNumber" className="block mb-1">
                                Rider granted Number
                            </label>
                            <InputNumber
                                id="grantedNumber"
                                {...register("grantedNumber", { required: "granted Number is required" })}
                                className="w-full p-inputtext"
                            />
                            {errors.grantedNumber && (
                                <span className="text-red-500">{errors.grantedNumber.message}</span>
                            )}
                        </div>
                        {/* Rider granted Address */}
                        <div className="field mt-3">
                            <label htmlFor="grantedAddress" className="block mb-1">
                                Rider granted Address
                            </label>
                            <InputTextarea
                                id="grantedAddress"
                                {...register("grantedAddress", { required: "granted Address is required" })}
                                className="w-full p-inputtext"
                                rows={2}
                            />
                            {errors.grantedAddress && (
                                <span className="text-red-500">{errors.grantedAddress.message}</span>
                            )}
                        </div>
                        {/* Rider granted occupation */}
                        <div className="field mt-3">
                            <label htmlFor="grantedOccupation" className="block mb-1">
                                Rider granted Occupation
                            </label>
                            <InputTextarea
                                id="grantedOccupation"
                                {...register("grantedOccupation", { required: "granted Occupation is required" })}
                                className="w-full p-inputtext"
                                rows={2}
                            />
                            {errors.grantedOccupation && (
                                <span className="text-red-500">{errors.grantedOccupation.message}</span>
                            )}
                        </div>

                        {/* Rider grantedImage */}
                        <div className="field mt-3">
                            <label htmlFor="grantedImage" className="block mb-1">
                                Rider granted Image
                            </label>
                            <FileUpload
                                name="grantedImage"
                                customUpload
                                {...register("grantedImage", { required: "Rider granted Image Image is required" })}
                                mode="basic"
                            />
                            {errors.grantedImage && (
                                <span className="text-red-500">{errors.grantedImage.message}</span>
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