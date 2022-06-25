/* eslint-disable @typescript-eslint/no-explicit-any */
import { unwrapResult } from '@reduxjs/toolkit';
import store from '@store';
import { fetchNewAccessToken } from '@store/slices/auth';
import { logger, referenceTypeFormatter } from '@utilities';
import axios, { AxiosRequestConfig } from 'axios';
import Config from 'react-native-config';

type OriginalRequest = (AxiosRequestConfig & { retry?: boolean }) | undefined;
interface RequestPromise {
  resolve: (value: string | PromiseLike<string>) => void;
  reject: (reason?: any) => void;
}

const LOGGER_ENABLED = false;
const UNAUTHORIZED_STATUS = 401;

const promiseQueue: RequestPromise[] = [];

const handlePromiseQueue = async (accessToken?: string, error?: any) => {
  for (const promise of promiseQueue) {
    if (accessToken && !error) {
      promise.resolve(accessToken);
    } else {
      promise.reject(error);
    }
  }

  promiseQueue.length = 0;
};

let isTokenRefreshing = false;

// TODO: remake logger
const axiosLogger = (key: string, message: Parameters<typeof logger>[0]) => {
  if (LOGGER_ENABLED) {
    logger(`[Axios] ${key} ${referenceTypeFormatter(message)}`);
  }
};

const axiosInstance = axios.create({
  baseURL: Config.API_URL,
  timeout: 10_000,
});

export const setAccessToken = (accessToken: string | null) => {
  !accessToken
    ? delete axiosInstance.defaults.headers.common.Authorization
    : (axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`);
};

axiosInstance.interceptors.request.use(
  requestConfig => {
    axiosLogger('requestConfig', {
      method: requestConfig.method,
      url: requestConfig.url,
      headers: requestConfig.headers,
      data: requestConfig.data,
    });

    return requestConfig;
  },
  requestError => {
    axiosLogger('requestError', { requestError });

    return Promise.reject(requestError);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    axiosLogger('response', {
      method: response.config.method,
      url: response.config.url,
      status: response.status,
      data: response.data,
    });

    return response.data;
  },
  async responseError => {
    axiosLogger('responseError', {
      method: responseError.config.method,
      url: responseError.config.url,
      status: responseError.status,
      config: responseError.config,
    });

    const originalRequest: OriginalRequest = responseError?.config;

    if (originalRequest?.retry) return Promise.reject(responseError);

    const isUnauthorized = responseError?.response?.status === UNAUTHORIZED_STATUS;

    if (isUnauthorized && !!originalRequest?.headers) {
      // Use accessToken from global state if originalRequest.headers.Authorization is undefined
      if (!originalRequest.headers.Authorization) {
        const { accessToken } = store.getState().auth;
        if (accessToken) {
          setAccessToken(accessToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        }
      }

      // Handle requests while refreshing accessToken
      if (isTokenRefreshing) {
        try {
          const accessToken = await new Promise<string>((resolve, reject) => {
            promiseQueue.push({ resolve, reject });
          });

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (error) {
          return Promise.reject(error);
        }
      }

      // Refreshing accessToken
      try {
        isTokenRefreshing = true;
        originalRequest.retry = true;
        const resultAction = await store.dispatch(fetchNewAccessToken());
        const accessToken = unwrapResult(resultAction);

        if (accessToken) {
          setAccessToken(accessToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          handlePromiseQueue(accessToken);
          return axiosInstance(originalRequest);
        }
      } catch (error) {
        setAccessToken(null);
        handlePromiseQueue(undefined, error);

        return Promise.reject(error);
      } finally {
        isTokenRefreshing = false;
      }
    }

    return Promise.reject(responseError);
  },
);

export default axiosInstance;
