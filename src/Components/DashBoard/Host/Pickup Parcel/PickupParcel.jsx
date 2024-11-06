import { useQuery } from "@tanstack/react-query";
import { getAllPackage } from "../../../../api/auth";
import TableRow from "./TableRow";
import useUsersData from "../../../../hooks/useUsersData/useUsersData";



const PickupParcel = () => {

    const[verifiedUser] = useUsersData()

    const { data: packages = [], refetch } = useQuery({
    queryKey: ['packages', verifiedUser?.email], // Query key includes user email
    queryFn: () => getAllPackage(verifiedUser?.email), // Function to fetch packages
    enabled: !!verifiedUser?.email, // Only run when email is available
});
// console.log(packages)
    const PickupParcel1 = packages.filter(user => user?.update === 'Rider pickup');

    return (
        <>
            <h1 className="text-2xl font-bold font-rancho text-center text-secondary">Pickup Parcel</h1>
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
                                            Sender Name
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Receiver Name
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Booking Date
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Product Details
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Receiver Contact No
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Note
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Update
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* User data table row */}
                                    {PickupParcel1 &&
                                        PickupParcel1.map(pack => (
                                            <TableRow
                                                key={pack._id}
                                                pack={pack}
                                                refetch={refetch}
                                            />
                                        ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PickupParcel; 