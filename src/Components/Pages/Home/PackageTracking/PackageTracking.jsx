import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllPackage } from "../../../../api/auth";
import Package from "./Package";
import PackageTrackingForm from "./PackageTrackingForm";

const PackageTracking = () => {
  const { data: packages = [], refetch } = useQuery({
    queryKey: ['package'],
    queryFn: async () => await getAllPackage(),
  });

 
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState(false);

  const handleSearch = (trackingNumber) => {
    const result = packages.find(pack => pack.packageTrackingNumber.trackingNumber === trackingNumber);
    if (result) {
      setSearchResult(result);
      setSearchError(false);
    } else {
      setSearchResult(null);
      setSearchError(true);
    }
  };

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(https://www.envistaforensics.com/media/mebd20dj/adobestock_568597769.jpeg?center=0.66971409574468088,0.49994438669522168&mode=crop&width=900&height=447&rnd=133426462407530000&format=webp&quality=80)",
      }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-2xl bg-black p-5">
          <h1 className="md:text-xl md:font-bold font-rancho text-primary"> Track Your Product</h1>
          <PackageTrackingForm onSearch={handleSearch} />
          {searchError && <p className="text-red-500 mt-4">Your Tracking Number is Invalid</p>}
          {searchResult && (
            <div className='text-xl bg-black text-white p-5 font-rancho mt-4'>
              <h2>Package Details</h2>
              <p className='text-green-600 font-bold'>Your Product Is {searchResult.update}</p>
              <p>Sender: {searchResult.senderName}</p>
              <p>Recipient: {searchResult.recipientName}</p>
              <p>Origin: {searchResult.origin}</p>
              <p>Destination: {searchResult.destination}</p>
            </div>
          )}
          {!searchResult && !searchError && packages && packages.map(pack => (
            <Package
              key={pack._id}
              pack={pack}
              refetch={refetch}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageTracking;
