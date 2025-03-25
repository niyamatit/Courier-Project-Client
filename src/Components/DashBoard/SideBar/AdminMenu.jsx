import { FaUserAlt, FaUserCog,FaUser } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { BsGraphUp } from 'react-icons/bs'
import { MdBookOnline, MdMoney, MdPending, MdPersonAdd, MdRateReview } from 'react-icons/md'
import { MdStore } from 'react-icons/md';
import { BsBuilding } from "react-icons/bs";
import { BsGrid } from "react-icons/bs";

import useUsersData from '../../../hooks/useUsersData/useUsersData';
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
    </>
  )
}

export default AdminMenu