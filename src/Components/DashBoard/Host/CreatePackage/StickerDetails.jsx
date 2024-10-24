/* eslint-disable no-unused-vars */
import Barcode from 'react-barcode';
import QRCode from 'react-qr-code';

const StickerDetails = ({ bookingInfo }) => {
    return (
        <div className="p-4 bg-white border-2 border-gray-300 w-[300px]">
            <h1 className="text-lg font-bold text-gray-800">Niyamat Express</h1>

            {/* Barcode Section */}
            <div className="my-2">
                <Barcode className="h-[50px] w-full" value={bookingInfo?.packageTrackingNumber} />
                <p className="text-sm text-gray-700">{bookingInfo?.packageTrackingNumber}</p>
            </div>

            {/* Payment and Booking Info */}
            <div className="my-2 text-sm text-gray-700">
                {
                    bookingInfo?.paymentOption === 'Cash'
                        ? <p><strong>Cash</strong> - {bookingInfo?.deliveryOption}</p>
                        : <p><strong>Payment</strong> - {bookingInfo?.paymentOption}</p>
                }
                <p><strong>Booking Date:</strong> {bookingInfo?.booking}</p>
            </div>

            {/* Receiver Info */}
            <div className="my-2 text-sm text-gray-700">
                <p><strong>Receiver:</strong> {bookingInfo?.recipientName}</p>
                <p><strong>Address:</strong> {bookingInfo?.selectedArea}</p>
            </div>

            {/* Route Info */}
            <p className="my-2 text-sm text-gray-700">Chittagong Road to Mohammapur, Dhaka</p>

            {/* Package Info */}
            <p className="my-2 text-sm text-gray-700"><strong>4 CTN COIL</strong></p>

            {/* QR Code Section */}
            <div className="flex justify-end my-2">
                <QRCode className="h-[50px]" value={bookingInfo?.packageTrackingNumber} />
            </div>

            {/* Print Time (Placeholder example) */}
            <p className="mt-4 text-xs text-gray-500">Print Time: {new Date().toLocaleString()}</p>
            <p>-----------------------------</p>
        </div>
    );
};

export default StickerDetails;
