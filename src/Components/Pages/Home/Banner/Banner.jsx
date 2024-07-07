import videoBg from '../../../../assets/videoBg1.mp4'
// import videoBg1 from '../../../../assets/videoBg2.mp4'

const Banner = () => {


    return (
        <div className="carousel  h-[600px] md:h-[600px]  w-full">
       <div id="slide1" className="carousel-item relative w-full">
                    <video className="h-full w-full object-cover" src={videoBg} autoPlay loop muted></video>

                    <div className="absolute  flex items-center h-full left-0 md:top-0  bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)]">

                        <div className='md:space-y-6 ml-12 text-white md:w-2/3'>
                            <h1 className='text-xl md:text-3xl lg:text-5xl '>Digital and Trusted Transport Logistic Company</h1>
                            <p className="md:text-xl">Our Experienced Team of Problem Solvers and a Commitment to always align with our client business goals and objectives.</p>
                            <button className='btn bg-primary text-secondary border-none hover:text-secondary mr-4 '>See More...</button>
                            <button className="btn text-white hover:text-secondary hover:bg-primary btn-outline">Join With Us</button>
                        </div>
                    </div>

                    <div className="absolute flex  justify-end transform -translate-y-1/2 left-5  right-5 bottom-0 gap-4">
                        
                    </div>
                </div>
    </div>

    );
};

export default Banner;