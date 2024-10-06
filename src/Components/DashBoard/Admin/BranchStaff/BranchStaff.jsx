
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";

const BranchStaff = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    // Sample Dropdown options for post status
    const postOptions = [
        { label: "Manager", value: "Manager" },
        { label: "Asst. Manager", value: "Asst. Manager" },
        { label: "Laver", value: "Laver" },
    ];

    // Sample Dropdown options for user ID
    const userIDOptions = [
        { label: "Manager", value: "Manager" },
        { label: "Asst. Manager", value: "Asst. Manager" },
    ];

    return (
        <div className=" bg-gradient-to-r from-gray-200 to-gray-200">
            <h2 className="font-bold text-xl text-blue-900 p-6">Branch Staff Add</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 text-gray-600">
                <div className="border border-gray-300 p-8 bg-[#f0f3f7]">
                    <div>
                        {/* bs Image */}
                        <div className="field mt-2">
                            <label htmlFor="bsImage" className="block mb-2">
                                Branch Staff Image
                            </label>
                            <FileUpload
                                name="bsImage"
                                customUpload
                                {...register("bsImage", { required: "bs Image is required" })}
                                mode="basic"
                            />
                            {errors.bsImage && (
                                <span className="text-red-500">{errors.bsImage.message}</span>
                            )}
                        </div>

                        {/* bs Name */}
                        <div className="field mt-2">
                            <label htmlFor="bsName" className="block mb-2">
                                Branch Staff Name
                            </label>
                            <InputText
                                id="bsName"
                                {...register("bsName", { required: "bs Name is required" })}
                                className="w-full p-inputtext"
                            />
                            {errors.bsName && (
                                <span className="text-red-500">{errors.bsName.message}</span>
                            )}
                        </div>

                        {/* bs Number */}
                        <div className="field mt-2">
                            <label htmlFor="bsNumber" className="block mb-2">
                                Branch Staff Number
                            </label>
                            <InputNumber
                                id="bsNumber"
                                {...register("bsNumber", { required: "bs Number is required" })}
                                className="w-full p-inputtext"
                            />
                            {errors.bsNumber && (
                                <span className="text-red-500">{errors.bsNumber.message}</span>
                            )}
                        </div>

                        {/* bs NID Number */}
                        <div className="field mt-2">
                            <label htmlFor="bsNid" className="block mb-2">
                                Branch Staff NID Number
                            </label>
                            <InputText
                                id="bsNid"
                                {...register("bsNid", { required: "bs NID Number is required" })}
                                className="w-full p-inputtext"
                            />
                            {errors.bsNid && (
                                <span className="text-red-500">{errors.bsNid.message}</span>
                            )}
                        </div>

                        {/* bs Salary */}
                        <div className="field mt-2">
                            <label htmlFor="bsSalary" className="block mb-2">
                                Branch Staff Salary
                            </label>
                            <InputNumber
                                id="bsSalary"
                                {...register("bsSalary", { required: "bs Salary is required" })}
                                className="w-full p-inputtext"
                                mode="currency"
                                currency="USD"
                            />
                            {errors.bsSalary && (
                                <span className="text-red-500">{errors.bsSalary.message}</span>
                            )}
                        </div>

                        {/* Post Dropdown */}
                        <div className="field mt-2">
                            <label htmlFor="bsPost" className="block mb-2">
                                Post
                            </label>
                            <Dropdown
                                id="bsPost"
                                options={postOptions}
                                {...register("bsPost", { required: "Post is required" })}
                                className="w-full p-dropdown"
                                placeholder="Select a Post"
                            />
                            {errors.bsPost && (
                                <span className="text-red-500">{errors.bsPost.message}</span>
                            )}
                        </div>

                        {/* bs Experience */}
                        <div className="field mt-2">
                            <label htmlFor="bsExperience" className="block mb-2">
                                Branch Staff Experience
                            </label>
                            <InputTextarea
                                id="bsExperience"
                                {...register("bsExperience", { required: "bs Experience is required" })}
                                className="w-full p-inputtext"
                                rows={2}
                            />
                            {errors.bsExperience && (
                                <span className="text-red-500">{errors.bsExperience.message}</span>
                            )}
                        </div>
                    </div>

                    <div>
                        {/* userID Dropdown */}
                        <div className="field mt-2">
                            <label htmlFor="userID" className="block mb-2">
                                User ID
                            </label>
                            <Dropdown
                                id="userID"
                                options={userIDOptions}
                                {...register("userID", { required: "User ID is required" })}
                                className="w-full p-dropdown"
                                placeholder="Select a User ID"
                            />
                            {errors.userID && (
                                <span className="text-red-500">{errors.userID.message}</span>
                            )}
                        </div>

                        {/* bs Password */}
                        <div className="field mt-2">
                            <label htmlFor="bsPassword" className="block mb-2">
                                Branch Staff Password
                            </label>
                            <InputText
                                id="bsPassword"
                                type="password"
                                {...register("bsPassword", {
                                    required: "bs Password is required",
                                })}
                                className="w-full p-inputtext"
                            />
                            {errors.bsPassword && (
                                <span className="text-red-500">{errors.bsPassword.message}</span>
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

export default BranchStaff;
