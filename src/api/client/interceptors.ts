import { notifications } from '@/config';
import Snackbar from '@/utils/notistack/Snackbar';
import { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

interface IRequestAxios extends InternalAxiosRequestConfig {
  skipLoading?: boolean;
}

const onRequestConfig = (config: IRequestAxios) => {
  // if (!config.headers['Authorization']) {
  //   const token = localStorage.getItem('accessToken');
  //   if (token) {
  //     config.headers['Authorization'] = `Bearer ${token}`;
  //   }
  // }
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }
  config.timeout = 30000;
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (res: AxiosResponse): AxiosResponse => {
  return res;
};

const onResponseError = async (err: AxiosError): Promise<AxiosError | undefined> => {
  console.error(err);
  Snackbar.error(
    (err?.response?.data as { error: string })?.error || err.message || 'Something went wrong',
    {
      autoHideDuration: notifications.options.autoHideDuration,
    },
  );
  return Promise.reject(err?.response?.data);
};

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(onRequestConfig, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, (err: AxiosError) =>
    onResponseError(err /*axiosInstance*/),
  );
};
