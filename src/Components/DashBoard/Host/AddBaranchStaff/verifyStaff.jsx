import { TbFidgetSpinner } from "react-icons/tb";
import { useEffect, useState } from 'react';
import { FiLock, FiMail } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";
import UseStaffVerify from "../../../../hooks/UseStaffVerify/UseStaffVerify";

const VerifyStaff = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loginAttempted, setLoginAttempted] = useState(false);
  const [verifiedStaff] = UseStaffVerify();
  const navigate = useNavigate();

  useEffect(() => {
    if (verifiedStaff && loginAttempted) {
      navigate("/dashboard/branch-booking"); 
      setSuccess("Verification successful!");
    } else if (!verifiedStaff && loginAttempted) {
      setError("Staff verification failed. Please check your credentials.");
    }
  }, [verifiedStaff, loginAttempted, navigate]);
  const obfuscatePassword = (password) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(()){:}}||><?";
    let obfuscated = "";
    for (let char of password) {
      obfuscated += char; // Add the actual character
      for (let i = 0; i < 20; i++) {
        obfuscated += characters.charAt(Math.floor(Math.random() * characters.length)); // Add 20 random characters
      }
    }
    return obfuscated;
  };
  const handleLogIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    setLoginAttempted(true);

    const form = e.target;
    const StaffEmail = form.email.value;
    const StaffPassword = form.password.value;
     
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Save credentials to localStorage
      localStorage.setItem("StaffEmail", StaffEmail);
      localStorage.setItem("StaffPassword", StaffPassword);

      
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50'>
      <div className='relative w-full max-w-md px-6 py-8 bg-white rounded-2xl shadow-xl backdrop-blur-lg border border-opacity-20 border-gray-200'>
        <div className='absolute inset-0 bg-gradient-to-br from-white to-blue-50 rounded-2xl opacity-30' />

        <div className='relative z-10 text-center'>
          <div className='mb-8 space-y-2'>
            <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
              Staff Verification
            </h1>
            <p className='text-gray-500 text-sm'>
              Confirm your identity to access branch features
            </p>
          </div>

          <form onSubmit={handleLogIn} className='space-y-6'>
            <div className='space-y-4'>
              <div className='relative'>
                <label htmlFor='email' className='sr-only'>Your UserID*</label>
                <div className='relative'>
                  <FiMail className='absolute top-3.5 left-3 text-gray-400' size={20} />
                  <input
                    type='text'
                    name='email'
                    id='email'
                    required
                    placeholder='Enter Your User ID'
                    className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none'
                  />
                </div>
              </div>

              <div className='relative'>
                <label htmlFor='password' className='sr-only'>Password</label>
                <div className='relative'>
                  <FiLock className='absolute top-3.5 left-3 text-gray-400' size={20} />
                  <input
                    type='password'
                    name='password'
                    id='password'
                    required
                    placeholder='Enter your password'
                    className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none'
                  />
                </div>
              </div>
            </div>

            <button
              type='submit'
              disabled={isLoading}
              className='w-full py-3.5 px-6 rounded-lg bg-gradient-to-l from-blue-600 to-indigo-600 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed'
            >
              {isLoading ? (
                <span className='flex items-center justify-center gap-2'>
                  <TbFidgetSpinner className='animate-spin' size={20} />
                  Verifying...
                </span>
              ) : (
                "Verify"
              )}
            </button>
          </form>

          {error && (
            <div className='mt-6 p-3 bg-red-50 text-red-700 rounded-lg animate-fade-in'>
              {error}
            </div>
          )}

          {success && (
            <div className='mt-6 p-3 bg-green-50 text-green-700 rounded-lg animate-fade-in'>
              {success}
            </div>
          )}

          <div className='mt-6 text-center text-sm text-gray-500'>
            <p>Need help? Contact <span className="font-bold">support@niyamatexpress.com or +8809617179001</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyStaff;
