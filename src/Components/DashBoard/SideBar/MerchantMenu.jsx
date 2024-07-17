
import MenuItem from "./MenuItem";
import { MdAddBox } from "react-icons/md";

import { IoHomeOutline } from "react-icons/io5";
import { FaTruck } from 'react-icons/fa';
import { FaFileInvoice } from 'react-icons/fa';
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