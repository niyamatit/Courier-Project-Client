import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'

import MenuItem from './MenuItem'
import AdminMenu from './AdminMenu'
import GuestMenu from './GuestMenu'
import HostMenu from './HostMenu'
import useRole from '../../../hooks/useRole'
import { Link, useNavigate } from 'react-router-dom'
import MerchantMenu from './MerchantMenu'
import RiderMenu from './RiderMenu'
import logoImg from '../../../assets/nexp-update.png'
import SuperAdminMenu from './SuperAdminMenu'
import Swal from 'sweetalert2'

const Sidebar = () => {
  const [role] = useRole()
  const navigate = useNavigate()

  // closed initially for mobile
  const [isActive, setActive] = useState(false)

  const handleToggle = () => {
    setActive(prev => !prev)
  }

  const handleLogOut = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('email')
        localStorage.removeItem('StaffEmail')
        localStorage.removeItem('StaffPassword')

        navigate('/login')

        Swal.fire(
          'Logged Out!',
          'You have been successfully logged out.',
          'success'
        )
      }
    })
  }

  return (
    <>
      {/* Mobile Top Navbar */}
      {/* Mobile Bottom Navbar */}
<div className='fixed bottom-0 left-0 w-full bg-white border-t shadow-lg flex justify-around items-center py-2 z-50 md:hidden'>

  {/* Home */}
  <Link
    to='/'
    className='flex flex-col items-center text-xs text-gray-700'
  >
    <img
      src={logoImg}
      alt='Logo'
      className='h-8 w-auto object-contain'
    />
    <span>Home</span>
  </Link>

  {/* Dashboard */}
  <Link
    to='/dashboard'
    className='flex flex-col items-center text-xs text-gray-700'
  >
    <FcSettings className='w-6 h-6' />
    <span>Dashboard</span>
  </Link>

  {/* Menu Button */}
  <button
    onClick={handleToggle}
    className='flex flex-col items-center text-xs text-gray-700'
  >
    <AiOutlineBars className='w-6 h-6' />
    <span>Menu</span>
  </button>

</div>

      {/* Sidebar */}
      <div
        className={`
          fixed md:fixed
          top-0 left-0
          z-50
          h-screen
          w-64
          bg-gray-100
          flex flex-col justify-between
          overflow-y-auto
          overflow-x-hidden
          px-2 py-4
          transition-transform duration-300

          ${isActive ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <div>
          {/* Desktop Logo */}
          <div className='hidden md:flex justify-center py-2 bg-emerald-400 rounded-lg shadow-lg'>

            {/* Desktop size unchanged */}
            <Link to='/'>
              <img
                src={logoImg}
                alt='Logo'
                className='h-24 w-auto object-contain'
              />
            </Link>

          </div>

          {/* Menus */}
          <div className='mt-6'>
            <nav>
              {role === 'host' && <HostMenu />}
              {role === 'guest' && <GuestMenu />}
              {role === 'admin' && <AdminMenu />}
              {role === 'merchant' && <MerchantMenu />}
              {role === 'rider' && <RiderMenu />}
              {role === 'sup-admin' && <SuperAdminMenu />}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          <MenuItem
            icon={FcSettings}
            label='Profile'
            address='/dashboard/profile'
          />

          <button
            onClick={handleLogOut}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300'
          >
            <GrLogout className='w-5 h-5' />
            <span className='mx-4 font-medium'>
              Logout
            </span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar