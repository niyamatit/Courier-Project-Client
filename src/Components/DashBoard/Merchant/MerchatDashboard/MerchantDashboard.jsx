import { useEffect, useState } from "react";
import StatsCard from "./StartsCard";
import OrdersTable from "./OrdersTable";
import ParcelChart from "./ParcelChart";
import ParcelPieChart from "./ParcelPieChart";
import DatePicker from "react-datepicker";
import DeliveryCard from "./DeliveryCard";
import "react-datepicker/dist/react-datepicker.css";
import { FaClock, FaSearch, FaCheckCircle, FaTimesCircle, FaMoneyBillWave, FaMoneyCheckAlt, FaBoxOpen, FaUndo } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../../api/axiosSecure";
import useUsersData from "../../../../hooks/useUsersData/useUsersData";

const MerchantDashboard = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [filteredChartData, setFilteredChartData] = useState(null);
  const [filteredPieData, setFilteredPieData] = useState(null);
  const [financialStats, setFinancialStats] = useState({
    paymentInvoice: 0,
    totalCollected: 0,
    totalServiceCharge: 0,
    totalPaid: 0,
    unpaidAmount: 0,
    allParcelCOD: 0,
    returnParcelCOD: 0,
  });

  const[verifiedUser] = useUsersData()
  const { data: parcelData = [] } = useQuery({
    queryKey: ["parcelData", verifiedUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcelhkdbjsbdjkshujsbh");
      return res.data;
    },
    enabled: !!verifiedUser?.email,
  });
  const fetchParcels = async ({ queryKey }) => {
    const [, merchant_email] = queryKey;
    const response = await axiosSecure.get(`/parcels?merchant_email=${merchant_email}`);
    return response.data;
  };
const { data: parcels = [], isLoading,refetch } = useQuery({
    queryKey: ['parcels', verifiedUser?.email],
    queryFn: fetchParcels,
  });
const TotalReturned = parcels.reduce((total, booking) => {
  if (booking?.Tracking_Rider_Merchant_Delivary_Update_Return_Time) {
    return total + 1;  // Assuming codAmount is the field to sum
  }
  return total;  // If not 'cod', return the total unchanged
}, 0);
const TotalDeliveryPending = parcels.reduce((total, booking) => {
  if (!booking?.Tracking_Rider_Merchant_Delivary_Update_Return_Time || !booking?.Tracking_Rider_Merchant_Delivary_Update_Time) {
    return total + 1;  // Assuming codAmount is the field to sum
  }
  return total;  // If not 'cod', return the total unchanged
}, 0);

const formatDate = (dateStr) => {
  if (!dateStr) return null; // null or undefined
  const d = new Date(dateStr);
  return isNaN(d) ? null : d.toISOString().split("T")[0];
};
const Total_Delivery_Complete_Today = parcels.reduce((total, booking) => {
  const today = new Date().toISOString().split("T")[0]; // e.g. "2025-08-23"

  const adminDate = formatDate(booking?.Tracking_Rider_Merchant_Delivary_Update_Return_Time);
  // const branchDate = formatDate(booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Time);
  // const adminDate1 = formatDate(booking?.Tracking_Rider_Online_Booking_Delivary_Update_Time);
  // const branchDate1 = formatDate(booking?.Tracking_Destination_Branch_Delivery_Parcel_Time);

  if (adminDate === today) {
    return total + 1;
  }
  return total;
}, 0);
const Total_Delivery_Cancel_Today = parcels.reduce((total, booking) => {
  const today = new Date().toISOString().split("T")[0]; 

  const adminDate = formatDate(booking?.Tracking_Rider_Merchant_Delivary_Update_Time);
  // const branchDate = formatDate(booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Time);
  // const adminDate1 = formatDate(booking?.Tracking_Rider_Online_Booking_Delivary_Update_Time);
  // const branchDate1 = formatDate(booking?.Tracking_Destination_Branch_Delivery_Parcel_Time);

  if (adminDate === today) {
    return total + 1;
  }
  return total;
}, 0);


// Total_Collection_Amount
const total_Collection_Amount_Booking_Branch = parcels.reduce((total, booking) => {
  
  const amount = parseFloat(booking.Total_Collection_Amount || 0);
  return total + amount;
}, 0);
const total_COD_Charge = parcels.reduce((total, booking) => {
  
  const amount = parseFloat(booking.Cod_Charge || 0);
  return total + amount;
}, 0);




const Total_Return_COD = parcels.reduce((total, booking) => {
  // Check if Tracking_Rider_Merchant_Delivary_Update_Return_Time exists
  const amount = booking.Tracking_Rider_Merchant_Delivary_Update_Return_Time
    && parseFloat(booking.Cod_Charge || 0)  // If exists, calculate Cod_Charge
    
  
  return total + amount;
}, 0);


  // --------------------------------------For Today delivery-------------------------
    
 




  
useEffect(() => {
  if (parcels.length > 0) {
    const filteredData = parcels.filter((item) => {
      const itemDate = new Date(item?.Date).toISOString().split("T")[0]; // parcel date (YYYY-MM-DD)
      const startDate = fromDate ? new Date(fromDate).toISOString().split("T")[0] : null;
      const endDate = toDate ? new Date(toDate).toISOString().split("T")[0] : null;

      const isAfterStartDate = startDate ? itemDate >= startDate : true;
      const isBeforeEndDate = endDate ? itemDate <= endDate : true;

      return isAfterStartDate && isBeforeEndDate;
    });

     const today = new Date();
    const cutoff = new Date();
    cutoff.setDate(today.getDate() - 7);

    const last7Days = filteredData.filter((item) => {
      const rawDate = item?.Date;
      if (!rawDate) return false;
      const d = new Date(rawDate);
      return d >= cutoff && d <= today;
    });

    // ---- Chart Data ----
    const chartData = {
      labels: last7Days.map(item => {
        const d = new Date(item.Date);
        const day = d.getDate().toString().padStart(2, "0");
        const month = (d.getMonth() + 1).toString().padStart(2, "0");
        const year = d.getFullYear().toString().slice(-2); // last 2 digits
        return `${day}-${month}-${year}`; // Example: 25-08-25
      }),
      pickup: last7Days.map(item => 
        !item.Tracking_Rider_Merchant_Delivary_Update_Return_Time && 
        !item?.Tracking_Rider_Merchant_Delivary_Update_Time ? 1 : 0
      ),
      delivered: last7Days.map(item => item?.Tracking_Rider_Merchant_Delivary_Update_Time ? 1 : 0),
    };

    setFilteredChartData(chartData);

    // ---- Pie Data ----
    const pieData = {
      parcelBooking: filteredData.length,
      delivered: filteredData.filter(item => item?.Tracking_Rider_Merchant_Delivary_Update_Time).length,
      partiallyDelivered: filteredData.filter(item => item.Tracking_MotherHub_Branch_Received_Parcel_Merchant).length,
      processing: filteredData.length,
      cancelled: filteredData.filter(item => item?.Tracking_Rider_Merchant_Delivary_Update_Return_Time).length,
      deleted: 0,
      pendingDeliveries: filteredData.filter(item => 
        !item.Tracking_Rider_Merchant_Delivary_Update_Return_Time && 
        !item?.Tracking_Rider_Merchant_Delivary_Update_Time
      ).length,
      returned: filteredData.filter(item => item?.Tracking_Rider_Merchant_Delivary_Update_Return_Time).length,
    };

    setFilteredPieData(pieData);
  }
}, [parcels, fromDate, toDate]);

  

  


  // parcelsMerchnat

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Merchant Dashboard</h1>
      <div className="mb-8 flex items-center">
        {/* <div className="flex-grow flex">
          <input
            type="text"
            placeholder="Enter Order ID or Customer Name for Search..."
            className="w-full p-3 border-2 border-blue-400 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500"
          />
          <button className="p-3 bg-blue-500 text-white rounded-r-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-blue-500">
            <FaSearch />
          </button>
        </div> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Booking"
          value={parcels?.length || 0}
          // percentage={getPercentage(filteredPieData?.delivered, filteredPieData?.parcelBooking)}
          icon={<FaCheckCircle />}
          color="bg-blue-100"
          percentageColor="text-green-600"
          iconColor="text-green-400"
        />
        {/* <StatsCard
          title="Total Delivered"
          value={filteredPieData?.delivered || 0}
          percentage={getPercentage(filteredPieData?.delivered, filteredPieData?.parcelBooking)}
          icon={<FaCheckCircle />}
          color="bg-blue-100"
          percentageColor="text-green-600"
          iconColor="text-green-400"
        /> */}
        <StatsCard
  title="Total Returned"
  value={TotalReturned || 0} 
  // percentage={getPercentage(filteredPieData?.returned, filteredPieData?.parcelBooking)}
  icon={<FaUndo />}
  color="bg-red-100"
  percentageColor="text-red-600"
/>

        <StatsCard
  title="Total Delivery Pending"
  value={TotalDeliveryPending ||0} 
  // percentage={getPercentage(0)}
  icon={<FaClock />}
  color="bg-yellow-100"
  percentageColor="text-blue-600"
/>
        <StatsCard
          title="Today Delivered"
          value={Total_Delivery_Complete_Today ||0}
          icon={<FaCheckCircle />}
          color="bg-green-100"
        />
        <StatsCard
          title="Today Cancelled"
          value={Total_Delivery_Cancel_Today || 0}
          icon={<FaTimesCircle />}
          color="bg-red-100"
        />
         <StatsCard
          title="Payment Invoice"
          value={0}
          icon={<FaMoneyBillWave />}
          color="bg-green-100"
        />
        <StatsCard
          title="Total Collected"
          value={`${total_Collection_Amount_Booking_Branch ||0} Tk`}
          icon={<FaMoneyBillWave />}
          color="bg-blue-100"
        />
        {/* Now */}
        <StatsCard
          title="Total COD Charge"
          value={`${total_COD_Charge || 0} Tk` }
          icon={<FaMoneyBillWave />}
          color="bg-purple-100"
        />
        {/* <StatsCard
          title="Total Paid"
          value={0}
          icon={<FaMoneyBillWave />}
          color="bg-orange-100"
        />
        <StatsCard
          title="Unpaid Amount"
          value={0}
          icon={<FaMoneyCheckAlt />}
          color="bg-red-100"
        /> */}
        <StatsCard
          title="All Parcel COD"
          value={`${total_COD_Charge || 0} Tk`} 
          icon={<FaBoxOpen />}
          color="bg-blue-100"
        />
        <StatsCard
          title="Return Parcel COD"
          value={`${Total_Return_COD || 0} Tk`} 
          icon={<FaUndo />}
          color="bg-red-100"
        />
      </div>

      <div className="flex gap-10 flex-col md:flex-col lg:flex-row justify-center items-start mb-10 bg-gray-100">
  <DeliveryCard 
    title="Out for Delivery" 
    items={parcels.filter(item => item?.Tracking_Destination_Branch_Select_Rider_Merchant)}
  />
  <DeliveryCard 
  title="Pick up Pending" 
  items={parcels.filter(item => 
    !item.Tracking_Rider_Merchant_Delivary_Update_Return_Time || 
    !item?.Tracking_Rider_Merchant_Delivary_Update_Time
  )}
/>
</div>

      <div className="mb-8 border-[2px] hover:shadow-2xl rounded hover:border-blue-400 sm:overflow-x-auto md:overflow-x-auto">
        <OrdersTable parcels={parcels} />
      </div>
      {/* Filter */}
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
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Parcel Statistics</h2>
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

export default MerchantDashboard;
