/* eslint-disable react/prop-types */
// Reusable component for package details
import Barcode from 'react-barcode';
import './MerchantSlip.css';
import { PiScissorsLight } from 'react-icons/pi';
// import QRCode from 'react-qr-code';
import logoImg from '../../../../../src/assets/nexp-update.png'
import QRCode from 'react-qr-code';
export const Merchant_Booking_details = ({ bookingInfo }) => (


    <>

        <div className="invoice-container max-w-[800px]"
        >
             <div 
    className="absolute inset-0 bg-center bg-repeat-y"
    style={{ 
        backgroundImage: `url("https://i.ibb.co.com/SD8pn0BD/text-logo.png")`, 
        opacity: 0.1,
        backgroundSize: "70% auto",  
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
                        <p>Tel - 09617179001, 09617179177
                        </p>
                    </div>
                    {/* <div className="logo border flex-1">
                    <img className='h-[70px] w-[80px]' src={logoImg} alt="Niyamat Express" />
                </div> */}
                </div>
                
            </header>

            <div className="booking-details ">
                <div className='flex'>
                    <div>
                        <Barcode className="ml-7 h-[35px] w-[200px] mt-[1px]" value={bookingInfo?.CnNumber || ''} />
                        <p className='text-[10px] ml-5'>{bookingInfo?.CnNumber || ''}</p>
                        

                    </div>
                    
                    
                    <div className='flex gap-1'>
                        <p className='font-bold text-sm'>Destination: </p>  <h className='font-bold text-sm'>  {bookingInfo?.Customer_Area}</h>
                    </div>
                    <div className='mt-1'>
                    <QRCode className="h-[40px]" value={bookingInfo?.CnNumber} />
                    </div>
                </div>

            </div>


            <div className="contact-details">

                <div className="sender-details text-left ml-20">
                    <h3 className='text-bold text-xs'><strong>Sender: {bookingInfo?.Merchant_Name}</strong></h3>
                    <p className='text-xs'> <strong>ID:{bookingInfo?.Merchant_ID} </strong></p>
                    {/* <p className='text-xs'><strong>Address: </strong>{bookingInfo?.sender_Full_Adress}</p> */}
                </div>
                <div className="receiver-details text-left">
                    <h3 className='text-bold text-xs'><strong>Receiver:{bookingInfo?.Customer_Name}</strong></h3>
                    <p className='text-xs'><strong>Contact: {bookingInfo?.Customer_Contact_Number}</strong></p>
                    <p className='text-xs'><strong>Address: {bookingInfo?.Customer_Address}</strong></p>
                </div>
            </div>

            <div className="table">
                <div className="table-row bg-blue-600 text-white">
                    <div className="table-cell">Weight</div>
                    <div className="table-cell">Details</div>
                    <div className="table-cell">Amount</div>
                </div>
                <div className="table-row">
                    <div className="table-cell">{bookingInfo?.Parcel_Weight}</div>
                    <div className="table-cell">{bookingInfo?.Product_Details}</div>
                    <div className="table-cell">{bookingInfo?.Total_Charge}</div>
                </div>
            </div>

            <div className="footer flex justify-around">
                {/* <div className='flex'>
                    <strong>In word: </strong><p>{bookingInfo?.wordAmount}</p>
                </div> */}
               

                <div className=''>
                    Total Charge: {bookingInfo?.Total_Charge || 0}
                </div>
                <div>
                    {/* {
                        bookingInfo?.paymentOption === 'Cash'
                            ? <strong>Cash - {bookingInfo?.deliveryOption}</strong>
                            : <strong>Payment - {bookingInfo?.deliveryOption}</strong>
                    } */}
                   <strong className='text-sm'>{bookingInfo?.Service_Type}</strong>
                   {/* <strong className='text-sm'>{`${bookingInfo?.paymentOption} - ${bookingInfo?.Service_Type}`}</strong> */}
                   <div>
  <strong className='text-xs'>Booking Date: </strong>
  {bookingInfo?.Date ? (
    new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date(bookingInfo.Date)))
    : 'N/A'
  }
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