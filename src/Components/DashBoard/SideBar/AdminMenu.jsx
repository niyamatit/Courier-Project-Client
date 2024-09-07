import { FaUserAlt, FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { BsGraphUp } from 'react-icons/bs'

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsGraphUp}
        label='Statistics'
        address='/dashboard/statistics'
      />

      <MenuItem icon={FaUserCog} label='Manage Users'
        address='manage-users' />
      <MenuItem
        icon={FaUserAlt}
        label='Rider Add'
        address='rider-add'
      />
    </>
  )
}

export default AdminMenu