
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
import { all } from 'axios'
import Chart from 'react-google-charts'

// **********
// 










// 
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

  const totalMerchant = users?.filter(user => user?.role === 'merchant') || [];
  const totalRider = users?.filter(user => user?.role === 'rider') || [];
  const totalBranch = users?.filter(user => user?.role === 'host') 
    || [];
  const totalAdmin = users?.filter(user => user?.role === 'admin') 
    || [];
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
    

    const { data: OfflineBookings = [], isLoading: isOfflineLoading } = useQuery({
        queryKey: ["OfflineBookings"],
        queryFn: async () => await getOffline(),
    });
   
     const { data: Int_Booking_History_Admin, } = useQuery({
        queryKey: ['Int_Booking_History_Admin', verifiedUser?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/int`);
            return response.data;
        },
    });

    const allBookings = [...OnlineBookings, ...OfflineBookings , ...Int_Booking_History_Admin];
    const totalAmountCodBranch = allBookings.reduce((total, booking) => {
  
  const amount = parseFloat(booking.condition || 0) || parseFloat(booking.senderReceive || 0) || parseFloat(booking.amount || 0) || parseFloat (booking?.Cod_Charge || 0);
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
  
  const amount = parseFloat(booking.amount || 0) || parseFloat(booking.totalCharge || 0) || parseFloat(booking.amount || 0) || parseFloat(booking.Total_Charge || 0);
  return total + amount;
}, 0);

// Tracking_Destination_Branch_Delivery_Parcel
// Tracking_Destination_Branch_Delivery_Parcel_Offline
// Tracking_Destination_Branch_Delivery_Parcel_Int
const totalDelivered_Branch = allBookings.reduce((total, booking) => {
  if (booking?.Tracking_Destination_Branch_Delivery_Parcel || booking?.Tracking_Destination_Branch_Delivery_Parcel_Offline || booking?.Tracking_Destination_Branch_Delivery_Parcel_Int) {
    return total + 1;  // Assuming codAmount is the field to sum
  }
  return total;  // If not 'cod', return the total unchanged
}, 0);
const Total_COD_Accept = allBookings.reduce((total, booking) => {
  if (booking?.Admin_Accept_Payment_Amount) {
    return total + 1;  // Assuming codAmount is the field to sum
  }
  return total;  // If not 'cod', return the total unchanged
}, 0);
// parseFloat(booking.condition) || booking.senderReceive
const Total_COD_Accept_Pending = allBookings.reduce((total, booking) => {
  if (booking?.condition || booking?.senderReceive) {
    return total + 1;  // Assuming codAmount is the field to sum
  }
  return total;  // If not 'cod', return the total unchanged
}, 0);
// {(searchResult?.Tracking_Admin_Select_Online_MotherHub_Branch_Date || searchResult?.Tracking_Booking_Branch_Select_MotherHub_Date || searchResult?.Tracking_Booking_Merchant_Select_MotherHub_Date || searchResult?.Tracking_Booking_Branch_Select_MotherHub_Date_Int )
const Total_Pickup_Pending = allBookings.reduce((total, booking) => {
  const today = new Date().toISOString().split("T")[0]; // "2025-08-23"

  const adminDate = booking?.Tracking_Admin_Select_Online_MotherHub_Branch_Date
    ? new Date(booking.Tracking_Admin_Select_Online_MotherHub_Branch_Date).toISOString().split("T")[0]
    : null;

  const branchDate = booking?.Tracking_Booking_Branch_Select_MotherHub_Date
    ? new Date(booking.Tracking_Booking_Branch_Select_MotherHub_Date).toISOString().split("T")[0]
    : null;

  if (adminDate === today || branchDate === today) {
    return total + 1;
  }
  return total;
}, 0);
//    Tracking_Destination_Branch_MotherHub_Received_Parcel_Time || searchResult?.Tracking_Destination_Branch_Received_Parcel_Time_Offline || searchResult?
const Total_Pickup_Done_Today = allBookings.reduce((total, booking) => {
  const today = new Date().toISOString().split("T")[0]; // "2025-08-23"

  const adminDate = booking?.Tracking_Destination_Branch_MotherHub_Received_Parcel_Time
    ? new Date(booking.Tracking_Destination_Branch_MotherHub_Received_Parcel_Time).toISOString().split("T")[0]
    : null;

  const branchDate = booking?.Tracking_Destination_Branch_Received_Parcel_Time_Offline
    ? new Date(booking.Tracking_Destination_Branch_Received_Parcel_Time_Offline).toISOString().split("T")[0]
    : null;

  if (adminDate === today || branchDate === today) {
    return total + 1;
  }
  return total;
}, 0);

const Total_Pickup_Done = allBookings.reduce((total, booking) => {
  if (booking?.Tracking_Destination_Branch_MotherHub_Received_Parcel_Time || booking?.Tracking_Destination_Branch_Received_Parcel_Time_Offline) {
    return total + 1;  // Assuming codAmount is the field to sum
  }
  return total;  // If not 'cod', return the total unchanged
}, 0);
// {(searchResult?.Tracking_MotherHub_Branch_Select_Dest_Branch_Name || searchResult?.Tracking_MotherHub_Branch_Select_Destiantion_Branch || searchResult?.Tracking_MotherHub_Branch_Select_Destiantion_Branch_Merchant)
const Total_Hub_Transfer = allBookings.reduce((total, booking) => {
  if (booking?.Tracking_MotherHub_Branch_Select_Dest_Branch_Name || booking?.Tracking_MotherHub_Branch_Select_Destiantion_Branch) {
    return total + 1;  // Assuming codAmount is the field to sum
  }
  return total;  // If not 'cod', return the total unchanged
}, 0);


// booking
// Date

const Total_Booking_Today = allBookings.reduce((total, booking) => {
  const today = new Date().toISOString().split("T")[0]; 

  const adminDate = booking?.booking
    ? new Date(booking.booking).toISOString().split("T")[0]
    : null;

  const branchDate = booking?.Date
    

  if (adminDate === today || branchDate === today) {
    return total + 1;
  }
  return total;
}, 0);
const formatDate = (dateStr) => {
  if (!dateStr) return null; // null or undefined
  const d = new Date(dateStr);
  return isNaN(d) ? null : d.toISOString().split("T")[0];
};
const Total_Delivery_Complete_Today = allBookings.reduce((total, booking) => {
  const today = new Date().toISOString().split("T")[0]; // e.g. "2025-08-23"

  const adminDate = formatDate(booking?.Tracking_Rider_Online_Booking_Delivary_Update_Time);
  const branchDate = formatDate(booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Time);
  const adminDate1 = formatDate(booking?.Tracking_Rider_Online_Booking_Delivary_Update_Time);
  const branchDate1 = formatDate(booking?.Tracking_Destination_Branch_Delivery_Parcel_Time);

  if (adminDate === today || branchDate === today || adminDate1 === today || branchDate1 === today) {
    return total + 1;
  }
  return total;
}, 0);

// Tracking_Rider_Online_Booking_Delivary_Update_Return_Time || searchResult?.Tracking_Rider_Offline_Booking_Delivary_Update_Return_Time || 
// Tracking_Rider_Offline_Booking_Delivary_Update_Return_Time || searchResult?.Tracking_Rider_Merchant_Delivary_Update_Return_Time) || searchResult?.Tracking_Destination_Branch_Returned_Parcel_Time ||

const Total_Return_Today = allBookings.reduce((total, booking) => {
  const today = new Date().toISOString().split("T")[0]; // e.g. "2025-08-23"

  const adminDate = formatDate(booking?.Tracking_Rider_Online_Booking_Delivary_Update_Return_Time);
  const branchDate = formatDate(booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Return_Time);
  const adminDate1 = formatDate(booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Return_Time);
  const branchDate1 = formatDate(booking?.Tracking_Destination_Branch_Returned_Parcel_Time);

  if (adminDate === today || branchDate === today || adminDate1 === today || branchDate1 === today) {
    return total + 1;
  }
  return total;
}, 0);



const Total_Delivey_Complete = allBookings.reduce((total, booking) => {
  if (booking?.Tracking_Rider_Online_Booking_Delivary_Update_Time || booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Time || booking?.Tracking_Rider_Online_Booking_Delivary_Update_Time || booking?.Tracking_Destination_Branch_Delivery_Parcel_Time) {
    return total + 1;  // Assuming codAmount is the field to sum
  }
  return total;  // If not 'cod', return the total unchanged
}, 0);
const Total_Return_Complete = allBookings.reduce((total, booking) => {
  if (booking?.Tracking_Rider_Online_Booking_Delivary_Update_Return_Time || booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Return_Time || booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Return_Time || booking?.Tracking_Destination_Branch_Returned_Parcel_Time) {
    return total + 1;  // Assuming codAmount is the field to sum
  }
  return total;  // If not 'cod', return the total unchanged
}, 0);

const Total_Delivery_Pending = (allBookings.length) - Total_Delivey_Complete;


// ----------------------------------------------------------





const totalPending_Parcel_Branch = (allBookings?.length) - totalDelivered_Branch;


const { data: InterNational_Parcel_Branch = [] } = useQuery({
    queryKey: ["InterNational_Parcel_Branch",],
    queryFn: async () => {
      const res = await axiosSecure.get("/int");
      return res.data;
    },
    
  });
const { data: Total_Branch_Request = [] } = useQuery({
    queryKey: ["Total_Branch_Request",],
    queryFn: async () => {
      const res = await axiosSecure.get("/recharge");
      return res.data;
    },
    
  });

  const totalAmount_Branch_Request = Total_Branch_Request.reduce((total, booking) => {
  
  const amount = parseFloat(booking.Branch_Request_Amount || 0) || parseFloat(booking.Branch_Request_Amount || 0) || parseFloat(booking.Branch_Request_Amount || 0);
  return total + amount;
}, 0);
// Accept_Account_Name


const totalAmount_Branch_Request_Accept = Total_Branch_Request.reduce((total, booking) => {
  if (booking?.Accept_Account_Name) {
    return total + 1;  // Assuming codAmount is the field to sum
  }
  return total;  // If not 'cod', return the total unchanged
}, 0);

const { data: Total_Cost = [] } = useQuery({
    queryKey: ["Total_Cost",],
    queryFn: async () => {
      const res = await axiosSecure.get("/cost");
      return res.data;
    },
    
  });
const Total_Cost_Amount = Total_Cost.reduce((total, booking) => {
  
  const amount = parseFloat(booking.amount || 0);
  return total + amount;
}, 0);

const chartData = [
        ["Category", "Amount (BDT)", { role: "style" }],
        ["Total Costs", Total_Cost_Amount ?? 0, "#EF4444"],   // Red
        ["Total Sales", totalAmount_Booking_Branch ?? 0, "#10B981"],   // Green
        
    ];
 const chartOptions = {
        title: "Financial Overview",
        titleTextStyle: { fontSize: 20, bold: true },
        is3D: true,
          legend: { position: "none" },
        backgroundColor: "#F9FAFB",
        chartArea: { width: "80%", height: "70%" },
        hAxis: {
            title: "Category",
            titleTextStyle: { italic: false, fontSize: 14 }
        },
         vAxis: {
            title: "Amount (BDT)",
            titleTextStyle: { italic: false, fontSize: 14 },
            format: "short"
        },
        bar: { groupWidth: "50%" }
 }
  return (
    <div>
      <div className='mt-12 text-gray-500'>
        {/* small cards */}
        <div className='mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {/* Sales Card */}
          <StatisticsCard
            title="Total Sales"
            icon={<FaSalesforce />}
            value={totalAmount_Booking_Branch}
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
            title="Total Delivery Percel (Branch)"
            icon={<BsFillHouseDoorFill />}
            value={ totalDelivered_Branch || 0}
            color="bg-[#D7E3FC]"
          />
          <StatisticsCard
            title="Pending Parcel"
            icon={<BsFillHouseDoorFill />}
            value={totalPending_Parcel_Branch || 0}
            color="bg-[#FFF1F3]"
          />
         
          {/* <StatisticsCard
            title="Total Exchange"
            icon={<BsFillHouseDoorFill />}
            value={0}
            color="bg-[#F3E5AB]"
          /> */}
          <StatisticsCard
            title="Total Branch"
            icon={<BsFillHouseDoorFill />}
            value={totalBranch.length || 0}
            color="bg-[#BCD4E6]"
          />
           
          <StatisticsCard
            title="Total International Booking (Branch)"
            icon={<BsFillHouseDoorFill />}
            value={InterNational_Parcel_Branch.length || 0}
            color="bg-[#FFE5B4]"
          />
          <StatisticsCard
            title="Total Branch Recharge Request"
            icon={<BsFillHouseDoorFill />}
            value={`${totalAmount_Branch_Request || 0} Tk`}
            color="bg-[#DCD0FF]"
          />
         
          <StatisticsCard
            title="Total Branch Accepted Recharge Request"
            icon={<BsFillHouseDoorFill />}
            value={totalAmount_Branch_Request_Accept || 0}
            color="bg-[#FFFDD0]"
          />
          {/* <StatisticsCard
            title="Total Branch Request Amount"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount || 0}
            color="bg-[#DFFFE2]"
          /> */}
          {/* <StatisticsCard
            title="Total Branch Given Amount"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount || 0}
            color="bg-[#EBD4EF]"
          /> */}
          {/* <StatisticsCard
            title="Total COD"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount || 0}
            color="bg-[#FADADD]"
          /> */}
          <StatisticsCard
            title="Total Condition Pending"
            icon={<BsFillHouseDoorFill />}
            value={Total_COD_Accept_Pending || 0}
            color="bg-[#FADADD]"
          />
          <StatisticsCard
            title="Total Condition Paid"
            icon={<BsFillHouseDoorFill />}
            value={Total_COD_Accept || 0}
            color="bg-[#BCD4E6]"
          />
           
          {/* <StatisticsCard
            title="Total CN Company"
            icon={<BsFillHouseDoorFill />}
            value={statData?.packageCount || 0}
            color="bg-[#FFE5B4]"
          /> */}

          
          <StatisticsCard
            title="Total Admin"
            icon={<BsFillHouseDoorFill />}
            value={totalAdmin.length || 0}
            color="bg-[#DCD0FF]"
          />
          {/* <StatisticsCard
            title="Total Stape"
            icon={<BsFillHouseDoorFill />}
            value={0}
            color="bg-[#FFFDD0]"
          /> */}
          {/* <StatisticsCard
            title="Total Manager"
            icon={<BsFillHouseDoorFill />}
            value={0}
            color="bg-[#DFFFE2]"
          /> */}
          {/* <StatisticsCard
            title="Total IT-Department"
            icon={<BsFillHouseDoorFill />}
            value={0}
            color="bg-[#EBD4EF]"
          /> */}
          {/* <StatisticsCard
            title="Total International Booking Parcel"
            icon={<BsFillHouseDoorFill />}
            value={0}
            color="bg-[#FADADD]"
          /> */}

          <StatisticsCard
            title="Today Pickup Request (Branch)"
            icon={<FaTruckPickup />}
            value={Total_Pickup_Pending || 0}
            color="bg-blue-100"
          />
          <StatisticsCard
            title="Today Pickup Done (Branch)"
            icon={<FaTruckPickup />}
            value={Total_Pickup_Done_Today || 0}
            color="bg-green-100"
          />
          <StatisticsCard
            title="Total Pickup Done (Branch)"
            icon={<FaTruckPickup />}
            value={Total_Pickup_Done || 0}
            color="bg-red-100"
          />
          <StatisticsCard
            title="Total Hub Transfer Complete"
            icon={<FaTruckPickup />}
            value={Total_Hub_Transfer || 0}
            color="bg-red-100"
          />
          <StatisticsCard
            title="Today New Parcel"
            icon={<FaTruckPickup />}
            value={Total_Booking_Today || 0}
            color="bg-green-100"
          />
          {/* <StatisticsCard
            title="Previous Pending Parcel"
            icon={<FaTruckPickup />}
            value="20"
            color="bg-orange-100"
          /> */}
          <StatisticsCard
            title="Today Parcel For Delivery"
            icon={<FaTruckPickup />}
            value={Total_Booking_Today || 0}
            color="bg-yellow-100"
          />
          <StatisticsCard
            title="Total Parcel For Delivery"
            icon={<FaTruckPickup />}
            value={allBookings?.length || 0}
            color="bg-pink-100"
          />
          {/* Now Working */}
          <StatisticsCard
            title="Today Delivery Complete"
            icon={<FaTruckPickup />}
            value={Total_Delivery_Complete_Today || 0}
            color="bg-cyan-100"
          />
          <StatisticsCard
            title="Total Delivery Pending"
            icon={<FaTruckPickup />}
            value={Total_Delivery_Pending || 0}
            color="bg-sky-100"
          />
          {/* <StatisticsCard
            title="Today Hub Transfer"
            icon={<FaTruckPickup />}
            value={todayHubTransferData?.length}
            color="bg-indigo-100"
          /> */}
          {/* <StatisticsCard
            title="Todays Cancel Parcel"
            icon={<FaTruckPickup />}
            value={cancledDeliveryData?.length}
            color="bg-violet-100"
          /> */}
          <StatisticsCard
            title="Total Delivery Complete"
            icon={<FaTruckPickup />}
            value={Total_Delivey_Complete || 0}
            color="bg-purple-100"
          />
          <StatisticsCard
            title="Total Return Parcel"
            icon={<FaTruckPickup />}
            value={Total_Return_Complete || 0}
            color="bg-rose-100"
          />
          <StatisticsCard
            title="Today Return Parcel"
            icon={<FaTruckPickup />}
            value={Total_Return_Today || 0}
            color="bg-rose-100"
          />
          <StatisticsCard
            title="Todays Collection Amount"
            icon={<FaTruckPickup />}
            value={totalAmount}
            color="bg-blue-100"
          />
          <StatisticsCard
            title="Total Cost"
            icon={<FaTruckPickup />}
            value={`${Total_Cost_Amount || 0} Tk`}
            color="bg-blue-100"
          />
        </div>
      </div>


      <div className='mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>
        {/* Total Sales Graph */}

        <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2'>
          {/* <SalesLineChart data={statData?.chartData} /> */}
          <Chart
                        chartType="ColumnChart"
                        width="100%"
                        height="500px"
                        data={chartData}
                        options={chartOptions}
                    />
        </div>
        {/* Calender */}

      </div>
    </div>
  )
}

export default AdminStatistics