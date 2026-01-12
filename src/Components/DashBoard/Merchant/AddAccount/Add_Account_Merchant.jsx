/* eslint-disable no-unused-vars */
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

 
  const onSubmit = async (data) => {
    try {
      const payload = {
        paymentMethod,
        ...data,
        addedBy: verifiedUser?.email,
        addedByName: verifiedUser?.name,
        date: new Date().toISOString(),
      };

      await axiosSecure.post("/merchant-accounts", payload);

      Swal.fire("Success", "Account added successfully", "success");
      reset();
      refetch();
    } catch (error) {
      Swal.fire("Error", "Failed to add account", "error");
    }
  };


  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This account will be deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/merchant-accounts/${id}`);
      Swal.fire("Deleted", "Account removed", "success");
      refetch();
    } catch {
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  const isDisabled = accounts.length >= 1;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg border border-blue-100">
        {/* Header */}
        <div className="bg-blue-400 text-white px-6 py-4 rounded-t-xl">
          <h1 className="text-xl font-semibold">Add Merchant Account</h1>
          <p className="text-sm text-blue-100">
            Only one account is allowed
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          <select
            {...register("paymentMethod", { required: true })}
            disabled={isDisabled}
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="">Select Method</option>
            <option value="bank">Bank</option>
            <option value="bkash">bKash</option>
            <option value="nagad">Nagad</option>
            <option value="rocket">Rocket</option>
          </select>

          {paymentMethod === "bank" && (
            <div className="grid grid-cols-2 gap-4">
              <Input label="Bank Name" register={register("bankName", { required: true })} />
              <Input label="Branch Name" register={register("branchName", { required: true })} />
              <Input label="Account No" register={register("accountNo", { required: true })} />
              <Input label="Account Name" register={register("accountName", { required: true })} />
              <Input label="Routing No" register={register("routingNo", { required: true })} />
            </div>
          )}

          {(paymentMethod === "bkash" ||
            paymentMethod === "nagad" ||
            paymentMethod === "rocket") && (
            <input
              {...register("personalNumber", { required: true })}
              placeholder="01XXXXXXXXX"
              className="w-full border rounded-lg px-3 py-2"
            />
          )}

          <button
            disabled={isDisabled}
            className={`w-full py-2.5 rounded-lg font-semibold text-white transition
              ${
                isDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-400 hover:bg-blue-500"
              }`}
          >
            Save Account
          </button>
        </form>
      </div>

     
      <div className="max-w-xl mx-auto mt-6 bg-white rounded-xl shadow p-4">
        <h2 className="font-semibold mb-3 text-gray-700">
          Added Account
        </h2>

        {isLoading ? (
          <p>Loading...</p>
        ) : accounts.length === 0 ? (
          <p className="text-sm text-gray-500">No account added yet</p>
        ) : (
          accounts.map((acc) => (
            <div
              key={acc._id}
              className="flex justify-between items-center border rounded-lg p-3 mb-2"
            >
              <div>
                <p className="font-medium capitalize">{acc.paymentMethod}</p>
                <p className="text-sm text-gray-500">
                  {acc.personalNumber || acc.bankName}
                </p>
              </div>

              <button
                onClick={() => handleDelete(acc._id)}
                className="text-red-500 hover:text-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

/* Reusable Input */
const Input = ({ label, register }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <input
      {...register}
      className="w-full border rounded-lg px-3 py-2"
    />
  </div>
);

export default Add_Account_Merchant;
