import { useEffect, useState } from "react";
import axiosSecure from "../../../../../api/axiosSecure";

const TableRecharge = ({ recharge, refetch }) => {
    const [status, setStatus] = useState('');
    useEffect(() => {
        console.log(recharge?.Status)
        if (!status) {
            setStatus(recharge?.Status || "processing")
        }
    }, [recharge])
    const handleStatusChange = async (e) => {
        try {
            const newStatus = e.target.value;
            const response = await axiosSecure.put(`/recharge/${recharge._id}`, {
                Status: newStatus
            })
            console.log(response)
            if (response.data.acknowledged && response.data.modifiedCount > 0) {
                setStatus(newStatus)
                refetch()
            }
        }
        catch (error) {
            console.log(error.message)
        }
    }
    console.log(recharge)
    return (
        <tr className="font-rancho">
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                        <div className='block relative'>
                            <p className='text-gray-900 whitespace-no-wrap'>
                                {recharge?.Account_Name}
                            </p>
                        </div>
                    </div>

                </div>
            </td>

            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    {recharge?.Account_Number}
                </p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    {recharge?.Account_Amount}
                </p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    {recharge?.Recharge_Note}
                </p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    <select onChange={handleStatusChange} value={status} className="focus:outline-none">
                        <option value="processing">Processing</option>
                        <option value="accept">Accepted</option>
                        <option value="cancel">Cancel</option>
                    </select>
                </p>
            </td>




            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>



            </td>



        </tr>
    );
};

export default TableRecharge;