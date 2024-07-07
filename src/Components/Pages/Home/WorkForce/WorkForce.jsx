import Title from "../../../../Shared/Title/Title";
import { MdOutlineVerifiedUser } from "react-icons/md";

const WorkForce = () => {
    return (
        <div className="mb-14">
            <Title title={'We are proud of our workforce'} subTitle={'Delivering Results for Industry Leaders and We are proud of our workforce and have worked hard.'} />
            <div className="md:flex p-10 gap-20 mx-auto  items-center">

                {/* Pictures Dive */}
                <div>
                    <img className="h-full w-full" src="https://transp-nextjs.vercel.app/assets/imgs/page/homepage1/img1.png" alt="" />
                </div>

                {/* Second Div */}
                <div className="font-rancho space-y-5">
                    <h1 className="md:text-xl lg:text-4xl font-bold text-secondary">Fast shipping with the most <br /> modern technology</h1>
                    <p className="lg:text-lg text-[#4f8ebf]">Over the years, we have worked together to expand our network of partners to deliver reliability and consistency. We’ve also made significant strides to tightly integrate technology with our processes, giving our clients greater visibility into every engagement.</p>

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
    );
};

export default WorkForce;