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



  const [role] = useRole();
  console.log(role);
  const navigate = useNavigate();
  const [isActive, setActive] = useState(false)


  const handleToggle = () => {
    setActive(!isActive)
  }
  const handleLogOut = () => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!'
    }).then((result) => {
      if (result.isConfirmed) {

        localStorage.removeItem('email');


        navigate('/login');


        Swal.fire(
          'Logged Out!',
          'You have been successfully logged out.',
          'success'
        );



      }
    });
  }

  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link className='h-[100px] w-[100px]' to="/"><img src={logoImg} alt="Logo" /></Link>

          </div>

        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
          }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-emerald-400 mx-auto'>
              <Link className='h-[100px] w-[100px]' to="/"><img src={logoImg} alt="Logo" /></Link>
            </div>
            {/* <div className='w-full hidden md:flex px-4 py-2 rounded-lg justify-center items-center mx-auto'>
              <Link to="/"><img src={logo} alt="Logo" /></Link>
            </div> */}
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            <nav>
              {/* Host Menu Items */}
              {role === 'host' && <HostMenu />}

              {/* Guest Menu Items */}
              {role === 'guest' && <GuestMenu />}

              {/* Admin Menu Items */}
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
          <button onClick={handleLogOut} className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform'>
            <GrLogout className='w-5 h-5' />
            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>

    </>
  )
}

export default Sidebar
