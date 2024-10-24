

const TableRecharge = ({ recharge }) => {
    return (
        <tr className="font-rancho">
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                        <div className='block relative'>
                            <p className='text-gray-900 whitespace-no-wrap'>
                                {recharge?.accountName}
                            </p>
                        </div>
                    </div>

                </div>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{recharge?.accountNumber}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    {recharge?.accountAmount}
                </p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    {recharge?.rechargenote}
                </p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    {recharge?.update}
                </p>
            </td>



            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>



            </td>



        </tr>
    );
};

export default TableRecharge;