import { useQuery } from "@tanstack/react-query";
import useUsersData from "../../../../hooks/useUsersData/useUsersData";
import axiosSecure from "../../../../api/axiosSecure";

const RiderList = () => {
  const [verifiedUser] = useUsersData();

  const { data: My_Rider = [], isLoading } = useQuery({
    queryKey: ["My_Rider", verifiedUser?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/rider/hgfhdsfghdfkfdgfhdhfdhhdgf/${verifiedUser?.name}`
      );
      return response.data;
    },
    enabled: !!verifiedUser?.name,
  });

  if (isLoading) {
    return <p className="text-center py-5 text-blue-600">Loading...</p>;
  }

  return (
    <div className="overflow-x-auto">
      <h1 className="text-xl font-bold text-blue-700 mb-4 text-center">
        My Rider List
      </h1>

      {My_Rider.length === 0 ? (
        <p className="text-center text-gray-500 py-5">
          🚴 No riders found for your account.
        </p>
      ) : (
        <table className="min-w-full border border-blue-300 divide-y divide-blue-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white text-sm">
            <tr>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Number</th>
              <th className="px-4 py-2 text-left">NID</th>
              <th className="px-4 py-2 text-left">Branch</th>
              <th className="px-4 py-2 text-left">Area</th>
              <th className="px-4 py-2 text-left">Commission</th>
              <th className="px-4 py-2 text-left">Granted</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-100 text-sm">
            {My_Rider.map((rider) => (
              <tr
                key={rider._id}
                className="hover:bg-blue-50 transition-colors"
              >
                <td className="px-4 py-2">
                  <img
                    src={rider.Rider_Image}
                    alt={rider.Rider_Name}
                    className="w-12 h-12 rounded-full object-cover border border-blue-300"
                  />
                </td>
                <td className="px-4 py-2">{rider.Rider_Name}</td>
                <td className="px-4 py-2">{rider.Rider_Number}</td>
                <td className="px-4 py-2">{rider.Rider_Nid}</td>
                <td className="px-4 py-2">{rider.Rider_Branch}</td>
                <td className="px-4 py-2">{rider.Rider_Area}</td>
                <td className="px-4 py-2 text-blue-600 font-medium">
                  {rider.Rider_Commission}%
                </td>
                <td className="px-4 py-2">{rider.Rider_Granted}</td>
                <td className="px-4 py-2">{rider.Date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RiderList;
