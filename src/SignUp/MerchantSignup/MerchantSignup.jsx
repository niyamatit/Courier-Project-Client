import { Link, useNavigate } from 'react-router-dom';
import { TbFidgetSpinner } from 'react-icons/tb';
import React from 'react'; 
import Swal from 'sweetalert2'; 
import axiosSecure from '../../api/axiosSecure';
import { imageUpload } from '../../api/utils';

const MerchantSignup = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSignUp = async e => {
    e.preventDefault();
    const date = new Date();


const datePart = `${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}${date.getFullYear().toString().slice(-2)}`;


const timePart = `${date.getHours()}${date.getMinutes().toString().padStart(2, '0')}`;




    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];
    const role = 'merchant';
    const merchantID = datePart + timePart;
    console.log("Merchant ID",merchantID)

    try {
      setLoading(true);
      
      // Upload image
      const imageData = await imageUpload(image);
      
      // Send signup request
      const response = await axiosSecure.post('/users/auth/register', {
        name,
        email,
        password,
        role,
        imageUrl: imageData?.data?.display_url,
        merchantID
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Merchant Signup Successful',
          text: 'You have been successfully registered as a Merchant!',
        });
        localStorage.setItem("email", email);
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-white text-gray-900 shadow-md">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Merchant Signup</h1>
          <p className="text-sm text-gray-400">Welcome to Niyamat Courier</p>
        </div>
        <form onSubmit={handleSignUp} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900"
                required
              />
            </div>
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">Select Image</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                required
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*******"
                autoComplete="new-password"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900"
                required
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 text-white bg-blue-600 rounded-md shadow-lg hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200 ease-in-out">
              {loading ? (
                <TbFidgetSpinner className="animate-spin mx-auto" />
              ) : (
                'Continue'
              )}
               </button>
            </div>
        </form>
        <p className="px-6 text-sm text-center text-gray-400 mt-4">
          Already have an account?{' '}
          <Link to="/merchantLogin" className="hover:underline hover:text-blue-600 text-blue-800">
            Login
          </Link>.
        </p>
      </div>
    </div>
  );
};

export default MerchantSignup;
