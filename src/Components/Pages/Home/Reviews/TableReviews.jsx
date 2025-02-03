


const TableReviews = ({ rate }) => {
    return (
        <tr className="font-rancho">

            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{rate?.rating || "No Name"}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{rate?.comment || "No Title"}</p>
            </td>
            <td className="bg-white border-b border-gray-200">
                {/* <p className='text-gray-900 whitespace-no-wrap'>
                    <select onChange={handleStatusChange} value={status} className="focus:outline-none">
                        <option value="processing">Processing</option>
                        <option value="accept">Accepted</option>
                        <option value="cancel">Cancel</option>
                    </select>
                </p> */}
            </td>
        </tr>
    );
};

export default TableReviews;


