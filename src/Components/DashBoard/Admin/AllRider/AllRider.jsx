import { useQuery } from "@tanstack/react-query";
import useUsersData from "../../../../hooks/useUsersData/useUsersData";
import axiosSecure from "../../../../api/axiosSecure";
import TableRider from "./TableRider";

const fetchRiders = async () => {
    const { data } = await axiosSecure.get("/rider/hgfhdsfghdfkfdgfhdhfdhhdgf");
    return data;
};

const AllRider = () => {
    const [verifiedUser] = useUsersData();

    // Use TanStack Query to fetch data
    const { data: RiderInfo = [], isLoading, error, refetch } = useQuery({
        queryKey: ["riders"],
        queryFn: fetchRiders,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading riders</div>;

    return (
        <div>
            <div className='container mx-auto px-4 sm:px-8'>
                <div className='py-8'>
                    <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                            <table className='min-w-full leading-normal'>
                                <thead>
                                    <tr className="text-lg font-rancho">
                                        <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                            SL
                                        </th>
                                        <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                            Date
                                        </th>
                                        <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                            Rider Image
                                        </th>
                                        <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                            Rider Name
                                        </th>
                                        <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                            Rider Number
                                        </th>
                                        <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                            Rider Nid Number
                                        </th>
                                        <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                            Rider Address
                                        </th>
                                        <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                            Rider Password
                                        </th>
                                        <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                            Rider Branch
                                        </th>
                                        {/* <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                            View
                                        </th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {RiderInfo.map((rider, index) => (
                                        <TableRider
                                            key={rider._id}
                                            rider={rider}
                                            index={index + 1}
                                            refetch={refetch}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllRider;
