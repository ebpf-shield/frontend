import { z } from "zod";
import { userSchema } from "./user.model";
import { customValidation } from "@/utils/zod.util";

export const tokenUserSchema = userSchema
  .pick({
    email: true,
    organizationId: true,
    name: true,
  })
  .extend({
    id: userSchema.shape._id,
  });

export type TokenUser = z.infer<typeof tokenUserSchema>;

export const tokenResponseSchema = z.object({
  // Don't know if this is correct but we may add refresh token in the future
  access_token: z.string(),
  token_type: z.literal("bearer"),
});

export type TokenResponse = z.infer<typeof tokenResponseSchema>;

export const tokenUserWithoutOrgSchema = tokenUserSchema.omit({
  organizationId: true,
});

export type TokenUserWithoutOrgSchema = z.infer<typeof tokenUserWithoutOrgSchema>;

export const tokenUserWithOrgSchema = tokenUserSchema.extend({
  organizationId: customValidation.ObjectId,
});

export type TokenUserWithOrgSchema = z.infer<typeof tokenUserWithOrgSchema>;
