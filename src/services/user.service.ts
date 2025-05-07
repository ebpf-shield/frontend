import { axiosInstance } from "./index.service";

const PREFIX = "user" as const;

export const userService = {
  async login() {
    try {
      const res = await axiosInstance.post(`${PREFIX}/login`, {
        username: "admin",
        password: "admin",
      });
      return res.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to login");
    }
  },
} as const;
