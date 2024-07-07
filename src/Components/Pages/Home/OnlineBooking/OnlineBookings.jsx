import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import BookingModal from "../../../../Modal/BookingModal";

const OnlineBookings = () => {
    const [packageTrackingNumber, setPackageTrackingNumber] = useState({});
    const [weight, setWeight] = useState('');
    const [price, setPrice] = useState(0);
    const [bookingInfo, setBookingInfo] = useState(null);
    let [isOpen, setIsOpen] = useState(false)
    const { user } = useAuth();

    const closeModal = () => {
        setIsOpen(false);
    }

    const generateTrackingNumber = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let trackingNumber = '';
        for (let i = 0; i < 10; i++) {
            trackingNumber += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return trackingNumber;
    };

    useEffect(() => {
        // Set initial tracking number when component mounts
        setPackageTrackingNumber({ trackingNumber: generateTrackingNumber() });
    }, []);

    const update = 'Processing';

    const handleWeightChange = (e) => {
        const weightValue = e.target.value;
        setWeight(weightValue);
        const calculatedPrice = weightValue * 20;
        setPrice(calculatedPrice);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const yourName = form.yourName.value;
        const recipientName = form.recipientName.value;
        const yourEmail = form.yourEmail.value;
        const recipientMobile = form.recipientMobile.value;
        const adress = form.adress.value;
        const destination = form.destination.value;
        const pickup = form.pickup.value;
        const delivery = form.delivery.value;
        const pType = form.pType.value;

        const bookingData = {
            packageTrackingNumber,
            yourName,
            yourEmail,
            recipientName,
            recipientMobile,
            adress,
            destination,
            pickup,
            pType,
            weight,
            delivery,
            update,
            price,
            user
        };

        setBookingInfo(bookingData);

        if (price > 0) {
            setIsOpen(true);
        }

    };


    return (
        <div>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: "url(https://img.freepik.com/free-photo/cool-motorcycle-studio_23-2150781634.jpg?t=st=1719393122~exp=1719396722~hmac=653dc27f7e9621232cfc5f070371993a81dda3790a79bb82af0232ede7909574&w=900)",
                }}>
                <div className=" "></div>
                <div className=" w-full  text-center">
                    <div className="">
                        <form onSubmit={handleSubmit} className="mb-5  mt-5 p-5">
                            <div className='md:flex md:px-24'>
                                <div className="form-control md:w-1/2">
                                    <label className="label">
                                        <span className="label-text text-white font-rancho text-xl">Your Name</span>
                                    </label>
                                    <input type="text" placeholder="Enter Your name" className="input input-bordered" name='yourName' required />
                                </div>
                                <div className="form-control md:ml-4 md:w-1/2">
                                    <label className="label">
                                        <span className="label-text text-white  font-rancho text-xl">Recipient Name</span>
                                    </label>
                                    <input type="text" placeholder="Enter recipient name" className="input input-bordered" name='recipientName' required />
                                </div>
                            </div>

                            <div className='md:flex md:px-24'>
                                <div className="form-control md:w-1/2">
                                    <label className="label">
                                        <span className="label-text text-white font-rancho text-xl">Your Email</span>
                                    </label>
                                    <input type="email" placeholder="Enter Your Email" className="input input-bordered" name='yourEmail' required />
                                </div>
                                <div className="form-control md:ml-4 md:w-1/2">
                                    <label className="label">
                                        <span className="label-text text-white font-rancho text-xl">Recipient Mobile Number</span>
                                    </label>
                                    <input type="text" placeholder="Enter recipient mobile" className="input input-bordered" name='recipientMobile' required />
                                </div>
                            </div>

                            <div className='md:flex md:px-24'>
                                <div className="form-control md:w-1/2">
                                    <label className="label">
                                        <span className="label-text text-white font-rancho text-xl">Product Type</span>
                                    </label>
                                    <input type="text" placeholder="Enter Product Type" className="input input-bordered" name='pType' required />
                                </div>
                                <div className="form-control md:ml-4 md:w-1/2">
                                    <label className="label">
                                        <span className="label-text text-white font-rancho text-xl">Product Weight</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter Product Weight"
                                        className="input input-bordered"
                                        name='weight'
                                        value={weight}
                                        onChange={handleWeightChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className='md:flex md:px-24'>
                                <div className="form-control md:w-1/2">
                                    <label className="label">
                                        <span className="label-text text-white font-rancho text-xl">Your Address</span>
                                    </label>
                                    <input type="text" placeholder="Enter Your address" className="input input-bordered" name='adress' required />
                                </div>
                                <div className="form-control md:ml-4 md:w-1/2">
                                    <label className="label">
                                        <span className="label-text text-white font-rancho text-xl">Destination</span>
                                    </label>
                                    <input type="text" placeholder="Enter Destination" className="input input-bordered" name='destination' required />
                                </div>
                            </div>

                            <div className='md:flex md:px-24'>
                                <div className="form-control md:w-1/2">
                                    <label className="label">
                                        <span className="label-text text-white font-rancho text-xl">Delivery Date</span>
                                    </label>
                                    <input type="date" placeholder="Enter Delivery Date" className="input input-bordered" name='delivery' required />
                                </div>
                                <div className="form-control md:ml-4 md:w-1/2">
                                    <label className="label">
                                        <span className="label-text text-white font-rancho text-xl">Pickup Date</span>
                                    </label>
                                    <input type="date" placeholder="Enter Pickup Date" className="input input-bordered" name='pickup' required />
                                </div>
                            </div>

                            <div className="form-control md:px-24 w-full">
                                <input className='btn mt-3 w-full mx-auto border-2 border-primary text-xl text-white hover:bg-primary bg-secondary' type="submit" value="Booked Package" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <BookingModal closeModal={closeModal} isOpen={isOpen} bookingInfo={bookingInfo} />

        </div>
    );
};

export default OnlineBookings;
