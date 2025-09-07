import { useQuery } from "@tanstack/react-query";
import useUsersData from "../../../hooks/useUsersData/useUsersData";
import axiosSecure from "../../../api/axiosSecure";
import { Chart } from "react-google-charts";
import {
  FaBoxOpen,
  FaShippingFast,
  FaUndoAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaClipboardList,
  FaMoneyBillWave,
  FaTasks,
} from "react-icons/fa";

// Updated Card Component for a more modern look
function Card({ info }) {
  const { numbers, title, icon: Icon, color } = info;
  return (
    <div
      className="bg-white rounded-xl shadow-md p-5 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
      style={{ borderLeft: `5px solid ${color}` }}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-3xl font-bold text-gray-800">{numbers}</p>
          <h3 className="text-gray-500 font-medium mt-1">{title}</h3>
        </div>
        <div
          className="p-4 rounded-full"
          style={{ backgroundColor: `${color}20` }} // Use a transparent version of the color
        >
          <Icon className="text-2xl" style={{ color: color }} />
        </div>
      </div>
    </div>
  );
}

const RiderHome = () => {
  const [verifiedUser] = useUsersData();

  // --- Data fetching hooks remain unchanged ---
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

  // --- Data aggregation and calculations remain unchanged ---
  const TotalRiderData = [
    ...RiderPickupOnline,
    ...RiderPickup_Offline,
    ...RiderPickupOnline_Int,
    ...RiderPickupMerchant,
  ];

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
      parseFloat(booking.Tracking_Rider_Online_Booking_Delivary_Update_amount_Int || 0) ||
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
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl">Loading...</h2>
      </div>
    );
  }

  // Updated infos array with icons and a new color scheme
  const infos = [
    // Today's Stats
    { id: 1, color: "#0EA5E9", numbers: 0, title: "Today Pickup Parcel", icon: FaBoxOpen },
    { id: 2, color: "#10B981", numbers: Total_Pickup_Done_Today || 0, title: "Today Pickup Done", icon: FaCheckCircle },
    { id: 3, color: "#F59E0B", numbers: TotalDeliverPending_Today || 0, title: "Today Pickup Pending", icon: FaHourglassHalf },
    { id: 4, color: "#EF4444", numbers: 0, title: "Today Pickup Cancel", icon: FaTimesCircle },
    { id: 5, color: "#3B82F6", numbers: 0, title: "Today Delivery Parcel", icon: FaShippingFast },
    { id: 6, color: "#22C55E", numbers: Total_Delivery_Complete_Today || 0, title: "Today Delivery Done", icon: FaCheckCircle },
    { id: 7, color: "#F97316", numbers: 0, title: "Today Delivery Pending", icon: FaHourglassHalf },
    { id: 8, color: "#F43F5E", numbers: Total_Return_Today || 0, title: "Today Return", icon: FaUndoAlt },
    
    // Total Stats
    { id: 9, color: "#0EA5E9", numbers: TotalRiderData?.length || 0, title: "Total Pickup Parcel", icon: FaClipboardList },
    { id: 10, color: "#10B981", numbers: TotalRiderData?.length || 0, title: "Total Pickup Done", icon: FaTasks },
    { id: 11, color: "#EF4444", numbers: 0, title: "Total Pickup Cancel", icon: FaTimesCircle },
    { id: 12, color: "#F43F5E", numbers: Total_Return_Complete || 0, title: "Total Return", icon: FaUndoAlt },
    { id: 14, color: "#22C55E", numbers: Total_Delivey_Complete || 0, title: "Total Delivery Done", icon: FaCheckCircle },
    { id: 15, color: "#F59E0B", numbers: Total_Delivery_Pending || 0, title: "Total Delivery Pending", icon: FaHourglassHalf },
    { id: 17, color: "#8B5CF6", numbers: `${totalAmount_Booking_Branch || 0} Tk`, title: "Total Collection Amount", icon: FaMoneyBillWave },
  ];
  
  const pieData = [
    ["Status", "Count"],
    ["Delivery Done", Total_Delivey_Complete],
    ["Return", Total_Return_Complete],
    ["Pending", Total_Delivery_Pending],
  ];

  const pieOptions = {
    title: "Overall Parcel Distribution",
    titleTextStyle: { color: "#334155", fontSize: 18, bold: false },
    pieHole: 0.4, // Creates a donut chart
    colors: ["#3B82F6", "#EF4444", "#F59E0B"], // Blue, Red, Amber
    backgroundColor: "transparent",
    legend: { position: "bottom" },
    chartArea: { left: 10, top: 40, width: "90%", height: "75%" },
  };

  const columnData = [
    ["Status", "Count", { role: "style" }],
    ["Pickup Done", Total_Pickup_Done_Today, "#60A5FA"], // Light Blue
    ["Delivery Done", Total_Delivery_Complete_Today, "#34D399"], // Green
    ["Return", Total_Return_Today, "#F87171"], // Light Red
  ];

  const columnOptions = {
    title: "Today's Performance Summary",
    titleTextStyle: { color: "#334155", fontSize: 18, bold: false },
    hAxis: { title: "Status", textStyle: { color: "#334155" } },
    vAxis: { title: "Count", minValue: 0, textStyle: { color: "#334155" } },
    legend: { position: "none" },
    backgroundColor: "transparent",
    chartArea: { left: 60, top: 40, width: "85%", height: "70%" },
  };

  return (
    <div className="text-black p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-slate-800">
          Today's Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {infos?.slice(0, 8).map((info) => (
            <Card key={info.id} info={info} />
          ))}
        </div>

        <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-800">
          Overall Statistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {infos?.slice(8, 15).map((info) => (
            <Card key={info.id} info={info} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          <div className="bg-white rounded-xl shadow-md p-6">
            <Chart
              chartType="PieChart"
              width="100%"
              height="350px"
              data={pieData}
              options={pieOptions}
            />
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="350px"
              data={columnData}
              options={columnOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderHome;