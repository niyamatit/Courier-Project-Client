import axios from 'axios';

const axiosSecure = axios.create({
  //  baseURL: 'https://courier-server-rho.vercel.app',
  //  baseURL: 'https://courier-server-rho.vercel.app/',
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

export default axiosSecure;

