import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: 'https://courier-server.vercel.app',
  withCredentials: true, 
});

export default axiosSecure;

