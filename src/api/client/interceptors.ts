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

const onResponseError = async (
  err: AxiosError,
  // axiosInstance: AxiosInstance,
): Promise<AxiosError | undefined> => {
  // const originalConfig = err.config as InternalAxiosRequestConfig;

  console.log(err);
  // if (err.response?.status === 401) {
  //   const currentRefreshToken = localStorage.getItem('refreshToken');
  //   removeAllToken();
  //   if (!currentRefreshToken) {
  //     if (window.location.pathname == '/login') {
  //       return Promise.reject(err?.response?.data);
  //     }
  //     return;
  //   }
  //   const token = await userApi.refreshToken(currentRefreshToken!);
  //   localStorage.setItem('accessToken', token.accessToken);
  //   localStorage.setItem('refreshToken', token.refreshToken);
  //   originalConfig.headers.Authorization = `Bearer ${token.accessToken}`;

  //   return axiosInstance(originalConfig);
  // }
  return Promise.reject(err?.response?.data);
};

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(onRequestConfig, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, (err: AxiosError) =>
    onResponseError(err /*axiosInstance*/),
  );
};
