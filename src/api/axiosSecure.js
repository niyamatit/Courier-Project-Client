import axios from 'axios';

const axiosSecure = axios.create({
  //  baseURL: 'https://courier-server-rho.vercel.app',
// VITE_API = https://courier-server-rho.vercel.app
   baseURL: import.meta.env.VITE_API,
  // baseURL: 'http://localhost:5000',
  withCredentials: true,
});

export default axiosSecure;

