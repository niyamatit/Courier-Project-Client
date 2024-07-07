import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true, // Include credentials with the requests
});

export default axiosSecure;
