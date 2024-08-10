// import DashBoardChart from "./DashBoardChart";

import { FaInfoCircle, FaTruckPickup } from "react-icons/fa";
import HostStatsCard from "./HostStatsCard";
import { FaCalendar } from "react-icons/fa6";
import SalesLineChart from "../../Admin/SalesLineChart";
import { useEffect, useState } from "react";
import { getAdminStat } from "../../../../api/utils";
import ParcelPieChart from "../../Merchant/MerchatDashboard/ParcelPieChart";


const HostDashboard = () => {

    const [statData, setStatData] = useState({})
  
  useEffect(() => {
    getAdminStat()
    .then(data => setStatData(data))
  }, [])

//   const chartData = {
//     labels: [
//         '2024-07-04',
//         '2024-07-05',
//         '2024-07-06',
//         '2024-07-07',
//         '2024-07-08',
//         '2024-07-09',
//         '2024-07-10',
//     ],
//     pickup: [8, 7, 6, 5, 4, 3, 2],
//     delivered: [7, 6, 5, 4, 3, 2, 1],
// };


    const data = {
        parcelBooking: 20,
        delivered: 30,
        partiallyDelivered: 10,
        processing: 15,
        cancelled: 5,
        deleted: 2,
      };


    return (
        <div>
            <div className="flex justify-end gap-10">
                <button className=" flex p-3 rounded-xl bg-gray-200 mt-2 items-center ">
                    <FaInfoCircle className="mr-1" /> Weekly
                </button>
                <button className="p-3 rounded-xl bg-gray-200 flex mt-2 items-center ">
                    <FaCalendar className="mr-1" /> Select Date
                </button>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 p-5">
                <HostStatsCard
                    title='Today Pickup Request'
                    icon={<FaTruckPickup />}
                    value='20'
                    color="bg-blue-100"
                />
                <HostStatsCard
                    title='Today Pickup Done'
                    icon={<FaTruckPickup />}
                    value='20'
                    color="bg-green-100"
                />
                <HostStatsCard
                    title='Total Pickup Done'
                    icon={<FaTruckPickup />}
                    value='20'
                    color="bg-red-100"
                />
                <HostStatsCard
                    title='Total Hub Transfer Complete'
                    icon={<FaTruckPickup />}
                    value='20'
                    color="bg-red-100"
                />
                <HostStatsCard
                    title='Today New Parcel'
                    icon={<FaTruckPickup />}
                    value='20'
                    color="bg-green-100"
                />
                <HostStatsCard
                    title='Previous Pending Parcel'
                    icon={<FaTruckPickup />}
                    value='20'
                    color="bg-orange-100"
                />
                <HostStatsCard
                    title='Today Parcel For Delivery'
                    icon={<FaTruckPickup />}
                    value='20'
                    color="bg-yellow-100"
                />
                <HostStatsCard
                    title='Total Parcel For Delivery'
                    icon={<FaTruckPickup />}
                    value='20'
                    color="bg-pink-100"
                />
                <HostStatsCard
                    title='Today Delivery Complete'
                    icon={<FaTruckPickup />}
                    value='20'
                    color="bg-cyan-100"
                />
                <HostStatsCard
                    title='Today Delivery Pending'
                    icon={<FaTruckPickup />}
                    value='20'
                    color="bg-sky-100"
                />
                <HostStatsCard
                    title='Today Hub Transfer'
                    icon={<FaTruckPickup />}
                    value='20'
                    color="bg-indigo-100"
                />
                <HostStatsCard
                    title='Todays Cancel Parcel'
                    icon={<FaTruckPickup />}
                    value='20'
                    color="bg-violet-100"
                />
                <HostStatsCard
                    title='Total Delivery Complete'
                    icon={<FaTruckPickup />}
                    value='20'
                    color="bg-purple-100"
                />
                <HostStatsCard
                    title='Total Return Parcel'
                    icon={<FaTruckPickup />}
                    value='20'
                    color="bg-rose-100"
                />
                <HostStatsCard
                    title='Todays Collection Amount'
                    icon={<FaTruckPickup />}
                    value='20'
                    color="bg-blue-100"
                />
            </div>

        <div className="grid lg:grid-cols-2">
            <SalesLineChart data={statData?.chartData}/>
            <ParcelPieChart data={data}/>
        </div>

        </div>
    );
};

export default HostDashboard;