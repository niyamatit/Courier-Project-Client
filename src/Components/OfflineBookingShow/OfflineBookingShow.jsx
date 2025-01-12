// OfflineBookingShow.jsx
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import OfflineModal from "./OfflineModal";
import TableOffline from "./TableOffline";
import { getOffline, updateOffline } from "../../api/auth";

const OfflineBookingShow = () => {
    const { loading } = useAuth();
    const [selectedOffline, setSelectedOffline] = useState(null);
    const queryClient = useQueryClient();
    const [initialOffline, setInitialOffline] = useState([]);

    useEffect(() => {
        if (initialOffline.length > 0) {
            const indexedBookings = initialOffline.map((p, idx) => ({ ...p, idx: idx + 1 }));
            setSelectedOffline(indexedBookings);
        }
    }, [initialOffline]);

    const {
        data: offlines = [],
        isLoading,
    } = useQuery({
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

    const handleView = (offline) => {
        setSelectedOffline(offline);
    };

    const handleCloseModal = () => setSelectedOffline(null);

    const handleSave = (updatedOffline) => {
        mutation.mutate(updatedOffline);
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr className="text-lg font-rancho">
                                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                        Sender Name
                                    </th>
                                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                        Receiver Name
                                    </th>
                                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                        Booking Date
                                    </th>
                                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                        Receiver Mobile
                                    </th>
                                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                        Cn Number
                                    </th>
                                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                        Action
                                    </th>
                                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
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
                    booking={selectedOffline}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default OfflineBookingShow;
