import { FaUser } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { BsCart } from "react-icons/bs";
import useUsersData from "../../../hooks/useUsersData/useUsersData";


const SuperAdminMenu = () => {

    const[verifiedUser] = useUsersData()

    return (
        <div>
            <p className="text-xl font-semibold text-secondary text-center">{verifiedUser?.displayName}</p>
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