import axios, {
  AxiosInstance,
  RawAxiosRequestHeaders,
  AxiosRequestConfig,
} from "axios";
import {
  getAccessRefreshTokens,
  setAccessRefreshTokens,
} from "@/actions/utils.actions";
import { refreshAccessRefreshTokens } from "./refresh-service";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

let isRefreshing = false;

let failedQueue: AxiosRequestConfig[] = [];

const processQueue = (accessToken: string, instance: AxiosInstance) => {
  failedQueue.forEach((request) => {
    if (request && request.headers) {
      request.headers.Authorization = `Bearer ${accessToken}`;
      instance(request);
    }
  });
  failedQueue = [];
};

export const createAxiosInstance = (
  endpoint: string,
  headers?: RawAxiosRequestHeaders,
): AxiosInstance => {
  return axios.create({
    baseURL: `${API_BASE_URL}/api/v1/${endpoint}`,
    timeout: 12000,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    // withCredentials: true,
  });
};

export const createProtectedAxiosInstance = (
  endpoint: string,
  headers?: RawAxiosRequestHeaders,
): AxiosInstance => {
  const protectedBaseInstance = axios.create({
    timeout: 120000,
    baseURL: `${API_BASE_URL}/api/v1/${endpoint}/`,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  protectedBaseInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      console.log("error out", originalRequest);
      if (error.response?.status === 401 && !originalRequest._retry) {
        const { refreshToken } = await getAccessRefreshTokens();

        if (!refreshToken) {
          return Promise.reject(error);
        }

        originalRequest._retry = true;

        if (isRefreshing) {
          return failedQueue.push(originalRequest);
        }

        isRefreshing = true;

        try {
          const { access_token, refresh_token } =
            await refreshAccessRefreshTokens(refreshToken);

          if (access_token) {
            await setAccessRefreshTokens(access_token, refresh_token);
            originalRequest.headers.Authorization = `Bearer ${access_token}`;

            processQueue(access_token, protectedBaseInstance);
            return protectedBaseInstance(originalRequest);
          }
        } catch (refreshError) {
          // processQueue(refreshError as Error)
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );

  return protectedBaseInstance;
};
