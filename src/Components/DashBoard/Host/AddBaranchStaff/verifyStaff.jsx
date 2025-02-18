import { useState } from "react";
import { useForm } from "react-hook-form";


const VerifyStaff = ({ onVerification }) => {
    const [verificationError, setVerificationError] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    
    // const handleVerification = ({ userId, password }) => {
    //     if (userId === staffData.Staff_User_ID && password === staffData.Staff_Password) {
    //       setVerificationError('');
    //       onVerification(staffData); // Return full staff data on match
    //     } else {
    //       setVerificationError('Invalid credentials');
    //     }
    //   };
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Staff Verification</h2>
      <form onSubmit={handleSubmit()} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">User ID</label>
          <input
            type="text"
            {...register('userId', { required: 'User ID is required' })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.userId && <span className="text-red-500 text-sm">{errors.userId.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
        </div>

        {verificationError && <p className="text-red-500 text-sm">{verificationError}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Verify Identity
        </button>
      </form>
    </div>
    );
};

export default VerifyStaff;