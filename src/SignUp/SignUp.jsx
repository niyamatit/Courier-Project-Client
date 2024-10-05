import { Link, useNavigate } from 'react-router-dom';

import { TbFidgetSpinner } from 'react-icons/tb';
import { imageUpload } from '../api/utils'; 
import React from 'react'; 
import axiosSecure from '../api/axiosSecure';
import Swal from 'sweetalert2'; // Import sweetalert2
const SignUp = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  

const handleSignUp = async e => {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;
  const image = form.image.files[0];
  const role = 'guest'

  try {
    setLoading(true);

   
    const imageData = await imageUpload(image);
    
  
    const response = await axiosSecure.post('/users/auth/register', {
      name,
      email,
      password,
      role,
      imageUrl: imageData?.data?.display_url,
    });

    if (response.status === 201) {
      
      Swal.fire({
        icon: 'success',
        title: 'Sign Up Successful',
        text: 'You have been successfully registered!',
      });
      localStorage.setItem("email:",email)
      navigate('/');
    } else {
      
      Swal.fire({
        icon: 'error',
        title: 'Sign Up Failed',
        text: response.data.message || 'Something went wrong!',
      });
    }
  } catch (err) {
    console.error(err);

    
    Swal.fire({
      icon: 'error',
      title: 'Sign Up Failed',
      text: err?.response?.data?.message || 'An error occurred!',
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to Niyamat Courier</p>
        </div>
        <form onSubmit={handleSignUp} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Select Image:
              </label>
              <input
                required
                type="file"
                id="image"
                name="image"
                accept="image/*"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm">
                Password
              </label>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="bg-secondary w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin mx-auto" />
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="hover:underline text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
