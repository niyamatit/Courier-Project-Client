import { useQuery } from "@tanstack/react-query";
import useUsersData from "../../../../hooks/useUsersData/useUsersData";
import { getAllRider } from "../../../../api/auth";
import TableRider from "./TableRider";


const AllRider = () => {
    const [verifiedUser] = useUsersData()

    const { data: riders = [], refetch } = useQuery({
        queryKey: ['riders', verifiedUser?.email], // Query key includes user email
        queryFn: () => getAllRider(verifiedUser?.email), // Function to fetch riders
        enabled: !!verifiedUser?.email, // Only run when email is available
    });


    const RiderInfo = riders.filter(user => user?.update === 'rider');

    return (
        <div>
            <div className='container mx-auto px-4 sm:px-8'>

                <div className='py-8'>
                    <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                            <table className='min-w-full leading-normal'>
                                <thead>
                                    <tr className="text-lg font-rancho">

                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Rider Name
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Rider Number
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Rider Nid Number
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Rider Address
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Rider Branch
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* User data table row */}
                                    {RiderInfo &&
                                        RiderInfo.map(rider => (
                                            <TableRider
                                                key={rider._id}
                                                rider={rider}
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