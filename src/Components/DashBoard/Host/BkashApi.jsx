import  { useState } from 'react';
import Swal from 'sweetalert2';
import useUsersData from '../../../hooks/useUsersData/useUsersData';
import axiosSecure from '../../../api/axiosSecure';

const BkashApi = () => {
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [paid, setPaid] = useState(false);
   const [verifiedUser]= useUsersData();
  const handlePayment = () => {
    if (!amount || !accountNumber) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Info',
        text: 'Please enter amount and account number!',
      });
      return;
    }

    // Redirect to bKash payment link (opens in new tab)
    window.open(
      `https://shop.bkash.com/niyamat-unity01978889033/paymentlink/default-payment`,
      '_blank'
    );

    Swal.fire({
      icon: 'info',
      title: 'Redirected',
      text: 'You have been redirected to bKash. After payment, enter the transaction ID below.',
    });
  };

  const handleConfirm = async () => {
    if (!transactionId) {
      Swal.fire({
        icon: 'error',
        title: 'Transaction ID Required',
        text: 'Please enter your bKash transaction ID.',
      });
      return;
    }

    // Save transaction data locally or send to backend
    setPaid(true);
    Swal.fire({
      icon: 'success',
      title: 'Payment Confirmed',
      text: `Transaction ID: ${transactionId}`,
    });

    const paymentData = {
      amount,                   
accountNumber,
transactionId,
Payment_Email: verifiedUser?.email ||"",
Payment_Name: verifiedUser?.name ||"",
date : new Date().toLocaleDateString(),
Role: "Branch"

    }
    // console.log('Payment Data:', paymentData);
    // Optionally send this data to your backend
    axiosSecure.post('/payment-confirm',paymentData)
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white">
      <h1 className="text-2xl font-bold mb-4">bKash Payment</h1>

      <label className="block mb-2">Amount (৳):</label>
      <input
        type="number"
        className="w-full p-2 border mb-4 rounded"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <label className="block mb-2">Your Account Number:</label>
      <input
        type="text"
        className="w-full p-2 border mb-4 rounded"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />

      <button
        className="bg-pink-600 text-white w-full p-2 rounded hover:bg-pink-700 mb-6"
        onClick={handlePayment}
      >
        Pay with bKash
      </button>

      {amount && (
        <>
          <label className="block mb-2">Transaction ID (after payment):</label>
          <input
            type="text"
            className="w-full p-2 border mb-4 rounded"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
          />

          <button
            className="bg-green-600 text-white w-full p-2 rounded hover:bg-green-700"
            onClick={handleConfirm}
          >
            Confirm Payment
          </button>
        </>
      )}

      {paid && (
        <div className="mt-6 p-4 border border-green-600 rounded bg-green-50">
          <h2 className="text-green-700 font-semibold">Payment Successful</h2>
          <p>Amount: ৳{amount}</p>
          <p>Account: {accountNumber}</p>
          <p>Transaction ID: {transactionId}</p>
        </div>
      )}
    </div>
  );
};

export default BkashApi;
