
import Banner from "../Banner/Banner";
import Deliver from "../Deliver/Deliver";
import NoticeShow from "../NoticeShow";
import Offer from "../Offer/Offer";
import OrderProcess from "../OrderProcess/OrderProcess";
import SpoonserSlider from "../SpoonserSlider/SpoonserSlider";
import WorkForce from "../WorkForce/WorkForce";


const Home = () => {
    return (
        <div>
            <NoticeShow/>
            <Banner />
            
            <Offer />
            <WorkForce />
            <SpoonserSlider></SpoonserSlider>
            <Deliver />
            <OrderProcess />
        </div>
    );
};

export default Home;