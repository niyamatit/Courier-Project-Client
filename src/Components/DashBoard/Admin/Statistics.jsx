
import { FaUserAlt, FaSalesforce } from 'react-icons/fa'
import { BsFillHouseDoorFill } from 'react-icons/bs'
import SalesLineChart from './SalesLineChart'
import { useEffect, useState } from 'react'
import { getAdminStat } from '../../../api/utils'
import StatisticsCard from './StatisticsCard'
import axiosSecure from '../../../api/axiosSecure'
import useUsersData from '../../../hooks/useUsersData/useUsersData'
import { useQuery } from '@tanstack/react-query'



const AdminStatistics = () => {
  const [statData, setStatData] = useState({})

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get("/shfjksdhfjdjkfhxnbcnbc67437gch");
      return res.data;
    }
  })
  const [verifiedUser] = useUsersData();
  const merchants = users.filter(user => user.role === "merchant");
  const totalMerchants = merchants.length;

  useEffect(() => {
    getAdminStat()
      .then(data => setStatData(data))
  }, [])
  // console.log(statData)
  return (
    <div>
      <div className='mt-12 text-gray-500'>
        {/* small cards */}
        <div className='mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {/* Sales Card */}
          <StatisticsCard
            title="Total Sales"
            icon={<FaSalesforce />}
            value={0}
            color="bg-[#FFE5D9]"
          />
          {/* Users Card */}
          {/* <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40`}
            >
              <FaUserAlt className='w-6 h-6 text-white' />
            </div>
            <div className='p-4 text-right'>
              <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                Total User
              </p>
              <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                {statData?.userCount}
              </h4>
            </div>
          </div> */}
          <StatisticsCard
            title="Total User"
            icon={<FaUserAlt />}
            value={statData?.userCount}
            color="bg-[#F5FFFA]"
          />
          <StatisticsCard
            title="Total Online Bookings"
            icon={<FaUserAlt />}
            value={0}
            color="bg-[#B0E0E6]"
          />
          {/* Total Rooms */}
          <StatisticsCard
            title="Total Rider"
            icon={<BsFillHouseDoorFill />}
            value={0}
            color="bg-[#FFD1DC]"
          />
          <StatisticsCard
            title="Total Merchnat"
            icon={<BsFillHouseDoorFill />}
            value={0}
            color="bg-[#E6E6FA]"
          />
          <StatisticsCard
            title="Total Recharge"
            icon={<BsFillHouseDoorFill />}
            value={0}
            color="bg-[#FFFACD]"
          />
          {/* <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount}
            color="bg-[#E0FFFF]"
          />
          <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount}
            color="bg-[#F3E5F5]"
          />
          <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount}
            color="bg-[#D5F3E5]"
          />
          <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount}
            color="bg-[#F7E7CE]"
          /> */}
          <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount}
            color="bg-[#F0FFF0]"
          />
          <StatisticsCard
            title="Total User"
            icon={<FaUserAlt />}
            value={statData?.userCount}
            color="bg-[#F5FFFA]"
          />
          <StatisticsCard
            title="Total Online Bookings"
            icon={<FaUserAlt />}
            value={0}
            color="bg-[#B0E0E6]"
          />
          {/* Total Rooms */}
          {/* <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount}
            color="bg-[#FFD1DC]"
          /> */}
          {/* <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount}
            color="bg-[#E6E6FA]"
          />
          <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount}
            color="bg-[#FFFACD]"
          />
          <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount}
            color="bg-[#E0FFFF]"
          />
          <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount}
            color="bg-[#D7E3FC]"
          />
          <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount}
            color="bg-[#FFF1F3]"
          />
          <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount}
            color="bg-[#F3E5AB]"
          />
          <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount}
            color="bg-[#BCD4E6]"
          />
          <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount}
            color="bg-[#FFE5B4]"
          />
          <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount}
            color="bg-[#DCD0FF]"
          />
          <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount}
            color="bg-[#FFFDD0]"
          />
          <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount}
            color="bg-[#DFFFE2]"
          />
          <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount}
            color="bg-[#EBD4EF]"
          />
          <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount}
            color="bg-[#FADADD]"
          />
          <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount}
            color="bg-[#FADADD]"
          />
          <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount}
            color="bg-[#BCD4E6]"
          />
          <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount}
            color="bg-[#FFE5B4]"
          />
          <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount}
            color="bg-[#DCD0FF]"
          />
          <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount}
            color="bg-[#FFFDD0]"
          />
          <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount}
            color="bg-[#DFFFE2]"
          />
          <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount}
            color="bg-[#EBD4EF]"
          />
          <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount}
            color="bg-[#FADADD]"
          />
          <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount}
            color="bg-[#FADADD]"
          /> */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-pink-600 to-pink-400 text-white shadow-pink-500/40`}
            >
              <BsFillHouseDoorFill className='w-6 h-6 text-white' />
            </div>
            <div className='p-4 text-right'>
              <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                Total Merchant
              </p>
              <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                {totalMerchants}
              </h4>
            </div>
          </div>
        </div>


        <div className='mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>
          {/* Total Sales Graph */}

          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2'>
            <SalesLineChart data={statData?.chartData} />
          </div>
          {/* Calender */}

        </div>
      </div>
    </div>
  )
}

export default AdminStatistics