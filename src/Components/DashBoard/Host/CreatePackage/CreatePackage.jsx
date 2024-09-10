import { useRef, useEffect, useState } from "react";
import { addPackage } from "../../../../api/package";
import toast from "react-hot-toast";
import PrintModal from "./PrintModal";
import useAuth from "../../../../hooks/useAuth";





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
    const [condition, setCondition] = useState('')
    const [balance, setBalance] = useState(20000); // Initial branch balance
    const [isBookingDisabled, setIsBookingDisabled] = useState(false);


    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [filteredAreas, setFilteredAreas] = useState([]);
    const [allDistricts, setAllDistricts] = useState([]);
    const [allAreas, setAllAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState("");

    const{user} = useAuth()

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleSelectChange = (event) => {
        setDeliveryOption(event.target.value);
    };



     // Balance and Booking Button Logic
    useEffect(() => {
        if (paymentOption === 'Cash' && balance < parseInt(amount)) {
            setIsBookingDisabled(true);
        } else {
            setIsBookingDisabled(false);
        }
    }, [paymentOption, balance, amount]);


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
        if (condition) {
            let calculatedCod;
            if (parseInt(condition) <= 1000) {
                calculatedCod = parseInt(condition) * 0.1 + parseInt(condition); // 10% of the condition
            } else {
                calculatedCod = parseInt(condition) * 0.15 + parseInt(condition); // 15% of the condition
            }
            setCod(calculatedCod);
        } else {
            setCod(null);
        }
    }, [condition]);

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
    const handleConditionChange = (e) => {
        setCondition(e.target.value);
    };


    useEffect(() => {
        fetch('../../../../../public/districts.json')
            .then(res => res.json())
            .then(data => setAllDistricts(data))
    }, [])

    useEffect(() => {
        fetch('../../../../../public/areas.json')
            .then(res => res.json())
            .then(data => setAllAreas(data))
    }, [])

    useEffect(() => {
        if (selectedDistrict) {
            setFilteredAreas(allAreas.filter(area => area.district_id === selectedDistrict));
        } else {
            setFilteredAreas([]);
        }
    }, [selectedDistrict]);

   



    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const senderName = form.senderName.value;
        const recipientName = form.recipientName.value;
        const senderMobile = form.senderMobile.value;
        const recipientMobile = form.recipientMobile.value;
        const productDetails = form.productDetails.value;
        const qty = form.qty.value;
        const condition = form.condition.value;
        const wordAmount = numberToWords(parseInt(amount));
        const bookingTimestamp = new Date().toISOString();

        // Update the balance based on the payment option
        if (paymentOption === 'Cash') {
            setBalance(prevBalance => prevBalance - parseInt(amount));
        } else if (paymentOption === 'To Pay') {
            setBalance(prevBalance => prevBalance + parseInt(amount));
        }

        const packageData = {
            packageTrackingNumber: packageTrackingNumber.trackingNumber,
            senderName,
            senderMobile,
            recipientName,
            recipientMobile,
            productDetails,
            qty,
            selectedDistrict,
            selectedArea,
            amount,
            wordAmount,
            booking: bookingTimestamp,
            update,
            cod,
            deliveryOption,
            paymentOption,
            condition,
            email: user?.email
        };

        setBookingInfo(packageData);
        setIsOpen(true);
        try {
            const response = await addPackage(packageData);
            console.table('Package created:', response);
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
           <div>
           <h1 className="text-2xl font-bold font-rancho text-secondary text-center mb-5">Create Package</h1>
           <h1 className="text-2xl font-bold font-rancho text-secondary text-center mb-5">Branch Balance: {balance}</h1>
           </div>
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
                            <span className="label-text font-rancho text-xl">Sender Mobile</span>
                        </label>
                        <input type="text" placeholder="Enter Sender Mobile Number" className="input input-bordered" name='senderMobile' required />
                    </div>
                </div>

                {/* Sender email and receiver contact number */}
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
                {/* Product Details and quantity */}
                <div className='md:flex gap-5 md:px-24'>
                    <div className="form-control md:w-1/2">
                        <label className="block text-gray-700 font-medium mb-1">
                            Districts*
                        </label>
                        <select
                            className={`select select-bordered w-full p-2 rounded-lg border`}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                        >
                            <option value="">Select District</option>
                            {allDistricts.map((district) => (
                                <option key={district.id} value={district.id}>
                                    {district.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className="block text-gray-700 font-medium mb-1">
                            Area*
                        </label>
                        <select className={`select select-bordered w-full p-2 rounded-lg border`}
                            onChange={(e) => setSelectedArea(e.target.value)}
                        >
                            <option value="">Select Area</option>
                            {filteredAreas.map((area) => (
                                <option key={area.id} value={area.name}>
                                    {area.name}
                                </option>
                            ))}
                        </select>

                    </div>
                </div>

                <div className='md:flex gap-5 md:px-24'>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text font-rancho text-xl">Receiver Name</span>
                        </label>
                        <input type="text" placeholder="Enter Recipient name" className="input input-bordered" name='recipientName' required />
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text font-rancho text-xl">Receiver Mobile Number</span>
                        </label>
                        <input type="text" placeholder="Enter Recipient Mobile Number" className="input input-bordered" name='recipientMobile' required />

                    </div>
                </div>
                <div className='md:flex md:px-24'>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text font-rancho text-xl">Condition Amount</span>
                        </label>
                        <input
                            value={condition}
                            onChange={handleConditionChange}
                            type="text" placeholder="Enter Condition Amount" className="input input-bordered" name='condition' required />
                    </div>
                    <div className="form-control md:ml-4 md:w-1/2">
                        <label className="label">
                            <span className="label-text font-rancho text-xl">Booking Amount</span>
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
                        </select>
                    </div>
                    <div className="form-control md:w-1/2">
                        <select onChange={handlePaymentOptionChange} className="select select-bordered text-xl w-full ">
                            <option disabled selected>Payment Option</option>
                            <option>Cash</option>
                            <option>To Pay</option>
                            <option>Credit</option>
                        </select>
                    </div>
                </div>

                <div className='md:px-24 mt-5 mb-5'>
                    <p>Condition + charge : {cod}</p>
                </div>

                <div className="form-control md:px-24 w-full">
                    <input className='btn mt-3 w-full mx-auto border-2 border-primary text-xl text-white hover:bg-primary bg-secondary' type="submit" value="Booking Now" disabled={isBookingDisabled}/>
                    {isBookingDisabled && <p className="text-red-500 mt-2">Insufficient balance for Cash payment</p>}
                </div>
            </form>

            <PrintModal closeModal={closeModal} isOpen={isOpen} bookingInfo={bookingInfo} />

            

        </div>
    );
};

export default CreatePackage;
