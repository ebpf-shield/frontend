import axios from "axios";
import { env } from "../utils/env.util.ts";

const { VITE_BACKEND_URL: BACKEND_URL } = env;
const API_PREFIX = "/api/ui" as const;

export const axiosInstance = axios.create({
  baseURL: `${BACKEND_URL}${API_PREFIX}`,
});

export const authenticatedInstance = axios.create({
  baseURL: `${BACKEND_URL}${API_PREFIX}`,
  withCredentials: true,
});

authenticatedInstance.interceptors.request.use(
  async (config) => {
    const tokenStr = localStorage.getItem("token");
    if (!tokenStr) {
      throw new Error("No token found");
    }

    const token = JSON.parse(tokenStr);

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
