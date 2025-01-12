import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axiosSecure from "../../../../api/axiosSecure";

import PackageTrackingForm from "./PackageTrackingForm";

const PackageTracking = () => {
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState(false);

  // Fetch packages using react-query
  const { data: packages,  } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/packagfhguieormbncdmnn44ge");
      return data;
    },
  });
  const formatTime = (utcTime) => {
    const options = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Dhaka',
    };
    return new Date(utcTime).toLocaleString('en-US', options);
};

  const handleSearch = async (trackingNumber) => {
    try {
      let result = null;
  
      if (trackingNumber.startsWith("NEPNU-ON-")) {
        result = packages.find(pack => pack.CnNumber === trackingNumber);
      } else if (trackingNumber.startsWith("NEPNU-OFF-")) {
        const { data } = await axiosSecure.post("/offline/hjdjhj", { CnNumber: trackingNumber });
        result = data;
      } else if (trackingNumber.startsWith("MER-")) {
        // Fetch data from the backend for "MER-" CnNumbers
        const { data } = await axiosSecure.post("/Merchnat/tra/hjdjhj", { CnNumber: trackingNumber });
        result = data;
      }
  
      if (result) {
        setSearchResult(result);
        setSearchError(false);
      } else {
        setSearchResult(null);
        setSearchError(true);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResult(null);
      setSearchError(true);
    }
  };
  

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(https://www.envistaforensics.com/media/mebd20dj/adobestock_568597769.jpeg?center=0.66971409574468088,0.49994438669522168&mode=crop&width=900&height=447&rnd=133426462407530000&format=webp&quality=80)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content overflow-auto max-h-screen w-full"
        style={{ maxHeight: "100vh" }}>
        <div className="max-w-2xl bg-black p-5 ">
          <h1 className="text-2xl font-bold font-rancho text-primary text-center my-4">
             Track Your Product
          </h1>

          {/* Render the search form once */}
          <PackageTrackingForm onSearch={handleSearch} />

          {/* Error message */}
          {searchError && (
            <p className="text-red-500 mt-4">Your Tracking Number is Invalid</p>
          )}

          {/* Display search result */}
          {searchResult && (
  <div className="mt-8 bg-white  p-4 overflow-y-auto max-h-[75vh]">
    {/* Header Section */}
    <div className="font-bold mb-6 text-gray-800 border-b border-black pb-2">
      <h3 className="text-2xl mb-6 text-blue-600 border-b border-black pb-2 text-center">
        Tracking Updates
      </h3>
     <p className="text-gray-600">Products: {searchResult?.productDetails}</p>
     <p className="text-gray-600">Sender Name: {searchResult?.senderName}</p>
     <p className="text-gray-600">Receiver Name: {searchResult?.recipientName}</p>
     <p className="text-gray-600">Receiver Address: {searchResult?.selectedArea}</p>
    </div>

    {/* Timeline Tracking */}
    <div className="space-y-8">
      {/* 1st Step: Received By Branch */}
      <div className="relative">
        <div className="flex items-center space-x-4">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              searchResult?.Branch_Name
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            {searchResult?.Branch_Name ? "✓" : "-"}
          </div>
          <div>
            <h1 className="text-gray-700 font-semibold">
              Received By: {searchResult?.Branch_Name || "N/A"}
            </h1>
            <p className="text-gray-500 text-sm">
              Branch Received Time:{" "}
              {searchResult?.booking
                ? formatTime(searchResult.booking)
                : "Not Available"}
            </p>
          </div>
        </div>
      </div>

      {/* 2nd Step: Sent to MotherHub Branch */}
      {searchResult?.Tracking_Admin_Select_Online_MotherHub_Branch_email && (
        <div className="relative">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                searchResult?.Tracking_Admin_Select_Online_MotherHub_Branch_email
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              ✓
            </div>
            <div>
              <h1 className="text-gray-700 font-semibold">
                Sent To MotherHub Branch
               
              </h1>
              <p className="text-gray-500 text-sm">
                Sent Time:{" "}
                {searchResult?.Tracking_Admin_Select_Online_MotherHub_Branch_Date
                  ? formatTime(
                      searchResult.Tracking_Admin_Select_Online_MotherHub_Branch_Date
                    )
                  : "Not Available"}
              </p>
              {/* <p className="text-gray-500 text-sm">
                Admin Note:{" "}
                {searchResult?.Tracking_Admin_Select_Online_MotherHub_Branch_Note ||
                  "No Message"}
              </p> */}
            </div>
          </div>
        </div>
      )}

      {/* 3rd Step: Received at MotherHub */}
      {searchResult?.Tracking_MotherHub_Received_Parcel && (
        <div className="relative">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                searchResult?.Tracking_MotherHub_Received_Parcel
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              ✓
            </div>
            <div>
              <h1 className="text-gray-700 font-semibold">
                Received MotherHub Branch
              </h1>
              <p className="text-gray-500 text-sm">
                Received Time:{" "}
                {searchResult?.Tracking_MotherHub_Received_Parcel_Time
                  ? formatTime(
                      searchResult.Tracking_MotherHub_Received_Parcel_Time
                    )
                  : "Not Available"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4th Step: Sent to Destination Branch */}
      {searchResult?.Tracking_MotherHub_Branch_Select_Dest_Branch_Name && (
        <div className="relative">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                searchResult?.Tracking_MotherHub_Branch_Select_Dest_Branch_Name
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              ✓
            </div>
            <div>
              <h1 className="text-gray-700 font-semibold">
                Sent to Destination Branch
              </h1>
              <p className="text-gray-500 text-sm">
                Sent Time:{" "}
                {searchResult?.Tracking_MotherHub_Branch_Select_Dest_Branch_Date
                  ? formatTime(
                      searchResult.Tracking_MotherHub_Branch_Select_Dest_Branch_Date
                    )
                  : "Not Available"}
              </p>
              {/* <p className="text-gray-500 text-sm">
                Note:{" "}
                {searchResult?.Tracking_MotherHub_Branch_Note || "Not Available"}
              </p> */}
            </div>
          </div>
        </div>
      )}

      {/* 5th Step: Branch Select Rider */}
      {searchResult?.Tracking_Destination_Branch_Select_Rider && (
        <div className="relative">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                searchResult?.Tracking_Destination_Branch_Select_Rider
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              ✓
            </div>
            <div>
              <h1 className="text-gray-700 font-semibold">
                Branch Select Rider (
                {searchResult?.Tracking_Destination_Branch_Select_Rider})
              </h1>
              <p className="text-gray-500 text-sm">
                Select Time:{" "}
                {searchResult?.Tracking_Destination_Branch_Select_Rider_Date
                  ? formatTime(
                      searchResult.Tracking_Destination_Branch_Select_Rider_Date
                    )
                  : "Not Available"}
              </p>
              {/* <p className="text-gray-500 text-sm">
                Note:{" "}
                {searchResult?.Tracking_Destination_Branch_Note || "Not Available"}
              </p> */}
            </div>
          </div>
        </div>
      )}

      {/* 6th Step: Delivery/Return Update */}
      {
        searchResult?.Tracking_Rider_Online_Booking_Delivary_Update &&  <div className="relative ">
        
        <div className="space-y-6">
            {/* Tracking Timeline */}
            <div className="mt-6">
                    
                    <div className="relative">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${searchResult?.Tracking_Rider_Online_Booking_Delivary_Update_Successful ? 'bg-green-500 text-white' : 'bg-red-500 text-gray-500'}`}>
                                {searchResult?.Tracking_Rider_Online_Booking_Delivary_Update_Successful ? '✓' : '-'}
                            </div>
                             <div>
                                <h1 className="text-gray-700 font-semibold">{searchResult?.Tracking_Rider_Online_Booking_Delivary_Update_Successful || searchResult?. Tracking_Rider_Online_Booking_Delivary_Update_Returned}</ h1>
                                <p className="text-gray-500 text-sm">
  {searchResult?.Tracking_Rider_Online_Booking_Delivary_Update_Time
    ? `Delivery Time: ${formatTime(searchResult.Tracking_Rider_Online_Booking_Delivary_Update_Time)}`
    : searchResult?.Tracking_Rider_Online_Booking_Delivary_Update_Return_Time
    ? `Returned Time: ${formatTime(searchResult.Tracking_Rider_Online_Booking_Delivary_Update_Return_Time)}`
    : 'Not Available'}
</p>


                                 {/* <p className="text-gray-500 text-sm">Note: {searchResult?.Tracking_Rider_Online_Booking_Delivary_Update_Note || searchResult?.Tracking_Rider_Online_Booking_Delivary_Update_Return_Note ||'Not Available'}</p> */}
                               
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    }
    </div>
  </div>
)}


          {/* Render package list */}
          
        </div>
      </div>
    </div>
  );
};

export default PackageTracking;
