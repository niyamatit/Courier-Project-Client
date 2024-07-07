import './Deliver.css'
const Deliver = () => {
    return (
        <div className='font-rancho mb-20 bg-[#ffe799]'>
            <div className="lg:flex ">
                <div className=" p-10 space-y-7 w-full">
                    <h1 className='text-4xl mt-5 font-bold'>Proud to Deliver <br />
                        Excellence Every Time</h1>
                    <p className='text-lg'>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit laborum — semper quis lectus nulla. Interactively transform magnetic growth strategies whereas prospective {"outside the box"} thinking.</p>

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
                    <img src="https://transp-nextjs.vercel.app/_next/static/media/port.a1caff3c.png" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Deliver;
