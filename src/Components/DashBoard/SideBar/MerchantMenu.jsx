import { FaCartPlus, FaClipboardList, FaSearchPlus, FaShareAltSquare } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { MdAccountBalance, MdAddBox } from "react-icons/md";
import { TbCoinTaka } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";


const MerchantMenu = () => {
    return (
        <>
      <MenuItem
        icon={ IoHomeOutline }
        label='Dashboard'
        address='/dashboard/MerchantDashboard'
      />
      <MenuItem
        icon={ MdAddBox }
        label='Add Parcel'
        address='/'
      />

      {/* <MenuItem
        icon={MdHomeWork}
        label='My Listings'
        address='my-listings'
      /> */}

      <MenuItem
        icon={FaCartPlus}
        label='Bulk Entry'
        address='/'
      />

      <MenuItem
        icon={FaClipboardList}
        label='All Orders'
        address='/'
      />
      <MenuItem
        icon={MdAccountBalance}
        label='Accounts'
        address='/'
      />
      <MenuItem
        icon={FaSearchPlus}
        label='Order Tracking'
        address='/'
      />
      <MenuItem
        icon={FaShareAltSquare}
        label='Coverage Area'
        address='/'
      />
      <MenuItem
        icon={TbCoinTaka}
        label='Service Charge'
        address='/'
      />
    </>
    );
};

export default MerchantMenu;