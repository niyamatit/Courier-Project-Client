import axios from 'axios';

 const axiosSecure = axios.create({
 
   baseURL: import.meta.env.VITE_API,
   // baseURL: import.meta.env.VITE_API,
   // baseURL: import.meta.env.VITE_API,
    // baseURL: 'http://localhost:5000',
  withCredentials: true,
});

export default axiosSecure;

