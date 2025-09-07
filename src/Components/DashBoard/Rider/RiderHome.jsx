
import { useQuery } from "@tanstack/react-query";
import useRiderHomeStats from "../../../hooks/useRiderHomeStatis";
import useUsersData from "../../../hooks/useUsersData/useUsersData";
import axiosSecure from "../../../api/axiosSecure";

function Card({ info }) {
  const { numbers, title, bg } = info;
  return (
    <div className="border p-2 shadow-sm">
      <div className="px-2 pt-2 pb-3 " style={{ backgroundColor: bg }}>
        <div className="text-center flex flex-col gap-y-3 justify-between h-full">
          <h2 className="font-bold text-2xl">{numbers}</h2>
          <h2 className="font-semibold text-2xl">{title}</h2>
          {/* <button className="btn hover:text-white text-gray-800 mt-3 glass w-full">More Info<FaRegArrowAltCircleRight /></button> */}
        </div>
      </div>
    </div>
  );
}

const RiderHome = () => {
  const [verifiedUser] = useUsersData();

  const { data: RiderPickupOnline = [] } = useQuery({
    queryKey: ['RiderPickupOnline', verifiedUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/email/rider/parcel/${verifiedUser?.email}`);
      return Array.isArray(res.data) ? res.data : [res.data];
    },
  });
  const { data: RiderPickup_Offline = [] } = useQuery({
        queryKey: ['RiderPickup_Offline', verifiedUser?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/rider/email/rider/parcel/offline/${verifiedUser?.email}`);
            return Array.isArray(res.data) ? res.data : [res.data];
        },
    });

  
    const { data: RiderPickupMerchant = [] } = useQuery({
        queryKey: ['RiderPickupMerchant', verifiedUser?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/rider/email/rider/parcel/merchant/mer/hello/${verifiedUser?.email}`);
            return Array.isArray(res.data) ? res.data : [res.data];
        },
    });
     const { data: RiderPickupOnline_Int = [] } = useQuery({
    queryKey: ['RiderPickupOnline_Int', verifiedUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/email/rider/parcel/int/${verifiedUser?.email}`);
      return Array.isArray(res.data) ? res.data : [res.data];
    },
  });


  const TotalRiderData = [...RiderPickupOnline, ...RiderPickup_Offline , ...RiderPickupOnline_Int , ...RiderPickupMerchant]
  const {
    pickupRequestData,
    pickupDonetData,
    pickupReadyForDeliveryData,
    totalPickupReadyForDeliveryData,
    deliveryCompleteData,
    totalDeliveryCompleteData,
    pendingDeliveryData,
    cancledDeliveryData,
    totalCancledDeliveryData,
    totalPickupDonetData,
    todayNewParcelData,
    totalAmount,
    isLoading,
  } = useRiderHomeStats();
console.log(TotalRiderData, "Total Rider Data");
const Total_Delivey_Complete = TotalRiderData.reduce((total, booking) => {
  if (booking?.Tracking_Rider_Online_Booking_Delivary_Update_Time || booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Time || booking?.Tracking_Rider_Online_Booking_Delivary_Update_Time || booking?.Tracking_Destination_Branch_Delivery_Parcel_Time || booking?.Tracking_Rider_Online_Booking_Delivary_Update_Time_Int || booking?.Tracking_Destination_Branch_Delivery_Parcel_Int) {
    return total + 1; 
  }
  return total; 
}, 0);
const Total_Return_Complete = TotalRiderData.reduce((total, booking) => {
  if (booking?.Tracking_Rider_Online_Booking_Delivary_Update_Return_Time || booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Return_Time || booking?.Tracking_Rider_Offline_Booking_Delivary_Update_Return_Time || booking?.Tracking_Destination_Branch_Returned_Parcel_Time || booking?.Tracking_Rider_Online_Booking_Delivary_Update_Return_Time_Int) {
    return total + 1;  // Assuming codAmount is the field to sum
  }
  return total;  // If not 'cod', return the total unchanged
}, 0);
const Total_Delivery_Pending = TotalRiderData.length - (Total_Delivey_Complete+Total_Return_Complete)
const totalAmount_Booking_Branch = TotalRiderData.reduce((total, booking) => {
  
  const amount = parseFloat(booking.Tracking_Rider_Merchant_Delivary_Update_amount
 || 0) || parseFloat(booking.Tracking_Rider_Online_Booking_Delivary_Update_amount_Int || 0) || parseFloat(booking.Tracking_Rider_Online_Booking_Delivary_Update_amount || parseFloat(booking?.Tracking_Rider_Offline_Booking_Delivary_Update_amount) || 0);
  return total + amount;
}, 0);


// Today 
const formatDate = (dateStr) => {
  if (!dateStr) return null; // null or undefined
  const d = new Date(dateStr);
  return isNaN(d) ? null : d.toISOString().split("T")[0];
};
const Total_Return_Today = TotalRiderData.reduce((total, booking) => {
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

const Total_Delivery_Complete_Today = TotalRiderData.reduce((total, booking) => {
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

const TotalDeliverPending_Today = TotalRiderData - (Total_Return_Today + Total_Delivery_Complete_Today)

const Total_Pickup_Done_Today = TotalRiderData.reduce((total, booking) => {
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
  if (isLoading) {
    return <div>Loading...</div>; 
  }

  const infos = [
    {
      id: 1,
      bg: "#ace1f6",
      numbers: pickupRequestData?.length || 0,
      title: "Today Pickup Percel",
    },
    {
      id: 2,
      bg: "#f9a4a4",
      numbers: Total_Pickup_Done_Today || 0,
      title: "Today Pickup Done",
    },
    {
      id: 3,
      bg: "#c4f6c4",
      numbers: TotalDeliverPending_Today || 0,
      title: "Today Pickup Pending",
    },
    {
      id: 4,
      bg: "#E6E6FA",
      numbers: cancledDeliveryData?.length || 0,
      title: "Today Pickup Cancel",
    },
    {
      id: 5,
      bg: "#F5FFFA",
      numbers: pickupReadyForDeliveryData?.length || 0,
      title: "Today Delivery Parcel",
    },
    {
      id: 6,
      bg: "#F0F8FF",
      numbers: Total_Delivery_Complete_Today || 0,
      title: "Today Delivery Done",
    },
    {
      id: 7,
      bg: "#FFF0F5",
      numbers: pendingDeliveryData?.length || 0,
      title: "Today Delivery Pending",
    },
    {
      id: 8,
      bg: "#F0FFF0",
      numbers: Total_Return_Today || 0,
      title: "Today Return",
    },
    {
      id: 9,
      bg: "#fca79e",
      numbers: TotalRiderData?.length || 0,
      title: "Total Pickup Percel",
    },
    {
      id: 10,
      bg: "#caf8ca",
      numbers: TotalRiderData?.length || 0,
      title: "Total Pickup Done",
    },
    {
      id: 11,
      bg: "#87CEFA",
      numbers: totalCancledDeliveryData?.length || 0,
      title: "Total Pickup Cancel",
    },
    {
      id: 12,
      bg: "#D8BFD8",
      numbers: Total_Return_Complete || 0,
      title: "Total Return",
    },
    
    {
      id: 14,
      bg: "#FFE4E1",
      numbers:Total_Delivey_Complete || 0,
      title: "Total Delivery Done",
    },
    {
      id: 15,
      bg: "#E6E6FA",
      numbers: Total_Delivery_Pending || 0,
      title: "Total Delivery Pending",
    },
    
    {
      id: 17,
      bg: "#FFDAB9",
      numbers: `${totalAmount_Booking_Branch || 0} Tk`,
      title: "Total Collection Amount",
    },
    
  ];

  return (
    <div className="text-black">
      <h2 className="text-2xl font-bold mt-6 mb-6 text-black">
        Today Parcel Pickup and Delivery Information
      </h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
        {infos?.slice(0, 8).map((info) => (
          <Card key={info.id} info={info} />
        ))}
      </div>
      <h2 className="text-2xl text-black font-bold mt-6 mb-6">
        Total Parcel Pickup and Delivery Information
      </h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
        {infos?.slice(8, 16).map((info) => (
          <Card key={info.id} info={info} />
        ))}
      </div>
      <div className="grid mt-8 lg:grid-cols-3 gap-4">
        {infos?.slice(16, 19).map((info) => (
          <Card key={info.id} info={info} />
        ))}
      </div>
    </div>
  );
};

export default RiderHome;
