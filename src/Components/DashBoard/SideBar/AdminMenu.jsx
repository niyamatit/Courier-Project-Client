import { FaUserAlt, FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { BsGraphUp } from 'react-icons/bs'
import { MdPersonAdd } from 'react-icons/md'
import { MdStore } from 'react-icons/md';
const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsGraphUp}
        label='Statistics'
        address='/dashboard/statistics'
      />

      <MenuItem icon={FaUserCog}
        label='Manage Users'
        address='manage-users' />
      <MenuItem
        icon={FaUserAlt}
        label='Rider Add'
        address='rider-add'
      />
      <MenuItem
        icon={MdPersonAdd}
        label='Add Branch Staff'
        address='branch-staff'
      />
      {/* <MenuItem
        icon={MdPersonAdd}
        label='Add Branch Staff'
        address='Add-branch-staff'
      /> */}
      <MenuItem
        icon={MdStore}
        
        label='Add Branch'
        address='branch-add'
      />
    </>
  )
}

export default AdminMenu