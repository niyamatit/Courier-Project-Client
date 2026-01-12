import { useForm } from "react-hook-form";

const Add_Account_Merchant = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const paymentMethod = watch("paymentMethod");

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h1>Add Account Merchant Dashboard</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Select Payment Method */}
        <div>
          <label>Payment Method</label>
          <select {...register("paymentMethod", { required: true })}>
            <option value="">Select Method</option>
            <option value="bank">Bank</option>
            <option value="bkash">bKash</option>
            <option value="nagad">Nagad</option>
            <option value="rocket">Rocket</option>
          </select>
          {errors.paymentMethod && <p>Payment method is required</p>}
        </div>

        {/* Bank Fields */}
        {paymentMethod === "bank" && (
          <>
            <div>
              <label>Bank Name</label>
              <input {...register("bankName", { required: true })} />
            </div>

            <div>
              <label>Branch Name</label>
              <input {...register("branchName", { required: true })} />
            </div>

            <div>
              <label>Account No</label>
              <input {...register("accountNo", { required: true })} />
            </div>

            <div>
              <label>Account Name</label>
              <input {...register("accountName", { required: true })} />
            </div>

            <div>
              <label>Routing No</label>
              <input {...register("routingNo", { required: true })} />
            </div>
          </>
        )}

        {/* Mobile Wallet Fields */}
        {(paymentMethod === "bkash" ||
          paymentMethod === "nagad" ||
          paymentMethod === "rocket") && (
          <div>
            <label>Personal Number</label>
            <input
              {...register("personalNumber", {
                required: true,
                pattern: /^[0-9]{11}$/,
              })}
              placeholder="01XXXXXXXXX"
            />
            {errors.personalNumber && <p>Valid number is required</p>}
          </div>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Add_Account_Merchant;
