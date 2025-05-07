import { stringSchema } from "@/utils/zod.util";
import { z } from "zod";

export const userSchema = z.object({
  name: stringSchema,
  email: stringSchema.email(),
  password: stringSchema.min(8).max(100),
});

export type User = z.infer<typeof userSchema>;

export const tokenUserSchema = z.object({
  name: userSchema.shape.name,
  email: userSchema.shape.email,
});

export type TokenUser = z.infer<typeof tokenUserSchema>;
