import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axiosSecure from "../../../../api/axiosSecure";
import Package from "./Package";
import PackageTrackingForm from "./PackageTrackingForm";

const PackageTracking = () => {
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState(false);

  // Fetch packages using react-query
  const { data: packages, refetch } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/packagfhguieormbncdmnn44ge");
      return data;
    },
  });

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
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-2xl bg-black p-5">
          <h1 className="md:text-xl md:font-bold font-rancho text-primary">
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
            <div className="text-xl bg-black text-white p-5 font-rancho mt-4">
              <h2>Product Tracking Details</h2>
              <p className="text-green-600 font-bold">
                Your Product Is {searchResult?.Item_Type}
              </p>
              <p>Sender: {searchResult.senderName}</p>
              <p>Recipient: {searchResult.recipientName}</p>
              <p>Origin: {searchResult.origin}</p>
              <p>Destination: {searchResult.destination}</p>
            </div>
          )}

          {/* Render package list */}
          
        </div>
      </div>
    </div>
  );
};

export default PackageTracking;
