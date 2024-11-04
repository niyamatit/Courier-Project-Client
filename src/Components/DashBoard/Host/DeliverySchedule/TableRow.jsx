/* eslint-disable react/prop-types */

import { useState } from "react"
import UpdateModal from "../../../../Modal/UpdateModal"
import toast from "react-hot-toast"
import { updateAction } from "../../../../api/auth"
// import axiosSecure from "../../../../api/axiosSecure"


const TableRow = ({ pack,refetch }) => {

    const [isOpen, setIsOpen] = useState(false)

    
    const handlePrint = async (_id) => {
      console.log('Requested ID:', _id); // Log the ID being used
      try {
        const response = await fetch(`http://localhost:5000/package/${_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch package data');
        }
        const data = await response.json();
        console.log('Package data:', data); // Log the retrieved data
      } catch (error) {
        console.error('Error fetching package data:', error);
      }
    };
    
    
    

    const modalHandler = async (selected,note) => {
      try {
       
        const data = await updateAction({ update: selected,id:pack?._id,note })
        console.log("Data returned from updateAction:", data);
        refetch()
        toast.success('Action updated!')
      } catch (err) {
        console.log(err)
        toast.error(err.message)
      } finally {
        setIsOpen(false)
      }
    }


    return (
        <tr className="font-rancho">
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                        <div className='block relative'>
                            <p className='text-gray-900 whitespace-no-wrap'>
                                {pack?.senderName}
                            </p>
                        </div>
                    </div>

                </div>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{pack?.recipientName}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    {pack?.booking}
                </p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    {pack?.productDetails}
                </p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    {pack?.recipientMobile}
                </p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    {pack?.update}
                </p>
            </td>



            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span
          onClick={() => setIsOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update Action</span>
        </span>
        {/* Modal */}
        <UpdateModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalHandler={modalHandler}
          pack={pack}
        />
      </td>

      <td  className='px-5 py-5  border-b border-gray-200 bg-white text-sm'>
        <button  onClick={() => handlePrint(pack?._id)} className='text-gray-900  whitespace-no-wrap'>
          Print
        </button>
      </td>

        </tr>
    )
}

export default TableRow