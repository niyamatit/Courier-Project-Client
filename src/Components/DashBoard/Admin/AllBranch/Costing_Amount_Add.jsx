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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 transform transition duration-500 ">
        <h2 className="text-3xl font-extrabold  text-center mb-6 text-blue-600">Add New Cost</h2>
      

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Dropdown */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Costing Name</label>
            <select
              {...register("cost_name", { required: "Cost name is required" })}
              className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            >
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
            <label className="block text-gray-700 font-semibold mb-2">Amount</label>
            <input
              type="number"
              step="0.01"
              {...register("amount", { required: "Amount is required" })}
              className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="e.g., 50.00"
            />
          </div>

          {/* Note */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Note</label>
            <textarea
              {...register("note")}
              className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="Add an optional note about this cost..."
              rows={4}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
          >
            Add Cost
          </button>
        </form>
      </div>
    </div>
  );
};

export default Costing_Amount_Add;