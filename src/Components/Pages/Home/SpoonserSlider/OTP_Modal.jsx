import React from 'react';

const OTP_Modal = ({ show, onClose, onSubmit }) => {
  const [otp, setOtp] = React.useState('');

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={() => onSubmit(otp)} className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTP_Modal;
