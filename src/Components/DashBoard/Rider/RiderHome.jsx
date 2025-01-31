import useRiderHomeStats from "../../../hooks/useRiderHomeStatis";

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
      numbers: pickupDonetData?.length || 0,
      title: "Today Pickup Done",
    },
    {
      id: 3,
      bg: "#c4f6c4",
      numbers: pendingDeliveryData?.length || 0,
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
      numbers: deliveryCompleteData?.length || 0,
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
      numbers: cancledDeliveryData?.length || 0,
      title: "Today Delivery Cancel",
    },
    {
      id: 9,
      bg: "#fca79e",
      numbers: totalPickupDonetData?.length || 0,
      title: "Total Pickup Percel",
    },
    {
      id: 10,
      bg: "#caf8ca",
      numbers: totalPickupDonetData?.length || 0,
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
      numbers: totalCancledDeliveryData?.length || 0,
      title: "Total Pickup Cancel",
    },
    {
      id: 13,
      bg: "#FFF5EE",
      numbers: pickupReadyForDeliveryData?.length || 0,
      title: "Total Delivery Parcel",
    },
    {
      id: 14,
      bg: "#FFE4E1",
      numbers: totalDeliveryCompleteData?.length || 0,
      title: "Total Delivery Done",
    },
    {
      id: 15,
      bg: "#E6E6FA",
      numbers: pendingDeliveryData?.length || 0,
      title: "Total Delivery Pending",
    },
    {
      id: 16,
      bg: "#E0FFFF",
      numbers: totalPickupDonetData?.length || 0,
      title: "Total Pickup Done",
    },
    {
      id: 17,
      bg: "#FFDAB9",
      numbers: totalAmount || 0,
      title: "Total Collection Amount",
    },
    {
      id: 18,
      bg: "#AFEEEE",
      numbers: 0, // No data source for this field, so setting to 0
      title: "Collection Paid To Branch",
    },
    {
      id: 19,
      bg: "#FFB6C1",
      numbers: totalAmount || 0,
      title: "Collection Balance Amount",
    },
  ];

  return (
    <div className="text-black">
      <h2 className="text-2xl font-bold mt-6 mb-6 text-white">
        Today Parcel Pickup and Delivery Information
      </h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
        {infos?.slice(0, 8).map((info) => (
          <Card key={info.id} info={info} />
        ))}
      </div>
      <h2 className="text-2xl text-white font-bold mt-6 mb-6">
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
