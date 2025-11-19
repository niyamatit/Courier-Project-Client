import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosSecure from '../../../../api/axiosSecure';
import Swal from 'sweetalert2';
import useUsersData from '../../../../hooks/useUsersData/useUsersData';

const AllMerchantList = () => {
const[verifiedUser] = useUsersData();

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
        mutationFn: ({ id, inDistrictCharge, subDistrictCharge, overallBangladeshCharge, inDistrictWeightCharge, subDistrictWeightCharge, overallBangladeshWeightCharge }) =>
            axiosSecure.patch(`/users/${id}`, { inDistrictCharge, subDistrictCharge, overallBangladeshCharge, inDistrictWeightCharge, subDistrictWeightCharge, overallBangladeshWeightCharge }),
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

    const addBalanceMutation = useMutation({
        mutationFn: ({ id, amount }) => {

            const merchant = merchants.find((m) => m._id === id);
            const current = parseFloat(merchant?.Merchant_Balance) || 0;
            
            const newBalance = parseFloat((current + amount).toFixed(2));
           
            // Patch the Merchant_Balance field on the server
            return axiosSecure.patch(`/users/admin/${id}`, { Merchant_Balance: newBalance });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['merchants']);
            Swal.fire('Success', 'Balance added successfully.', 'success');
        },
        onError: (err) => {
            console.error('Add balance error:', err);
            Swal.fire('Error', 'Failed to add balance. Please try again.', 'error');
        },
    });

    const handleAddBalance = (id) => {
        // Ask for amount to add using SweetAlert2 input
        const FindMerchantNameEmail = merchants.find((m) => m._id === id)
         
        

        Swal.fire({
            title: 'Add Balance to Merchant',
            text: 'Enter the amount you want to add (BDT)',
            input: 'number',
            inputAttributes: {
                min: 0.01,
                step: '0.01',
                inputmode: 'decimal',
            },
            showCancelButton: true,
            confirmButtonText: 'Add',
            preConfirm: (value) => {
                const amount = parseFloat(value);
                if (isNaN(amount) || amount <= 0) {
                    Swal.showValidationMessage('Please enter a valid positive amount');
                }
                return amount;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const amount = result.value;
                if (!amount || isNaN(amount) || amount <= 0) {
                    Swal.fire('Invalid amount', 'Please enter a positive number.', 'error');
                    return;
                }


                // optional: ask for a note/reference
                Swal.fire({
                    title: 'Optional note',
                    input: 'text',
                    inputPlaceholder: 'Reference or note (optional)',
                    showCancelButton: true,
                    confirmButtonText: 'Confirm',
                }).then((noteRes) => {
                    // perform mutation to add balance
                    addBalanceMutation.mutate({ id, amount });
             const MerchantInfo ={
                id: id,
            Merchant_name: FindMerchantNameEmail?.name || 'No Name Found',
            Merchant_email: FindMerchantNameEmail?.email || 'No Email Found',
            Merchant_Image: FindMerchantNameEmail?.imageUrl || '',
            Amount_Added: amount,
            Admin_Note: noteRes.value || '',
            Added_By_Admin: verifiedUser?.name || 'Admin',
            date: new Date().toISOString(),


        }
      

                    // You may also want to log the reference/note on the server by calling a transaction endpoint
                    // Example (uncomment & implement on server if available):
                    axiosSecure.post(`/mer-add-balance-admin/${id}/transactions/history`, MerchantInfo);


                });
            }
        });
    }

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading merchants.</p>;

    return (
        <div className="max-w-full mx-auto mt-10 p-6 bg-gray-100 shadow-xl rounded-lg">
            <h1 className="text-3xl font-bold text-blue-600 mb-5 text-center">All Merchant List</h1>
            <div className="overflow-auto rounded-lg border border-gray-200 shadow">
                <table className="w-full bg-white">
                    <thead className="bg-blue-600 text-white text-left">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Date</th>
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
                                <td className="px-6 py-4">  {merchant.date ? new Date(merchant.date).toLocaleDateString() : 'N/A'}</td>
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
                                <td className="px-6 py-4">{merchant?.Merchant_Balance}</td>
                                <td className="px-6 py-4 text-center flex items-center gap-2">
                                    <button
                                        onClick={() => handleAddBalance(merchant._id)}
                                        className="bg-green-600 text-white px-4 py-2 text-sm rounded-lg hover:bg-green-700 transition duration-150 ease-in-out"
                                    >
                                        Add Balance
                                    </button>
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
