import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosSecure from "../../../../api/axiosSecure";
import { FaTrashAlt } from "react-icons/fa";

const TableRider = ({ rider, index }) => {
    const [status, setStatus] = useState("");
    const deobfuscatePassword = (obfuscatedPassword) => {
        let actualPassword = "";
        for (let i = 0; i < obfuscatedPassword.length; i += 21) {
          actualPassword += obfuscatedPassword[i]; 
        }
        return actualPassword;
      };

    useEffect(() => {
        if (!status) {
            setStatus(rider?.Status || "processing");
        }
    }, [rider]);

    return (
        <tr className="font-rancho">
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{index}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{rider?.Date}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <img
                    src={rider?.Rider_Image}
                    alt="Rider"
                    className="w-12 h-12 rounded-full"
                />
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{rider?.Rider_Name}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{rider?.Rider_Number}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{rider?.Rider_Nid}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{rider?.Rider_Full_Address}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{deobfuscatePassword(rider?.Rider_Password)}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{rider?.Rider_Branch}</p>
            </td>
            {/* <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <button
                    className='text-blue-500 hover:text-blue-700 underline'
                    onClick={() => alert(JSON.stringify(rider, null, 2))}
                >
                    View
                </button>
            </td> */}
        </tr>
    );
};

export default TableRider;
