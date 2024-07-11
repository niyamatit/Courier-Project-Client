import { useEffect, useState } from "react";
import StatsCard from "./StartsCard";
import OrdersTable from "./OrdersTable";
import ParcelChart from "./ParcelChart";
import ParcelPieChart from "./ParcelPieChart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaTruck,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaSyncAlt,
  FaMoneyBillWave,
  FaMoneyCheckAlt,
  FaBoxOpen,
  FaUndo,
} from "react-icons/fa";

const initialData = {
  parcelBooking: 20,
  delivered: 30,
  partiallyDelivered: 10,
  processing: 15,
  cancelled: 5,
  deleted: 2,
};

const initialChartData = {
  labels: [
    "2024-07-04",
    "2024-07-05",
    "2024-07-06",
    "2024-07-07",
    "2024-07-08",
    "2024-07-09",
    "2024-07-10",
  ],
  pickup: [8, 7, 6, 5, 4, 3, 2],
  delivered: [7, 6, 5, 4, 3, 2, 1],
};

const MerchantDashboard = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [filteredChartData, setFilteredChartData] = useState(initialChartData);
  const [filteredPieData, setFilteredPieData] = useState(initialData);

  const orders = [
    {
      id: "2407042BS0TKD",
      customerName: "Akbar",
      phone: "01721689955",
      status: "On The Way To Delivery Hub",
    },
    {
      id: "240703P6E0SZN",
      customerName: "Md Omar Faruq",
      phone: "01988599390",
      status: "Out For Delivery",
    },
    {
      id: "240703626OZIM",
      customerName: "Sohel Rana",
      phone: "01785402517",
      status: "At Delivery Hub",
    },
    {
      id: "240703P000SZK",
      customerName: "Ranjan Jhan",
      phone: "01724393398",
      status: "At Delivery Hub",
    },
    {
      id: "2407034ODSZI",
      customerName: "Ripon Rana",
      phone: "01786761077",
      status: "At Delivery Hub",
    },
    {
      id: "2407034OZSI",
      customerName: "Santo",
      phone: "01319690519",
      status: "At Delivery Hub",
    },
    {
      id: "240703QXNOYSR",
      customerName: "Eftekhar Uddin",
      phone: "01701030437",
      status: "On The Way To Delivery Hub",
    },
  ];

  const filterData = (data, from, to) => {
    if (!from && !to) return data;

    const fromDate = from ? new Date(from) : new Date("1970-01-01");
    const toDate = to ? new Date(to) : new Date();

    const filteredIndices = data.labels
      .map((label, index) => ({ label, index }))
      .filter((item) => {
        const date = new Date(item.label);
        return date >= fromDate && date <= toDate;
      })
      .map((item) => item.index);

    const filteredLabels = filteredIndices.map((index) => data.labels[index]);
    const filteredPickup = filteredIndices.map((index) => data.pickup[index]);
    const filteredDelivered = filteredIndices.map(
      (index) => data.delivered[index]
    );

    return {
      labels: filteredLabels,
      pickup: filteredPickup,
      delivered: filteredDelivered,
    };
  };

  const filterPieData = (data, chartData) => {
    const totalDays = chartData.labels.length;
    const sum = (arr) => arr.reduce((a, b) => a + b, 0);
    const pickupSum = sum(chartData.pickup);
    const deliveredSum = sum(chartData.delivered);
    const remaining = totalDays * initialChartData.pickup[0] - pickupSum;

    return {
      ...data,
      parcelBooking: pickupSum,
      delivered: deliveredSum,
      partiallyDelivered: remaining,
      processing: remaining,
      cancelled: data.cancelled,
      deleted: data.deleted,
    };
  };

  useEffect(() => {
    const newFilteredData = filterData(initialChartData, fromDate, toDate);
    setFilteredChartData(newFilteredData);
    setFilteredPieData(filterPieData(initialData, newFilteredData));
  }, [fromDate, toDate]);

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
          title="Today Pickup"
          value="6"
          icon={<FaTruck />}
          color="bg-blue-100"
        />
        <StatsCard
          title="Today Delivered"
          value="2"
          icon={<FaCheckCircle />}
          color="bg-green-100"
        />
        <StatsCard
          title="Today Cancelled"
          value="0"
          icon={<FaTimesCircle />}
          color="bg-red-100"
        />
        <StatsCard
          title="Pickup Pending"
          value="0"
          icon={<FaHourglassHalf />}
          color="bg-yellow-100"
        />
        <StatsCard
          title="Total Parcel"
          value="54"
          icon={<FaTruck />}
          color="bg-blue-100"
        />
        <StatsCard
          title="Delivered"
          value="38"
          icon={<FaCheckCircle />}
          color="bg-green-100"
        />
        <StatsCard
          title="Cancelled"
          value="2"
          icon={<FaTimesCircle />}
          color="bg-red-100"
        />
        <StatsCard
          title="Delivery Pending"
          value="13"
          icon={<FaSyncAlt />}
          color="bg-yellow-100"
        />
        <StatsCard
          title="Payment Invoice"
          value="1,630.00 TK"
          icon={<FaMoneyBillWave />}
          color="bg-green-100"
        />
        <StatsCard
          title="Total Collected"
          value="1,120.00 TK"
          icon={<FaMoneyBillWave />}
          color="bg-blue-100"
        />
        <StatsCard
          title="Total Service Charge"
          value="-263.70 TK"
          icon={<FaMoneyBillWave />}
          color="bg-purple-100"
        />
        <StatsCard
          title="Total Paid"
          value="6,790.00 TK"
          icon={<FaMoneyBillWave />}
          color="bg-orange-100"
        />
        <StatsCard
          title="Unpaid Amount"
          value="500.00 TK"
          icon={<FaMoneyCheckAlt />}
          color="bg-red-100"
        />
        <StatsCard
          title="Parcel in Processing"
          value="15"
          icon={<FaSyncAlt />}
          color="bg-yellow-100"
        />
        <StatsCard
          title="All Parcel COD"
          value="40,000.00 TK"
          icon={<FaBoxOpen />}
          color="bg-blue-100"
        />
        <StatsCard
          title="Return Parcel COD"
          value="3,000.00 TK"
          icon={<FaUndo />}
          color="bg-red-100"
        />
      </div>
      <div className="mb-8 border-[2px] hover:shadow-2xl rounded-md border-blue-400 sm:overflow-x-auto md:overflow-x-auto">
        <OrdersTable orders={orders} />
      </div>
      {/* Filter */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <div>
          <label>From Date: </label>
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
          />
        </div>
        <div>
          <label>To Date: </label>
          <DatePicker selected={toDate} onChange={(date) => setToDate(date)} />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex-1 border-[2px] hover:shadow-2xl border-blue-400 rounded-md p-3">
          <h2 className="text-xl font-bold mb-4">Last 7 Days Parcel</h2>
          <ParcelChart data={filteredChartData} />
        </div>
        <div className="p-3 flex-1 hover:shadow-2xl border-blue-400 border-[2px] rounded-md">
          <h2 className="text-xl font-bold mb-4">Parcel Statistics</h2>
          <ParcelPieChart data={filteredPieData} />
        </div>
      </div>
    </div>
  );
};

export default MerchantDashboard;
