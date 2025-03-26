
import { MdAddBox } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import axiosSecure from "../../../../api/axiosSecure";
import Swal from "sweetalert2";
import useUsersData from "../../../../hooks/useUsersData/useUsersData";
import { useQuery } from "@tanstack/react-query";
import { FaPlus } from 'react-icons/fa';

import { useState } from "react";
import AddBalanceModal from "./AddBalanceModal";
const TableBranch = ({ branch, onView, refetch }) => {
    const [verifiedUser] = useUsersData();
  const { data: users = [],refetch: refetchUsers } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get("/shfjksdhfjdjkfhxnbcnbc67437gch");
      return res.data;
    }
  })
  const [showModal, setShowModal] = useState(false);

  const SerachUser = users.filter(user=>user?.email === branch?.email)
 
    const deobfuscatePassword = (obfuscatedPassword) => {
        let actualPassword = "";
        for (let i = 0; i < obfuscatedPassword.length; i += 21) {
          actualPassword += obfuscatedPassword[i]; 
        }
        return actualPassword;
      };
    const handleDelete = async (name) => {
       
       
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            });

              if (result.isConfirmed) {
               
                    const res = await axiosSecure.delete(`/users/branch/${name}`);
                    console.log("res",res)
                   
                   
                const response = await axiosSecure.delete(`/branch/hello/branch/${name}`);
               
                console.log("response",response.data)
               
               
               

                if (response.data?.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Branch has been deleted successfully.",
                        icon: "success",
                    });
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete the branch. Please try again.",
                        icon: "error",
                    });
                }
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Something went wrong while deleting the branch.",
                icon: "error",
            });
            console.error("Delete branch error:", error);
        }
    };

    return (
        <>
            <tr className="font-rancho">
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 font-semibold whitespace-no-wrap">{branch?.idx}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{branch?.Date}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{branch?.Branch_Name}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{branch?.Branch_Number}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{branch?.Branch_Commission}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{branch?.Branch_type}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{deobfuscatePassword(branch?.Branch_Password) || "N/A"}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{branch?.Branch_Balace}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button onClick={() => setShowModal(true)}>
                        <FaPlus className="text-green-500" />
                    </button>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button
                        onClick={() => onView(branch)}
                        className="text-blue-500 hover:underline"
                    >
                        View
                    </button>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button
                        onClick={() => handleDelete(branch?.Branch_Name)}
                        aria-label="Delete branch"
                        className="btn btn-ghost btn-xs"
                    >
                        <FaTrashAlt className="text-red-600" />
                    </button>
                </td>
            </tr>
    
            
            {showModal && (
                <AddBalanceModal
                    show={showModal} 
                    onClose={() => setShowModal(false)} 
                    branch={branch} 
                    refetch={refetch} 
                />
            )}
        </>
    );
    
};

export default TableBranch;
