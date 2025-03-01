/* eslint-disable react/prop-types */
// Reusable component for package details
import Barcode from 'react-barcode';
import './CourierSlip.css';
import { PiScissorsLight } from 'react-icons/pi';
// import QRCode from 'react-qr-code';
import logoImg from '../../../../../src/assets/nexp-update.png'
export const InterNationalBookingDetails_Branch = ({ bookingInfo }) => (
    

    <>

        <div className="invoice-container">
       
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
                    <img className='h-[40px] w-[60px]' src={logoImg} alt="Niyamat Express" />
                </div>
                <div className="company-details flex gap-5">
                    <div className='text-center margin'>
                        <h3 className='font-bold text-3xl text-gray-800 mr-3 '>Niyamat Express</h3>
                        <p className='text-center '>Hotline: 01969905735</p>
                        <p className='text-center text-sm'>Chittagong Road, Narayanganj 1430</p>
                    </div>
                    <div className='justify-end text-sm mt-10'>

                        <p>web:https://niyamatexpress.com/</p>
                        <p>email:support@niyamatexpress.com</p>
                    </div>
                </div>
            </header>

            <div className="booking-details ">
                <div className='flex justify-around'>
                <div>
                        
                        {bookingInfo?.CnNumber ? (
                            <Barcode className="h-[50px] w-60" value={bookingInfo.CnNumber|| 0} />
                        ) : (
                            <p className="text-red-500">Tracking Number Not Available</p>
                        )}
                    </div>
                    <div>
                        <strong>Booking: </strong>{bookingInfo?.bookingBranch}
                    </div>
                    <div>
                        <strong>Booking Date: </strong>{bookingInfo?.bookingDate}
                    </div>
                    {/* <div>
                        <p className='font-bold'>Destination: {bookingInfo?.branch}</p>
                    </div> */}
                </div>

            </div>


            <div className="contact-details">

                <div className="sender-details">
                    <h3 className='text-bold text-sm'><strong>Sender: {bookingInfo?.Sender_Name_Int}</strong></h3>
                    <p  className='text-bold text-sm'><strong>Contact:{bookingInfo?.Sender_Contact_Number_Int} </strong></p>
                    <p  className='text-bold text-sm'><strong>Address: </strong>{bookingInfo?.Sender_Address_Int}</p>
                </div>
                <div className="receiver-details">
                    <h3 className='text-bold text-sm'><strong>Receiver:{bookingInfo?.Customer_Name_Int}</strong></h3>
                    <p  className='text-bold text-sm'><strong>Contact: {bookingInfo?.Customer_Contact_Number_Int}</strong></p>
                    <p  className='text-bold text-sm'><strong>Address: {bookingInfo?.Customer_address_Int}</strong></p>
                </div>
            </div>

            <div className="table">
                <div className="table-row bg-blue-600 text-white">
                    <div className="table-cell">Weight</div>
                    <div className="table-cell">Details</div>
                    <div className="table-cell">Amount</div>
                </div>
                <div className="table-row">
                    <div className="table-cell">{bookingInfo?.Parcel_Weight} kg</div>
                    <div className="table-cell">{bookingInfo?.Product_Details}</div>
                    <div className="table-cell">{bookingInfo?.Total_Charge}</div>
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
                    Total charge: {bookingInfo?.Total_Charge}
                </div>
                <div>
                <strong>{`${bookingInfo?.serviceType}`}</strong>
                {/* <strong>{`${bookingInfo?.serviceType} - ${bookingInfo?.["H/D"] 
    ? "Home Delivery" 
    : bookingInfo?.["O/D"] 
    ? "Office Delivery" :
    bookingInfo?.Exchange 
    ? "Exchange"
    : "No Delivery Option Selected"}`}</strong> */}
              <p className='text-sm'>Booking By : {bookingInfo?.Booking_Staff_Name}</p>
                </div>
            </div>
            <p className='text-xs mt-2'>Company shall not be responsible for booking illegal and prohibited products declared by the government</p>
        </div>
        <div className='flex justify-center items-center'>
            <PiScissorsLight className='w-5 h-5' />
            <p>-----------------------------------------</p>
        </div>
    </>
);