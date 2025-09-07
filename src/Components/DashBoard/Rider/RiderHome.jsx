import { useQuery } from "@tanstack/react-query";
import useUsersData from "../../../hooks/useUsersData/useUsersData";
import axiosSecure from "../../../api/axiosSecure";
import { Chart } from "react-google-charts";
import { motion } from "framer-motion";

function Card({ info }) {
  const { numbers, title, bg } = info;
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out bg-gradient-to-br from-white to-blue-50"
    >
      <div
        className="rounded-xl p-6 text-center"
        style={{ backgroundColor: bg }}
      >
        <h2 className="font-bold text-4xl text-gray-900 drop-shadow-sm">
          {numbers}
        </h2>
        <h2 className="font-semibold text-lg text-gray-700 mt-2">
          {title}
        </h2>
      </div>
    </motion.div>
  );
}

const RiderHome = () => {
  const [verifiedUser] = useUsersData();

  const { data: RiderPickupOnline = [] } = useQuery({
    queryKey: ["RiderPickupOnline", verifiedUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/email/rider/parcel/${verifiedUser?.email}`
      );
      return Array.isArray(res.data) ? res.data : [res.data];
    },
  });

  const { data: RiderPickup_Offline = [] } = useQuery({
    queryKey: ["RiderPickup_Offline", verifiedUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/email/rider/parcel/offline/${verifiedUser?.email}`
      );
      return Array.isArray(res.data) ? res.data : [res.data];
    },
  });

  const { data: RiderPickupMerchant = [] } = useQuery({
    queryKey: ["RiderPickupMerchant", verifiedUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/email/rider/parcel/merchant/mer/hello/${verifiedUser?.email}`
      );
      return Array.isArray(res.data) ? res.data : [res.data];
    },
  });

  const { data: RiderPickupOnline_Int = [], isLoading } = useQuery({
    queryKey: ["RiderPickupOnline_Int", verifiedUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/email/rider/parcel/int/${verifiedUser?.email}`
      );
      return Array.isArray(res.data) ? res.data : [res.data];
    },
  });

  const TotalRiderData = [
    ...RiderPickupOnline,
    ...RiderPickup_Offline,
    ...RiderPickupOnline_Int,
    ...RiderPickupMerchant,
  ];

  // ---------------- Existing calculations unchanged ----------------
  const Total_Delivey_Complete = TotalRiderData.reduce((total, booking) => {
    if (
      booking?.Tracking_Rider_Online_Booking_Delivary_Update_Time ||
      booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Time ||
      booking?.Tracking_Rider_Online_Booking_Delivary_Update_Time ||
      booking?.Tracking_Destination_Branch_Delivery_Parcel_Time ||
      booking?.Tracking_Rider_Online_Booking_Delivary_Update_Time_Int ||
      booking?.Tracking_Destination_Branch_Delivery_Parcel_Int
    ) {
      return total + 1;
    }
    return total;
  }, 0);

  const Total_Return_Complete = TotalRiderData.reduce((total, booking) => {
    if (
      booking?.Tracking_Rider_Online_Booking_Delivary_Update_Return_Time ||
      booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Return_Time ||
      booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Return_Time ||
      booking?.Tracking_Destination_Branch_Returned_Parcel_Time ||
      booking?.Tracking_Rider_Online_Booking_Delivary_Update_Return_Time_Int
    ) {
      return total + 1;
    }
    return total;
  }, 0);

  const Total_Delivery_Pending =
    TotalRiderData.length - (Total_Delivey_Complete + Total_Return_Complete);

  const totalAmount_Booking_Branch = TotalRiderData.reduce((total, booking) => {
    const amount =
      parseFloat(booking.Tracking_Rider_Merchant_Delivary_Update_amount || 0) ||
      parseFloat(
        booking.Tracking_Rider_Online_Booking_Delivary_Update_amount_Int || 0
      ) ||
      parseFloat(
        booking.Tracking_Rider_Online_Booking_Delivary_Update_amount ||
          parseFloat(booking?.Tracking_Rider_Offline_Booking_Delivary_Update_amount) ||
          0
      );
    return total + amount;
  }, 0);

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return isNaN(d) ? null : d.toISOString().split("T")[0];
  };

  const Total_Return_Today = TotalRiderData.reduce((total, booking) => {
    const today = new Date().toISOString().split("T")[0];
    const adminDate = formatDate(
      booking?.Tracking_Rider_Online_Booking_Delivary_Update_Return_Time
    );
    const branchDate = formatDate(
      booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Return_Time
    );
    const adminDate1 = formatDate(
      booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Return_Time
    );
    const branchDate1 = formatDate(
      booking?.Tracking_Destination_Branch_Returned_Parcel_Time
    );
    const Int = formatDate(
      booking?.Tracking_Rider_Online_Booking_Delivary_Update_Return_Time_Int
    );

    if (
      adminDate === today ||
      branchDate === today ||
      adminDate1 === today ||
      branchDate1 === today ||
      Int === today
    ) {
      return total + 1;
    }
    return total;
  }, 0);

  const Total_Delivery_Complete_Today = TotalRiderData.reduce(
    (total, booking) => {
      const today = new Date().toISOString().split("T")[0];
      const adminDate = formatDate(
        booking?.Tracking_Rider_Online_Booking_Delivary_Update_Time
      );
      const branchDate = formatDate(
        booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Time
      );
      const adminDate1 = formatDate(
        booking?.Tracking_Rider_Online_Booking_Delivary_Update_Time
      );
      const branchDate1 = formatDate(
        booking?.Tracking_Destination_Branch_Delivery_Parcel_Time
      );
      const Int = formatDate(
        booking?.Tracking_Rider_Online_Booking_Delivary_Update_Time_Int
      );
      const Int_direct = formatDate(
        booking?.Tracking_Destination_Branch_Delivery_Parcel_Int
      );

      if (
        adminDate === today ||
        branchDate === today ||
        adminDate1 === today ||
        branchDate1 === today ||
        Int === today ||
        Int_direct === today
      ) {
        return total + 1;
      }
      return total;
    },
    0
  );

  const TotalDeliverPending_Today =
    TotalRiderData - (Total_Return_Today + Total_Delivery_Complete_Today);

  const Total_Pickup_Done_Today = TotalRiderData.reduce((total, booking) => {
    const today = new Date().toISOString().split("T")[0];
    const Online = booking?.Tracking_Destination_Branch_MotherHub_Received_Parcel_Time
      ? new Date(
          booking.Tracking_Destination_Branch_MotherHub_Received_Parcel_Time
        )
          .toISOString()
          .split("T")[0]
      : null;
    const Offline = booking?.Tracking_Destination_Branch_Received_Parcel_Time_Offline
      ? new Date(
          booking.Tracking_Destination_Branch_Received_Parcel_Time_Offline
        )
          .toISOString()
          .split("T")[0]
      : null;
    const INT = booking?.Tracking_Destination_Branch_MotherHub_Received_Parcel_Time_Int
      ? new Date(
          booking.Tracking_Destination_Branch_MotherHub_Received_Parcel_Time_Int
        )
          .toISOString()
          .split("T")[0]
      : null;

    if (Online === today || Offline === today || INT === today) {
      return total + 1;
    }
    return total;
  }, 0);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const infos = [
    { id: 1, bg: "#d0ebff", numbers: 0, title: "Today Pickup Percel" },
    {
      id: 2,
      bg: "#ffccd5",
      numbers: Total_Pickup_Done_Today || 0,
      title: "Today Pickup Done",
    },
    {
      id: 3,
      bg: "#d3f9d8",
      numbers: TotalDeliverPending_Today || 0,
      title: "Today Pickup Pending",
    },
    { id: 4, bg: "#f3e8ff", numbers: 0, title: "Today Pickup Cancel" },
    { id: 5, bg: "#e0f7fa", numbers: 0, title: "Today Delivery Parcel" },
    {
      id: 6,
      bg: "#e6f7ff",
      numbers: Total_Delivery_Complete_Today || 0,
      title: "Today Delivery Done",
    },
    { id: 7, bg: "#ffe4ec", numbers: 0, title: "Today Delivery Pending" },
    {
      id: 8,
      bg: "#f0fff4",
      numbers: Total_Return_Today || 0,
      title: "Today Return",
    },
    {
      id: 9,
      bg: "#ffe0e0",
      numbers: TotalRiderData?.length || 0,
      title: "Total Pickup Percel",
    },
    {
      id: 10,
      bg: "#caffbf",
      numbers: TotalRiderData?.length || 0,
      title: "Total Pickup Done",
    },
    { id: 11, bg: "#87CEFA", numbers: 0, title: "Total Pickup Cancel" },
    {
      id: 12,
      bg: "#D8BFD8",
      numbers: Total_Return_Complete || 0,
      title: "Total Return",
    },
    {
      id: 14,
      bg: "#ffe4e1",
      numbers: Total_Delivey_Complete || 0,
      title: "Total Delivery Done",
    },
    {
      id: 15,
      bg: "#e0e7ff",
      numbers: Total_Delivery_Pending || 0,
      title: "Total Delivery Pending",
    },
    {
      id: 17,
      bg: "#ffd6a5",
      numbers: `${totalAmount_Booking_Branch || 0} Tk`,
      title: "Total Collection Amount",
    },
  ];

  const pieData = [
    ["Status", "Count"],
    ["Delivery Done", Total_Delivey_Complete],
    ["Return", Total_Return_Complete],
    ["Pending", Total_Delivery_Pending],
  ];

  const lineData = [
    ["Type", "Pickup Done", "Delivery Done", "Return"],
    [
      "Today",
      Total_Pickup_Done_Today,
      Total_Delivery_Complete_Today,
      Total_Return_Today,
    ],
  ];

  return (
    <div className="text-black p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 drop-shadow-sm">
        Today Parcel Pickup and Delivery Information
      </h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
        {infos?.slice(0, 8).map((info) => (
          <Card key={info.id} info={info} />
        ))}
      </div>

      <h2 className="text-4xl font-extrabold mt-16 mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 drop-shadow-sm">
        Total Parcel Pickup and Delivery Information
      </h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
        {infos?.slice(8, 16).map((info) => (
          <Card key={info.id} info={info} />
        ))}
      </div>

      <div className="grid mt-16 lg:grid-cols-3 md:grid-cols-2 gap-6">
        {infos?.slice(16, 19).map((info) => (
          <Card key={info.id} info={info} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8 mt-20">
        {/* Pie Chart (3D) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl"
        >
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">
            Parcel Distribution
          </h3>
          <Chart
            chartType="PieChart"
            width="100%"
            height="300px"
            data={pieData}
            options={{ is3D: true, colors: ["green", "red", "#F59E0B"] }}
          />
        </motion.div>

        {/* Column Chart */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl"
        >
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">
            Today Trend
          </h3>
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="300px"
            data={lineData}
            options={{
              hAxis: { title: "Type" },
              vAxis: { title: "Count" },
              colors: ["#3B82F6", "#10B981", "#F43F5E"],
              legend: { position: "bottom" },
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default RiderHome;
