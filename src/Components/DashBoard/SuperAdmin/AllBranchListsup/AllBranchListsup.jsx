
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import { getBranch, updateBranch } from "../../../../api/auth";
import TableBranchsup from "./TableBranchsup";
import BranchModalsup from "./BranchModalsup";
import axiosSecure from "../../../../api/axiosSecure";


const AllBranchListsup = () => {
    const { loading } = useAuth();
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [initialBranch, setInitialBranch] = useState([]);
    const queryClient = useQueryClient();
    const { data: Balances = [] } = useQuery({
        queryKey: ["Balances"],
        
        queryFn: async () => {
          const res = await axiosSecure.get(`/recharge`);
          return res.data;
        },
      });
    useEffect(() => {
        if (initialBranch.length > 0) {
            const indexedBranchs = initialBranch.map((p, idx) => ({ ...p, idx: idx + 1 }));
            setSelectedBranch(indexedBranchs);
        }
    }, [initialBranch]);

    const {
        data: branchs = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['branchs'],
        enabled: !loading,
        queryFn: async () => await getBranch(),
        onSuccess: (data) => {
            // Populate initialBooking when the data is fetched
            setInitialBranch(data);
        },
    });

    const mutation = useMutation({
        mutationFn: updateBranch,
        onSuccess: () => {
            queryClient.invalidateQueries(['branchs']); // Refresh branchs after update
        },
        onError: (error) => {
            console.error("Error updating branch:", error); // Handle error if needed
        },
    });

    const handleView = (branch) => setSelectedBranch(branch);
    const handleCloseModal = () => setSelectedBranch(null);

    const handleSave = (updatedBranch) => {
        mutation.mutate(updatedBranch); // Update branch data
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className='container mx-auto px-4 sm:px-8'>
            <div className='py-8'>
                <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                        <table className='min-w-full leading-normal'>
                            <thead>
                                <tr>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                        SL
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                        Date
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                        Branch Name
                                    </th>

                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                        Branch Number
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                        Branch Commission
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                        Branch type
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                        Branch Balance
                                    </th>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        Actions
                                    </th>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        Remove
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {branchs.map((branch, index) =>{
                               
                               const Branch_Total_Balance = Balances.find(balance => balance?.Branch_Name === branch?.Branch_Name)?.Amount || 0;
                                
                                
                                return (
                                    <TableBranchsup key={branch._id} branch={{ ...branch, idx: index + 1 ,Branch_Balace:Branch_Total_Balance}} refetch={refetch} onView={handleView} />
);
})}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Render the modal if a branch is selected */}
            {selectedBranch && (
                <BranchModalsup
                    branch={selectedBranch}
                    onClose={handleCloseModal}
                    onSave={handleSave} // Pass handleSave to branchModal
                />
            )}
        </div>
    );
};

export default AllBranchListsup;