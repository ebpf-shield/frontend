import axios from "axios";
import { env } from "../utils/env.util.ts";
import { ZodError } from "zod";

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

authenticatedInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("Error response", error);
    // https://dev.to/zeeshanali0704/authentication-in-react-with-jwts-access-refresh-tokens-569i
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const errorHelper = (error: unknown, uncatchedMessage?: string) => {
  if (axios.isAxiosError(error)) {
    return error;
  }

  if (error instanceof ZodError) {
    return error;
  }

  return new Error(uncatchedMessage);
};
