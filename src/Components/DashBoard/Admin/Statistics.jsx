
import { FaUserAlt, FaSalesforce, FaTruckPickup } from 'react-icons/fa'
import { BsFillHouseDoorFill } from 'react-icons/bs'
import SalesLineChart from './SalesLineChart'
import { useEffect, useState } from 'react'
import { getAdminStat } from '../../../api/utils'
import StatisticsCard from './StatisticsCard'
import axiosSecure from '../../../api/axiosSecure'
import { useQuery } from '@tanstack/react-query'
import useUsersData from '../../../hooks/useUsersData/useUsersData'
import { getOffline, getPackage } from '../../../api/auth'


const AdminStatistics = () => {
  const [statData, setStatData] = useState({})
  const [pickupRequestData, setPickupRequestData] = useState([]);
  const [pickupDonetData, setPickupDonetData] = useState([]);
  const [pickupReadyForDeliveryData, setPickupReadyForDeliveryData] = useState([]);
  const [totalPickupReadyForDeliveryData, setTotalPickupReadyForDeliveryData] = useState([]);
  const [deliveryCompleteData, setDeliveryCompleteData] = useState([]);
  const [totalDeliveryCompleteData, setTotalDeliveryCompleteData] = useState([]);
  const [pendingDeliveryData, setPendingDeliveryData] = useState([]);
  const [cancledDeliveryData, setCancledDeliveryData] = useState([]);
  const [totalMarchant, setTotalMarchant] = useState([]);
  const [totalCancledDeliveryData, setTotalCancledDeliveryData] = useState([]);
  const [todayHubTransferData, setTodayHubTransferData] = useState([]);
  const [totalPickupDonetData, setTotalPickupDonetData] = useState([]);
  const [todayNewParcelData, setTodayNewParcelData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get("/shfjksdhfjdjkfhxnbcnbc67437gch");
      return res.data;
    }
  })

  const totalMerchant = users.filter(user => user.role === 'merchant');
  const totalRider = users.filter(user => user.role === 'rider');
const { data: totalOfflineBookings = [] } = useQuery({
    queryKey: ['totalOfflineBookings'],
    queryFn: async () => {
      const res = await axiosSecure.get("/offlinejjfjbvfbv44");
      return res.data;
    }
  })
const { data: totalOnlineBookings = [] } = useQuery({
    queryKey: ['totalOnlineBookings'],
    queryFn: async () => {
      const res = await axiosSecure.get("/packagfhguieormbncdmnn44ge");
      return res.data;
    }
  })

  const totalUsersOnlineBookings = totalOnlineBookings.filter(booking => booking?.email ==='Booking_By_User');

const { data: MerchantBookings = [] ,isLoading , isError } = useQuery({
    queryKey: ['MerchantBookings'],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/all");
      return res.data;
    }
  })

 

  const [verifiedUser] = useUsersData();
  const { data: parcelDataus = [] } = useQuery({
    queryKey: ["parcelData", verifiedUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/packagfhguieormbncdmnn44ge");
      return res.data;
    },
    enabled: !!verifiedUser?.email,
  });


  useEffect(() => {
    fetch('https://courier-server-rho.vercel.app/packagfhguieormbncdmnn44ge')
      .then(res => res.json())
      .then(data => {
        // setHostData(data);

        // Extract today's date
        const today = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD

        // Filter data based on today's date and ensure booking exists
        const filteredPickupRequestData = data.filter(item => item.update === 'pickup request' && item.booking && item.booking.split('T')[0] === today);
        setPickupRequestData(filteredPickupRequestData);

        const filteredPickupDoneData = data.filter(item => item.update === 'Rider pickup' && item.booking && item.booking.split('T')[0] === today);
        setPickupDonetData(filteredPickupDoneData);

        const filteredPickupReadyForDeliveryData = data.filter(item => item.update === 'Ready For Delivery' && item.booking && item.booking.split('T')[0] === today);
        setPickupReadyForDeliveryData(filteredPickupReadyForDeliveryData);

        const filteredDeliveryCompleteData = data.filter(item => item.update === 'delivered' && item.booking && item.booking.split('T')[0] === today);
        setDeliveryCompleteData(filteredDeliveryCompleteData);

        const filteredPendingDeliveryData = data.filter(item => item.update === 'Processing' && item.booking && item.booking.split('T')[0] === today);
        setPendingDeliveryData(filteredPendingDeliveryData);

        const filteredTodayNewParcelData = data.filter(item => item.update === 'Processing' && item.booking && item.booking.split('T')[0] === today);
        setTodayNewParcelData(filteredTodayNewParcelData);

        const filteredCancledDeliveryData = data.filter(item => item.update === 'canceled' && item.booking && item.booking.split('T')[0] === today);
        setCancledDeliveryData(filteredCancledDeliveryData);

        const filteredTotalMarchant = data.filter(item => item.update === 'canceled' && item.package && item.package.split('T')[0] === today);
        setTotalMarchant(filteredTotalMarchant);

        const filteredTotalCancledDeliveryData = data.filter(item => item.update === 'canceled');
        setTotalCancledDeliveryData(filteredTotalCancledDeliveryData);

        const filteredTodayHubTransferData = data.filter(item => item.update === 'on the way to delivery hub' && item.booking && item.booking.split('T')[0] === today);
        setTodayHubTransferData(filteredTodayHubTransferData);

        // Total Pickup done
        const filteredTotalPickupDoneData = data.filter(item => item.update === 'Rider pickup');
        setTotalPickupDonetData(filteredTotalPickupDoneData);

        // Total Delivery Completed
        const filteredTotalDeliveryCompleteData = data.filter(item => item.update === 'delivered');
        setTotalDeliveryCompleteData(filteredTotalDeliveryCompleteData);

        // Total Data Ready For Delivery
        const filteredTotalPickupReadyForDeliveryData = data.filter(item => item.update === 'Ready For Delivery');
        setTotalPickupReadyForDeliveryData(filteredTotalPickupReadyForDeliveryData);

        // Calculate total amount for today's bookings
        const totalAmount = data
          .filter(item => item.booking && item.booking.split('T')[0] === today)
          .reduce((acc, item) => acc + (parseInt(item.amount, 10) || 0), 0);
        setTotalAmount(totalAmount);



      });
  }, []);


  useEffect(() => {
    getAdminStat()
      .then(data => setStatData(data))
  }, [])
  // console.log(statData)
  const { data: OnlineBookings = [], isLoading: isOnlineLoading } = useQuery({
        queryKey: ["OnlineBookings"],
        queryFn: async () => await getPackage(),
    });
    console.log("OnlineBookings", OnlineBookings);

    const { data: OfflineBookings = [], isLoading: isOfflineLoading } = useQuery({
        queryKey: ["OfflineBookings"],
        queryFn: async () => await getOffline(),
    });
    console.log("OfflineBookings", OfflineBookings);

    const allBookings = [...OnlineBookings, ...OfflineBookings];
    const totalAmountCodBranch = allBookings.reduce((total, booking) => {
  
  const amount = parseFloat(booking.condition || 0) || parseFloat(booking.senderReceive || 0) || parseFloat(booking.amount || 0);
  return total + amount;
}, 0);

// paymentOption
// paymentMethod

const totalBookingsToPay = allBookings.reduce((total, booking) => {
  if (booking.paymentMethod === 'To Pay' || booking.paymentOption === 'To Pay') {
    return total + 1;  // Assuming codAmount is the field to sum
  }
  return total;  // If not 'cod', return the total unchanged
}, 0);
const totalBookings_Cash = allBookings.reduce((total, booking) => {
  if (booking.paymentMethod === 'Cash' || booking.paymentOption === 'Cash') {
    return total + 1;  // Assuming codAmount is the field to sum
  }
  return total;  // If not 'cod', return the total unchanged
}, 0);
const totalBookings_Credit = allBookings.reduce((total, booking) => {
  if (booking.paymentMethod === 'Credit' || booking.paymentOption === 'Credit') {
    return total + 1;  // Assuming codAmount is the field to sum
  }
  return total;  // If not 'cod', return the total unchanged
}, 0);

// amount
// totalCharge
const totalAmount_Booking_Branch = allBookings.reduce((total, booking) => {
  
  const amount = parseFloat(booking.amount || 0) || parseFloat(booking.totalCharge || 0) || parseFloat(booking.amount || 0);
  return total + amount;
}, 0);

  return (
    <div>
      <div className='mt-12 text-gray-500'>
        {/* small cards */}
        <div className='mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {/* Sales Card */}
          <StatisticsCard
            title="Total Sales"
            icon={<FaSalesforce />}
            value={statData?.totalSale}
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
            value={statData?.userCount || 0}
            color="bg-[#F5FFFA]"
          />
          <StatisticsCard
            title="Total Online Bookings (Branch)"
            icon={<FaUserAlt />}
            value={totalOnlineBookings?.length || 0}
            color="bg-[#B0E0E6]"
          />
          {/* Total Rooms */}
          <StatisticsCard
            title="Total Offline Booking (Branch)"
            icon={<BsFillHouseDoorFill />}
            value={ totalOfflineBookings?.length || 0}
            color="bg-[#FFD1DC]"
          />
          <StatisticsCard
            title="Total Package"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount || 0}
            color="bg-[#E6E6FA]"
          />
          <StatisticsCard
            title="Total Marchant"
            icon={<BsFillHouseDoorFill />}
            value={totalMerchant?.length || 0}
            color="bg-[#FFFACD]"
          />
          <StatisticsCard
            title="Total Marchant Booking"
            icon={<BsFillHouseDoorFill />}
            value={ MerchantBookings.length || 0}
            color="bg-[#E0FFFF]"
          />
          <StatisticsCard
            title="Total Normal Customer Booking"
            icon={<BsFillHouseDoorFill />}
            value={ totalUsersOnlineBookings.length || 0}
            color="bg-[#F3E5F5]"
          />
          <StatisticsCard
            title="Total Rider"
            icon={<BsFillHouseDoorFill />}
            value={ totalRider?.length || 0}
            color="bg-[#D5F3E5]"
          />
          <StatisticsCard
            title="Total Condition (Branch)"
            icon={<BsFillHouseDoorFill />}
            value={`${totalAmountCodBranch || 0} Tk`}
            color="bg-[#F7E7CE]"
          />
          <StatisticsCard
            title="Total To Pay (Branch)"
            icon={<BsFillHouseDoorFill />}
            value={ totalBookingsToPay || 0}
            color="bg-[#F0FFF0]"
          />
          <StatisticsCard
            title="Total Cash Booking (Branch)"
            icon={<FaUserAlt />}
            value={ totalBookings_Cash || 0}
            color="bg-[#F5FFFA]"
          />
          <StatisticsCard
            title="Total Credit Booking"
            icon={<FaUserAlt />}
            value={ totalBookings_Credit || 0}
            color="bg-[#B0E0E6]"
          />
          {/* Total Rooms */}
          <StatisticsCard
            title="Total Parcel Booking Amount (Branch)"
            icon={<BsFillHouseDoorFill />}
            value={ `${totalAmount_Booking_Branch || 0} Tk`}
            color="bg-[#FFD1DC]"
          />
          <StatisticsCard
            title="Total Marchant parcel"
            icon={<BsFillHouseDoorFill />}
            value={MerchantBookings.length || 0}
            color="bg-[#E6E6FA]"
          />
          <StatisticsCard
            title="Total online Branch Booking Percel (Branch)"
            icon={<BsFillHouseDoorFill />}
            value={ OnlineBookings.length || 0}
            color="bg-[#FFFACD]"
          />
          <StatisticsCard
            title="Total offline Branch Booking Percel (Branch)"
            icon={<BsFillHouseDoorFill />}
            value={ OfflineBookings.length || 0}
            color="bg-[#E0FFFF]"
          />
          <StatisticsCard
            title="Total Delivery Percel"
            icon={<BsFillHouseDoorFill />}
            value={ 0}
            color="bg-[#D7E3FC]"
          />
          <StatisticsCard
            title="Pending Parcel"
            icon={<BsFillHouseDoorFill />}
            value={0}
            color="bg-[#FFF1F3]"
          />
          <StatisticsCard
            title="Total Exchange"
            icon={<BsFillHouseDoorFill />}
            value={0}
            color="bg-[#F3E5AB]"
          />
          <StatisticsCard
            title="Total Branch"
            icon={<BsFillHouseDoorFill />}
            value={0}
            color="bg-[#BCD4E6]"
          />
          <StatisticsCard
            title="Total Internation Booking"
            icon={<BsFillHouseDoorFill />}
            value={0}
            color="bg-[#FFE5B4]"
          />
          <StatisticsCard
            title="Total Branch Recharge Request"
            icon={<BsFillHouseDoorFill />}
            value={0}
            color="bg-[#DCD0FF]"
          />
          <StatisticsCard
            title="Total Branch Accepted Recharge Request"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount || 0}
            color="bg-[#FFFDD0]"
          />
          <StatisticsCard
            title="Total Branch Request Amount"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount || 0}
            color="bg-[#DFFFE2]"
          />
          <StatisticsCard
            title="Total Branch Given Amount"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount || 0}
            color="bg-[#EBD4EF]"
          />
          <StatisticsCard
            title="Total COD"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount || 0}
            color="bg-[#FADADD]"
          />
          <StatisticsCard
            title="Total Condition Pending"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount || 0}
            color="bg-[#FADADD]"
          />
          <StatisticsCard
            title="Total Condition Paid"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount || 0}
            color="bg-[#BCD4E6]"
          />
          <StatisticsCard
            title="Total CN Company"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount || 0}
            color="bg-[#FFE5B4]"
          />
          <StatisticsCard
            title="Total Admin"
            icon={<BsFillHouseDoorFill />}
            value={0}
            color="bg-[#DCD0FF]"
          />
          <StatisticsCard
            title="Total Stape"
            icon={<BsFillHouseDoorFill />}
            value={0}
            color="bg-[#FFFDD0]"
          />
          <StatisticsCard
            title="Total Manager"
            icon={<BsFillHouseDoorFill />}
            value={0}
            color="bg-[#DFFFE2]"
          />
          <StatisticsCard
            title="Total IT-Department"
            icon={<BsFillHouseDoorFill />}
            value={0}
            color="bg-[#EBD4EF]"
          />
          <StatisticsCard
            title="Total International Booking Parcel"
            icon={<BsFillHouseDoorFill />}
            value={0}
            color="bg-[#FADADD]"
          />

          <StatisticsCard
            title="Today Pickup Request"
            icon={<FaTruckPickup />}
            value={pickupRequestData?.length}
            color="bg-blue-100"
          />
          <StatisticsCard
            title="Today Pickup Done"
            icon={<FaTruckPickup />}
            value={pickupDonetData?.length}
            color="bg-green-100"
          />
          <StatisticsCard
            title="Total Pickup Done"
            icon={<FaTruckPickup />}
            value={totalPickupDonetData?.length}
            color="bg-red-100"
          />
          <StatisticsCard
            title="Total Hub Transfer Complete"
            icon={<FaTruckPickup />}
            value="0"
            color="bg-red-100"
          />
          <StatisticsCard
            title="Today New Parcel"
            icon={<FaTruckPickup />}
            value={todayNewParcelData?.length}
            color="bg-green-100"
          />
          <StatisticsCard
            title="Previous Pending Parcel"
            icon={<FaTruckPickup />}
            value="20"
            color="bg-orange-100"
          />
          <StatisticsCard
            title="Today Parcel For Delivery"
            icon={<FaTruckPickup />}
            value={pickupReadyForDeliveryData?.length}
            color="bg-yellow-100"
          />
          <StatisticsCard
            title="Total Parcel For Delivery"
            icon={<FaTruckPickup />}
            value={totalPickupReadyForDeliveryData?.length}
            color="bg-pink-100"
          />
          <StatisticsCard
            title="Today Delivery Complete"
            icon={<FaTruckPickup />}
            value={deliveryCompleteData?.length}
            color="bg-cyan-100"
          />
          <StatisticsCard
            title="Today Delivery Pending"
            icon={<FaTruckPickup />}
            value={pendingDeliveryData?.length}
            color="bg-sky-100"
          />
          <StatisticsCard
            title="Today Hub Transfer"
            icon={<FaTruckPickup />}
            value={todayHubTransferData?.length}
            color="bg-indigo-100"
          />
          <StatisticsCard
            title="Todays Cancel Parcel"
            icon={<FaTruckPickup />}
            value={cancledDeliveryData?.length}
            color="bg-violet-100"
          />
          <StatisticsCard
            title="Total Delivery Complete"
            icon={<FaTruckPickup />}
            value={totalDeliveryCompleteData?.length}
            color="bg-purple-100"
          />
          <StatisticsCard
            title="Total Return Parcel"
            icon={<FaTruckPickup />}
            value={totalCancledDeliveryData?.length}
            color="bg-rose-100"
          />
          <StatisticsCard
            title="Todays Collection Amount"
            icon={<FaTruckPickup />}
            value={totalAmount}
            color="bg-blue-100"
          />
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
  )
}

export default AdminStatistics