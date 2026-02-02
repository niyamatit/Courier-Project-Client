/* eslint-disable react/prop-types */

import Barcode from 'react-barcode';
import './CourierSlip.css';
import { PiScissorsLight } from 'react-icons/pi';

import logoImg from '../../../../assets/nexp-update.png'
import QRCode from 'react-qr-code';
export const PackageDetails = ({ bookingInfo }) => (


    <>

        <div className="invoice-container max-w-[800px]"
        >
             <div 
    className="absolute inset-0 bg-center bg-repeat-y"
    style={{ 
        backgroundImage: `url("https://i.ibb.co.com/SD8pn0BD/text-logo.png")`, 
        opacity: 0.1,
        backgroundSize: "90% auto",  
        zIndex: -1
    }}
></div>
            
            <header className="header">
                <div className="logo">
                    <img className='h-[100px] w-[80px]' src={logoImg} alt="Niyamat Express" />
                </div>
                <div className="company-details flex justify-center mr-10 ">
                    <div>
                        <h3 className='text-2xl font-bold text-gray-800 mr-3'>Niyamat Express</h3>
                        <p className='text-center text-sm'>Chittagong Road, Narayanganj 1430</p>
                    </div>
                    <div className='justify-center text-sm'>
                        <p>web:https://niyamatexpress.com/</p>
                        <p>email:support@niyamatexpress.com</p>
                        <p>Tel - 09697687401, 09638840680
                        </p>
                    </div>
                    
                </div>
                
            </header>

            <div className="booking-details ">
                <div className='flex'>
                    <div>
                        <Barcode className="ml-7 h-[35px] w-[200px] mt-[1px]" value={bookingInfo?.CnNumber} />
                        <p className='text-[10px] ml-5'>{bookingInfo?.CnNumber}</p>
                        

                    </div>
                    
                    
                    <div className='flex gap-1'>
                        <p className='font-bold text-sm'>Destination: </p>  <h className='font-bold text-sm'>  {bookingInfo?.selectedArea}</h>
                    </div>
                    <div className='mt-1'>
                    <QRCode className="h-[40px]" value={bookingInfo?.CnNumber} />
                    </div>
                </div>

            </div>


            <div className="contact-details">

                <div className="sender-details text-left ml-20">
                    <h3 className='text-bold text-xs'><strong>Sender: {
                    bookingInfo?.Merchant_ID ? `${bookingInfo?.senderName} (Merchant)` : bookingInfo?.senderName 
                    
                    }</strong></h3>
                    <p className='text-xs'> <strong>Contact:{bookingInfo?.senderMobile} </strong></p>
                    <p className='text-xs'><strong>Address: </strong>{bookingInfo?.sender_Full_Adress}</p>
                </div>
                <div className="receiver-details text-left">
                    <h3 className='text-bold text-xs'><strong>Receiver:{bookingInfo?.recipientName}</strong></h3>
                    <p className='text-xs'><strong>Contact: {bookingInfo?.recipientMobile}</strong></p>
                    <p className='text-xs'><strong>Address: {bookingInfo?.Receiver_Full_Adress}</strong></p>
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
                    <div className="table-cell">{bookingInfo?.amount} ({(bookingInfo?.weight_kg)} kg)</div>
                </div>
            </div>

            <div className="footer flex justify-around">
                <div className='flex'>
                    <strong>In word: </strong><p>{bookingInfo?.wordAmount}</p>
                </div>
               

                <div className=''>
                    condition+charge: {bookingInfo?.condition || bookingInfo?.condition_With_Charge_Last || 0}
                </div>
                <div>
                   
                   <strong className='text-sm'>{`${bookingInfo?.paymentOption} - ${bookingInfo?.deliveryOption}`}</strong>
                   <div>
                    <strong className='text-xs'>Booking Date: </strong>
{new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
}).format(new Date(bookingInfo?.booking))}
 <p className='text-xs'>Booking by: {bookingInfo?.Booking_Staff_Name}</p>
                    </div>
                </div>
            </div>
            
            <p className='text-xs mt-1'>সরকার ঘোষিত অবৈধ এবং নিষিদ্ধ পণ্য বুকিং এর ক্ষেত্রে কোম্পানি দায়ী থাকবে নাহ</p>
        </div>
       
        <div className='flex justify-center items-center'>
            <PiScissorsLight className='w-5 h-3' />
            <p>-----------------------------------------</p>
        </div>
    </>
);