import { FaUser, FaUserAlt, FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";
import useUsersData from "../../../hooks/useUsersData/useUsersData";
import { MdBookOnline, MdMoney, MdPending, MdPersonAdd, MdStore } from "react-icons/md";


const SuperAdminMenu = () => {
    const [verifiedUser] = useUsersData()


    return (
        <div>
            <h2 className="text-2xl text-gray-700 font-semibold text-center">Super Admin</h2>
            <p className="text-xl font-semibold text-secondary text-center">{verifiedUser?.displayName}</p>
            <MenuItem
                icon={FaUser}
                label='Manage Admin'
                address='manage-admin'
            />
            <MenuItem
                icon={FaUser}
                label='Admin Add'
                address='hash-add'
            />
            <MenuItem
                icon={FaUser}
                label='Admin List'
                address='adminList'
            />
            <MenuItem icon={FaUserCog}
                label='All Merchant List'
                address='AllMerchnatListsup'
            />
            <MenuItem
                icon={FaUserAlt}
                label='Rider Add'
                address='rider-add'
            />
            <MenuItem
                icon={FaUserAlt}
                label='All Rider Info'
                address='all-rider'
            />
            <MenuItem
                icon={MdPersonAdd}
                label='Add Branch Staff'
                address='branch-staff'
            />
            <MenuItem
                icon={MdPending}
                label='Apply Pending'
                address='apply-pending'
            />
            <MenuItem
                icon={MdStore}
                label='Add Branch'
                address='branch-add'
            />
            <MenuItem
                icon={MdStore}
                label='All Branch List'
                address='all-branchsup'
            />
            <MenuItem
                icon={MdMoney}
                label='Recharge Processing'
                address='recharge-processign'
            />
            <MenuItem
                icon={MdMoney}
                label='Recharge Complete'
                address='recharge-complete'
            />
            <MenuItem
                icon={MdBookOnline}
                label='Online Booking view'
                address='booking-info'
            />
            <MenuItem
                icon={MdBookOnline}
                label='Offline Booking view'
                address='offline-booking'
            />
            <MenuItem
                icon={MdBookOnline}
                label='Merchant Booking view'
                address='merchantbooking-info'
            />

        </div>
    );
};

export default SuperAdminMenu;