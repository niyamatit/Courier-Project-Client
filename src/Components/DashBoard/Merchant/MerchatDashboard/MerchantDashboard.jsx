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

  // --------------------------------------For Today delivery-------------------------
    
  const fetchMerchantParcels = (key,url,dataField)=>{

    const{ data = []} = useQuery({
      queryKey:[key, verifiedUser?.email],
      enabled: !!verifiedUser?.email,
      queryFn: async () =>{
        const res = axiosSecure.get(url);
        return Array.isArray(res.data) ? res.data : [res.data]
      }
    }) 

  }




  useEffect(() => {
    if (parcelData.length > 0) {
      const filteredData = parcelData.filter((item) => {
        const itemDate = new Date(item.Date);
        const isAfterStartDate = fromDate ? itemDate >= fromDate : true;
        const isBeforeEndDate = toDate ? itemDate <= toDate : true;
        return isAfterStartDate && isBeforeEndDate;
      });
  
      const totalWeight = filteredData.reduce((sum, item) => sum + item.Parcel_Weight, 0);
      const deliveredWeight = filteredData.filter(item => item.deliveryStatus === "Delivered").reduce((sum, item) => sum + item.Parcel_Weight, 0);
      const cancelledWeight = filteredData.filter(item => item.deliveryStatus === "Cancel").reduce((sum, item) => sum + item.Parcel_Weight, 0);
      const processingWeight = filteredData.filter(item => item.deliveryStatus === "Processing").reduce((sum, item) => sum + item.Parcel_Weight, 0);
      
  
     
      const pendingDeliveries = filteredData.filter(item => item.deliveryStatus !== "Delivered").length;
      const returnedWeight = filteredData.filter(item => item.deliveryStatus === "Cancel").reduce((sum, item) => sum + item.Parcel_Weight, 0);
  
      const chartData = {
        labels: filteredData.map(item => item.Date),
        pickup: filteredData.map(item => item.Parcel_Weight),
        delivered: filteredData.map(item => (item.deliveryStatus === "Delivered" ? item.Parcel_Weight : 0)),
      };
  
      setFilteredChartData(chartData);
  
      const pieData = {
        parcelBooking: totalWeight,
        delivered: deliveredWeight,
        partiallyDelivered: filteredData.filter(item => item.deliveryStatus === "Partial").reduce((sum, item) => sum + item.Parcel_Weight, 0),
        processing: processingWeight,
        cancelled: cancelledWeight,
        deleted: 0,
        pendingDeliveries, 
        returned: returnedWeight
      };
  
      setFilteredPieData(pieData);
  
      const paymentInvoice = filteredData.reduce((sum, item) => sum + item.Total_Charge, 0);
      const totalCollected = filteredData.reduce((sum, item) => sum + item.Total_Collection_Amount, 0);
      const totalServiceCharge = paymentInvoice;
      const totalPaid = totalCollected;
      const unpaidAmount = paymentInvoice - totalCollected;
      const allParcelCOD = filteredData.reduce((sum, item) => sum + item.Product_Value, 0); 
      const returnParcelCOD = filteredData.filter(item => item.deliveryStatus === "Cancel").reduce((sum, item) => sum + item.Product_Value, 0);
  
      setFinancialStats({
        paymentInvoice,
        totalCollected,
        totalServiceCharge,
        totalPaid,
        unpaidAmount,
        allParcelCOD,
        returnParcelCOD,
      });
    }
  }, [parcelData, fromDate, toDate]);
  

  const getPercentage = (part, total) => total > 0 ? `(${((part / total) * 100).toFixed(2)}%)` : "(0%)";

  const orders = parcelData.map(item => ({
    id: item.Merchant_Order_ID,
    customerName: item.Customer_Name,
    phone: item.Customer_Contact_Number,
    status: item.deliveryStatus,
  }));

  const DeliveryData = {
    outForDelivery: parcelData.filter(item => item.deliveryStatus === "Out For Delivery"),
    pickUpPending: parcelData.filter(item => item.deliveryStatus !== "Delivered"),
  };



  // parcelsMerchnat

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Merchant Dashboard</h1>
      <div className="mb-8 flex items-center">
        <div className="flex-grow flex">
          <input
            type="text"
            placeholder="Enter Order ID or Customer Name for Search..."
            className="w-full p-3 border-2 border-blue-400 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500"
          />
          <button className="p-3 bg-blue-500 text-white rounded-r-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-blue-500">
            <FaSearch />
          </button>
        </div>
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
          value={0}
          icon={<FaCheckCircle />}
          color="bg-green-100"
        />
        <StatsCard
          title="Today Cancelled"
          value={0}
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
          value={0}
          icon={<FaMoneyBillWave />}
          color="bg-blue-100"
        />
        <StatsCard
          title="Total Service Charge"
          value={0}
          icon={<FaMoneyBillWave />}
          color="bg-purple-100"
        />
        <StatsCard
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
        />
        <StatsCard
          title="All Parcel COD"
          value={0} 
          icon={<FaBoxOpen />}
          color="bg-blue-100"
        />
        <StatsCard
          title="Return Parcel COD"
          value={0} 
          icon={<FaUndo />}
          color="bg-red-100"
        />
      </div>

      {/* <div className="flex  gap-10 flex-col md:flex-col lg:flex-row justify-center items-start mb-10 bg-gray-100">
        <DeliveryCard title="Out for Delivery" items={DeliveryData.outForDelivery} />
        <DeliveryCard title="Pick up Pending" items={DeliveryData.pickUpPending} />
        <DeliveryCard title="Pick up Pending" items={DeliveryData.pickUpPending} />
      </div> */}
      {/* <div className="mb-8 border-[2px] hover:shadow-2xl rounded hover:border-blue-400 sm:overflow-x-auto md:overflow-x-auto">
        <OrdersTable orders={orders} />
      </div> */}
      {/* Filter */}
      {/* <div className="border-[2px] hover:shadow-2xl rounded-md hover:border-blue-400 p-2 md:p-3 lg:p-10">
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
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Last 7 Days Parcel</h2>
            <ParcelChart data={filteredChartData || { labels: [], pickup: [], delivered: [] }} />
          </div>
          <div className="flex-1 bg-white border-[2px] hover:border-blue-400 border-gray-200 rounded-lg shadow-lg hover:shadow-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Parcel Statistics</h2>
            <ParcelPieChart data={filteredPieData || { parcelBooking: 0, delivered: 0, partiallyDelivered: 0, processing: 0, cancelled: 0, deleted: 0 }} />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MerchantDashboard;
