
import StatsCard from "./StartsCard";
import OrdersTable from './OrdersTable';
import ParcelChart from './ParcelChart';
import ParcelPieChart from './ParcelPieChart'
import { FaTruck, FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaSyncAlt, FaMoneyBillWave } from 'react-icons/fa';
const data = {
    parcelBooking: 20,
    delivered: 30,
    partiallyDelivered: 10,
    processing: 15,
    cancelled: 5,
    deleted: 2,
};
const MerchantDashboard = () => {
    const orders = [
        { id: '2407042BS0TKD', customerName: 'Akbar', phone: '01721689955', status: 'On The Way To Delivery Hub' },
        { id: '240703P6E0SZN', customerName: 'Md Omar Faruq', phone: '01988599390', status: 'Out For Delivery' },
        
    ];

    const chartData = {
        labels: ['Today', 'Yesterday', '2 days ago', '3 days ago', '4 days ago', '5 days ago', '6 days ago'],
        pickup: [2, 3, 4, 5, 6, 7, 8],
        delivered: [1, 2, 3, 4, 5, 6, 7],
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-8">Merchant Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatsCard title="Today Pickup" value="6" icon={<FaTruck />} color="bg-blue-100" />
                <StatsCard title="Today Delivered" value="2" icon={<FaCheckCircle />} color="bg-green-100" />
                <StatsCard title="Today Cancelled" value="0" icon={<FaTimesCircle />} color="bg-red-100" />
                <StatsCard title="Pickup Pending" value="0" icon={<FaHourglassHalf />} color="bg-yellow-100" />
                <StatsCard title="Total Parcel" value="54" icon={<FaTruck />} color="bg-blue-100" />
                <StatsCard title="Delivered" value="38" icon={<FaCheckCircle />} color="bg-green-100" />
                <StatsCard title="Cancelled" value="2" icon={<FaTimesCircle />} color="bg-red-100" />
                <StatsCard title="Delivery Pending" value="13" icon={<FaSyncAlt />} color="bg-yellow-100" />
                <StatsCard title="Total Collected" value="1,630.00 TK" icon={<FaMoneyBillWave />} color="bg-green-100" />
                <StatsCard title="Total Service Charge" value="1,120.00 TK" icon={<FaMoneyBillWave />} color="bg-blue-100" />
                <StatsCard title="Unpaid Amount" value="-263.70 TK" icon={<FaMoneyBillWave />} color="bg-purple-100" />
                <StatsCard title="Parcel In Processing Amount" value="6,790.00 TK" icon={<FaMoneyBillWave />} color="bg-orange-100" />
            </div>
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Latest Orders</h2>
                <OrdersTable orders={orders} />
            </div>
            <div className="flex gap-5">
            <div className="flex-1 border-2 p-3">
                <h2 className="text-xl font-bold mb-4">Last 7 Days Parcel</h2>
                <ParcelChart data={chartData} />
            </div>
            <div className="p-4 flex-1">
            <h2 className="text-xl font-bold mb-4">Parcel Statistics</h2>
            <ParcelPieChart data={data} />
        </div>
            </div>
        </div>
    );
};

export default MerchantDashboard;
