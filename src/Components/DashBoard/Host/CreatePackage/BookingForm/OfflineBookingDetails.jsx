/* eslint-disable react/prop-types */
// Reusable component for package details
import Barcode from 'react-barcode';
import './CourierSlip.css';
import { PiScissorsLight } from 'react-icons/pi';
// import QRCode from 'react-qr-code';
import logoImg from '../../../../../assets/nexp-update.png'
export const OfflineBookingDetails = ({ bookingInfo }) => (
    

    <>

        <div className="invoice-container">
        <p>Hotline: 01969905735</p>
            <p className='text-xs'>সরকার ঘোষিত অবৈধ এবং নিষিদ্ধ পণ্য বুকিং এর ক্ষেত্রে কোম্পানি দায়ী থাকবে নাহ</p>
            <header className="header">
                <div className="logo">
                    <img className='h-[30px] w-[50px]' src={logoImg} alt="Niyamat Express" />
                </div>
                <div className="company-details flex gap-5">
                    <div >
                        <h3 className='font-bold'>Niyamat Express</h3>
                        <p className='text-left'>Chittagong Road, Narayanganj 1430</p>
                    </div>
                    <div className='justify-end text-sm'>

                        <p>https://niyamatexpress.com/</p>
                        <p>email:support@niyamatexpress.com</p>
                    </div>
                </div>
            </header>

            <div className="booking-details ">
                <div className='flex justify-around'>
                    <div>
                        <Barcode className="h-[50px] w-60" value={bookingInfo?.CnNumber} />
                        {/* <p>{bookingInfo?.packageTrackingNumber}</p> */}
                        {/* <QRCode className="h-[50px]" value={bookingInfo?.packageTrackingNumber} /> */}

                    </div>
                    <div>
                        <strong>Booking: </strong>{bookingInfo?.bookingBranch}
                    </div>
                    <div>
                        <strong>Booking Date: </strong>{bookingInfo?.bookingDate}
                    </div>
                    <div>
                        <p className='font-bold'>Destination: {bookingInfo?.branch}</p>
                    </div>
                </div>

            </div>


            <div className="contact-details">

                <div className="sender-details">
                    <h3 className='text-bold'><strong>Sender: {bookingInfo?.senderName}</strong></h3>
                    <p><strong>Contact:{bookingInfo?.senderContactNo} </strong></p>
                    <p><strong>Address: </strong>{bookingInfo?.address}</p>
                </div>
                <div className="receiver-details">
                    <h3 className='text-bold'><strong>Receiver:{bookingInfo?.receiverName}</strong></h3>
                    <p><strong>Contact: {bookingInfo?.receiverContactNo}</strong></p>
                    <p><strong>Address: {bookingInfo?.receiveraddress}</strong></p>
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
                    <div className="table-cell">{bookingInfo?.product}</div>
                    <div className="table-cell">{bookingInfo?.totalCharge}</div>
                </div>
            </div>

            <div className="footer flex justify-around">
                {/* <div>
                    <strong>In word: </strong>{bookingInfo?.wordAmount}
                </div> */}
                <div>
                    {/* <strong>Booking Officer: </strong>SEL00063 */}
                </div>

                <div className=''>
                    condition charge: {bookingInfo?.serviceCharge}
                </div>
                <div>
                    {
                        bookingInfo?.paymentMethod === 'Cash'
                            ? <strong>Payment - {bookingInfo?.paymentMethod }</strong>
                            : <strong>Payment - {bookingInfo?.paymentMethod }</strong>
                    }
                </div>
            </div>
        </div>
        <div className='flex justify-center items-center'>
            <PiScissorsLight className='w-5 h-5' />
            <p>-----------------------------------------</p>
        </div>
    </>
);