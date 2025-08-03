import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../../api/axiosSecure";
import useUsersData from "../../../../hooks/useUsersData/useUsersData";
import Swal from "sweetalert2";

const Costing_Amount_Add = () => {
  const [verifiedUser] = useUsersData();

  const { data: cost_names = [] } = useQuery({
    queryKey: ['cost_names'],
    queryFn: async () => {
      const res = await axiosSecure.get("/costs-name");
      return res.data;
    }
  });

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const newCost = {
      cost_name: data.cost_name,
      amount: parseFloat(data.amount),
      note: data.note,
      date: new Date(),
      Who_Added: verifiedUser?.email,
      Who_Added_Name: verifiedUser?.name
    };

    try {
      const res = await axiosSecure.post("/add-cost", newCost);
      if (res.data?.insertedId) {
        Swal.fire("Success!", "Cost added successfully", "success");
        reset();
      }
    } catch (error) {
      console.error("Failed to add cost:", error);
      Swal.fire("Error!", "Failed to add cost", "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Add Costing Amount</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Dropdown */}
        <div>
          <label className="block mb-1 font-medium">Costing Name</label>
          <select {...register("cost_name", { required: true })} className="w-full border px-3 py-2 rounded">
            <option value="">Select a cost name</option>
            {cost_names.map((item) => (
              <option key={item._id} value={item.cost_name}>
                {item.cost_name}
              </option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="block mb-1 font-medium">Amount</label>
          <input
            type="number"
            step="0.01"
            {...register("amount", { required: true })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter amount"
          />
        </div>

        {/* Note */}
        <div>
          <label className="block mb-1 font-medium">Note</label>
          <textarea
            {...register("note")}
            className="w-full border px-3 py-2 rounded"
            placeholder="Optional note"
            rows={3}
          />
        </div>

        {/* Submit */}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Cost
        </button>
      </form>
    </div>
  );
};

export default Costing_Amount_Add;
