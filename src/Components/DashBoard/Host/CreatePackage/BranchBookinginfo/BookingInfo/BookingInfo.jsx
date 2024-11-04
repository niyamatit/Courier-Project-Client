
import { useQuery } from '@tanstack/react-query'
import useAuth from '../../../../../../hooks/useAuth'
// import useUsersData from '../../../../../../hooks/useUsersData/useUsersData'
import TableBooking from '../TableBooking/TableBooking'
import { getPackage } from '../../../../../../api/auth'


const BookingInfo = () => {
    const { loading } = useAuth()
    // const [verifiedUser] = useUsersData()

    const {
        data: bookings = [],
        isLoading,
    } = useQuery({
        queryKey: ['bookings'],
        enabled: !loading,
        queryFn: async () => await getPackage(),
    })

    console.log("all pack", bookings)


    if (isLoading) return <p>Loading...</p>

    // Filter bookings based on the logged-in user's email
    // const userBookings = bookings.filter(booking => booking?.email === verifiedUser?.email);

    return (
        <>
            <div className='container mx-auto px-4 sm:px-8'>
                <div className='py-8'>
                    <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                            <table className='min-w-full leading-normal'>
                                <thead>
                                    <tr>
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
                                            Recipient Name
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Sender Mobile
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Recipient Mobile
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Product Details
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map(booking => (
                                        <TableBooking key={booking._id} booking={booking} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookingInfo
