/* eslint-disable react/prop-types */
// Reusable component for package details
import Barcode from 'react-barcode';
import './CourierSlip.css';
import { PiScissorsLight } from 'react-icons/pi';
export const PackageDetails = ({ bookingInfo }) => (
    <>

        <div className="invoice-container">
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
                            <strong>Booking: </strong>Rangpur
                        </div>
                        <div>
                            <strong>Booking Date: </strong>03 Jul 24
                        </div>
                    </div>
                    <div>
                        <strong>Destination: </strong>Chittagong Road
                    </div>
                </div>
            </div>



            <div className="contact-details">
                <div className="sender-details">
                    <h2>Sender: Name</h2>
                    <p><strong>Contact: </strong>01883337565</p>
                    <p><strong>Address: </strong>Rangpur</p>
                </div>
                <div className="receiver-details">
                    <h2>Receiver:Name</h2>
                    <p><strong>Contact: </strong>01737699786</p>
                    <p><strong>Address: </strong>Chittagong Road</p>
                </div>
            </div>

            <div className="table">
                <div className="table-row bg-black text-white">
                    <div className="table-cell">Qty</div>
                    <div className="table-cell">Details</div>
                    <div className="table-cell">Amount</div>
                </div>
                <div className="table-row">
                    <div className="table-cell">3</div>
                    <div className="table-cell">Mango 60KG 3L101</div>
                    <div className="table-cell">540.00</div>
                </div>
            </div>

            <div className="footer flex justify-around">
                <div>
                    <strong>In word: </strong>Five Hundred Forty Only
                </div>
                <div>
                    <strong>Booking Officer: </strong>SEL00063</div>
                <div>
                    <strong>Date: </strong>04-Jul-24 12:09 AM
                </div>
                <div>
                    <strong>Cash - O/D</strong>
                </div>
            </div>
        </div>
        <div className='flex justify-center items-center'>
            <PiScissorsLight className='w-5 h-5' />
            <p>-----------------------------------------</p>
        </div>
    </>
);