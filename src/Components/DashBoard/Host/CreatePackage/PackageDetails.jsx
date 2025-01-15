/* eslint-disable react/prop-types */
// Reusable component for package details
import Barcode from 'react-barcode';
import './CourierSlip.css';
import { PiScissorsLight } from 'react-icons/pi';
// import QRCode from 'react-qr-code';
import logoImg from '../../../../assets/nexp-update.png'
import QRCode from 'react-qr-code';
export const PackageDetails = ({ bookingInfo }) => (


    <>

        <div className="invoice-container">
            
            <header className="header">
                <div className="logo">
                    <img className='h-[40px] w-[60px]' src={logoImg} alt="Niyamat Express" />
                </div>
                <div className="company-details flex gap-5">
                    <div>
                        <h3 className='text-2xl font-bold text-gray-800'>Niyamat Express</h3>
                        <p>Chittagong Road, Narayanganj 1430</p>
                    </div>
                    <div className='justify-end text-sm'>
                        <p>https://niyamatexpress.com/</p>
                        <p>email:support@niyamatexpress.com</p>
                        <p>Hotline: 01969905735</p>
                    </div>
                </div>
            </header>

            <div className="booking-details ">
                <div className='flex'>
                    <div>
                        <Barcode className="ml-7 h-[50px] w-[200px]" value={bookingInfo?.CnNumber} />
                        <p>{bookingInfo?.CnNumber}</p>
                        <QRCode className="h-[50px]" value={bookingInfo?.CnNumber} />

                    </div>
                    {/* <div>
                         <strong>Booking: </strong>{bookingInfo?.origin}
                    </div> */}
                    <div>
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
                    <div>
                        <p className='font-bold'>Destination: {bookingInfo?.selectedArea}</p>
                    </div>
                </div>

            </div>


            <div className="contact-details">

                <div className="sender-details">
                    <h3 className='text-bold'><strong>Sender: {bookingInfo?.senderName}</strong></h3>
                    <p><strong>Contact:{bookingInfo?.senderMobile} </strong></p>
                    {/* <p><strong>Address: </strong>{bookingInfo?.origin}</p> */}
                </div>
                <div className="receiver-details">
                    <h3 className='text-bold'><strong>Receiver:{bookingInfo?.recipientName}</strong></h3>
                    <p><strong>Contact: {bookingInfo?.recipientMobile}</strong></p>
                    <p><strong>Address: {bookingInfo?.selectedArea}</strong></p>
                </div>
            </div>

            <div className="table">
                <div className="table-row bg-blue-600 text-white">
                    <div className="table-cell">Qty</div>
                    <div className="table-cell">Details</div>
                    <div className="table-cell">Amount</div>
                </div>
                <div className="table-row">
                    <div className="table-cell">{bookingInfo?.qty}</div>
                    <div className="table-cell">{bookingInfo?.productDetails}</div>
                    <div className="table-cell">{bookingInfo?.amount}</div>
                </div>
            </div>

            <div className="footer flex justify-around">
                <div>
                    <strong>In word: </strong>{bookingInfo?.wordAmount}
                </div>
                <div>
                    {/* <strong>Booking Officer: </strong>SEL00063 */}
                </div>

                <div className='mt-5'>
                    condition+charge: {bookingInfo?.conditionCharge || 0}
                </div>
                <div>
                    {
                        bookingInfo?.paymentOption === 'Cash'
                            ? <strong>Cash - {bookingInfo?.deliveryOption}</strong>
                            : <strong>Payment - {bookingInfo?.paymentOption}</strong>
                    }
                </div>
            </div>
            <p className='text-sm'>সরকার ঘোষিত অবৈধ এবং নিষিদ্ধ পণ্য বুকিং এর ক্ষেত্রে কোম্পানি দায়ী থাকবে নাহ</p>
        </div>
       
        <div className='flex justify-center items-center'>
            <PiScissorsLight className='w-5 h-5' />
            <p>-----------------------------------------</p>
        </div>
    </>
);