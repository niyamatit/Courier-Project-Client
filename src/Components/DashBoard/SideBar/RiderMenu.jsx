
import { CgWebsite } from "react-icons/cg";
import MenuItem from "./MenuItem";
import { MdHome } from "react-icons/md";
import { GiCardPickup } from "react-icons/gi";
import { Link } from "react-router-dom";


const RiderMenu = () => {
    return (
        <div>
            <MenuItem
                icon={MdHome}
                label='Rider Home'
                address='rider-home'
            />
            <MenuItem
                icon={CgWebsite}
                label='Website'
                address='/'
            />
            <div className="dropdown w-full">

                <MenuItem
                    icon={GiCardPickup}
                    label='Parcel '
                // address='/'
                />

                <ul tabIndex={0} className="text-gray-700 font-semibold dropdown-content menu  w-full">
                    <li><Link to="pickup-list"><a>Pickup Parcel List</a></Link></li>
                    <li><Link to="delivery-list"><a>Delivery Parcel List</a></Link></li>
                    <li><Link to="delivery-complete"><a>Delivery Complete Parcel List</a></Link></li>
                    <li><Link to="return-parcel"><a>Return Parcel List</a></Link></li>
                </ul>
            </div>

        </div>
    );
};

export default RiderMenu;