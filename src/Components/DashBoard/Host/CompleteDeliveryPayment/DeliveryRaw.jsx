/* eslint-disable react/prop-types */


const DeliveryRaw = ({ payment }) => {
 
    return (
      <tr>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{payment?.senderName}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{payment?.recipientName}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{payment?.update}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {payment?.amount}
        </td>
  
        
      </tr>
    )
  }
  
  export default DeliveryRaw