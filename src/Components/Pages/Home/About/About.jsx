import { MdOutlineVerifiedUser } from "react-icons/md";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import axiosSecure from "../../../../api/axiosSecure";

const About = () => {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    // State to track how many reviews are visible
    const [visibleCount, setVisibleCount] = useState(2);

    // Function to toggle visibility
    const toggleVisibility = () => {
        if (visibleCount === 2) {
            // Show all reviews
            setVisibleCount(reviews.length);
        } else {
            // Show only the first 2 reviews
            setVisibleCount(2);
        }
    };

    // const handleReviewSubmit = () => {
    //     if (rating === 0 || comment.trim() === "") {
    //         alert("Please provide a rating and comment.");
    //         return;
    //     }

    //     const newReview = {
    //         rating,
    //         comment,
    //     };

    //     setReviews([newReview, ...reviews]);
    //     setRating(0);
    //     setComment("");
    // };
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axiosSecure.get('/rate');
                setReviews(response.data); // Set reviews from database
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, []);

    const handleReviewSubmit = async () => {
        if (rating === 0 || comment.trim() === "") {
            alert("Please provide a rating and comment.");
            return;
        }

        try {
            const response = await axiosSecure.post('/rate', {
                rating,
                comment,
            });

            if (response.status === 201) {
                setReviews([{ rating, comment }, ...reviews]); // Add review to local state
                setRating(0); // Reset rating
                setComment(""); // Reset comment
                alert("Review submitted successfully!");
            }
        } catch (error) {
            console.error("Error submitting review:", error); // Log the error
            alert("Failed to submit review. Please try again."); // Notify the user
        }
    };

    return (
        <div>

            <div
                className="hero bg-secondary mb-5 min-h-[50vh]"
                style={{
                    backgroundImage: "url(https://transp-nextjs.vercel.app/_next/static/media/banner.416d8a43.png)",
                }}>

                <div className="hero-content font-rancho text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl text-primary font-bold">About Us</h1>
                        <p className="mb-5 text-white">
                            We have been pioneering the industry in Bangladesh for 2 years, and delivering value
                            products within given timeframe, every single time..
                        </p>
                    </div>
                </div>
            </div>

            <div className='font-rancho mb-6 mt-5 bg-[#ffe799]'>
                <div className="lg:flex ">
                    <div className=" p-10 space-y-7 w-full">
                        <h1 className='text-4xl mt-5 font-bold'>Globally Connected by Large Network</h1>
                        <p className='text-lg'>At Logistic Transp, our mission is to provide our clients with exceptional transportation services that meet and exceed their expectations. We aim to be the most reliable, efficient, and cost-effective transportation provider in the industry.</p>

                        <div className='md:flex gap-12'>
                            <div className='flex gap-2'>
                                <div>
                                    <img src="https://transp-nextjs.vercel.app/_next/static/media/chart.e3959339.png" alt="" />
                                </div>
                                <div className='text-lg'>
                                    <h1>Boost your sale</h1>
                                </div>

                            </div>

                            <div className='flex gap-2'>
                                <div>
                                    <img src="https://transp-nextjs.vercel.app/_next/static/media/feature.2caadb1d.png" alt="" />
                                </div>
                                <div>
                                    <h1>Introducing New Features</h1>
                                </div>
                            </div>

                        </div>
                        <h1>The latest design trends meet hand-crafted templates.</h1>
                        <button className='mb-10 h-12 w-[150px]  text-white bg-secondary'>Contact Us</button>
                    </div>


                    <div className="h-full hidden lg:block second w-full clip-custom">
                        <img src="https://transp-nextjs.vercel.app/_next/static/media/img-info-2.a5573693.png" alt="" />
                    </div>
                </div>
            </div>

            <div className="mb-14">

                <div className="md:flex p-10 gap-20 mx-auto  items-center">

                    {/* Pictures Dive */}
                    <div>
                        <img className="h-full w-full" src="https://transp-nextjs.vercel.app/assets/imgs/page/homepage1/img1.png" alt="" />
                    </div>

                    {/* Second Div */}
                    <div className="font-rancho space-y-5">
                        <h1 className="md:text-xl lg:text-4xl font-bold text-secondary">We have established strong relationships with our partners</h1>
                        <p className="lg:text-lg text-[#4f8ebf]">We strive to become pioneers in the field, providing first quality and cost-effective service, and smart solutions to the market. Our 30 years’ experience in the shipping, transport and logistics industry is our strength, which support us to deliver our promises to our customers.</p>

                        <div className="md:flex lg:gap-7">
                            <div>
                                <div className="flex gap-1">
                                    <MdOutlineVerifiedUser className="text-green-600" />
                                    <p>Task tracking</p>
                                </div>

                                <div className="flex gap-1">
                                    <MdOutlineVerifiedUser className="text-green-600" />
                                    <p>Create task dependencies</p>
                                </div>

                                <div className="flex gap-1">
                                    <MdOutlineVerifiedUser className="text-green-600" />
                                    <p>Task visualization</p>
                                </div>
                            </div>

                            <div>
                                <div className="flex gap-1">
                                    <MdOutlineVerifiedUser className="text-green-600" />
                                    <p>hare files, discuss</p>
                                </div>

                                <div className="flex gap-1">
                                    <MdOutlineVerifiedUser className="text-green-600" />
                                    <p>Meet deadlines faster</p>
                                </div>

                                <div className="flex gap-1">
                                    <MdOutlineVerifiedUser className="text-green-600" />
                                    <p>Track time spent on each project</p>
                                </div>

                            </div>
                        </div>

                        <div className="md:flex  gap-7">
                            <div>
                                <img src="https://transp-nextjs.vercel.app/assets/imgs/template/appstore-btn.png" alt="" />
                            </div>
                            <div className="">
                                <img src="https://transp-nextjs.vercel.app/assets/imgs/template/google-play-btn.png" alt="" />
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {/* Review and Rating Section */}
            <div className="bg-[#f8f9fa] p-8 rounded-lg shadow-md mb-10">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Rate & Review</h2>

                {/* Rating and Comment Input */}
                <div className="flex flex-col items-center mb-6">
                    <div className="flex gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                                key={star}
                                className={`cursor-pointer text-3xl ${star <= rating ? "text-yellow-500" : "text-gray-300"
                                    }`}
                                onClick={() => setRating(star)}
                            />
                        ))}
                    </div>
                    <textarea
                        className="w-full md:w-2/3 lg:w-1/2 border p-4 rounded-lg mb-4"
                        rows="3"
                        placeholder="Write your review..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <button
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        onClick={handleReviewSubmit}
                    >
                        Submit Review
                    </button>
                </div>
                {/* Display Reviews */}
                {/* <div className="mt-8">
                    <h3 className="text-2xl font-semibold mb-4 text-blue-600">What People Say</h3>
                    {reviews.length > 0 ? (
                        Array.isArray(reviews) && reviews?.reverse()?.map((review, index) => (
                            <div
                                key={index}
                                className="border p-4 rounded-lg mb-4 bg-white shadow-sm"
                            >
                                <div className="flex items-center mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={`text-lg ${i < review.rating ? "text-yellow-500" : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-700">{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No reviews yet. Be the first to leave one!</p>
                    )}
                </div> */}
                {/* Display Reviews */}
                <div className="mt-8">
                    <h3 className="text-2xl font-semibold mb-4 text-blue-600">What People Say</h3>
                    {reviews.length > 0 ? (
                        Array.isArray(reviews) &&
                        reviews
                            .slice(0, visibleCount) // Slice the reviews array based on visibleCount
                            .map((review, index) => (
                                <div
                                    key={index}
                                    className="border p-4 rounded-lg mb-4 bg-white shadow-sm"
                                >
                                    <div className="flex items-center mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={`text-lg ${i < review.rating ? "text-yellow-500" : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-gray-700">{review.comment}</p>
                                </div>
                            ))
                    ) : (
                        <p className="text-gray-600">No reviews yet. Be the first to leave one!</p>
                    )}
                </div>
                {/* See More / See Less Button */}
                {reviews.length > 2 && (
                    <button
                        onClick={toggleVisibility}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        {visibleCount === 2 ? "See More" : "See Less"}
                    </button>
                )}

            </div>
        </div >
    );
};

export default About;

