

import { useState } from "react"
import useRole from "../../hooks/useRole"
import useUsersData from "../../hooks/useUsersData/useUsersData"
import axiosSecure from "../../api/axiosSecure"
import Swal from "sweetalert2"



const Profile = () => {
  const[verifiedUser] = useUsersData()
  const [role] = useRole()
 
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [updatedPassword,setUpdatedPassword] = useState('')
  // Function to obfuscate the password
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
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    try {
      const response = await axiosSecure.post("/api/users/change-password", {
        email: verifiedUser.email,
        currentPassword,
        newPassword,
      });

      setUpdatedPassword(newPassword);
      const res = await axiosSecure.put("/api/users/change-password/show", {
        email: verifiedUser.email,
        updatedPassword:obfuscatePassword(newPassword)
      });
      const resRIder = await axiosSecure.put("/api/users/change-password/show/rider", {
        email: verifiedUser.email,
        updatedPassword:obfuscatePassword(newPassword)
      });
      setIsEditingPassword(false);
      Swal.fire({
        icon: 'success',
        title: 'Password Updated',
        text: response.data.message,
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
      });
    } catch (err) {
      setPasswordError(err.response?.data?.message || "An error occurred");
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || "An error occurred",
        showConfirmButton: true,
        confirmButtonColor: '#d33',
      });
    }
  };


 
  return (
    <div className='flex justify-center items-center h-screen'>
      
      <div className='bg-white shadow-lg rounded-2xl w-3/5'>
        <img
          alt='profile'
          src='https://wallpapercave.com/wp/wp10784415.jpg'
          className='w-full mb-4 rounded-t-lg h-36'
        />
        <div className='flex flex-col items-center justify-center p-4 -mt-16'>
          <a href='#' className='relative block'>
            <img
              alt='profile'
              src={verifiedUser?.imageUrl}
              className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
            />
          </a>

          <p className='p-2 px-4 text-xs text-white bg-pink-500 rounded-full'>
            {role && role.toUpperCase()}
          </p>
         
          <div className='w-full p-2 mt-4 rounded-lg'>
            <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
              <p className='flex flex-col'>
                Name
                <span className='font-bold text-black '>
                  {verifiedUser?.name}
                </span>
               
              </p>
              {/* {updatedPassword || (
      <h1 className='text-xl font-bold mt-4'>
        My Password: <span className='text-red-500'>{updatedPassword}</span>
      </h1>
    )} */}
              <p className='flex flex-col'>
                ID
                <span className='font-bold text-black '>{verifiedUser?.email}</span>
              </p>

              <div>
                <button className='bg-[#F43F5E] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1'>
                  Update Profile
                </button>
                <div>
                <div className="relative inline-block">
                  {/* Hover Window Button */}
                  <button
                    onClick={() => setIsEditingPassword(!isEditingPassword)}
                    className='bg-[#F43F5E] px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053]'
                  >
                    Change Password
                  </button>
                  

                  {/* Hover Window with Input Fields */}
                  {isEditingPassword && (
                    <div className="absolute bg-white shadow-lg rounded-lg w-80 p-4 top-12 right-0 z-10">
                      <div className="space-y-4">
                        <div>
                          <input
                            type='password'
                            placeholder='Current Password'
                            className='w-full p-2 border rounded-lg'
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                          />
                        </div>
                        <div>
                          <input
                            type='password'
                            placeholder='New Password'
                            className='w-full p-2 border rounded-lg'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>
                        <div>
                          <input
                            type='password'
                            placeholder='Confirm New Password'
                            className='w-full p-2 border rounded-lg'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                        {passwordError && <p className='text-red-500'>{passwordError}</p>}
                        <div className="flex justify-between">
                          <button
                            onClick={handleChangePassword}
                            className='bg-[#F43F5E] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053]'
                          >
                            Change Password
                          </button>
                          <button
                            onClick={() => setIsEditingPassword(false)}
                            className='text-sm text-gray-500 hover:underline'
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile