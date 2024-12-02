

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TableRow from "./TableRow";
import { getOfflineBooking } from "../../../../api/bookings";
import useUsersData from "../../../../hooks/useUsersData/useUsersData";

const OfflineBookingList = () => {
  const [verifiedUser] = useUsersData();
  const [searchDate, setSearchDate] = useState(""); // State to store the search date

  const { data: packages = [], refetch } = useQuery({
    queryKey: ['packages', verifiedUser?.email],
    queryFn: () => getOfflineBooking(verifiedUser?.email),
    enabled: !!verifiedUser?.email,
  });

  // Filter packages by search date
  const filteredPackages = searchDate
    ? packages.filter((pack) => {
      const bookingDate = new Date(pack.bookingDate).toISOString().split("T")[0]; // Format booking date as YYYY-MM-DD
      return bookingDate === searchDate;
    })
    : packages;

  return (
    <>
      <h1 className="text-2xl font-bold font-rancho text-center text-secondary">
        Offline Booking List
      </h1>

      {/* Date search input */}
      <div className="my-4 text-center">
        <label htmlFor="search-date" className="mr-2 text-lg font-medium text-gray-700">
          Search by Date:
        </label>
        <input
          type="date"
          id="search-date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        />
      </div>

      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr className="text-lg font-rancho">
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                    >
                      Sender Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                    >
                      Receiver Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                    >
                      Booking Date
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                    >
                      Receiver Mobile
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                    >
                      Cn Number
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Filtered data table row */}
                  {filteredPackages &&
                    filteredPackages.map((pack) => (
                      <TableRow key={pack._id} pack={pack} refetch={refetch} />
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

export default OfflineBookingList;
