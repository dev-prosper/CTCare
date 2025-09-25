import axios from "axios";
import { useAuthStore } from "@/store/auth-store";

type FailedRequest = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "x-api-key": "local-dev-key-123",
  },
  withCredentials: false,
});

// Request interceptor: attach access token
api.interceptors.request.use((config) => {
  // const token = useAuthStore.getState().accessToken;
  const token = localStorage.getItem("ctc-act");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: handle 401 and try refresh
let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // const { refreshToken, accessToken } = useAuthStore.getState();
        const refreshToken = localStorage.getItem("ctc-rft");
        const accessToken = localStorage.getItem("ctc-act");
        console.log("Trying refresh with token:", refreshToken);
        const res = await api.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/refresh-token`,
          {
            refreshToken,
            accessToken,
            ip: "string",
            userAgent: "string",
            revokeAllSessions: true,
          },
        );

        const newAccessToken = res.data.accessToken;
        const newRefreshToken = res.data.refreshToken;

        localStorage.setItem("ctc-act", newAccessToken);
        localStorage.setItem("ctc-rft", newRefreshToken);

        // useAuthStore.getState().setTokens(newAccessToken, newRefreshToken);

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        useAuthStore.getState().clear(); // logout user
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
