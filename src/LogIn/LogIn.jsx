import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TbFidgetSpinner } from 'react-icons/tb';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axiosSecure from '../api/axiosSecure';
import { GoArrowRight } from "react-icons/go";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/'; 
  
  // Handle form login
  const handleLogIn = async e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

     setLoading(true);

    try {
      // Send login request to the backend
      const response = await axiosSecure.post('/users/auth/user/login', { email, password });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          showConfirmButton: false,
          timer: 1500
        });
        localStorage.setItem("email",email)
        
        navigate(from, { replace: true });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message || 'Login failed!',
        });
      }
    } catch (err) {
     
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
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Log In</h1>
          <p className='text-sm text-gray-400'>Sign in to access your account</p>
        </div>
        <form onSubmit={handleLogIn} className='space-y-6'>
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>Email address or Phone Number</label>
              <input
                type='text'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Or Phone Number  Here'
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
              className='bg-secondary w-full rounded-md py-3 text-white'
            >
              {loading ? <TbFidgetSpinner className='animate-spin mx-auto' /> : 'Continue'}
            </button>
          </div>
        </form>
        <div className='space-y-1'>
          <button className='text-xs hover:underline hover:text-secondary text-gray-400'>Forgot password?</button>
        </div>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
         
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        
        <p className='px-6 text-sm text-center text-gray-400'>
          Don't have an account yet?{' '}
          <Link to='/signup' className='hover:underline hover:text-primary text-gray-600'>Sign up</Link>.
        </p>
        <p className='flex gap-1 px-6 text-sm justify-center text-gray-400 
        '>
          
          <Link to='/merchantLogin' className='text-blue-600 hover:text-blue-300'>Merchant Login</Link>
          <p className='mt-1 text-blue-600'><GoArrowRight/></p>
        </p>
        <p className='flex gap-1 px-6 text-sm justify-center text-gray-400 
        '>
          
          <Link to='/merchantSignup' className='text-blue-600 hover:text-blue-300'>Merchant Signup</Link>
          <p className='mt-1 text-blue-600'><GoArrowRight/></p>
        </p>
      </div>
    </div>
  );
};

export default Login;
