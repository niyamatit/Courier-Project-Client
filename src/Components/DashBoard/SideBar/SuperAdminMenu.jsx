import { FaUser } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { BsCart } from "react-icons/bs";
import useAuth from "../../../hooks/useAuth";


const SuperAdminMenu = () => {

    const { user } = useAuth()

    return (
        <div>
            <p className="text-xl font-semibold text-secondary text-center">{user?.displayName}</p>
            <MenuItem
                icon={FaUser}
                label='Manage Admin'
                address='manage-admin'
            />

            <MenuItem
                icon={BsCart}
                label='See All Booking'
                address='see-all-bookings'
            />

        </div>
    );
};

export default SuperAdminMenu;