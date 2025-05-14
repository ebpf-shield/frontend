import { z } from "zod";
import { userSchema } from "./user.model";

export const tokenUserSchema = userSchema.pick({
  email: true,
});

export type TokenUser = z.infer<typeof tokenUserSchema>;

export const tokenResponseSchema = z.object({
  // Don't know if this is correct but we may add refresh token in the future
  access_token: z.string(),
  token_type: z.literal("bearer"),
});
