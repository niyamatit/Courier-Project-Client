import axios from 'axios';

const axiosSecure = axios.create({
<<<<<<< HEAD
  //  baseURL: 'https://courier-server-lake.vercel.app',
  baseURL: 'http://localhost:5000',
  withCredentials: true, 
=======
   baseURL: 'https://courier-server-lake.vercel.app',
  // baseURL: 'http://localhost:5000',
  withCredentials: true,
>>>>>>> be367c0dd0e7cff8a04c88952386385b22a83ab4
});

export default axiosSecure;

