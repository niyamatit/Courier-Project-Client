import { FaTruckPickup } from "react-icons/fa";
import HostStatsCard from "./HostStatsCard";
import SalesLineChart from "../../Admin/SalesLineChart";
import { useEffect, useState } from "react";
import { getAdminStat } from "../../../../api/utils";
import ParcelPieChart from "../../Merchant/MerchatDashboard/ParcelPieChart";

const HostDashboard = () => {
    const [statData, setStatData] = useState({});
    const [hostData, setHostData] = useState([]);
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

    useEffect(() => {
        getAdminStat().then(data => setStatData(data));
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/package')
            .then(res => res.json())
            .then(data => {
                setHostData(data);

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
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
            <HostStatsCard
                title="Today Pickup Request"
                icon={<FaTruckPickup />}
                value={pickupRequestData?.length}
                color="bg-blue-100"
            />
            <HostStatsCard
                title="Today Pickup Done"
                icon={<FaTruckPickup />}
                value={pickupDonetData?.length}
                color="bg-green-100"
            />
            <HostStatsCard
                title="Total Pickup Done"
                icon={<FaTruckPickup />}
                value={totalPickupDonetData?.length}
                color="bg-red-100"
            />
            <HostStatsCard
                title="Total Hub Transfer Complete"
                icon={<FaTruckPickup />}
                value="20"
                color="bg-red-100"
            />
            <HostStatsCard
                title="Today New Parcel"
                icon={<FaTruckPickup />}
                value={todayNewParcelData?.length}
                color="bg-green-100"
            />
            <HostStatsCard
                title="Previous Pending Parcel"
                icon={<FaTruckPickup />}
                value="20"
                color="bg-orange-100"
            />
            <HostStatsCard
                title="Today Parcel For Delivery"
                icon={<FaTruckPickup />}
                value={pickupReadyForDeliveryData?.length}
                color="bg-yellow-100"
            />
            <HostStatsCard
                title="Total Parcel For Delivery"
                icon={<FaTruckPickup />}
                value={totalPickupReadyForDeliveryData?.length}
                color="bg-pink-100"
            />
            <HostStatsCard
                title="Today Delivery Complete"
                icon={<FaTruckPickup />}
                value={deliveryCompleteData?.length}
                color="bg-cyan-100"
            />
            <HostStatsCard
                title="Today Delivery Pending"
                icon={<FaTruckPickup />}
                value={pendingDeliveryData?.length}
                color="bg-sky-100"
            />
            <HostStatsCard
                title="Today Hub Transfer"
                icon={<FaTruckPickup />}
                value={todayHubTransferData?.length}
                color="bg-indigo-100"
            />
            <HostStatsCard
                title="Todays Cancel Parcel"
                icon={<FaTruckPickup />}
                value={cancledDeliveryData?.length}
                color="bg-violet-100"
            />
            <HostStatsCard
                title="Total Delivery Complete"
                icon={<FaTruckPickup />}
                value={totalDeliveryCompleteData?.length}
                color="bg-purple-100"
            />
            <HostStatsCard
                title="Total Return Parcel"
                icon={<FaTruckPickup />}
                value={totalCancledDeliveryData?.length}
                color="bg-rose-100"
            />
            <HostStatsCard
                title="Todays Collection Amount"
                icon={<FaTruckPickup />}
                value={totalAmount}
                color="bg-blue-100"
            />
        </div>

        <div className="grid lg:grid-cols-2">
            <SalesLineChart data={statData?.chartData} />
            <ParcelPieChart data={data} />
        </div>
    </div>
);
};

export default HostDashboard;
