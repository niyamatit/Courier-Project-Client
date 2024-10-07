
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";


const RechargeApply = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className=" bg-gradient-to-r from-gray-200 to-gray-200">
            <h2 className="font-bold text-xl text-blue-900 p-6">Recharge Apply</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 text-gray-600">
                <div className="border border-gray-300 p-8 bg-[#f0f3f7]">
                    <div>

                        {/* account Name */}
                        <div className="field mt-2">
                            <label htmlFor="account Name:" className="block mb-2">
                                Account Name
                            </label>
                            <InputText
                                id="accountName"
                                {...register("accountName", { required: "account Name is required" })}
                                className="w-full p-inputtext"
                            />
                            {errors.accountName && (
                                <span className="text-red-500">{errors.accountName.message}</span>
                            )}
                        </div>

                        {/* account Number */}
                        <div className="field mt-2">
                            <label htmlFor="accountNumber" className="block mb-2">
                                Account Number
                            </label>
                            <InputNumber
                                id="accountNumber"
                                {...register("accountNumber", { required: "account Number is required" })}
                                className="w-full p-inputtext"
                            />
                            {errors.accountNumber && (
                                <span className="text-red-500">{errors.accountNumber.message}</span>
                            )}
                        </div>


                        {/* amount */}
                        <div className="field mt-2">
                            <label htmlFor="account amount:" className="block mb-2">
                                Account amount
                            </label>
                            <InputText
                                id="branchAddress"
                                {...register("branchAddress", { required: "account amount is required" })}
                                className="w-full p-inputtext"
                            />
                            {errors.accountamount && (
                                <span className="text-red-500">{errors.accountamount.message}</span>
                            )}
                        </div>
                        {/* recharge note */}
                        <div className="field mt-2">
                            <label htmlFor="recharge note:" className="block mb-2">
                                Recharge note
                            </label>
                            <InputText
                                id="rechargenote"
                                {...register("rechargenote", { required: "recharge note is required" })}
                                className="w-full p-inputtext"
                            />
                            {errors.rechargeNote && (
                                <span className="text-red-500">{errors.rechargeNote.message}</span>
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

export default RechargeApply;