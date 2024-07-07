import { MdOutlineVerifiedUser } from "react-icons/md";


const About = () => {
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

        </div>
    );
};

export default About;