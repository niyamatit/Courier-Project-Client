
/* eslint-disable react/prop-types */


const MerchantDataRow = ({ user,index }) => {
 
    return (
      <tr>
         <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{index+1}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
         <img src={user?.imageUrl} className="h-10 w-10" alt="" />
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{user?.name}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.Merchant_Full_Address}</p>
        </td>
  
        
      </tr>
    )
  }
  
  export default MerchantDataRow