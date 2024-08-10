import { useRef, useEffect, useState } from "react";
import { addPackage } from "../../../../api/package";
import toast from "react-hot-toast";
import PrintModal from "./PrintModal";

// Function to convert numbers to words
const numberToWords = (num) => {
    const a = [
        '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
        'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
    ];
    const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    const inWords = (n) => {
        if (n < 20) return a[n];
        if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? '-' + a[n % 10] : '');
        if (n < 1000) return a[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' ' + inWords(n % 100) : '');
        return inWords(Math.floor(n / 1000)) + ' thousand' + (n % 1000 ? ' ' + inWords(n % 1000) : '');
    };

    return num === 0 ? 'zero' : inWords(num);
};

const CreatePackage = () => {
    const [packageTrackingNumber, setPackageTrackingNumber] = useState([]);
    const [bookingInfo, setBookingInfo] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [deliveryOption, setDeliveryOption] = useState('');
    const [amount, setAmount] = useState('');
    const [amountError, setAmountError] = useState('');
    const [paymentOption, setPaymentOption] = useState('');
    const [cod, setCod] = useState(null); // New state for cod value

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleSelectChange = (event) => {
        setDeliveryOption(event.target.value);
    };

    const handlePaymentOptionChange = (event) => {
        setPaymentOption(event.target.value);
    };

    const generateTrackingNumber = () => {
        const characters = '0123456789';
        let trackingNumber = '';
        for (let i = 0; i < 10; i++) {
            trackingNumber += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return trackingNumber;
    };

    useEffect(() => {
        // Set initial tracking number when component mounts
        setPackageTrackingNumber({
            trackingNumber: generateTrackingNumber()
        });
    }, []);

    useEffect(() => {
        if (amount) {
            let calculatedCod;
            if (parseInt(amount) <= 1000) {
                calculatedCod = parseInt(amount) * 0.1 + parseInt(amount); // 10% of the amount
            } else {
                calculatedCod = parseInt(amount) * 0.15 + parseInt(amount); // 15% of the amount
            }
            setCod(calculatedCod);
        } else {
            setCod(null);
        }
    }, [amount]);

    const update = 'Processing';

    const handleAmountChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setAmount(value);
            setAmountError('');
        } else {
            setAmountError('Please enter a valid number');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const senderName = form.senderName.value;
        const recipientName = form.recipientName.value;
        const senderMobile = form.senderMobile.value;
        const recipientMobile = form.recipientMobile.value;
        const productDetails = form.productDetails.value;
        const qty = form.qty.value;
        const origin = form.origin.value;
        const destination = form.destination.value;
        const booking = form.booking.value;

        const wordAmount = numberToWords(parseInt(amount));

        const packageData = {
            packageTrackingNumber: packageTrackingNumber.trackingNumber,
            senderName,
            senderMobile,
            recipientName,
            recipientMobile,
            productDetails,
            qty,
            origin,
            destination,
            amount,
            wordAmount,
            booking,
            update,
            cod,
            deliveryOption,
            paymentOption
        };

        setBookingInfo(packageData);
        setIsOpen(true);
        try {
            const response = await addPackage(packageData);
            console.log('Package created:', response);
            toast.success("Package Added!");
        } catch (error) {
            toast.error(error.message);
        }

        form.reset();
        setAmount(''); // Reset amount
    };

    const formRef = useRef();

    return (
        <div>
            <div className="flex justify-center">
                <img className="h-[50%]" src="https://t4.ftcdn.net/jpg/07/39/32/99/360_F_739329921_05Swu26SxilYCQOPqlWQ8WcPiw4gcm9S.jpg" alt="" />
            </div>
            <h1 className="text-2xl font-bold font-rancho text-secondary text-center mb-5">Create Package</h1>
            <hr />

            <form onSubmit={handleSubmit} ref={formRef}>
                <div className='md:flex md:px-24'>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text font-rancho text-xl">Sender Name</span>
                        </label>
                        <input type="text" placeholder="Enter Sender name" className="input input-bordered" name='senderName' required />
                    </div>
                    <div className="form-control md:ml-4 md:w-1/2">
                        <label className="label">
                            <span className="label-text font-rancho text-xl">Recipient Name</span>
                        </label>
                        <input type="text" placeholder="Enter Recipient name" className="input input-bordered" name='recipientName' required />
                    </div>
                </div>

                {/* Sender email and receiver contact number */}
                <div className='md:flex md:px-24'>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text font-rancho text-xl">Sender Mobile</span>
                        </label>
                        <input type="text" placeholder="Enter Sender Mobile Number" className="input input-bordered" name='senderMobile' required />
                    </div>
                    <div className="form-control md:ml-4 md:w-1/2">
                        <label className="label">
                            <span className="label-text font-rancho text-xl">Recipient Mobile Number</span>
                        </label>
                        <input type="text" placeholder="Enter Recipient Mobile Number" className="input input-bordered" name='recipientMobile' required />
                    </div>
                </div>
                {/* Product Details and quantity */}
                <div className='md:flex md:px-24'>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text font-rancho text-xl">Product Details</span>
                        </label>
                        <input type="text" placeholder="Enter Product Details" className="input input-bordered" name='productDetails' required />
                    </div>
                    <div className="form-control md:ml-4 md:w-1/2">
                        <label className="label">
                            <span className="label-text font-rancho text-xl">Product Quantity</span>
                        </label>
                        <input type="text" placeholder="Enter Product Quantity" className="input input-bordered" name='qty' required />
                    </div>
                </div>

                <div className='md:flex md:px-24'>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text font-rancho text-xl">Origin</span>
                        </label>
                        <input type="text" placeholder="Enter Origin" className="input input-bordered" name='origin' required />
                    </div>
                    <div className="form-control md:ml-4 md:w-1/2">
                        <label className="label">
                            <span className="label-text font-rancho text-xl">Destination</span>
                        </label>
                        <input type="text" placeholder="Enter Destination" className="input input-bordered" name='destination' required />
                    </div>
                </div>
                <div className='md:flex md:px-24'>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text font-rancho text-xl">Booking Date</span>
                        </label>
                        <input type="date" placeholder="Enter Booking Date" className="input input-bordered" name='booking' required />
                    </div>
                    <div className="form-control md:ml-4 md:w-1/2">
                        <label className="label">
                            <span className="label-text font-rancho text-xl">Enter Amount</span>
                        </label>
                        <input type="text" placeholder="Enter Amount" className="input input-bordered" name='amount' value={amount} onChange={handleAmountChange} required />
                        {amountError && <p className="text-red-500">{amountError}</p>}
                    </div>
                </div>
                <div className='md:flex md:px-24 mt-5 gap-5 mb-5'>
                    <div className="form-control md:w-1/2">
                        <select onChange={handleSelectChange} className="select select-bordered text-xl w-full ">
                            <option disabled selected>Pick Up System</option>
                            <option>Office Delivery</option>
                            <option>Home Delivery</option>
                            <option>Credit Delivery</option>
                        </select>
                    </div>
                    <div className="form-control md:w-1/2">
                        <select onChange={handlePaymentOptionChange} className="select select-bordered text-xl w-full ">
                            <option disabled selected>Payment Option</option>
                            <option>Cash</option>
                            <option>To Pay</option>
                        </select>
                    </div>
                </div>

                <div className='md:px-24 mt-5 mb-5'>
                    <p>Condition + charge : {cod}</p>
                </div>

                <div className="form-control md:px-24 w-full">
                    <input className='btn mt-3 w-full mx-auto border-2 border-primary text-xl text-white hover:bg-primary bg-secondary' type="submit" value="Create Package" />
                </div>
            </form>

            <PrintModal closeModal={closeModal} isOpen={isOpen} bookingInfo={bookingInfo} />
        </div>
    );
};

export default CreatePackage;
