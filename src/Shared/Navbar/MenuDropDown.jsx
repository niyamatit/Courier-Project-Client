import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatarImg from '../../assets/avatarImage.jpg'
import useUsersData from '../../hooks/useUsersData/useUsersData'
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth'

const MenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [verifiedUser]  = useUsersData();
  const navigate = useNavigate(); 
  const {user} =useAuth();
 
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

        
        setIsOpen(false);
      }
    });
  }

  return (
    <div className='z-20'>
      <div className='flex flex-row  items-center gap-3'>
        {/* Dropdown btn */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3  rounded-full cursor-pointer hover:shadow-md transition'
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            {/* Avatar */}
            <img
              className='rounded-full'
              referrerPolicy='no-referrer'
              src={verifiedUser && verifiedUser?.imageUrl ? verifiedUser.imageUrl : avatarImg}
              alt='profile'
              height='30'
              width='30'
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 mt-3 top-12 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            <Link
              to='/'
              className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
            >
              Home
            </Link>

            {verifiedUser ? (
              <>
                <Link
                  to='/dashboard'
                  className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                >
                  Dashboard
                </Link>
                <div onClick={handleLogOut}
                  className='px-4 py-3 hover:bg-neutral-100 cursor-pointer transition font-semibold'
                >
                  Logout
                </div>
              </>
            ) : (
              <>
                <Link
                  to='/login'
                  className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                >
                  Login
                </Link>
                <Link
                  to='/signup'
                  className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default MenuDropdown;
