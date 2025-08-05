import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../../../api/axiosSecure";
import Swal from "sweetalert2";
import Select from 'react-select';
const AllAdminList = () => {
  const queryClient = useQueryClient();

  // Fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get("/shfjksdhfjdjkfhxnbcnbc67437gch");
      return res.data;
    }
  });

  const adminList = users.filter(user => user.role === 'admin');
 const permissionOptions = [
  { value: "Branch_Section", label: "Branch Section" },
  { value: "Merchant_Section", label: "Merchant Section" },
  { value: "Recharge_History", label: "Recharge History" },
  
  
  
  { value: "Cost_Section", label: "Cost Section" },
//   { value: "dealer_dipu order", label: "dealer_dipu order" },
  { value: "Other_Section", label: "Other Section" },
];
  // Delete mutation
  const deleteAdminMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/users/${id}`);
      return res.data;
    },
   onSuccess: (_, id) => {
    Swal.fire("Deleted!", "Admin has been removed.", "success");

    // Instantly update UI without refetch
    queryClient.setQueryData(['users'], (oldData = []) =>
        oldData.filter(user => user._id !== id)
    );
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
const handlePermissionChange = async (userId, newPermissions) => {
    try {
        await axiosSecure.patch(`/users/aghghghghhg/jhghg/${userId}`, { permissions: newPermissions });

        // ✅ Instantly update cache without waiting for refetch
        queryClient.setQueryData(['users'], (oldData = []) =>
            oldData.map(user =>
                user._id === userId ? { ...user, permissions: newPermissions } : user
            )
        );

        Swal.fire({
            icon: 'success',
            title: 'Permissions Updated!',
            text: 'User permissions updated successfully.',
            showConfirmButton: false,
            timer: 1200
        });
    } catch (error) {
        console.error('Failed to update permissions:', error);
        Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: 'Failed to update permissions. Please try again.',
        });
    }
};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Admin List ({adminList.length})</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-blue-200 shadow-md rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Country</th>
              <th className="py-3 px-4 text-left">Action</th>
              <th className="py-3 px-4 text-left">Give Permission</th>
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
                <td className="py-3 px-4 capitalize text-blue-600 font-medium">{admin.Admin_Country}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDelete(admin._id, admin.name)}
                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
                 <td className="px-6 py-4 text-gray-600 space-y-2">
    
    <Select
    isMulti
    options={permissionOptions}
    value={permissionOptions.filter(opt => (admin.permissions || []).includes(opt.value))}
    onChange={(selectedOptions) => {
        const selectedValues = selectedOptions.map(opt => opt.value);
        handlePermissionChange(admin._id, selectedValues);
    }}
    className="w-60 text-sm"
    classNamePrefix="select"
/>

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
