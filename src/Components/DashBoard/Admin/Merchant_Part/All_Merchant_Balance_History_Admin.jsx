import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../../../api/axiosSecure";
import Swal from "sweetalert2";

const All_Merchant_Balance_History_Admin = () => {
  const queryClient = useQueryClient();


  const { data: history = [], isLoading } = useQuery({
    queryKey: ["Admin_Add_Balance_Mer"],
    queryFn: async () => {
      const res = await axiosSecure.get(`mer-add-balance-admin`);
      return res.data;
    },
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`mer-add-balance-admin/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["Admin_Add_Balance_Mer"]);
    },
  });

  // Handle Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This record will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);

        Swal.fire({
          title: "Deleted!",
          text: "Record has been deleted.",
          icon: "success",
          confirmButtonColor: "#2563eb",
        });
      }
    });
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">
        All Merchant Balance History
      </h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-blue-100">
        <table className="table w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th>#</th>
              <th>Merchant</th>
              <th>Amount</th>
              <th>Note</th>
              <th>Added By</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item, index) => (
              <tr
                key={item._id}
                className="hover:bg-blue-50 transition duration-200"
              >
                <td>{index + 1}</td>

                <td className="flex items-center gap-3">
                  <img
                    src={item.Merchant_Image}
                    alt=""
                    className="w-10 h-10 rounded-full border"
                  />
                  <div>
                    <p className="font-semibold">{item.Merchant_name}</p>
                    <p className="text-sm text-gray-500">
                      {item.Merchant_email}
                    </p>
                  </div>
                </td>

                <td
                  className={`font-bold ${
                    item.Amount_Added > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {item.Amount_Added}
                </td>

                <td>{item.Admin_Note}</td>
                <td>{item.Added_By_Admin}</td>

                <td>
                  {new Date(item.date).toLocaleDateString()}
                </td>

                <td>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {history.length === 0 && (
          <p className="text-center p-6 text-gray-500">
            No data found
          </p>
        )}
      </div>
    </div>
  );
};

export default All_Merchant_Balance_History_Admin;