import { BsFingerprint } from 'react-icons/bs'
// import useRole from '../../../hooks/useRole'
import MenuItem from './MenuItem'

const GuestMenu = () => {
//   const [role] = useRole()
 

  
  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label='My Bookings'
        address='my-bookings'
      />
    </>
  )
}

export default GuestMenu