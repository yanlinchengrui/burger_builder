import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'Firebase URL'
});

export default axiosInstance;