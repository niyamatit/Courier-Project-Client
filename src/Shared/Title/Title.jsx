/* eslint-disable react/prop-types */


const Title = ({ title, subTitle }) => {
    return (

        <div className="w-11/12 mx-auto lg:mb-[80px] lg:mt-[80px]">
            <div className="flex  items-center  gap-5">
                <img src="https://transp-nextjs.vercel.app/_next/static/media/favicon.b004fee4.svg" alt="" />
                <h1 className="text-5xl font-rancho font-bold">{title}</h1>
            </div>
            <h1 className="mt-4  font-rancho">{subTitle}</h1>
        </div>

    );
};

export default Title;