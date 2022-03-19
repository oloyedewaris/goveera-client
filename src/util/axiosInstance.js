import axios from 'axios';
import { BACKEND_URL } from './constants'

const token = localStorage.getItem('token')

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    accept: '*/*',
    'Content-Type': 'application/json',
    'x-auth-token': token
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;