/* eslint-disable no-unused-vars */
import Barcode from 'react-barcode';
import QRCode from 'react-qr-code';

const OfflineSticker = ({ bookingInfo }) => {
    return (
        <div className="p-4 bg-white border-2 border-gray-300 w-[300px]">
            <h1 className="text-lg font-bold text-gray-800">Niyamat Express</h1>

            {/* Barcode Section */}
            <div className="my-2">
                <Barcode className="h-[50px] w-full" value={bookingInfo?.CnNumber
                } />
                <p className="text-sm text-gray-700">{bookingInfo?.CnNumber
                }</p>
            </div>

            {/* Payment and Booking Info */}
            <div className="my-2 text-sm text-gray-700">
  {bookingInfo?.paymentMethod === "Cash" ? (
    <p>
      <strong>Payment</strong> - {bookingInfo?.paymentMethod} -{" "}
      {bookingInfo["H/D"] && "H/D" || bookingInfo["O/D"] && "O/D"}
    </p>
  ) : (
    <p>
    <strong>Payment</strong> - {bookingInfo?.paymentMethod} -{" "}
    {bookingInfo["H/D"] && "H/D" || bookingInfo["O/D"] && "O/D"}
  </p>
  )}
  <p>
    <strong>Booking Date:</strong> {bookingInfo?.bookingDate}
  </p>
</div>


            {/* Receiver Info */}
            <div className="my-2 text-sm text-gray-700">
                <p><strong>Receiver:</strong> {bookingInfo?.receiverName}</p>
                <p><strong>Address:</strong> {bookingInfo?.receiveraddress}</p>
            </div>

            {/* Route Info */}
            <p className="my-2 text-[14px] font-bold text-gray-700">{bookingInfo?.bookingBranch} to {bookingInfo?.Destbranch}</p>

            {/* Package Info */}
            <p className="my-2 text-sm text-gray-700"><strong>{bookingInfo?.product}</strong></p>

            {/* QR Code Section */}
            <div className="flex justify-end my-2">
                <QRCode className="h-[50px]" value={bookingInfo?.CnNumber
                || 0} />
            </div>

            {/* Print Time (Placeholder example) */}
            <p className="mt-4 text-xs text-gray-500">Print Time: {new Date().toLocaleString()}</p>
            <p>-----------------------------</p>
        </div>
    );
};

export default OfflineSticker;
