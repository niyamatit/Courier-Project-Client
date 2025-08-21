import Barcode from 'react-barcode';
import QRCode from 'react-qr-code';

const StickerDetails = ({ bookingInfo }) => {
    
    const bookingTime = new Date(bookingInfo?.booking);
    const userTimeZone = "Asia/Dhaka"; 
    const formattedBookingTime = bookingTime.toLocaleString("en-US", {
        timeZone: userTimeZone,
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });

    return (
        <div className="p-4 bg-white border-2 border-gray-300 rounded-lg shadow-md w-full">
            {/* Logo and Header */}
            <div className="text-center">
                <img
                    src="https://i.ibb.co/LCJvnRB/logo.png"
                    alt="Logo"
                    className="h-20 mx-auto mb-2"
                />
                <h1 className="text-3xl font-bold text-gray-800">Niyamat Express</h1>
                <p className="text-xs text-gray-500">Head Office: Chittagong Road, Narayanganj 1430</p>
            </div>

            {/* Barcode Section */}
            <div className="my-2 text-center">
                <Barcode className="h-[40px] w-full" value={bookingInfo?.CnNumber} />
                <p className="text-xs text-gray-600 mt-1">{bookingInfo?.CnNumber}/{bookingInfo?.qty}</p>
            </div>

            {/* Sender & Receiver Information */}
            <div className=" text-xs text-gray-700 mt-2">
                {/* Sender Info */}
                {/* <div className="w-1/2 pr-2 border-r border-gray-300">
                    <p><strong>Sender:</strong> {bookingInfo?.senderName}</p>
                    <p><strong>Contact:</strong> {bookingInfo?.senderMobile}</p>
                    <p><strong>Address:</strong> {bookingInfo?.sender_Full_Adress}</p>
                </div> */}

                {/* Receiver Info */}
                <div className="">
                    <p><strong>Receiver:</strong> {bookingInfo?.recipientName}</p>
                    <p><strong>Contact:</strong> {bookingInfo?.recipientMobile}</p>
                    {/* <p><strong>Address:</strong> {bookingInfo?.Receiver_Full_Adress}</p> */}
                </div>
            </div>

            {/* Booking Info */}
            <div className="mt-2">
                <p className="text-xs text-gray-700">
                    <strong>Payment:</strong> {bookingInfo?.paymentOption} - {bookingInfo?.deliveryOption}
                </p>
                <p className="text-xs text-gray-700">
                    <strong>Booking Date:</strong> {formattedBookingTime}
                </p>
                <p className='font-bold text-[14px] mt-4'>{bookingInfo?.sender_Full_Adress} to {bookingInfo?.selectedArea}</p>
            </div>

            {/* Package Info */}
            <div className="mt-2 border-t pt-2">
                 {/* <p className="text-xs text-gray-700"><strong>Product:</strong> {bookingInfo?.productDetails}</p> */}
                <p className="text-xs text-gray-700"><strong>Condition Charge:</strong> {bookingInfo?.conditionCharge} BDT</p>
                {/* <p className="text-xs text-gray-700"><strong>Total Amount:</strong> {bookingInfo?.amount} BDT ({bookingInfo?.wordAmount})</p> */}
            </div>

            {/* QR Code Section */}
            <div className="flex justify-center mt-2">
                <QRCode className="h-[50px]" value={bookingInfo?.CnNumber} />
            </div>

            {/* Footer */}
            <div className="mt-2 text-xs text-gray-500 text-center">
                <p>Print Time: {new Date().toLocaleString("en-US", { timeZone: userTimeZone })}</p>
                <p>-----------------------------</p>
            </div>
        </div>
    );
};

export default StickerDetails;
