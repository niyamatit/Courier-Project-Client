import { useForm } from "react-hook-form";
import useUsersData from "../../../../hooks/useUsersData/useUsersData";

const Add_Account_Merchant = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const paymentMethod = watch("paymentMethod");
const [verifiedUser] =  useUsersData();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg border border-blue-100">
        {/* Header */}
        <div className="bg-blue-400 text-white px-6 py-4 rounded-t-xl">
          <h1 className="text-xl font-semibold">
            Add Merchant Account
          </h1>
          <p className="text-sm text-blue-100">
            Provide payment account details
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 space-y-5"
        >
          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method
            </label>
            <select
              {...register("paymentMethod", { required: true })}
              className="w-full rounded-lg border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 px-3 py-2 outline-none"
            >
              <option value="">Select Method</option>
              <option value="bank">Bank</option>
              <option value="bkash">bKash</option>
              <option value="nagad">Nagad</option>
              <option value="rocket">Rocket</option>
            </select>
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm mt-1">
                Payment method is required
              </p>
            )}
          </div>

          {/* Bank Fields */}
          {paymentMethod === "bank" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Bank Name" register={register("bankName", { required: true })} />
              <Input label="Branch Name" register={register("branchName", { required: true })} />
              <Input label="Account No" register={register("accountNo", { required: true })} />
              <Input label="Account Name" register={register("accountName", { required: true })} />
              <Input label="Routing No" register={register("routingNo", { required: true })} />
            </div>
          )}

          {/* Mobile Wallet */}
          {(paymentMethod === "bkash" ||
            paymentMethod === "nagad" ||
            paymentMethod === "rocket") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Personal Number
              </label>
              <input
                {...register("personalNumber", {
                  required: true,
                  pattern: /^[0-9]{11}$/,
                })}
                placeholder="01XXXXXXXXX"
                className="w-full rounded-lg border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 px-3 py-2 outline-none"
              />
              {errors.personalNumber && (
                <p className="text-red-500 text-sm mt-1">
                  Enter a valid 11-digit number
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg transition duration-200 shadow-md"
          >
            Save Account
          </button>
        </form>
      </div>
    </div>
  );
};

/* Reusable Input Component */
const Input = ({ label, register }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      {...register}
      className="w-full rounded-lg border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 px-3 py-2 outline-none"
    />
  </div>
);

export default Add_Account_Merchant;
