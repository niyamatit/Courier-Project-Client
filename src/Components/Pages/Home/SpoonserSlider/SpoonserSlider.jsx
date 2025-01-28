import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axiosSecure from "../../../../api/axiosSecure";
import { useQuery } from "@tanstack/react-query";

const SpoonserSlider = ({ loading }) => {
    const { data: spoonsers } = useQuery({
        queryKey: ["spoonser"],
        queryFn: async () => {
            const response = await axiosSecure.get("/spoonser");
            return response.data;
        },
    });

    return (
        <div className="w-full h-full">
            {loading ? (
                <div className="h-[450px] w-full flex justify-center items-center">
                    <span className="loading loading-bars loading-lg"></span>
                </div>
            ) : (
                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    spaceBetween={30}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    navigation={true}
                    className="w-full h-full"
                >
                    {spoonsers?.map((spoonser, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex flex-col items-center justify-center h-[450px] w-full bg-gray-100">
                                <img
                                    src={spoonser?.Image}
                                    alt={spoonser?.Name}
                                    className="h-56 w-56 rounded-full object-cover bg-center"
                                />
                                <h2 className="text-xl font-bold mt-4">
                                    {spoonser?.Name}
                                </h2>
                                <p className="text-sm text-gray-600">{spoonser?.Title}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default SpoonserSlider;
