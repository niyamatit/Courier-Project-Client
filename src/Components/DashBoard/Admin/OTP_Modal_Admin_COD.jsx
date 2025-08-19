const OTP_Modal_Admin_COD = ({ show, onClose, onSubmit, otpEntered, setOtpEntered ,isVerifying}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-bold mb-4">Enter OTP</h3>
        <input
          type="text"
          className="w-full border p-2 mb-4"
          placeholder="Enter OTP"
          value={otpEntered}
          onChange={(e) => setOtpEntered(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={isVerifying || !otpEntered.trim()}
            className={`px-4 py-2 rounded text-white ${
              isVerifying 
                ? "bg-green-300 cursor-not-allowed" 
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isVerifying ? "Verifying..." : "Verify & Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTP_Modal_Admin_COD;
