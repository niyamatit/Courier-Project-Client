
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import axiosSecure from "../../../../api/axiosSecure";


const handleDelete = (spoonser) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            const res = await axiosSecure.delete(`/spoonser/${spoonser._id}`)
            // console.log(res.data);
            if (res.data.deletedCount > 0) {

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Deleted",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    });
}
const TableSpoonser = ({ spoonser }) => {
    return (
        <tr className="font-rancho">
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex items-center">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {spoonser?.Image || "No Image"}
                    </p>
                </div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{spoonser?.Name || "No Name"}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{spoonser?.Title || "No Title"}</p>
            </td>
            <td className="bg-white border-b border-gray-200">
                <div className=" flex items-center justify-center h-full">
                    <button
                        onClick={() => handleDelete(spoonser)}
                        className="btn btn-ghost btn-xs place-self-center w-fit">
                        <FaTrashAlt className="text-red-600 text-xl"></FaTrashAlt>
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default TableSpoonser;
