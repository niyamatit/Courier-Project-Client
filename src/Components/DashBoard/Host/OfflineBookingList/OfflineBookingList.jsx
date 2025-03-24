
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import useAuth from "../../../../hooks/useAuth";
// import { useEffect, useState } from "react";
// import { getOffline, updateOffline } from "../../../../api/auth";
// import TableOffline from "./TableOffline";
// import OfflineModal from "./OfflineModal";

// const OfflineBookingList = () => {
//   const { loading } = useAuth();
//   const [selectedOffline, setSelectedOffline] = useState(null); // Modal state
//   const queryClient = useQueryClient();
//   const [initialOffline, setInitialOffline] = useState([]);

//   useEffect(() => {
//     if (initialOffline.length > 0) {
//       const indexedBookings = initialOffline.map((p, idx) => ({ ...p, idx: idx + 1 }));
//       setInitialOffline(indexedBookings);
//     }
//   }, [initialOffline]);

//   const { data: offlines = [], isLoading } = useQuery({
//     queryKey: ["offlines"],
//     enabled: !loading,
//     queryFn: async () => await getOffline(),
//     onSuccess: (data) => {
//       setInitialOffline(data); // Populate the offline bookings
//     },
//   });

//   const mutation = useMutation({
//     mutationFn: updateOffline,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["offlines"]); // Refresh data
//     },
//     onError: (error) => {
//       console.error("Error updating offline booking:", error);
//     },
//   });

//   const handleView = (offline) => setSelectedOffline(offline); // Open modal
//   const handleCloseModal = () => setSelectedOffline(null); // Close modal
//   const handleSave = (updatedOffline) => {
//     mutation.mutate(updatedOffline); // Save changes
//     handleCloseModal(); // Close modal after saving
//   };

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div className="container mx-auto px-4 sm:px-8">
//       <div className="py-8">
//         <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
//           <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
//             <table className="min-w-full leading-normal">
//               <thead>
//                 <tr className="text-lg font-rancho">
//                   <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
//                     Sender Name
//                   </th>
//                   <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
//                     Receiver Name
//                   </th>
//                   <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
//                     Booking Date
//                   </th>
//                   <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
//                     Receiver Mobile
//                   </th>
//                   <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
//                     CN Number
//                   </th>
//                   <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
//                     Action
//                   </th>
//                   <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
//                     Print
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {offlines.map((offline, index) => (
//                   <TableOffline
//                     key={offline._id}
//                     offline={{ ...offline, idx: index + 1 }}
//                     onView={handleView}
//                   />
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {selectedOffline && (
//         <OfflineModal
//           offline={selectedOffline}
//           onClose={handleCloseModal}
//           onSave={handleSave}
//         />
//       )}
//     </div>
//     <>
//       <div className="container mx-auto px-4 sm:px-8">
//         <div className="py-8">
//           <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
//             <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
//               <table className="min-w-full leading-normal">
//                 <thead>
//                   <tr className="text-lg font-rancho">
//                     <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
//                       Sender Name
//                     </th>
//                     <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
//                       Receiver Name
//                     </th>
//                     <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
//                       Booking Date
//                     </th>
//                     <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
//                       Receiver Mobile
//                     </th>
//                     <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
//                       CN Number
//                     </th>
//                     <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
//                       Action
//                     </th>
//                     <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
//                       Print
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {offlines.map((offline, index) => (
//                     <TableOffline
//                       key={offline._id}
//                       offline={{ ...offline, idx: index + 1 }}
//                       onView={handleView}
//                     />
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {selectedOffline && (
//           <OfflineModal
//             offline={selectedOffline}
//             onClose={handleCloseModal}
//             onSave={handleSave}
//           />
//         )}
//       </div>
//     </>
//   );
// };

// export default OfflineBookingList;


import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { getOffline, updateOffline } from "../../../../api/auth";
import TableOffline from "./TableOffline";
import OfflineModal from "./OfflineModal";

const OfflineBookingList = () => {
  const { loading } = useAuth();
  const [selectedOffline, setSelectedOffline] = useState(null); // Modal state
  const [searchDate, setSearchDate] = useState(""); // Search date state
  const queryClient = useQueryClient();
  const [initialOffline, setInitialOffline] = useState([]);

  useEffect(() => {
    if (initialOffline.length > 0) {
      const indexedBookings = initialOffline.map((p, idx) => ({ ...p, idx: idx + 1 }));
      setInitialOffline(indexedBookings);
    }
  }, [initialOffline]);

  const { data: offlines = [], isLoading } = useQuery({
    queryKey: ["offlines"],
    enabled: !loading,
    queryFn: async () => await getOffline(),
    onSuccess: (data) => {
      setInitialOffline(data); 
    },
  });

  const mutation = useMutation({
    mutationFn: updateOffline,
    onSuccess: () => {
      queryClient.invalidateQueries(["offlines"]); 
    },
    onError: (error) => {
      console.error("Error updating offline booking:", error);
    },
  });

  const handleView = (offline) => setSelectedOffline(offline); 
  const handleCloseModal = () => setSelectedOffline(null); 
  const handleSave = (updatedOffline) => {
    mutation.mutate(updatedOffline); 
    handleCloseModal(); 
  };

  
  const filteredOfflines = searchDate
    ? offlines.filter((offline) => {
      const bookingDate = new Date(offline.bookingDate).toISOString().split("T")[0]; 
      return bookingDate === searchDate;
    })
    : offlines;

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        {/* Search by Date Input */}
        <div className="my-4 text-center">
          <label htmlFor="search-date" className="mr-2 text-lg font-medium text-gray-700">
            Search by Date:
          </label>
          <input
            type="date"
            id="search-date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          />
        </div>

        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr className="text-lg font-rancho">
                    <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
                      Sender Name
                    </th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
                      Receiver Name
                    </th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
                      Booking Date
                    </th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
                      Receiver Mobile
                    </th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
                      CN Number
                    </th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
                      Action
                    </th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
                      Print
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOfflines.map((offline, index) => (
                    <TableOffline
                      key={offline._id}
                      offline={{ ...offline, idx: index + 1 }}
                      onView={handleView}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {selectedOffline && (
          <OfflineModal
            offline={selectedOffline}
            onClose={handleCloseModal}
            onSave={handleSave}
          />
        )}
      </div>
    </>
  );
};

export default OfflineBookingList;
