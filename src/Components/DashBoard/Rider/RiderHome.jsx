import { useQuery } from "@tanstack/react-query";
import useUsersData from "../../../hooks/useUsersData/useUsersData";
import axiosSecure from "../../../api/axiosSecure";
import { Chart } from "react-google-charts";

function Card({ info }) {
  const { numbers, title, bg } = info;
  return (
    <div className="rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 ease-in-out bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="rounded-xl p-6 text-center" style={{ backgroundColor: bg }}>
        <h2 className="font-bold text-3xl text-gray-800">{numbers}</h2>
        <h2 className="font-semibold text-lg text-gray-700 mt-2">{title}</h2>
      </div>
    </div>
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
    return <div>Loading...</div>;
  }

  const infos = [
    { id: 1, bg: "#e0f2fe", numbers: 0, title: "Today Pickup Percel" },
    {
      id: 2,
      bg: "#bfdbfe",
      numbers: Total_Pickup_Done_Today || 0,
      title: "Today Pickup Done",
    },
    {
      id: 3,
      bg: "#93c5fd",
      numbers: TotalDeliverPending_Today || 0,
      title: "Today Pickup Pending",
    },
    { id: 4, bg: "#60a5fa", numbers: 0, title: "Today Pickup Cancel" },
    { id: 5, bg: "#3b82f6", numbers: 0, title: "Today Delivery Parcel" },
    {
      id: 6,
      bg: "#2563eb",
      numbers: Total_Delivery_Complete_Today || 0,
      title: "Today Delivery Done",
    },
    { id: 7, bg: "#1d4ed8", numbers: 0, title: "Today Delivery Pending" },
    {
      id: 8,
      bg: "#1e40af",
      numbers: Total_Return_Today || 0,
      title: "Today Return",
    },
    {
      id: 9,
      bg: "#38bdf8",
      numbers: TotalRiderData?.length || 0,
      title: "Total Pickup Percel",
    },
    {
      id: 10,
      bg: "#0ea5e9",
      numbers: TotalRiderData?.length || 0,
      title: "Total Pickup Done",
    },
    { id: 11, bg: "#0284c7", numbers: 0, title: "Total Pickup Cancel" },
    {
      id: 12,
      bg: "#0369a1",
      numbers: Total_Return_Complete || 0,
      title: "Total Return",
    },
    {
      id: 14,
      bg: "#075985",
      numbers: Total_Delivey_Complete || 0,
      title: "Total Delivery Done",
    },
    {
      id: 15,
      bg: "#0c4a6e",
      numbers: Total_Delivery_Pending || 0,
      title: "Total Delivery Pending",
    },
    {
      id: 17,
      bg: "#082f49",
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
    <div className="text-black p-6 bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
        Today Parcel Pickup and Delivery Information
      </h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
        {infos?.slice(0, 8).map((info) => (
          <Card key={info.id} info={info} />
        ))}
      </div>

      <h2 className="text-3xl font-bold mt-10 mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
        Total Parcel Pickup and Delivery Information
      </h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
        {infos?.slice(8, 16).map((info) => (
          <Card key={info.id} info={info} />
        ))}
      </div>

      <div className="grid mt-12 lg:grid-cols-3 md:grid-cols-2 gap-6">
        {infos?.slice(16, 19).map((info) => (
          <Card key={info.id} info={info} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8 mt-16">
        {/* Pie Chart (3D) */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">
            Parcel Distribution
          </h3>
          <Chart
            chartType="PieChart"
            width="100%"
            height="300px"
            data={pieData}
            options={{ is3D: true, colors: ["#2563eb", "#38bdf8", "#93c5fd"] }}
          />
        </div>

        {/* Column Chart (3D effect) */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">
            Today Trend
          </h3>
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="300px"
            data={lineData}
            options={{
              is3D: true,
              hAxis: { title: "Type", textStyle: { color: "#2563eb" } },
              vAxis: { title: "Count", textStyle: { color: "#2563eb" } },
              colors: ["#2563eb", "#38bdf8", "#60a5fa"],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RiderHome;