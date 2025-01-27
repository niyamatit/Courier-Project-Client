import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import axiosSecure from "../../../../api/axiosSecure";
import { QueryClient } from "@tanstack/react-query";

const TableAdmin = ({ admin }) => {

    const handleDelete = async (id) => {
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
                const response = await axiosSecure.delete(`/admin/delete/${id}`);
                console.log("Delete Response:", response.data);
                QueryClient.invalidateQueries({ queryKey: ['admin'] })

                if (response.data.delUser.deletedCount > 0 || response.data.result.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Admin has been deleted successfully.",
                        icon: "success",
                    });
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete the admin. Please try again.",
                        icon: "error",
                    });
                }
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Something went wrong while deleting the admin.",
                icon: "error",
            });
            console.error("Delete admin error:", error);
        }
    };

    return (
        <tr>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 font-semibold whitespace-no-wrap">{admin.idx}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{admin.Admin_Name}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{admin.Admin_Number}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{admin.Admin_Address}</p>
            </td>
            {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button className="text-blue-500 hover:underline">View</button>
            </td> */}
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button
                    onClick={() => handleDelete(admin._id)}
                    className="btn btn-ghost btn-xs"
                >
                    <FaTrashAlt className="text-red-600" />
                </button>
            </td>
        </tr>
    );
};

export default TableAdmin;
