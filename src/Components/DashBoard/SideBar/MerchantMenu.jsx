
import MenuItem from "./MenuItem";
import { MdAddBox } from "react-icons/md";
import { FaBox } from 'react-icons/fa';
import { IoHomeOutline } from "react-icons/io5";
import { FaTruck } from 'react-icons/fa';
import { FaFileInvoice } from 'react-icons/fa';
import { MdStore } from 'react-icons/md';

import { RiBox3Line } from 'react-icons/ri';

import useUsersData from "../../../hooks/useUsersData/useUsersData";
const MerchantMenu = () => {
  const [verifiedUser] = useUsersData()
  return (
    <>
      <div className="mb-10">
        <p className="     font-semibold ml-5">{verifiedUser?.name} ({verifiedUser?.email})</p>
        
        <p className="text-sm  ml-[45px] font-semibold">Merchant ID- {verifiedUser?.merchantID}</p>
        <p className="text-sm  ml-[45px] font-semibold">Merchant Balance : {verifiedUser?.Merchant_Balance}</p>
      </div>
      <MenuItem
        icon={IoHomeOutline}
        label='Dashboard'
        address='/dashboard/MerchantDashboard'
      />
      <MenuItem
        icon={MdAddBox}
        label='Add Parcel(National)'
        address='/dashboard/MerchantAddPercel'
      />
      <MenuItem
        icon={FaTruck}
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
      <MenuItem
        icon={RiBox3Line}
        label='My Parcel List'
        address='/dashboard/MerchantParcelList'
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