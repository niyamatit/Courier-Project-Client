import { FaUserAlt, FaUserCog,FaUser } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { BsGraphUp } from 'react-icons/bs'
import { MdBookOnline, MdMoney, MdPending, MdPersonAdd, MdRateReview } from 'react-icons/md'
import { MdStore } from 'react-icons/md';
import { BsBuilding } from "react-icons/bs";
import { BsGrid } from "react-icons/bs";
import { BatteryCharging, Zap, CircleDollarSign, SendHorizontal } from "lucide-react";
import useUsersData from '../../../hooks/useUsersData/useUsersData';
import { FaHistory } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
const AdminMenu = () => {
  const [verifiedUser] = useUsersData();
  return (
    <>
      <div>
        <p className="text-2xl text-center font-semibold text-secondary">{verifiedUser?.name}</p>
      </div>
      <MenuItem
        icon={BsGraphUp}
        label='Statistics'
        address='/dashboard/statistics'
      />

      <MenuItem icon={GoPlus}
        label='Add Costing'
        address='add-costing' />
        
      <MenuItem icon={MdPersonAdd}
        label='Add Notice'
        address='add-notice' />

      <MenuItem icon={FaUserCog}
        label='Manage Users'
        address='manage-users' />

      <MenuItem icon={FaUserCog}
        label='spoonser'
        address='spoonser-add' />

      <MenuItem icon={FaUserCog}
        label='AllSpoonser'
        address='all-spoonser' />

      <MenuItem icon={MdRateReview}
        label='All Reviews'
        address='all-reviews' />

      <MenuItem icon={BsBuilding}
        label='Support Company Add'
        address='company-add' />

      <MenuItem icon={BsGrid}
        label='Support Company List'
        address='company-list' />


      <MenuItem icon={FaUserCog}
        label='All Merchant List'
        address='AllMerchnatList' />

      <MenuItem icon={CircleDollarSign}
        label='Merchant Recharge Pending'
        address='Merchant-Recharge-Apply' />


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
        icon={FaUser}
        label='All Branch Staff List'
        address='branch-staff-list'
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
        address='all-branch'
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
        icon={MdPending}

        label='Bkash Recharge History'
        address='recharge-bkash-history-admin'
      />
      <MenuItem
        icon={MdBookOnline}

        label='Online Booking view'
        address='booking-info-admin'
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
       <MenuItem
        icon={MdBookOnline}

        label='All COD Booking'
        address='all-cod-booking-admin'
      />
       <MenuItem
        icon={FaHistory}

        label='All SMS History'
        address='sms-history'
      />
    </>
  )
}

export default AdminMenu