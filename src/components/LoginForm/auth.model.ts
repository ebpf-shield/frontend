import { userSchema } from "@/models/user.model";
import { z } from "zod";

export const loginFormSchema = userSchema.extend({
  confirmPassword: userSchema.shape.password,
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
