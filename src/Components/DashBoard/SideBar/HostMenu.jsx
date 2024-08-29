import { BsHouseAddFill } from "react-icons/bs";
import MenuItem from "./MenuItem";
import { IoHome } from "react-icons/io5";
import { MdOutlineManageHistory } from "react-icons/md";
import { FaBiking, FaWpforms } from "react-icons/fa";
import { FaList } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";



const HostMenu = () => {

  const { user } = useAuth()

  return (
    <>
      <p className="text-2xl text-center font-semibold text-secondary">{user?.displayName}</p>

      <MenuItem
        icon={IoHome}
        label='Dashboard'
        address='host-dashboard'
      />

      <MenuItem
        icon={IoHome}
        label='Pickup Parcel'
        address='pickup-parcel'
      />

      <MenuItem
        icon={BsHouseAddFill}
        label='Branch Booking'
        address='branch-booking'
      />

      <MenuItem
        icon={BsHouseAddFill}
        label='International Booking'
        address='demo-pack'
      />

      <MenuItem
        icon={FaWpforms}
        label='Booking Form'
        address='booking-form'
      />

      <MenuItem
        icon={MdOutlineManageHistory}
        label='All Parcel List Offline'
        address='delivery-scheduling'
      />

      <MenuItem
        icon={FaList}
        label='All Parcel List Online'
        address='online-scheduling'
      />

      <MenuItem
        icon={FaBiking}
        label='Rider List'
        address='rider-list'
      />

      <MenuItem
        icon={MdOutlineManageHistory}
        label='Merchant List'
        address='merchant-list'
      />
    </>
  );
};

export default HostMenu;