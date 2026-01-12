import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useUsersData from "../../../../hooks/useUsersData/useUsersData";
import axiosSecure from "../../../../api/axiosSecure";
import Swal from "sweetalert2";

const Add_Account_Merchant = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const paymentMethod = watch("paymentMethod");
  const [verifiedUser] = useUsersData();

 
  const {
    data: accounts = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["merchantAccounts", verifiedUser?.email],
    enabled: !!verifiedUser?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/merchant-accounts?email=${verifiedUser.email}`
      );
      return res.data;
    },
  });

  const isDisabled = accounts.length >= 1;

  
  const onSubmit = async (data) => {
    try {
      const payload = {
        paymentMethod: data.paymentMethod || null,
        bankName: data.bankName || null,
        branchName: data.branchName || null,
        accountNo: data.accountNo || null,
        accountName: data.accountName || null,
        routingNo: data.routingNo || null,
        personalNumber: data.personalNumber || null,
        addedBy: verifiedUser?.email,
        addedByName: verifiedUser?.name,
        date: new Date().toISOString(),
      };

      await axiosSecure.post("/merchant-add-accounts", payload);
      
      Swal.fire("Success", "Account added successfully", "success");
      reset();
      refetch();
    } catch (error) {
      Swal.fire("Error", "Failed to add account", "error");
    }
  };


  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This account will be permanently deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/merchant-accounts/${id}`);
      Swal.fire("Deleted!", "Account removed", "success");
      refetch();
    } catch {
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* ================= FORM ================= */}
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg border border-blue-100">
        <div className="bg-blue-400 text-white px-6 py-4 rounded-t-xl">
          <h1 className="text-xl font-semibold">Add  Account</h1>
          <p className="text-sm text-red-200">
            Only one account is allowed
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Payment Method
            </label>
            <select
              {...register("paymentMethod", {
                required: "Payment method is required",
              })}
              disabled={isDisabled}
              className={`w-full rounded-lg border px-3 py-2
                ${
                  errors.paymentMethod
                    ? "border-red-400"
                    : "border-gray-300 focus:border-blue-400"
                }
              `}
            >
              <option value="">Select Method</option>
              <option value="bank">Bank</option>
              <option value="bkash">bKash</option>
              <option value="nagad">Nagad</option>
              <option value="rocket">Rocket</option>
            </select>
            {errors.paymentMethod && (
              <p className="text-red-500 text-xs mt-1">
                {errors.paymentMethod.message}
              </p>
            )}
          </div>

          {/* BANK FIELDS */}
          {paymentMethod === "bank" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Bank Name"
                name="bankName"
                register={register}
                errors={errors}
                rules={{ required: "Bank name is required" }}
              />

              <Input
                label="Branch Name"
                name="branchName"
                register={register}
                errors={errors}
                rules={{ required: "Branch name is required" }}
              />

              <Input
                label="Account No"
                name="accountNo"
                register={register}
                errors={errors}
                rules={{ required: "Account number is required" }}
              />

              <Input
                label="Account Name"
                name="accountName"
                register={register}
                errors={errors}
                rules={{ required: "Account name is required" }}
              />

              <Input
                label="Routing No"
                name="routingNo"
                register={register}
                errors={errors}
                rules={{ required: "Routing number is required" }}
              />
            </div>
          )}

          {/* MOBILE WALLET */}
          {(paymentMethod === "bkash" ||
            paymentMethod === "nagad" ||
            paymentMethod === "rocket") && (
            <Input
              label="Personal Number"
              name="personalNumber"
              register={register}
              errors={errors}
              rules={{
                required: "Personal number is required",
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Must be a valid 11-digit number",
                },
              }}
              placeholder="01XXXXXXXXX"
            />
          )}

          {/* SUBMIT */}
          <button
            disabled={isDisabled}
            className={`w-full py-2.5 rounded-lg font-semibold text-white
              ${
                isDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-400 hover:bg-blue-500"
              }
            `}
          >
            Save Account
          </button>
        </form>
      </div>

      {/* ================= ACCOUNT LIST ================= */}
      <div className="max-w-xl mx-auto mt-6 bg-white rounded-xl shadow p-4">
  <h2 className="font-semibold mb-4 text-gray-700">
    Added Account Details
  </h2>

  {isLoading ? (
    <p>Loading...</p>
  ) : accounts.length === 0 ? (
    <p className="text-sm text-gray-500">No account added yet</p>
  ) : (
    accounts.map((acc) => (
      <div
        key={acc._id}
        className="border rounded-lg p-4 mb-4 bg-gray-50"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold capitalize text-blue-500">
            {acc.paymentMethod} Account
          </p>

          <button
            onClick={() => handleDelete(acc._id)}
            className="text-red-500 text-sm hover:text-red-600"
          >
            Delete
          </button>
        </div>

        {/* BANK DETAILS */}
        {acc.paymentMethod === "bank" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
            <p><span className="font-medium">Bank Name:</span> {acc.bankName}</p>
            <p><span className="font-medium">Branch:</span> {acc.branchName}</p>
            <p><span className="font-medium">Account No:</span> {acc.accountNo}</p>
            <p><span className="font-medium">Account Name:</span> {acc.accountName}</p>
            <p><span className="font-medium">Routing No:</span> {acc.routingNo}</p>
          </div>
        )}

        {/* MOBILE WALLET DETAILS */}
        {(acc.paymentMethod === "bkash" ||
          acc.paymentMethod === "nagad" ||
          acc.paymentMethod === "rocket") && (
          <div className="text-sm text-gray-700">
            <p>
              <span className="font-medium">Personal Number:</span>{" "}
              {acc.personalNumber}
            </p>
          </div>
        )}

        
      </div>
    ))
  )}
</div>

    </div>
  );
};


const Input = ({
  label,
  name,
  register,
  errors,
  rules,
  placeholder,
}) => (
  <div>
    <label className="block text-sm font-medium mb-1">
      {label}
    </label>
    <input
      {...register(name, rules)}
      placeholder={placeholder}
      className={`w-full rounded-lg border px-3 py-2 outline-none
        ${
          errors?.[name]
            ? "border-red-400 focus:ring-red-200"
            : "border-gray-300 focus:border-blue-400 focus:ring-blue-200"
        }
      `}
    />
    {errors?.[name] && (
      <p className="text-red-500 text-xs mt-1">
        {errors[name].message}
      </p>
    )}
  </div>
);

export default Add_Account_Merchant;
