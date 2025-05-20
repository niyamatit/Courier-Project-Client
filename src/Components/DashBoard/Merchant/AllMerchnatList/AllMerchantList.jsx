import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosSecure from '../../../../api/axiosSecure';
import Swal from 'sweetalert2';

const AllMerchantList = () => {
    const deobfuscatePassword = (obfuscatedPassword) => {
        let actualPassword = "";
        for (let i = 0; i < obfuscatedPassword.length; i += 21) {
          actualPassword += obfuscatedPassword[i]; 
        }
        return actualPassword;
      };
    const queryClient = useQueryClient();

    const { data: merchants, isLoading, error } = useQuery({
        queryKey: ['merchants'],
        queryFn: async () => {
            const response = await axiosSecure.get('/shfjksdhfjdjkfhxnbcnbc67437gch?role=merchant');
            return response.data;
        },
    });
   

    const updateChargeMutation = useMutation({
        mutationFn: ({ id,  inDistrictCharge, subDistrictCharge, overallBangladeshCharge, inDistrictWeightCharge, subDistrictWeightCharge, overallBangladeshWeightCharge }) =>
            axiosSecure.patch(`/users/${id}`, {  inDistrictCharge, subDistrictCharge, overallBangladeshCharge, inDistrictWeightCharge, subDistrictWeightCharge, overallBangladeshWeightCharge }),
        onSuccess: () => queryClient.invalidateQueries(['merchants']),
    });

    const removeMerchantMutation = useMutation({
        mutationFn: (id) => axiosSecure.delete(`/users/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['merchants']);
            Swal.fire('Merchant has been removed!', '', 'success');
        },
        onError: (err) => {
            console.error("Delete error:", err);
            Swal.fire('Error deleting merchant. Please try again.', '', 'error');
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
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                removeMerchantMutation.mutate(id);
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
                            <th className="px-6 py-4 font-semibold">Password</th>
                            <th className="px-6 py-4 font-semibold">Location</th>
                            <th className="px-6 py-4 font-semibold">Branch</th>
                            <th className="px-6 py-4 font-semibold">In-District Charge</th>
                            <th className="px-6 py-4 font-semibold">Cod Charge(%)</th>
                            <th className="px-6 py-4 font-semibold">Overall Bangladesh Charge</th>
                            {/* <th className="px-6 py-4 font-semibold">Weight Charge</th> */}
                            <th className="px-6 py-4 font-semibold">In-District Weight Charge</th>
                            {/* <th className="px-6 py-4 font-semibold">Sub-District Weight Charge</th> */}
                            <th className="px-6 py-4 font-semibold">Overall Bangladesh Weight Charge</th>
                            <th className="px-6 py-4 font-semibold">Merchant Balance</th>
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
                                <td className="px-6 py-4">{merchant.name || 'No Name Found'}</td>
                                <td className="px-6 py-4">{merchant.email}</td>
                                <td className="px-6 py-4">{merchant?.info ? deobfuscatePassword(merchant.info) : "N/A"}</td>
                                <td className="px-6 py-4">{merchant.Merchant_District || 'N/A'},{merchant.Merchant_Area || 'N/A'}<br></br>
                                ({merchant.Merchant_Full_Address || 'N/A'}) 
                                </td>
                                <td className="px-6 py-4">{merchant.Merchant_Branch || 'N/A'}</td>
                                <td className="px-6 py-4">
                                    <input
                                        type="number"
                                        defaultValue={merchant.inDistrictCharge || 0}
                                        onBlur={(e) =>
                                            updateChargeMutation.mutate({
                                                id: merchant._id,
                                                inDistrictCharge: e.target.value,
                                                weightCharge: merchant.weightCharge,
                                                subDistrictCharge: merchant.subDistrictCharge,
                                                overallBangladeshCharge: merchant.overallBangladeshCharge,
                                                inDistrictWeightCharge: merchant.inDistrictWeightCharge,
                                                subDistrictWeightCharge: merchant.subDistrictWeightCharge,
                                                overallBangladeshWeightCharge: merchant.overallBangladeshWeightCharge,
                                            })
                                        }
                                        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <input
                                        type="number"
                                        defaultValue={merchant.subDistrictCharge || 0}
                                        onBlur={(e) =>
                                            updateChargeMutation.mutate({
                                                id: merchant._id,
                                                subDistrictCharge: e.target.value,
                                                weightCharge: merchant.weightCharge,
                                                inDistrictCharge: merchant.inDistrictCharge,
                                                overallBangladeshCharge: merchant.overallBangladeshCharge,
                                                inDistrictWeightCharge: merchant.inDistrictWeightCharge,
                                                subDistrictWeightCharge: merchant.subDistrictWeightCharge,
                                                overallBangladeshWeightCharge: merchant.overallBangladeshWeightCharge,
                                            })
                                        }
                                        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <input
                                        type="number"
                                        defaultValue={merchant.overallBangladeshCharge || 0}
                                        onBlur={(e) =>
                                            updateChargeMutation.mutate({
                                                id: merchant._id,
                                                overallBangladeshCharge: e.target.value,
                                                weightCharge: merchant.weightCharge,
                                                inDistrictCharge: merchant.inDistrictCharge,
                                                subDistrictCharge: merchant.subDistrictCharge,
                                                inDistrictWeightCharge: merchant.inDistrictWeightCharge,
                                                subDistrictWeightCharge: merchant.subDistrictWeightCharge,
                                                overallBangladeshWeightCharge: merchant.overallBangladeshWeightCharge,
                                            })
                                        }
                                        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                                    />
                                </td>
                                {/* <td className="px-6 py-4">
                                    <input
                                        type="number"
                                        defaultValue={merchant.weightCharge || 0}
                                        onBlur={(e) =>
                                            updateChargeMutation.mutate({
                                                id: merchant._id,
                                                weightCharge: e.target.value,
                                                inDistrictCharge: merchant.inDistrictCharge,
                                                subDistrictCharge: merchant.subDistrictCharge,
                                                overallBangladeshCharge: merchant.overallBangladeshCharge,
                                                inDistrictWeightCharge: merchant.inDistrictWeightCharge,
                                                subDistrictWeightCharge: merchant.subDistrictWeightCharge,
                                                overallBangladeshWeightCharge: merchant.overallBangladeshWeightCharge,
                                            })
                                        }
                                        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                                    />
                                </td> */}
                                <td className="px-6 py-4">
                                    <input
                                        type="number"
                                        defaultValue={merchant.inDistrictWeightCharge || 0}
                                        onBlur={(e) =>
                                            updateChargeMutation.mutate({
                                                id: merchant._id,
                                                inDistrictWeightCharge: e.target.value,
                                                inDistrictCharge: merchant.inDistrictCharge,
                                                subDistrictCharge: merchant.subDistrictCharge,
                                                overallBangladeshCharge: merchant.overallBangladeshCharge,
                                                weightCharge: merchant.weightCharge,
                                                subDistrictWeightCharge: merchant.subDistrictWeightCharge,
                                                overallBangladeshWeightCharge: merchant.overallBangladeshWeightCharge,
                                            })
                                        }
                                        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                                    />
                                </td>
                                {/* <td className="px-6 py-4">
                                    <input
                                        type="number"
                                        defaultValue={merchant.subDistrictWeightCharge || 0}
                                        onBlur={(e) =>
                                            updateChargeMutation.mutate({
                                                id: merchant._id,
                                                subDistrictWeightCharge: e.target.value,
                                                inDistrictCharge: merchant.inDistrictCharge,
                                                subDistrictCharge: merchant.subDistrictCharge,
                                                overallBangladeshCharge: merchant.overallBangladeshCharge,
                                                weightCharge: merchant.weightCharge,
                                                inDistrictWeightCharge: merchant.inDistrictWeightCharge,
                                                overallBangladeshWeightCharge: merchant.overallBangladeshWeightCharge,
                                            })
                                        }
                                        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                                    />
                                </td> */}
                                <td className="px-6 py-4">
                                    <input
                                        type="number"
                                        defaultValue={merchant.overallBangladeshWeightCharge || 0}
                                        onBlur={(e) =>
                                            updateChargeMutation.mutate({
                                                id: merchant._id,
                                                overallBangladeshWeightCharge: e.target.value,
                                                inDistrictCharge: merchant.inDistrictCharge,
                                                subDistrictCharge: merchant.subDistrictCharge,
                                                overallBangladeshCharge: merchant.overallBangladeshCharge,
                                                weightCharge: merchant.weightCharge,
                                                inDistrictWeightCharge: merchant.inDistrictWeightCharge,
                                                subDistrictWeightCharge: merchant.subDistrictWeightCharge,
                                            })
                                        }
                                        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                                    />
                                </td>
                                 <td className="px-6 py-4">{merchant.Merchant_Balance}</td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => handleRemove(merchant._id)}
                                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-150 ease-in-out"
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
