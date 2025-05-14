import { LoginFormSchema } from "@/components/LoginForm/login.model";
import { axiosInstance } from "./index.service";
import { tokenResponseSchema } from "@/models/auth.model";
import { RegisterFormRouteSchema } from "@/components/RegisterForm/register.model";

const PREFIX = "auth" as const;

export const authService = {
  async login(data: LoginFormSchema) {
    try {
      const res = await axiosInstance.post(`${PREFIX}/login`, data);
      return tokenResponseSchema.parse(res.data);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to login");
    }
  },

  async register(data: RegisterFormRouteSchema) {
    try {
      const res = await axiosInstance.post(`${PREFIX}/register`, data);
      return tokenResponseSchema.parse(res.data);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to register");
    }
  },
} as const;
