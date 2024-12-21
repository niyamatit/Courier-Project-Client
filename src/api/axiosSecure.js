import axios from 'axios';
const axiosSecure = axios.create({
  // baseURL: import.meta.env.VITE_API,
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  validateStatus: (status) => {
    // Treat all responses as valid unless status is 500 or above
    return status < 500;
  },
});

export default axiosSecure;


