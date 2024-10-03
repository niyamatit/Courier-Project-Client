
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";


const BranchAdd = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };


    // Sample Dropdown options for user ID
    const branchType = [
        { label: "Union", value: "Union" },
        { label: "Sub-district", value: "Sub-district" },
        { label: "District", value: "District" },
        { label: "Divisional", value: "Divisional" },
    ];
    return (
        <div className=" bg-gradient-to-r from-gray-200 to-gray-200">
            <h2 className="font-bold text-xl text-blue-900 p-6">Branch Add</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 text-gray-600">
                <div className="border border-gray-300 p-8 bg-[#f0f3f7]">
                    <div>

                        {/* branch Name */}
                        <div className="field mt-2">
                            <label htmlFor="Branch Name:" className="block mb-2">
                                Branch Name
                            </label>
                            <InputText
                                id="branchName"
                                {...register("branchName", { required: "Branch Name is required" })}
                                className="w-full p-inputtext"
                            />
                            {errors.branchName && (
                                <span className="text-red-500">{errors.branchName.message}</span>
                            )}
                        </div>

                        {/* branch Number */}
                        <div className="field mt-2">
                            <label htmlFor="branchNumber" className="block mb-2">
                                Branch Number
                            </label>
                            <InputNumber
                                id="branchNumber"
                                {...register("branchNumber", { required: "branch Number is required" })}
                                className="w-full p-inputtext"
                            />
                            {errors.branchNumber && (
                                <span className="text-red-500">{errors.branchNumber.message}</span>
                            )}
                        </div>


                        {/* address */}
                        <div className="field mt-2">
                            <label htmlFor="Branch Address:" className="block mb-2">
                                Branch Address
                            </label>
                            <InputText
                                id="branchAddress"
                                {...register("branchAddress", { required: "Branch Address is required" })}
                                className="w-full p-inputtext"
                            />
                            {errors.branchName && (
                                <span className="text-red-500">{errors.branchName.message}</span>
                            )}
                        </div>
                        {/* branch commission */}
                        <div className="field mt-2">
                            <label htmlFor="Branch Name:" className="block mb-2">
                                Branch commission
                            </label>
                            <InputText
                                id="branchName"
                                {...register("branchName", { required: "Branch commission is required" })}
                                className="w-full p-inputtext"
                            />
                            {errors.branchName && (
                                <span className="text-red-500">{errors.branchName.message}</span>
                            )}
                        </div>

                    </div>

                    <div>
                        {/* userID Dropdown */}
                        <div className="field mt-2">
                            <label htmlFor="branchType" className="block mb-2">
                                Branch Type
                            </label>
                            <Dropdown
                                id="branchType"
                                options={branchType}
                                {...register("branchType", { required: "User ID is required" })}
                                className="w-full p-dropdown"
                                placeholder="Select a User ID"
                            />
                            {errors.branchType && (
                                <span className="text-red-500">{errors.branchType.message}</span>
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

export default BranchAdd;