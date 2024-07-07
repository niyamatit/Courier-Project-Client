/* eslint-disable react/prop-types */
// Reusable component for package details
import Barcode from 'react-barcode';
export const PackageDetails = ({ bookingInfo }) => (
    <>
        <p className='text-sm text-gray-500'>Your Name: {bookingInfo?.senderName}</p>
        <p className='text-sm text-gray-500'>Recipient Name: {bookingInfo?.recipientName}</p>
        <p className='text-sm text-gray-500'>Recipient Mobile: {bookingInfo?.recipientMobile}</p>
        <p className='text-sm text-gray-500'>Destination: {bookingInfo?.destination}</p>
        <p className='text-sm text-gray-500'>Tracking Number: {bookingInfo?.packageTrackingNumber}</p>
        <p className='text-sm text-gray-500'>Origin: {bookingInfo?.origin}</p>
        <div className="mt-4 flex justify-center">
            <Barcode value={bookingInfo?.packageTrackingNumber} />
        </div>
        <p>-----------------------------------------</p>
    </>
);