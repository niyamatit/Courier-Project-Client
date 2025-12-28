/* eslint-disable no-unused-vars */
import { useRef, useEffect, useState } from "react";
import {  addPackage } from "../../../../api/package";
import toast from "react-hot-toast";
import PrintModal from "./PrintModal";
import useUsersData from "../../../../hooks/useUsersData/useUsersData";
import axiosSecure from "../../../../api/axiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseStaffVerify from "../../../../hooks/UseStaffVerify/UseStaffVerify";
import { useNavigate } from "react-router-dom";
import axios from "axios";





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

const OnlineBooking_Merchant = () => {
    const [packageTrackingNumber, setPackageTrackingNumber] = useState([]);
    const naviGate = useNavigate();
    const [bookingInfo, setBookingInfo] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [deliveryOption, setDeliveryOption] = useState('');
    const [amount, setAmount] = useState('');
    const [amountError, setAmountError] = useState('');
    const [paymentOption, setPaymentOption] = useState('');
    const [cod, setCod] = useState(null);
    const [condition, setCondition] = useState('')
    const [balance, setBalance] = useState(20000); 
    const [isBookingDisabled, setIsBookingDisabled] = useState(false);
    const [CnNumber, SetCnNumber] = useState("");
    const [verifiedStaff] = UseStaffVerify();
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [filteredAreas, setFilteredAreas] = useState([]);
    const [allDistricts, setAllDistricts] = useState([]);
    const [allAreas, setAllAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState("");
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
          const res = await axiosSecure.get("/shfjksdhfjdjkfhxnbcnbc67437gch");
          return res.data;
        }
      })
      const [verifiedUser] = useUsersData();
    
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
        if (condition && parseInt(condition) !== 0) {
            const conditionValue = parseInt(condition);
            let calculatedCod = 0;

            if (conditionValue <= 1000) {
                calculatedCod = conditionValue + 20;
            } else {
                const first1000Cod = 20;
                const remaining = conditionValue - 1000;


                const Extra1000 = Math.ceil(remaining / 1000);
                const extraCod = Extra1000 * 10;
                calculatedCod = conditionValue + first1000Cod + extraCod;
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
    }, [selectedDistrict,allAreas]);

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
const [senderInfo, setSenderInfo] = useState({
  senderName: "",
  senderMobile: "",
  senderFullAdress: ""
});

    const [selectedMerchant, setSelectedMerchant] = useState("");

   const handleMerchantChange = (event) => {
  const selectedMerchantEmail = event.target.value;

  const merchant = users.find(user => user.email === selectedMerchantEmail);

  if (!merchant) return;

  setSelectedMerchant(selectedMerchantEmail);

  setSearchQuery(`${merchant.name} (Merchant ID: ${merchant.merchantID})`);

  setSenderInfo({
    senderName: merchant.name || "",
    senderMobile: merchant.email || "", 
    senderFullAdress: merchant.Merchant_Area || ""
  });
};



    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (parseFloat(amount) < 80) {
            setAmountError("Value must be greater than or equal to 80");
            toast.error("Amount must be at least 80!");
            return;
        }
    
        const form = e.target;
        const districtName = getDistrictName(selectedDistrict);
        const senderName = form.senderName.value;
        const Merchant_ID = selectedMerchant;
        const recipientName = form.recipientName.value;
        const senderMobile = form.senderMobile.value;
        const sender_Full_Adress = form.senderFullAdress.value;
        const Receiver_Full_Adress = form.ReceiverFullAdress.value;
        const recipientMobile = form.recipientMobile.value;
        const productDetails = form.productDetails.value;
        const qty = form.qty.value;
        const condition = form.condition.value;
        const wordAmount = numberToWords(parseInt(amount));
        const bookingTimestamp = new Date();
    
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
            const CodAmount = parseFloat(amount || 0);
    
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
                selectedArea,
                amount,
                wordAmount,
                Merchant_ID,
                booking: bookingTimestamp,
                update,
                conditionCharge: cod,
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
            setTimeout(() => {
  naviGate('/dashboard/booking-info');
}, 2000);

            
            const response = await addPackage(packageData);
    
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

                // -------------------------Send SMS-----------------
                const SMS_API = "https://bulksmsbd.net/api/smsapi";
                const API_KEY = "VSkytluAnQbG0vsCEbHQ";
                const SENDER_ID = "8809617624950";
                
                // Build message
              
                // const senderMessage = `Your  booking is confirmed! CN Number: ${Bookinginfo.CnNumber}`;
                const receiverMessage = `Your Parcel ${verifiedUser?.name} Booking (Trac: ${CnNumber}) is Successful.
                Thanks Niyamat Express
                For Tracking visit: https://www.niyamatexpress.com/tracking 
                `;
                // const receiverMessage = `Hello ${Bookinginfo.receiverName}, Your Parcel : ${bookingInfo?.product}, Your parcel booking (CN: ${Bookinginfo.CnNumber}) is successful.`;
                
                // Build URLs
              
                const receiverUrl = `${SMS_API}?api_key=${API_KEY}&type=text&number=${Number(recipientMobile)}&senderid=${SENDER_ID}&message=${encodeURIComponent(receiverMessage)}`;
                      const [senderRes, receiverRes] = await Promise.all([
                    
                    axios.get(receiverUrl)
                  ]);    
                
                
                const MessageInfo = {
                   
                    receiverMessage:receiverMessage || '',
                    SMS_Staus: {
                      Sender:  senderRes?.data || '' || {} ,
                        Receiver: receiverRes?.data  || 'N/A', 
                    },
                    senderMobile: senderMobile || 'N/A',
                    recipientMobile: recipientMobile || 'N/A',
                    CnNumber: CnNumber,
                    Purpuse: "Merchant Online Booking",
                    Branch_Email: verifiedUser?.email,
                    Branch_Name: verifiedUser?.name,
                    date : new Date().toISOString(),
                }
                const SMSResponse = await axiosSecure.post("/sms", MessageInfo);
            }
        } catch (error) {
            console.error("Error:", error.message);
            const errorMessage = 
                error.response?.data?.error ||
                error.response?.data?.message ||
                error.message ||
                "An error occurred while creating the package.";
        
            if (error.response?.status === 409) {  
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: 'Duplicate CN! Refreshing...',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    window.location.reload();
                });
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: errorMessage,
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        
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
    
console.log(selectedMerchant,"Selected Merchant");

    const formRef = useRef();

    return (
        <div>
            <div className="flex justify-center">
                <img className="h-[50%]" src="https://t4.ftcdn.net/jpg/07/39/32/99/360_F_739329921_05Swu26SxilYCQOPqlWQ8WcPiw4gcm9S.jpg" alt="" />
            </div>
            <div>
                <h1 className="text-2xl font-bold font-rancho text-secondary text-center mb-5">Merchant Online Booking</h1>
               
            </div>
            <hr />

             <form onSubmit={handleSubmit} ref={formRef}>
             <div className="form-control md:px-24 md:w-full">
  <label className="label">
    <span className="label-text font-rancho text-xl">Select Merchant ID*</span>
  </label>
  
  <div className="relative">
    <input
      type="text"
      placeholder="Search merchant..."
      className="input input-bordered w-full"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onClick={() => setIsDropdownOpen(true)}
    />
    
    {isDropdownOpen && (
      <div className="absolute top-14 left-0 right-0 z-10 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
        {users
          .filter((user) => {
            const searchTerm = searchQuery.toLowerCase();
            return (
              user?.role === "merchant" &&
              (user?.name?.toLowerCase().includes(searchTerm) ||
               user?.merchantID?.toLowerCase().includes(searchTerm))
            );
          })
          .map((user) => (
            <div
              key={user._id}
              className="p-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                handleMerchantChange({ target: { value: user?.email } });
                setSearchQuery(`${user?.name} (Merchant ID: ${user?.merchantID})`);
                setIsDropdownOpen(false);
              }}
            >
              {`${user?.name || "No Name Found"} (Merchant ID: ${user?.merchantID})`}
            </div>
          ))}
      </div>
    )}
  </div>
</div>


         {/* Rest Part */}
                {
                    selectedMerchant ? <>
                    <div className='md:flex md:px-24'>



                   
<div className="form-control md:mr-4 md:w-1/2">
    <label className="label">
        <span className="label-text font-rancho text-xl">Sender Mobile/ID(Optional)</span>
    </label>
    <input type="text" placeholder="Enter Sender Mobile Number" className="input input-bordered" name='senderMobile'
    value={senderInfo.senderMobile}
  onChange={(e) =>
    setSenderInfo({ ...senderInfo, senderMobile: e.target.value })
  }
     />
</div>
<div className="form-control md:w-1/2">
    <label className="label">
        <span className="label-text font-rancho text-xl">Sender Name(Optional)</span>
    </label>
    <input type="text" placeholder="Enter Sender name" className="input input-bordered" name='senderName' 
    value={senderInfo.senderName}
  onChange={(e) =>
    setSenderInfo({ ...senderInfo, senderName: e.target.value })
  } />
</div>
</div>
<div className="form-control md:w-full md:px-24 mt-1">
<label className="label">
    <span className="label-text font-rancho text-xl">Sender Full Address(Optional)</span>
</label>
<input type="text" placeholder="Enter Sender Address" className="input input-bordered" name='senderFullAdress'
value={senderInfo.senderFullAdress}
  onChange={(e) =>
    setSenderInfo({ ...senderInfo, senderFullAdress: e.target.value })
  } 
 />
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
<div className="form-control md:w-full md:px-24 mt-1">
<label className="label">
    <span className="label-text font-rancho text-xl">Receiver Full Address</span>
</label>
<input type="text" placeholder="Enter Receiver Full Address" className="input input-bordered" name='ReceiverFullAdress' required />
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

<div className="flex md:px-24 mt-5 mb-5 justify-between">
<div className=''>
    <p className="text-xl">Condition + charge : {cod || 0}</p>
</div>

</div>

<div className="form-control md:px-24 w-full">
<input className='btn mt-3 w-full mx-auto border-2 border-primary text-xl text-white hover:bg-primary bg-secondary' type="submit" value="Booking Now" disabled={isBookingDisabled} />
{isBookingDisabled && <p className="text-red-500 mt-2">Insufficient balance for Cash payment</p>}
</div>
                    </> :
                    <h1 className="text-3xl text-red-600 text-center mt-20">Select Merchant ID First!!!!!</h1>
                }
            </form>

            <PrintModal closeModal={closeModal} isOpen={isOpen} bookingInfo={bookingInfo} />



        </div>
    );
};

export default OnlineBooking_Merchant;
