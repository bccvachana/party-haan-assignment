import axios, {
  AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse,
} from 'axios';
import config from 'config';
import { get } from 'lodash/fp';
import userService from 'services/user.service';

const axiosConfig: AxiosRequestConfig = {
  baseURL: config.API_PREFIX,
  timeout: 10000,
  withCredentials: true,
};

const axiosInstance: AxiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    try {
      if (
        get('response.status', error) === 401
        && get('response.data.message', error) === 'jwt expired'
      ) {
        await userService.refreshToken();
        return await new Promise((resolve) => {
          resolve(axiosInstance(get('response.config', error)));
        });
      }
    } catch {
      await userService.logout();
    }
    return Promise.reject(error);
  },
);

export {
  axiosInstance,
};
