
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosSecure from '../../../../api/axiosSecure';
import Swal from 'sweetalert2';


const AllMerchantList = () => {
    const queryClient = useQueryClient();

    
    const { data: merchants, isLoading, error } = useQuery({
        queryKey: ['merchants'],
        queryFn: async () => {
            const response = await axiosSecure.get('/users?role=merchant');
            return response.data;
        },
    });

    const updateChargeMutation = useMutation({
        mutationFn: ({ id, deliveryCharge, weightCharge }) =>
            axiosSecure.patch(`/users/${id}`, { deliveryCharge, weightCharge }),
        onSuccess: () => queryClient.invalidateQueries(['merchants']),
    });
   
   const removeMerchantMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/users/${id}`),
    onSuccess: () => {
        queryClient.invalidateQueries(['merchants']);
        Swal('Merchant has been removed!', {
            icon: 'success',
        });
    },
    onError: (err) => {
        console.error("Delete error:", err);
        Swal('Error deleting merchant. Please try again.', {
            icon: 'error',
        });
    },
});


const handleRemove = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you really want to remove this merchant?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            removeMerchantMutation.mutate(id);
            Swal.fire('Deleted!', 'Merchant has been removed.', 'success');
        } else {
            Swal.fire('Cancelled', 'Merchant is safe!', 'info');
        }
    });
};

if (isLoading) return <p>Loading...</p>;
if (error) return <p>Error loading merchants.</p>;

return (
    <div className="max-w-full mx-auto mt-10 p-6 bg-gray-100 shadow-xl rounded-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-5 text-center">All Merchant List</h1>
        <div className="overflow-auto rounded-lg border border-gray-200 shadow">
            <table className="w-full bg-white">
                <thead className="bg-blue-600 text-white text-left">
                    <tr>
                        <th className="px-6 py-4 font-semibold">Image</th>
                        <th className="px-6 py-4 font-semibold">Merchant ID</th>
                        <th className="px-6 py-4 font-semibold">Name</th>
                        <th className="px-6 py-4 font-semibold">Email</th>
                        <th className="px-6 py-4 font-semibold">Delivery Charge</th>
                        <th className="px-6 py-4 font-semibold">Weight Charge</th>
                        <th className="px-6 py-4 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700 divide-y divide-gray-200">
                    {merchants.map((merchant) => (
                        <tr key={merchant._id} className="hover:bg-gray-100">
                            <td className="px-6 py-4">
                                <img
                                    src={merchant.imageUrl}
                                    alt={merchant.name}
                                    className="w-12 h-12 rounded-full border border-gray-300 shadow-sm"
                                />
                            </td>
                            <td className="px-6 py-4">{merchant.merchantID || 'N/A'}</td>
                            <td className="px-6 py-4">{merchant.name}</td>
                            <td className="px-6 py-4">{merchant.email}</td>
                            <td className="px-6 py-4">
                                <input
                                    type="number"
                                    defaultValue={merchant.deliveryCharge || 0}
                                    onBlur={(e) =>
                                        updateChargeMutation.mutate({
                                            id: merchant._id,
                                            deliveryCharge: e.target.value,
                                            weightCharge: merchant.weightCharge,
                                        })
                                    }
                                    className="border px-2 py-1 rounded"
                                />
                            </td>
                            <td className="px-6 py-4">
                                <input
                                    type="number"
                                    defaultValue={merchant.weightCharge || 0}
                                    onBlur={(e) =>
                                        updateChargeMutation.mutate({
                                            id: merchant._id,
                                            deliveryCharge: merchant.deliveryCharge,
                                            weightCharge: e.target.value,
                                        })
                                    }
                                    className="border px-2 py-1 rounded"
                                />
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => handleRemove(merchant._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-lg shadow"
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);
};


export default AllMerchantList;
