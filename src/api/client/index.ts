import axios from 'axios';
import { setupInterceptors } from './interceptors';

const AxiosClient = axios.create({
  baseURL:
    !import.meta.env.VITE_USE_MOCK && import.meta.env.VITE_SERVER_URL
      ? import.meta.env.VITE_SERVER_URL
      : 'http://localhost:3000',
  headers: {
    Accept: 'application/json',
  },
});

setupInterceptors(AxiosClient);

export default AxiosClient;
