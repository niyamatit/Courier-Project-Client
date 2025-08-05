import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../../api/axiosSecure";

const AllAdminList = () => {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get("/shfjksdhfjdjkfhxnbcnbc67437gch");
      return res.data;
    }
  });

  const adminList = users.filter(user => user.role === 'admin');

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
