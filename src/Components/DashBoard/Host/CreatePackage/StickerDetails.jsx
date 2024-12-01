/* eslint-disable no-unused-vars */
import Barcode from 'react-barcode';
import QRCode from 'react-qr-code';

const StickerDetails = ({ bookingInfo }) => {
    return (
        <div className="p-4 bg-white border-2 border-gray-300 w-[400px]">
            <h1 className="text-xl font-bold text-gray-800">Niyamat Express</h1>

            {/* Barcode Section */}
            <div className="my-2">
                <Barcode className="h-[50px] w-full" value={bookingInfo?.CnNumber} />
                <p className="text-sm text-gray-700">{bookingInfo?.CnNumber}/{bookingInfo?.qty}</p>
            </div>

            {/* Payment and Booking Info */}
            <div className="my-2 text-sm text-gray-700">
                {
                    bookingInfo?.paymentOption === 'Cash'
                        ? <p><strong>Cash</strong> - {bookingInfo?.deliveryOption}</p>
                        : <p><strong>Payment</strong> - {bookingInfo?.paymentOption}</p>
                }
               <strong>Booking Date: </strong>
{new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
}).format(new Date(bookingInfo?.booking))}

            </div>

            {/* Receiver Info */}
            <div className="my-2 text-sm text-gray-700">
                <p><strong>Receiver:</strong> {bookingInfo?.recipientName}</p>
                <p><strong>Address:</strong> {bookingInfo?.selectedArea}</p>
            </div>

            {/* Route Info */}
           

            {/* Package Info */}
            <p className="my-2 text-sm text-gray-700"><strong>{bookingInfo?.productDetails}</strong></p>
            <p className="my-2 text-sm text-gray-700"><strong>Condition Charge: {bookingInfo?.conditionCharge}</strong></p>

            {/* QR Code Section */}
            <div className="flex justify-center my-2">
                <QRCode className="h-[50px]" value={bookingInfo?.CnNumber} />
            </div>

            {/* Print Time (Placeholder example) */}
            <p className="mt-4 text-xs text-gray-500">Print Time: {new Date().toLocaleString()}</p>
            <p>-----------------------------</p>
        </div>
    );
};

export default StickerDetails;
