import { useRef, useEffect, useState } from "react";
import { addPackage } from "../../../../api/package";
import toast from "react-hot-toast";
import PrintModal from "./PrintModal";
import useUsersData from "../../../../hooks/useUsersData/useUsersData";
import axiosSecure from "../../../../api/axiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseStaffVerify from "../../../../hooks/UseStaffVerify/UseStaffVerify";





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
    const [DeptOption, setDeptOption] = useState('');
    const [cod, setCod] = useState(null); // New state for cod value
    const [condition, setCondition] = useState('')
    const [balance, setBalance] = useState(20000); // Initial branch balance
    const [isBookingDisabled, setIsBookingDisabled] = useState(false);
    const [CnNumber, SetCnNumber] = useState("");
    const [verifiedStaff] = UseStaffVerify();
    const [weightCharge, setWeightCharge] = useState(0);
    const [weight, setWeight] = useState("");
    const [selectedDivision, setSelectedDivision] = useState('');
    
    const [userModified, setUserModified] = useState(false);
    
    // Update weightCharge effect
    useEffect(() => {
        // ... existing weight charge calculation ...
        if (!userModified) {
            setAmount(weightCharge);
        }
    }, [weightCharge, userModified]);
    
    // Amount handler
    const handleAmountChange = (e) => {
        const value = e.target.value;
        setUserModified(true);
        
        if (/^\d*$/.test(value)) {
            setAmount(value);
            setAmountError(value >= 100 ? '' : 'Amount must be ≥100 TK');
        } else {
            setAmountError('Numbers only');
        }
    };
// Add this handler function with your other handlers
const handleDivisionChange = (e) => {
    setSelectedDivision(e.target.value);
};
    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) { 
            setWeight(value);
        }
    };
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [filteredAreas, setFilteredAreas] = useState([]);
    const [allDistricts, setAllDistricts] = useState([]);
    const [allAreas, setAllAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState("");

    const [verifiedUser] = useUsersData()
    const queryClient = useQueryClient();
    // Amount 
    const { data: Branch_Balance = [] } = useQuery({
        queryKey: ['Branch_Balance', verifiedUser?.email],
        enabled: !!verifiedUser?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/recharge/taka/${verifiedUser?.email}`);
            return res.data;
        }
    })
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
    const handlePaymentOptionChange_dept = (event) => {
        setDeptOption(event.target.value);
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

    // useEffect(() => {
    //     if (condition && parseInt(condition) !== 0) {
    //         const conditionValue = parseInt(condition);
    //         let calculatedCod = 0;

    //         if (conditionValue <= 1000) {
    //             calculatedCod = conditionValue + 20;
    //         } else {
    //             const first1000Cod = 20;
    //             const remaining = conditionValue - 1000;


    //             const Extra1000 = Math.ceil(remaining / 1000);
    //             const extraCod = Extra1000 * 10;
    //             calculatedCod = conditionValue + first1000Cod + extraCod;
    //         }

    //         setCod(calculatedCod);
    //     } else {
    //         setCod(null);
    //     }
    // }, [condition]);
    const [conditionCharge, setConditionCharge] = useState(0);

    // Calculate condition charge based on condition value
    useEffect(() => {
        const conditionValue = parseInt(condition) || 0;
        let calculatedConditionCharge = 0;
    
        if (conditionValue > 0) {
            if (conditionValue <= 1000) {
                calculatedConditionCharge = 20;
            } else {
                const remaining = conditionValue - 1000;
                const extraChunks = Math.ceil(remaining / 1000);
                calculatedConditionCharge = 20 + (extraChunks * 10);
            }
        }
    
        setConditionCharge(calculatedConditionCharge);
    }, [condition]);
    
    // Calculate weight charge based on delivery option and weight
    useEffect(() => {
        const weightValue = parseFloat(weight) || 0;
        let calculatedWeightCharge = 0;
        
        if (weightValue > 0) {
            // Define division-based rates
            const divisionRates = {
                'Barisal': { home: 45, office: 45 },
                'Chattogram': { home: 50, office: 50 },
                'Dhaka': { home: 20, office: 20 },
                'Rangpur': { home: 25, office: 25 },
                'Rajshahi': { home: 15, office: 15 },
                'default': { home: 20, office: 20 }
            };
    
            // Get rate for selected division or default
            const rate = divisionRates[selectedDivision] || divisionRates.default;
    
            if (deliveryOption === 'Home Delivery') {
                if (weightValue <= 1) {
                    calculatedWeightCharge = 150;
                } else {
                    const remainingWeight = weightValue - 1;
                    const remainingCeil = Math.ceil(remainingWeight);
                    calculatedWeightCharge = 150 + (remainingCeil * rate.home);
                }
            } 
            else if (deliveryOption === 'Office Delivery') {
                calculatedWeightCharge = Math.ceil(weightValue) * rate.office;
            }
        }
    
        setWeightCharge(calculatedWeightCharge);
    }, [deliveryOption, weight, selectedDivision]);
    
    // Calculate total COD
    useEffect(() => {
        const conditionValue = parseInt(condition) || 0;
        const totalCod = conditionValue + conditionCharge;
        setCod(totalCod);
    }, [condition, conditionCharge]) 

    const update = 'Processing';

    // const handleAmountChange = (e) => {
    //     const value = e.target.value;
    //     if (/^\d*$/.test(value)) {
    //         setAmount(value);
    //         setAmountError('');
    //     } else {
    //         setAmountError('Please enter a valid number');
    //     }
    // };
    const handleConditionChange = (e) => {
        setCondition(e.target.value);
    };

    
    useEffect(() => {
        fetch('/districts.json')
            .then(res => res.json())
            .then(data => setAllDistricts(data))
    }, [])

    useEffect(() => {
        fetch('/areas.json')
            .then(res => res.json())
            .then(data => setAllAreas(data))
    }, [])
    const getDistrictName = (id) => {
        const district = allDistricts.find(district => district.id === id);
        return district ? district.name : "";
    };

    useEffect(() => {
        if (selectedDistrict) {
            setFilteredAreas(allAreas.filter(area => area.district_id === selectedDistrict));
        } else {
            setFilteredAreas([]);
        }
    }, [selectedDistrict]);

    useEffect(() => {

        const fetchOnlineCnNumber = async () => {
            try {
                const res = await axiosSecure.get("/number");
                if (res.data && res.data?.length > 0 && res.data[0].Online_CnNumber) {
                    SetCnNumber(res.data[0].Online_CnNumber)
                } else {
                    console.error("Error", res.data)
                }

            } catch (error) {
                console.error("Error Fetching CN Number", error)
            }
        }
        fetchOnlineCnNumber();
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (parseFloat(amount) < 100) {
            setAmountError("Value must be greater than or equal to 100");
            toast.error("Amount must be at least 100!");
            return;
        }
    
        const form = e.target;
        const districtName = getDistrictName(selectedDistrict);
        const senderName = form.senderName.value;
        const recipientName = form.recipientName.value;
        const senderMobile = form.senderMobile.value;
        const sender_Full_Adress = form.senderFullAdress.value;
        const Receiver_Full_Adress = form.ReceiverFullAdress.value;
        const recipientMobile = form.recipientMobile.value;
        const productDetails = form.productDetails.value;
        const qty = form.qty.value;
        const weight_kg = parseFloat(form.weight.value) || "";
        const condition = form.condition.value;
        const Post_Code = form.postCode.value;
        const wordAmount = numberToWords(parseInt(cod));
        const bookingTimestamp = new Date();
        const BookingAmoutEdit = form.amount.value;
    
        try {
             if (!Array.isArray(Branch_Balance) || Branch_Balance.length === 0) {
                    Swal.fire({
                      icon: "error",
                      title: "Error",
                      text: "Branch balance data is not available. Please reload the page.",
                    });
                    return;
                  }
            const CurrentBalance = Branch_Balance.length > 0 ? parseFloat(Branch_Balance[0].Amount || 0) : 0;
            const CodAmount = parseFloat(weightCharge || 0);
    
            if (paymentOption === "Cash") {
                const newBalance = CurrentBalance - CodAmount;
    
                if (CodAmount > CurrentBalance) {
                    Swal.fire({
                        icon: "error",
                        title: "Insufficient Balance",
                        text: "You do not have enough balance to process this booking. Please recharge.",
                    });
                    return;
                }
    
                const updateBalanceResponse = await axiosSecure.put(
                    `/update-branch-balance/taka/poisa/${verifiedUser?.email}`,
                    { newBalance }
                );
    
                if (updateBalanceResponse.status !== 200) {
                    throw new Error("Failed to update branch balance.");
                }
    
                queryClient.invalidateQueries(["Branch_Balance", verifiedUser?.email]);
            }
    
            const packageData = {
                packageTrackingNumber: CnNumber,
                senderName,
                senderMobile,
                recipientName,
                recipientMobile,
                productDetails,
                qty,
                Dept:DeptOption,
                weight_kg,
                Post_Code,
                selectedArea,
                amount:parseFloat(amount),
                wordAmount,
                booking: bookingTimestamp,
                update,
                District_ID:selectedDistrict,
                conditionCharge: parseFloat(cod),
                deliveryOption,
                paymentOption,
                condition,
                Receiver_Full_Adress,
                sender_Full_Adress,
                CnNumber: CnNumber,
                districtName: districtName,
                email: verifiedUser?.email,
                Branch_Name:verifiedUser?.name,
                Branch_Number:verifiedUser?.Branch_Number,
                Branch_Address:verifiedUser?.Branch_Address,
                Branch_District_Name:verifiedUser?.Branch_District_Name,
                Branch_Area:verifiedUser?.Branch_Area,
                Booking_Staff_Name:verifiedStaff?.Staff_Name,
        Booking_Staff_ID:verifiedStaff?.Staff_User_ID,
        Booking_Staff_Post:verifiedStaff?.Staff_post,
        Booking_Staff_Number:verifiedStaff?.Staff_Contact_Number,
            };
    
            setBookingInfo(packageData);
            setIsOpen(true);
    
            const response = await addPackage(packageData);
            //  console.log("packageData",packageData)
            if (response?.insertedId) {
                const cnUpdateResponse = await axiosSecure.put("/Online/CnNmber");
                SetCnNumber(cnUpdateResponse.data.nextNumber);
    
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Parcel Added Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                toast.success("Package Added!");
            }
        } catch (error) {
            console.error("Error:", error.message);
            const errorMessage = 
    error.response?.data?.error ||
    error.response?.data?.message ||
    error.message ||
    "An error occurred while creating the package.";
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: 'Maybe CN Same Please Refresh.....',
                showConfirmButton: false,
                timer: 3000,
              });
              setIsOpen(false);
        }
    
        form.reset();
        setAmount('');
    };
    const fetchUserData = async (senderMobile) => {
        try {
            const response = await axiosSecure.get(`packagfhguieormbncdmnn44ge/sender/${senderMobile}`);
            if (response.data) {
                const { senderName, sender_Full_Adress } = response.data;
                formRef.current.senderName.value = senderName;
                formRef.current.senderFullAdress.value = sender_Full_Adress;
            } else {
                toast.error("User not found!");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error("Failed to fetch user data.");
        }
    };
    
    const handleSenderMobileChange = (e) => {
        const senderMobile = e.target.value;
        if (senderMobile.length === 11) { 
            fetchUserData(senderMobile);
        }
    };
    const fetchUserDataReceiver = async (recipientMobile) => {
        try {
            const response = await axiosSecure.get(`/packagfhguieormbncdmnn44ge/sender/receiver/${recipientMobile}`);
            if (response.data) {
                const { recipientName, Receiver_Full_Adress } = response.data;
                formRef.current.recipientName.value = recipientName;
                formRef.current.ReceiverFullAdress.value = Receiver_Full_Adress;
            } else {
                toast.error("User not found!");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error("Failed to fetch user data.");
        }
    };
    
    const handleReceiverMobileChange = (e) => {
        const recipientMobile = e.target.value;
        if (recipientMobile.length === 11) { 
            fetchUserDataReceiver(recipientMobile);
        }
    };
    



    const formRef = useRef();

    return (
        <div>
            <div className="flex justify-center">
                <img className="h-[50%]" src="https://t4.ftcdn.net/jpg/07/39/32/99/360_F_739329921_05Swu26SxilYCQOPqlWQ8WcPiw4gcm9S.jpg" alt="" />
            </div>
            <div>
                <h1 className="text-2xl font-bold font-rancho text-secondary text-center mb-5">Create Package</h1>
                {/* <h1 className="text-2xl font-bold font-rancho text-secondary text-center mb-5">Branch Balance: {balance}</h1> */}
            </div>
            <hr />

            <form onSubmit={handleSubmit} ref={formRef}>
                <div className='md:flex md:px-24'>

                <div className="form-control md:mr-4 md:w-1/2">
    <label className="label">
        <span className="label-text font-rancho text-xl">Sender Mobile</span>
    </label>
    <input type="text" placeholder="Enter Sender Mobile Number" className="input input-bordered" name='senderMobile'
    onChange={handleSenderMobileChange}
    required />
</div>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text font-rancho text-xl">Sender Name</span>
                        </label>
                        <input type="text" placeholder="Enter Sender name" className="input input-bordered" name='senderName' required />
                    </div>
                </div>
                <div className="md:flex gap-5 md:px-24">
                <div className="form-control md:w-1/2  mt-1">
                    <label className="label">
                        <span className="label-text font-rancho text-xl">Sender Full Address</span>
                    </label>
                    <input type="text" placeholder="Enter Sender Address" className="input input-bordered" name='senderFullAdress' required />
                </div>
                {/* <div className="form-control md:w-1/2 mt-1">
            <label className="label">
                <span className="label-text font-rancho text-xl">Enter Kg*</span>
            </label>
            <input
                type="text"
                className="input input-bordered"
                name="weight"
                value={weight}
                onChange={handleChange}
                required
                placeholder="Enter weight in kg"
            />
        </div> */}
        <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text font-rancho text-xl">Condition Amount</span>
                        </label>
                        <input
                            value={condition}
                            onChange={handleConditionChange}
                            type="text" placeholder="Enter Condition Amount" className="input input-bordered" name='condition'  />
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
                        <label className="block text-gray-700 font-medium mb-1 text-xl mt-1 ml-1">
                            Districts*
                        </label>
                        <select
                            className={`select select-bordered w-full p-2 rounded-lg border`}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            name="district"
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
                        <label className="block text-gray-700 font-medium mb-1 text-xl mt-1">
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
                            <span className="label-text font-rancho text-xl">Receiver Mobile Number</span>
                        </label>
                        <input type="text" placeholder="Enter Recipient Mobile Number" className="input input-bordered" name='recipientMobile'
                        onChange={handleReceiverMobileChange}
                        required />

                    </div>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text font-rancho text-xl">Receiver Name</span>
                        </label>
                        <input type="text" placeholder="Enter Recipient name" className="input input-bordered" name='recipientName' required />
                    </div>

                </div>
                <div className="md:flex md:px-24 gap-5">
                <div className="form-control md:w-full  mt-1">
                    <label className="label">
                        <span className="label-text font-rancho text-xl">Receiver Full Address</span>
                    </label>
                    <input type="text" placeholder="Enter Receiver Full Address" className="input input-bordered" name='ReceiverFullAdress' required />
                </div>
                <div className="form-control md:w-full mt-1">
    <label className="label">
        <span className="label-text font-rancho text-xl">Select Division*</span>
    </label>
    <select 
        className="select select-bordered" 
        name="division" 
        value={selectedDivision}
        onChange={handleDivisionChange} 
        required
    >
        <option value="" disabled>Select a Division</option>
        <option value="Barisal">Barisal</option>
        <option value="Chattogram">Chattogram</option>
        <option value="Dhaka">Dhaka</option>
        <option value="Khulna">Khulna</option>
        <option value="Mymensingh">Mymensingh</option>
        <option value="Rajshahi">Rajshahi</option>
        <option value="Rangpur">Rangpur</option>
        <option value="Sylhet">Sylhet</option>
    </select>
</div>
                </div>
                <div className='md:flex md:px-24'>
                    {/* <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text font-rancho text-xl">Condition Amount</span>
                        </label>
                        <input
                            value={condition}
                            onChange={handleConditionChange}
                            type="text" placeholder="Enter Condition Amount" className="input input-bordered" name='condition' required />
                    </div> */}
                    <div className="form-control md:w-1/2 mt-1">
            <label className="label">
                <span className="label-text font-rancho text-xl">Enter Kg*</span>
            </label>
            <input
                type="text"
                className="input input-bordered"
                name="weight"
                value={weight}
                onChange={handleChange}
                required
                placeholder="Enter weight in kg"
            />
        </div>
        <div className="form-control md:ml-4 md:w-1/2">
    <label className="label">
        <span className="label-text font-rancho text-xl">Booking Amount (TK)</span>
    </label>
    <input 
        type="number" 
        placeholder="Enter Amount" 
        className="input input-bordered" 
        name='amount' 
        value={amount || weightCharge} 
        onChange={handleAmountChange}
        min="100"
        required 
    />
    {amountError && (
        <p className="text-red-500 mt-1">{amountError}</p>
    )}
    {!amountError && amount < 100 && (
        <p className="text-yellow-500 mt-1">Minimum amount: 100 TK</p>
    )}
</div>
                </div>
                <div className='md:flex md:px-24 mt-5 gap-5 mb-2'>
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
                <div className="md:flex gap-5 md:px-24">
                <div className="form-control md:w-1/2 ">
                    <label className="label">
                        <span className="label-text font-rancho text-xl">Post Code*</span>
                    </label>
                    <input type="text" placeholder="Enter Post or Union Code" className="input input-bordered" name='postCode' required />
                </div>
                <div className="form-control md:w-1/2">
                <label className="label">
                        <span className="label-text font-rancho text-xl">Select Department*</span>
                    </label>
                        <select onChange={handlePaymentOptionChange_dept} className="select select-bordered text-xl w-full ">
                            <option disabled selected>Select Department</option>
                            <option value="Document">Document</option>
                            <option value="Parcel">Parcel</option>
                            <option value="Food item">Food item</option>
                            <option value="Mobile">Mobile</option>
                            <option value="Laptop">Laptop</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Home/Office Accessories">Home/Office Accessories</option>
                        </select>
                    </div>
                </div>

                <div className="flex md:px-24 mt-5 mb-5 justify-between">
                    <div className=''>
                    <p className="text-xl">
            Condition + Charge  = Total COD: {cod || 0} TK
        </p>
                    </div>
                    <div>
                        <p className="text-xl text-blue-400">CnNumber: {CnNumber}</p>
                    </div>
                </div>

                <div className="form-control md:px-24 w-full">
                    <input className='btn mt-3 w-full mx-auto border-2 border-primary text-xl text-white hover:bg-primary bg-secondary' type="submit" value="Booking Now" disabled={isBookingDisabled} />
                    {isBookingDisabled && <p className="text-red-500 mt-2">Insufficient balance for Cash payment</p>}
                </div>
                
            </form>

            <PrintModal closeModal={closeModal} isOpen={isOpen} bookingInfo={bookingInfo} />



        </div>
    );
};

export default CreatePackage;
