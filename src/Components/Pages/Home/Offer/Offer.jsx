import { useEffect, useState } from "react";
import Title from "../../../../Shared/Title/Title";


const Offer = () => {

    const [offerData, setOfferData] = useState();

    useEffect(() => {

        fetch('../../../../../public/Offer.json')
            .then(res => res.json())
            .then(data => {
                setOfferData(data)
            })
    }, [])

    return (
        <div className=" mt-20 space-y-5  mb-20">
            <Title title={'What We Offered'} subTitle={'Welcome to our tranporation services agency. We are the best at our trans-portation service ever.'} />

            <div style={{ backgroundImage: 'url(https://transp-nextjs.vercel.app/_next/static/media/bg-offer.3f5eb585.png)' }} className="sm:grid-cols-1 md:grid-cols-2 grid lg:grid-cols-3 w-full  gap-5 p-5 ">
                {
                    offerData?.map((item, idx) => (
                        <div key={idx} className="bg-[#ffffff] border-b-8 border-primary font-rancho p-3 pt-4  shadow-4xl">
                            <figure><img className="ml-4" src={item.image_link} alt={item.title} /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{item.title}</h2>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    );
};

export default Offer;