import axios from "axios";
import { env } from "../utils/env.util.ts";

const { VITE_BACKEND_URL: BACKEND_URL } = env;

export const axiosInstance = axios.create({
  baseURL: `${BACKEND_URL}/api`,
});

export const authenticatedInstance = axios.create({
  baseURL: `${BACKEND_URL}/api`,
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
