/* eslint-disable react/prop-types */
// Reusable component for package details
import Barcode from 'react-barcode';
import './CourierSlip.css';
import { PiScissorsLight } from 'react-icons/pi';
export const PackageDetails = ({ bookingInfo }) => (
    <>

        <div className="invoice-container">
            <p>সরকার ঘোষিত অবৈধ এবং নিষিদ্ধ পণ্য বুকিং এর ক্ষেত্রে কোম্পানি দায়ী থাকবে নাহ</p>
            <header className="header">
                <div className="logo">
                    <img src="https://transp-nextjs.vercel.app/assets/imgs/template/logo.svg" alt="Niyamat Express Logo" />
                </div>
                <div className="company-details flex gap-5">
                    <div>
                        <h1>Niyamat Express Limited</h1>
                        <p>Waspur (Near to Bosila Bridge), Keraniganj, Dhaka-1312</p>
                    </div>
                    <div>
                        <p>www.Niyamatexpress.net</p>
                        <p>Hotline: 09639-333888</p>
                    </div>
                </div>
            </header>

            <div className="barcode-container flex justify-between">
                <div>
                    <Barcode className="h-[50px]" value={bookingInfo?.packageTrackingNumber} />
                    {/* <p>{bookingInfo?.packageTrackingNumber}</p> */}
                </div>

                <div className="booking-details">
                    <div className='flex'>
                        <div>
                            <strong>Booking: </strong>{bookingInfo?.origin}
                        </div>
                        <div>
                            <strong>Booking Date: </strong>{bookingInfo?.booking}
                        </div>
                    </div>
                    <div>
                        <strong>Destination: </strong>{bookingInfo?.destination}
                    </div>
                </div>
            </div>



            <div className="contact-details">
                <div className="sender-details">
                    <h2>Sender: {bookingInfo?.senderName}</h2>
                    <p><strong>Contact: </strong>{bookingInfo?.senderMobile}</p>
                    <p><strong>Address: </strong>{bookingInfo?.origin}</p>
                </div>
                <div className="receiver-details">
                    <h2>Receiver:{bookingInfo?.recipientName}</h2>
                    <p><strong>Contact: </strong>{bookingInfo?.recipientMobile}</p>
                    <p><strong>Address: </strong>{bookingInfo?.destination}</p>
                </div>
            </div>

            <div className="table">
                <div className="table-row bg-black text-white">
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
                    <strong>In word: </strong>Five Hundred Forty Only
                </div>
                <div>
                    <strong>Booking Officer: </strong>SEL00063</div>
                <div>
                    <strong>Date: </strong>{bookingInfo?.booking}
                </div>
                <div>
                    condition+charge: {bookingInfo?.cod}
                </div>
                <div>
                    <strong>Cash - {bookingInfo?. deliveryOption}</strong>
                </div>
            </div>
        </div>
        <div className='flex justify-center items-center'>
            <PiScissorsLight className='w-5 h-5' />
            <p>-----------------------------------------</p>
        </div>
    </>
);