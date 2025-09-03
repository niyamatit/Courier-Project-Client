import { FaTruckPickup } from "react-icons/fa";
import HostStatsCard from "./HostStatsCard";
import { useEffect, useMemo, useState } from "react";
import ParcelPieChart from "../../Merchant/MerchatDashboard/ParcelPieChart";
import ParcelChart from "../../Merchant/MerchatDashboard/ParcelChart";
import axiosSecure from "../../../../api/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import useUsersData from "../../../../hooks/useUsersData/useUsersData";

const HostDashboard = () => {
    // const [statData, setStatData] = useState({});
    // const [hostData, setHostData] = useState([]);
    const [pickupRequestData, setPickupRequestData] = useState([]);
    const [pickupDonetData, setPickupDonetData] = useState([]);
    const [pickupReadyForDeliveryData, setPickupReadyForDeliveryData] = useState([]);
    const [totalPickupReadyForDeliveryData, setTotalPickupReadyForDeliveryData] = useState([]);
    const [deliveryCompleteData, setDeliveryCompleteData] = useState([]);
    const [totalDeliveryCompleteData, setTotalDeliveryCompleteData] = useState([]);
    const [pendingDeliveryData, setPendingDeliveryData] = useState([]);
    const [cancledDeliveryData, setCancledDeliveryData] = useState([]);
    const [totalCancledDeliveryData, setTotalCancledDeliveryData] = useState([]);
    const [todayHubTransferData, setTodayHubTransferData] = useState([]);
    const [totalPickupDonetData, setTotalPickupDonetData] = useState([]);
    const [todayNewParcelData, setTodayNewParcelData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [filteredChartData, setFilteredChartData] = useState(null);
    const [filteredPieData, setFilteredPieData] = useState(null);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const todayDate = new Date().toISOString().split("T")[0];

    // useEffect(() => {
    //     getAdminStat().then(data => setStatData(data));
    // }, []);

    useEffect(() => {
        fetch('https://courier-server-rho.vercel.app/package')
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


    const [verifiedUser] = useUsersData();
    // const { data: parcelData = [] } = useQuery({
    //     queryKey: ["parcelData", verifiedUser?.email],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get("/packagfhguieormbncdmnn44ge");
    //         return res.data;
    //     },
    //     enabled: !!verifiedUser?.email,
    // });
   const { data: Offline_Booking_Data = [] } = useQuery({
  queryKey: ["Offline_Booking_Data", verifiedUser?.email],
  queryFn: async () => {
    const res = await axiosSecure.get(`/offline/${verifiedUser?.email}`);
    return res.data;
  },
  enabled: !!verifiedUser?.email,
});

const { data: Online_Booking_Data = [] } = useQuery({
  queryKey: ["Online_Booking_Data", verifiedUser?.email],
  queryFn: async () => {
    const res = await axiosSecure.get(`/pacfkagetuinvnmxbnc422445/${verifiedUser?.email}`);
    return res.data;
  },
  enabled: !!verifiedUser?.email,
});

const { data: Int_Booking_History = [] } = useQuery({
  queryKey: ['Int_Booking_History', verifiedUser?.email],
  queryFn: async () => {
    const response = await axiosSecure.get(`/int/${verifiedUser?.email}`);
    return response.data;
  },
  enabled: !!verifiedUser?.email,
});

const parcelData = useMemo(() => {
  return [
    ...Offline_Booking_Data,
    ...Online_Booking_Data,
    ...Int_Booking_History,
  ];
}, [Offline_Booking_Data, Online_Booking_Data, Int_Booking_History]);


    // --------------------------For Today Pickup Parcels-------------

    const fetchParcels = (key, url, dateField) => {
        const { data = [] } = useQuery({
          queryKey: [key, verifiedUser?.email],
          enabled: !!verifiedUser?.email,
          queryFn: async () => {
            const res = await axiosSecure.get(url);
            return Array.isArray(res.data) ? res.data : [res.data];
          },
        });
      
        return data.filter(parcel => {
          const parsedDate = parcel?.[dateField] ? new Date(parcel[dateField]) : null;
          return parsedDate && !isNaN(parsedDate.getTime()) && parsedDate.toISOString().split("T")[0] === todayDate;
        }).length;
      };
      
      const Today_Total_OnlineParcel = fetchParcels("Verify_Admin_MotherHub", `/package/email/${verifiedUser?.email}`, "Tracking_Admin_Select_Online_MotherHub_Branch_Date");
      const Today_Total_OfflineneParcel = fetchParcels("Verify_Admin_MotherHub_Offline", `/offline/email/Branch/destination/${verifiedUser?.email}`, "Tracking_Booking_Branch_Select_MotherHub_Date");
      const Today_Total_Merchant_Parcel = fetchParcels("Verify_Admin_MotherHub_Merchant", `/Merchant/email/Branch/destination/mer/${verifiedUser?.email}`, "Tracking_Booking_Merchant_Select_MotherHub_Date");
      
      const Total_Today_Pickup_Parcel = Today_Total_Merchant_Parcel + Today_Total_OfflineneParcel + Today_Total_OnlineParcel;
      
    //   -----------------------------------------For Today Pickup Parcels End----------------



    // ---------------------------------------For Today Pickup Done---------------------------

    const Today_Total_Pickup_Done_OnlineParcel = fetchParcels("Verify_Admin_MotherHub", `/package/email/${verifiedUser?.email}`, "Tracking_Admin_Select_Online_MotherHub_Branch_Date");
    const Today_Total_Pickup_Done_OfflineneParcel = fetchParcels("Verify_Admin_MotherHub_Offline", `/offline/email/Branch/destination/${verifiedUser?.email}`, "Tracking_Booking_Branch_Select_MotherHub_Date");
    const Today_Total_Pickup_Done_Merchant_Parcel = fetchParcels("Verify_Admin_MotherHub_Merchant", `/Merchant/email/Branch/destination/mer/${verifiedUser?.email}`, "Tracking_Booking_Merchant_Select_MotherHub_Date");
    
    const Total_Today_Pickup_Done_Parcel = Today_Total_Pickup_Done_Merchant_Parcel + Today_Total_Pickup_Done_OfflineneParcel + Today_Total_Pickup_Done_OnlineParcel;




     // ---------------------------------------For Today Pickup Done End---------------------------


 

const Total_Pickup_Done_Today = parcelData.reduce((total, booking) => {
  const today = new Date().toISOString().split("T")[0]; // "2025-08-23"

  const Online = booking?.Tracking_Destination_Branch_MotherHub_Received_Parcel_Time
    ? new Date(booking.Tracking_Destination_Branch_MotherHub_Received_Parcel_Time).toISOString().split("T")[0]
    : null;
  const Offline = booking?.Tracking_Destination_Branch_Received_Parcel_Time_Offline
    ? new Date(booking.Tracking_Destination_Branch_Received_Parcel_Time_Offline).toISOString().split("T")[0]
    : null;
  const INT = booking?.Tracking_Destination_Branch_MotherHub_Received_Parcel_Time_Int
    ? new Date(booking.Tracking_Destination_Branch_MotherHub_Received_Parcel_Time_Int).toISOString().split("T")[0]
    : null;

 

  if (Online === today || Offline === today || INT === today) {
    return total + 1;
  }
  return total;
}, 0);
const Total_Pickup_Done = parcelData.reduce((total, booking) => {
  if (booking?.Tracking_Destination_Branch_MotherHub_Received_Parcel_Time || booking?.Tracking_Destination_Branch_MotherHub_Received_Parcel_Time_Int || booking?.Tracking_Destination_Branch_Received_Parcel_Time_Offline) {
    return total + 1;  // Assuming codAmount is the field to sum
  }
  return total;  // If not 'cod', return the total unchanged
}, 0);
const Total_Hub_Transfer = parcelData.reduce((total, booking) => {
  if (booking?.Tracking_MotherHub_Branch_Select_Dest_Branch_Name || booking?.Tracking_MotherHub_Branch_Select_Destiantion_Branch_Name_Offline || booking?.Tracking_MotherHub_Branch_Select_Dest_Branch_Name_Int) {
    return total + 1;  // Assuming codAmount is the field to sum
  }
  return total;  // If not 'cod', return the total unchanged
}, 0);
const Total_Booking_Today = parcelData.reduce((total, booking) => {
  const today = new Date().toISOString().split("T")[0]; 

  const adminDate = booking?.booking
    ? new Date(booking.booking).toISOString().split("T")[0]
    : null;

  const branchDate = booking?.Date
  const INT = booking?.bookingDate
    

  if (adminDate === today || branchDate === today || INT === today) {
    return total + 1;
  }
  return total;


}, 0);

const formatDate = (dateStr) => {
  if (!dateStr) return null; // null or undefined
  const d = new Date(dateStr);
  return isNaN(d) ? null : d.toISOString().split("T")[0];
};

const Total_Delivery_Complete_Today = parcelData.reduce((total, booking) => {
  const today = new Date().toISOString().split("T")[0]; // e.g. "2025-08-23"

  const adminDate = formatDate(booking?.Tracking_Rider_Online_Booking_Delivary_Update_Time);
  const branchDate = formatDate(booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Time);
  const adminDate1 = formatDate(booking?.Tracking_Rider_Online_Booking_Delivary_Update_Time);
  const branchDate1 = formatDate(booking?.Tracking_Destination_Branch_Delivery_Parcel_Time);
  const Int = formatDate(booking?.Tracking_Rider_Online_Booking_Delivary_Update_Time_Int);
  const Int_direct = formatDate(booking?.Tracking_Destination_Branch_Delivery_Parcel_Int);

  if (adminDate === today || branchDate === today || adminDate1 === today || branchDate1 === today || Int === today || Int_direct === today) {
    return total + 1;
  }
  return total;
}, 0);


const Today_Delivery_Pending = Total_Booking_Today - Total_Delivery_Complete_Today;
const Total_Delivey_Complete = parcelData.reduce((total, booking) => {
  if (booking?.Tracking_Rider_Online_Booking_Delivary_Update_Time || booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Time || booking?.Tracking_Rider_Online_Booking_Delivary_Update_Time || booking?.Tracking_Destination_Branch_Delivery_Parcel_Time || booking?.Tracking_Rider_Online_Booking_Delivary_Update_Time_Int || booking?.Tracking_Destination_Branch_Delivery_Parcel_Int) {
    return total + 1; 
  }
  return total; 
}, 0);

const totalPending_Parcel_Branch = (parcelData?.length) - Total_Delivey_Complete;
const Total_Return_Complete = parcelData.reduce((total, booking) => {
  if (booking?.Tracking_Rider_Online_Booking_Delivary_Update_Return_Time || booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Return_Time || booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Return_Time || booking?.Tracking_Destination_Branch_Returned_Parcel_Time || booking?.Tracking_Rider_Online_Booking_Delivary_Update_Return_Time_Int) {
    return total + 1;  // Assuming codAmount is the field to sum
  }
  return total;  // If not 'cod', return the total unchanged
}, 0);

const Total_Return_Today = parcelData.reduce((total, booking) => {
  const today = new Date().toISOString().split("T")[0]; // e.g. "2025-08-23"

  const adminDate = formatDate(booking?.Tracking_Rider_Online_Booking_Delivary_Update_Return_Time);
  const branchDate = formatDate(booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Return_Time);
  const adminDate1 = formatDate(booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Return_Time);
  const branchDate1 = formatDate(booking?.Tracking_Destination_Branch_Returned_Parcel_Time);
  const Int = formatDate(booking?.Tracking_Rider_Online_Booking_Delivary_Update_Return_Time_Int);

  if (adminDate === today || branchDate === today || adminDate1 === today || branchDate1 === today || Int === today) {
    return total + 1;
  }
  return total;
}, 0);

const totalAmount_Booking_Branch = parcelData.reduce((total, booking) => {
  
  const amount = parseFloat(booking.amount || 0) || parseFloat(booking.totalCharge || 0) || parseFloat(booking.Total_Charge || 0);
  return total + amount;
}, 0);




  useEffect(() => {
  if (parcelData.length > 0) {
    // ---- Filter by date range ----
    const filteredData = parcelData.filter((item) => {
      const rawDate = item?.Date || item?.booking || item?.bookingDate;
      if (!rawDate) return false;

      const itemDate = new Date(rawDate).toISOString().split("T")[0];
      const startDate = fromDate ? new Date(fromDate).toISOString().split("T")[0] : null;
      const endDate = toDate ? new Date(toDate).toISOString().split("T")[0] : null;

      const isAfterStartDate = startDate ? itemDate >= startDate : true;
      const isBeforeEndDate = endDate ? itemDate <= endDate : true;

      return isAfterStartDate && isBeforeEndDate;
    });

    // ---- Restrict to last 7 days ----
    const today = new Date();
    const cutoff = new Date();
    cutoff.setDate(today.getDate() - 7);

    const last7Days = filteredData.filter((item) => {
      const rawDate = item?.Date || item?.booking || item?.bookingDate;
      if (!rawDate) return false;
      const d = new Date(rawDate);
      return d >= cutoff && d <= today;
    });

    // ---- Chart Data ----
    const chartData = {
      labels: last7Days.map((item) => {
        const d = new Date(item?.Date || item?.booking || item?.bookingDate);
        const day = d.getDate().toString().padStart(2, "0");
        const month = (d.getMonth() + 1).toString().padStart(2, "0");
        const year = d.getFullYear().toString().slice(-2);
        return `${day}-${month}-${year}`;
      }),

      pickup: last7Days.map((item) =>
        (!item.Tracking_Destination_Branch_MotherHub_Received_Parcel_Time &&
         !item.Tracking_Destination_Branch_Received_Parcel_Time_Offline &&
         !item.Tracking_Destination_Branch_MotherHub_Received_Parcel_Time_Int)
          ? 1 : 0
      ),

      delivered: last7Days.map((item) =>
        (item?.Tracking_Rider_Online_Booking_Delivary_Update_Time ||
         item?.Tracking_Rider_Offline_Booking_Delivary_Update_Time ||
         item?.Tracking_Destination_Branch_Delivery_Parcel_Time ||
         item?.Tracking_Rider_Online_Booking_Delivary_Update_Time_Int ||
         item?.Tracking_Destination_Branch_Delivery_Parcel_Int)
          ? 1 : 0
      ),
    };

    setFilteredChartData(chartData);

    // ---- Pie Data ----
    const pieData = {
      parcelBooking: filteredData.length,
      delivered: Total_Delivey_Complete,
      partiallyDelivered: Total_Pickup_Done,
      processing: totalPending_Parcel_Branch,
      cancelled: Total_Return_Complete,
      deleted: 0,
      pendingDeliveries: totalPending_Parcel_Branch,
      returned: Total_Return_Complete,
    };

    setFilteredPieData(pieData);
  }
}, [
  parcelData,
  fromDate,
  toDate,
  Total_Return_Complete,
  Total_Delivey_Complete,
  Total_Pickup_Done,
  totalPending_Parcel_Branch,
]);




    return (
        <div>

            


              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
                <HostStatsCard
                    title="Total Booking Parcel"
                    icon={<FaTruckPickup />}
                    value={parcelData.length || 0}
                    color="bg-blue-100"
                />
                <HostStatsCard
                    title="Today Pickup Done"
                    icon={<FaTruckPickup />}
                    value={Total_Pickup_Done_Today 

                        ||0
                    }
                    color="bg-green-100"
                />
                <HostStatsCard
                    title="Total Pickup Done"
                    icon={<FaTruckPickup />}
                    value={Total_Pickup_Done || 0}
                    color="bg-red-100"
                />
                <HostStatsCard
                    title="Total Hub Transfer Complete"
                    icon={<FaTruckPickup />}
                    value={Total_Hub_Transfer || 0}
                    color="bg-red-100"
                />
                <HostStatsCard
                    title="Today New Parcel"
                    icon={<FaTruckPickup />}
                    value={Total_Booking_Today || 0}
                    color="bg-green-100"
                />
                <HostStatsCard
                    title="Total Pending Parcel"
                    icon={<FaTruckPickup />}
                    value={totalPending_Parcel_Branch || 0}
                    color="bg-orange-100"
                />
                <HostStatsCard
                    title="Today Parcel For Delivery"
                    icon={<FaTruckPickup />}
                    value={Total_Booking_Today || 0}
                    color="bg-yellow-100"
                />
                <HostStatsCard
                    title="Total Parcel For Delivery"
                    icon={<FaTruckPickup />}
                    value={parcelData.length || 0}
                    color="bg-pink-100"
                />
                <HostStatsCard
                    title="Today Delivery Complete"
                    icon={<FaTruckPickup />}
                    value={Total_Delivery_Complete_Today || 0}
                    color="bg-cyan-100"
                />
                <HostStatsCard
                    title="Today Delivery Pending"
                    icon={<FaTruckPickup />}
                    value={Today_Delivery_Pending || 0}
                    color="bg-sky-100"
                />
                <HostStatsCard
                    title="Total Hub Transfer"
                    icon={<FaTruckPickup />}
                    value={Total_Hub_Transfer || 0}
                    color="bg-indigo-100"
                />
                <HostStatsCard
                    title="Todays Cancel Parcel"
                    icon={<FaTruckPickup />}
                    value={Total_Return_Today || 0}
                    color="bg-violet-100"
                />
                <HostStatsCard
                    title="Total Delivery Complete"
                    icon={<FaTruckPickup />}
                    value={Total_Delivey_Complete || 0}
                    color="bg-purple-100"
                />
                <HostStatsCard
                    title="Total Return Parcel"
                    icon={<FaTruckPickup />}
                    value={Total_Return_Complete || 0}
                    color="bg-rose-100"
                />
                <HostStatsCard
                    title="Total Booking Amount"
                    icon={<FaTruckPickup />}
                    value={`${totalAmount_Booking_Branch} Tk` || 0}
                    color="bg-blue-100"
                />
            </div>
<div className="border-[2px] hover:shadow-2xl rounded-md hover:border-blue-400 p-2 md:p-3 lg:p-10">
                <div className="flex gap-6 mb-4">
                    <div>
                        <label className="font-semibold text-gray-700">From: </label>
                        <DatePicker
                            selected={fromDate}
                            onChange={(date) => setFromDate(date)}
                            className="border w-full rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="font-semibold text-gray-700">To: </label>
                        <DatePicker
                            selected={toDate}
                            onChange={(date) => setToDate(date)}
                            className="border w-full rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 hover:border-blue-400 border-[2px] bg-white border-gray-200 rounded-lg shadow-lg hover:shadow-2xl p-6">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Last 7 Days Booking</h2>
                          <ParcelChart data={filteredChartData || { labels: [], pickup: [], delivered: [] }} />
                    </div>
                    <div className="flex-1 bg-white border-[2px] hover:border-blue-400 border-gray-200 rounded-lg shadow-lg hover:shadow-2xl p-6">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Booking Statistics</h2>
                        <ParcelPieChart 
  data={filteredPieData || { 
    parcelBooking: 0, 
    delivered: 0, 
    partiallyDelivered: 0, 
    processing: 0, 
    cancelled: 0, 
    deleted: 0, 
    pendingDeliveries: 0,
    returned: 0
  }} 
/>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default HostDashboard;
