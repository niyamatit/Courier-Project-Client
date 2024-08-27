import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const useRiderHomeStats = () => {
  const fetchStats = async () => {
    const response = await fetch("http://localhost:5000/package");
    const data = await response.json();
    return data;
  };

  const { data: hostData = [], isLoading } = useQuery({
    queryKey: ["riderStats"],
    queryFn: fetchStats,
  });

  const [pickupRequestData, setPickupRequestData] = useState([]);
  const [pickupDonetData, setPickupDonetData] = useState([]);
  const [pickupReadyForDeliveryData, setPickupReadyForDeliveryData] = useState(
    []
  );
  const [totalPickupReadyForDeliveryData, setTotalPickupReadyForDeliveryData] =
    useState([]);
  const [deliveryCompleteData, setDeliveryCompleteData] = useState([]);
  const [totalDeliveryCompleteData, setTotalDeliveryCompleteData] = useState(
    []
  );
  const [pendingDeliveryData, setPendingDeliveryData] = useState([]);
  const [cancledDeliveryData, setCancledDeliveryData] = useState([]);
  const [totalCancledDeliveryData, setTotalCancledDeliveryData] = useState([]);
  const [totalPickupDonetData, setTotalPickupDonetData] = useState([]);
  const [todayNewParcelData, setTodayNewParcelData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (hostData.length > 0) {
      const today = new Date().toISOString().split("T")[0]; // Format as YYYY-MM-DD

      setPickupRequestData(
        hostData.filter(
          (item) =>
            item.update === "pickup request" &&
            item.booking?.split("T")[0] === today
        )
      );

      setPickupDonetData(
        hostData.filter(
          (item) =>
            item.update === "Rider pickup" &&
            item.booking?.split("T")[0] === today
        )
      );

      setPickupReadyForDeliveryData(
        hostData.filter(
          (item) =>
            item.update === "Ready For Delivery" &&
            item.booking?.split("T")[0] === today
        )
      );

      setDeliveryCompleteData(
        hostData.filter(
          (item) =>
            item.update === "delivered" && item.booking?.split("T")[0] === today
        )
      );

      setPendingDeliveryData(
        hostData.filter(
          (item) =>
            item.update === "Processing" &&
            item.booking?.split("T")[0] === today
        )
      );

      setTodayNewParcelData(
        hostData.filter(
          (item) =>
            item.update === "Processing" &&
            item.booking?.split("T")[0] === today
        )
      );

      setCancledDeliveryData(
        hostData.filter(
          (item) =>
            item.update === "canceled" && item.booking?.split("T")[0] === today
        )
      );

      setTotalCancledDeliveryData(
        hostData.filter((item) => item.update === "canceled")
      );

      setTotalPickupDonetData(
        hostData.filter((item) => item.update === "Rider pickup")
      );

      setTotalDeliveryCompleteData(
        hostData.filter((item) => item.update === "delivered")
      );

      setTotalPickupReadyForDeliveryData(
        hostData.filter((item) => item.update === "Ready For Delivery")
      );

      // Calculate total amount for today's bookings
      const totalAmount = hostData
        .filter((item) => item.booking && item.booking.split("T")[0] === today)
        .reduce((acc, item) => acc + (parseInt(item.amount, 10) || 0), 0);
      setTotalAmount(totalAmount);
    }
  }, [hostData]);

  return {
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
  };
};

export default useRiderHomeStats;
