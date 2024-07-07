import { useEffect, useState } from "react";
import Title from "../../../../Shared/Title/Title";
import { FaCirclePlay } from "react-icons/fa6";

const OrderProcess = () => {

    const [process, setProcess] = useState([])

    useEffect(() => {
        fetch('../../../../../public/steps.json')
            .then(res => res.json())
            .then(data => {
                setProcess(data)
            })
    }, [])

    return (
        <div>
            <Title title={'How It Works'} subTitle={'You choose the cities where you’d like to deliver. All deliveries are within a specific service area and delivery services vary by location. Whatever the mode or requirement, we will find and book the ideal expedited shipping solution to ensure a timely delivery.'} />
            <div className="md:flex mb-16 p-10 gap-10">
                <div className="relative">
                    <img src="https://transp-nextjs.vercel.app/assets/imgs/page/homepage1/how-it-work.png" alt="" />
                    <div className=" flex  gap-5 justify-center  lg:w-[460px] lg:h-[210px] bg-secondary absolute -mt-28 md:-mt-28 lg:ml-20 md:ml-0 md:p-10">
                        <div>
                            <FaCirclePlay className="h-10 w-10 text-[#fec201]" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white font-rancho">We have 2 years experience in this passion</h1>
                            <p className="text-white">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col items-center mt-10 md:mt-0 justify-center">
                        {process.map((step, index) => (
                            <div key={index} className="flex items-center py-3">
                                <div className="flex flex-col items-center">
                                    <div className="p-3 mb-2">
                                        <img className="flex  items-center" src={step?.icon} alt="" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-xl md:font-bold">{step.title}</h3>
                                    <p className="text-gray-600">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderProcess;