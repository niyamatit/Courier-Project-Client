
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { getOffline, updateOffline } from "../../../../api/auth";
import TableOffline from "./TableOffline";
import OfflineModal from "./OfflineModal";

const OfflineBookingList = () => {
  const { loading } = useAuth();
  const [selectedOffline, setSelectedOffline] = useState(null); // Modal state
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
      setInitialOffline(data); // Populate the offline bookings
    },
  });

  const mutation = useMutation({
    mutationFn: updateOffline,
    onSuccess: () => {
      queryClient.invalidateQueries(["offlines"]); // Refresh data
    },
    onError: (error) => {
      console.error("Error updating offline booking:", error);
    },
  });

  const handleView = (offline) => setSelectedOffline(offline); // Open modal
  const handleCloseModal = () => setSelectedOffline(null); // Close modal
  const handleSave = (updatedOffline) => {
    mutation.mutate(updatedOffline); // Save changes
    handleCloseModal(); // Close modal after saving
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 sm:px-8">
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
                {offlines.map((offline, index) => (
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
  );
};

export default OfflineBookingList;


