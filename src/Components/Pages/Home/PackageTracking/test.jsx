import axios from "axios";
import axiosSecure from "../../../../../api/axiosSecure";
import Swal from "sweetalert2";

// Your form submit handler
const onSubmit = async (data) => {
  try {
    // Step 1: Build booking info
    const Bookinginfo = {
      senderName: data.senderName,
      senderContactNo: data.senderContactNo,
      receiverName: data.receiverName,
      receiverContactNo: data.receiverContactNo,
      parcelWeight: data.parcelWeight,
      deliveryType: data.deliveryType,
      paymentType: data.paymentType,
      CnNumber: cnNumber,
      // ... any other fields
    };

    // Step 2: Send booking data to your backend
    const ParcelProductDetails = await axiosSecure.post("/offline", Bookinginfo);

    // Step 3: If booking is successful, show confirmation
    if (ParcelProductDetails.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Parcel Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      // Step 4: Update CN number (if needed)
      const response = await axiosSecure.put("/number");
      setCnNumber(response.data.nextNumber);
      setBookingInfo(Bookinginfo);

      // Step 5: Send SMS using BulkSMSBD
      const SMS_API = "http://bulksmsbd.net/api/smsapi";
      const API_KEY = "VSkytluAnQbG0vsCEbHQ";
      const SENDER_ID = "8809617624950";

      // Build message
      const senderMessage = `Your CompanyName booking is confirmed! CN No: ${Bookinginfo.CnNumber}`;
      const receiverMessage = `Hello ${Bookinginfo.receiverName}, your parcel booking (CN: ${Bookinginfo.CnNumber}) is successful.`;

      // Build URLs
      const senderUrl = `${SMS_API}?api_key=${API_KEY}&type=text&number=${data.senderContactNo}&senderid=${SENDER_ID}&message=${encodeURIComponent(senderMessage)}`;
      const receiverUrl = `${SMS_API}?api_key=${API_KEY}&type=text&number=${data.receiverContactNo}&senderid=${SENDER_ID}&message=${encodeURIComponent(receiverMessage)}`;

      // Send SMS to sender and receiver
      await Promise.all([
        axios.get(senderUrl),
        axios.get(receiverUrl)
      ]);
    }
  } catch (error) {
    console.error("Booking or SMS error:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Something went wrong while processing the booking.",
    });
  }

  // Step 6: Open modal if needed
  setIsOpen(true);
};
