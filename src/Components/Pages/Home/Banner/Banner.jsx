import videoBg from '../../../../assets/videoBg1.mp4'
// import videoBg1 from '../../../../assets/videoBg2.mp4'

const Banner = () => {

    return (
        <div className="carousel h-[300px] sm:h-[400px] md:h-[600px] w-full">
            <div id="slide1" className="carousel-item relative w-full">
                <video className="h-full w-full object-cover" src={videoBg} autoPlay loop muted></video>

                <div className="absolute flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)]">
                    <div className='space-y-3 sm:space-y-4 md:space-y-6 ml-4 sm:ml-6 md:ml-12 text-white w-4/5 sm:w-3/4 md:w-2/3'>
                        <h1 className='text-sm sm:text-lg md:text-3xl lg:text-5xl'>Digital and Trusted Transport Logistic Company</h1>
                        <p className="text-xs sm:text-sm md:text-xl">Our Experienced Team of Problem Solvers and a Commitment to always align with our client business goals and objectives.</p>
                        <div>
                            <button className='btn bg-primary text-secondary border-none hover:text-secondary mr-4 text-xs sm:text-sm md:text-base'>See More...</button>
                            <button className="btn text-white hover:text-secondary hover:bg-primary btn-outline text-xs sm:text-sm md:text-base">Join With Us</button>
                        </div>
                    </div>
                </div>

                <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0 gap-4">
                </div>
            </div>
        </div>
    );
};

export default Banner;
