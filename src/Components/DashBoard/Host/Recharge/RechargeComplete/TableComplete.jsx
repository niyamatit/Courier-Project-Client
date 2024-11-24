import { useEffect, useState } from "react";

const TableComplete = ({ recharge }) => {
    const [status, setStatus] = useState('');
    useEffect(() => {
        console.log(recharge?.Status)
        if (!status) {
            setStatus(recharge?.Status || "processign")
        }
    }, [recharge])


    return (
        <>
            <tr className="font-rancho w-full">

                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>
                        {recharge?.Date}
                    </p>
                </td>
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
                        {recharge?.Amount}
                    </p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>
                        {recharge?.Note}
                    </p>
                </td>

                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                </td>
            </tr>

        </>
    );
};

export default TableComplete;