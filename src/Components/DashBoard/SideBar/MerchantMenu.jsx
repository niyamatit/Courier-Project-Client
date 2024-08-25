
import MenuItem from "./MenuItem";
import { MdAddBox } from "react-icons/md";
import { FaBox } from 'react-icons/fa';
import { IoHomeOutline } from "react-icons/io5";
import { FaTruck } from 'react-icons/fa';
import { FaFileInvoice } from 'react-icons/fa';
import { MdStore } from 'react-icons/md';
import useAuth from "../../../hooks/useAuth";
const MerchantMenu = () => {
  const {user} = useAuth();
    return (
        <>
        <div className="mb-10">
        <p className="ml-5 -mt-5 font-semibold text-lg">{user?.displayName}</p>
        <p className="text-sm  ml-7 font-semibold">({user?.email})</p>
        </div>
      <MenuItem
        icon={ IoHomeOutline }
        label='Dashboard'
        address='/dashboard/MerchantDashboard'
      />
      <MenuItem
        icon={ MdAddBox }
        label='Add Parcel(National)'
        address='/dashboard/MerchantAddPercel'
      />
      <MenuItem
        icon={ FaTruck }
        label='Deliveries'
        address='/dashboard/MerchantDeliveries'
      />

      {/* <MenuItem
        icon={MdHomeWork}
        label='My Listings'
        address='my-listings'
      /> */}

      <MenuItem
        icon={FaFileInvoice}
        label='Invoice'
        address='/dashboard/MerchantInvoices'
      />
      <MenuItem
        icon={FaBox}
        label='Add Parcel(International)'
        address='/dashboard/MerchantInterNationalAddPercel'
      />
      <MenuItem
        icon={MdStore}
        label='Shop List'
        address='/dashboard/MerchantShopList'
      />

      {/* <MenuItem
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
      /> */}
    </>
    );
};

export default MerchantMenu;