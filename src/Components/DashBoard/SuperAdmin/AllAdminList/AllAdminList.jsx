import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../../../api/axiosSecure";
import Swal from "sweetalert2";

const AllAdminList = () => {
  const queryClient = useQueryClient();

  // Fetch all users
  const { data: users = [], isLoading,refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get("/shfjksdhfjdjkfhxnbcnbc67437gch");
      return res.data;
    }
  });

  const adminList = users.filter(user => user.role === 'admin');

  // Delete mutation
  const deleteAdminMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/users/${id}`);
      return res.data;
    },
    onSuccess: () => {

      Swal.fire("Deleted!", "Admin has been removed.", "success");
      queryClient.invalidateQueries(['users']); 
      refetch()
    // Refresh user list
    },
    onError: () => {
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  });

  // Confirm delete
  const handleDelete = (id, name) => {
    Swal.fire({
      title: `Delete ${name}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAdminMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p className="text-center mt-10 text-blue-600 font-semibold">Loading admin list...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Admin List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-blue-200 shadow-md rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {adminList.map((admin, index) => (
              <tr key={admin._id} className="even:bg-blue-50 hover:bg-blue-100 transition-all duration-150">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">
                  <img
                    src={admin.imageUrl}
                    alt={admin.name}
                    className="w-10 h-10 rounded-full object-cover border border-blue-300"
                  />
                </td>
                <td className="py-3 px-4">{admin.name}</td>
                <td className="py-3 px-4">{admin.email}</td>
                <td className="py-3 px-4 capitalize text-blue-600 font-medium">{admin.role}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDelete(admin._id, admin.name)}
                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {adminList.length === 0 && (
          <p className="text-center text-red-500 mt-4">No admins found.</p>
        )}
      </div>
    </div>
  );
};

export default AllAdminList;
