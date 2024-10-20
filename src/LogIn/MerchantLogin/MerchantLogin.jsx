import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TbFidgetSpinner } from 'react-icons/tb';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axiosSecure from '../../api/axiosSecure';
import { GoArrowRight } from "react-icons/go";
const MerchantLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/'; 
  
  const handleLogIn = async e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);

    try {
      const response = await axiosSecure.post('/users/auth/user/login', { email, password });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Merchant Login Successful',
          showConfirmButton: false,
          timer: 1500
        });
        localStorage.setItem("email", email);
        
        navigate(from, { replace: true });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message || 'Login failed!',
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err?.response?.data?.message || 'Login failed!',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-white text-gray-900 shadow-md'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Merchant Login</h1>
          <p className='text-sm text-gray-400'>Sign in to access your account</p>
        </div>
        <form onSubmit={handleLogIn} className='space-y-6'>
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>Email address or Phone Number or Merchant ID</label>
              <input
                type='text'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email or Number or Merchant ID...'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900'
              />
            </div>
            <div>
              <label htmlFor='password' className='block mb-2 text-sm'>Password</label>
              <input
                type='password'
                name='password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900'
              />
            </div>
          </div>
          <div>
            <button
              type='submit'
              className='w-full py-3 text-white bg-blue-600 rounded-md shadow-lg hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200 ease-in-out'>
              {loading ? <TbFidgetSpinner className='animate-spin mx-auto' /> : 'Continue'}
            </button>
          </div>
        </form>
        
        <p className='px-6 text-sm text-center text-gray-400 mt-4'>
          Don't have a Merchant account yet?{' '}<br></br>
         <div className='flex gap-1 justify-center'>
         <Link to='/merchantSignup' className='hover:underline hover:text-blue-600 text-gray-600'>Merchant Signup </Link>
         <p className='mt-1 text-blue-600'><GoArrowRight/></p>
         </div>
        </p>
      </div>
    </div>
  );
};

export default MerchantLogin;
