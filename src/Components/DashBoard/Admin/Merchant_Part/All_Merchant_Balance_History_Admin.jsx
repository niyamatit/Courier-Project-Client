import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axiosSecure from "../../../../api/axiosSecure";
import Swal from "sweetalert2";

const All_Merchant_Balance_History_Admin = () => {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Fetch Data
  const { data: history = [], isLoading } = useQuery({
    queryKey: ["Admin_Add_Balance_Mer"],
    queryFn: async () => {
      const res = await axiosSecure.get(`mer-add-balance-admin`);
      return res.data;
    },
  });

 
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`mer-add-balance-admin/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["Admin_Add_Balance_Mer"]);
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Record?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };


  const filteredData = history.filter((item) => {
    const searchMatch =
      item.Merchant_name.toLowerCase().includes(search.toLowerCase()) ||
      item.Merchant_email.toLowerCase().includes(search.toLowerCase());

    const itemDate = new Date(item.date);

    const fromMatch = fromDate ? itemDate >= new Date(fromDate) : true;
    const toMatch = toDate ? itemDate <= new Date(toDate) : true;

    return searchMatch && fromMatch && toMatch;
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">
        Merchant Balance History
      </h1>

    
      <div className="bg-white p-4 rounded-xl shadow border border-blue-100 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
       
          <input
            type="text"
            placeholder="Search by name or email..."
            className="input input-bordered w-full focus:border-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          
          <input
            type="date"
            className="input input-bordered w-full focus:border-blue-500"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />

        
          <input
            type="date"
            className="input input-bordered w-full focus:border-blue-500"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>

    
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-blue-100">
        <table className="table w-full min-w-[800px]">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th>SL</th>
              <th>Merchant</th>
              <th>Amount</th>
              <th>Note</th>
              <th>Added By</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item, index) => (
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
                    <p className="font-semibold">
                      {item.Merchant_name}
                    </p>
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
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredData.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-500">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default All_Merchant_Balance_History_Admin;