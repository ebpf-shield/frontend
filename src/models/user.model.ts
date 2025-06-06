import { customValidation, stringSchema } from "@/utils/zod.util";
import { z } from "zod";

export const userSchema = z.object({
  _id: customValidation.ObjectId,
  name: stringSchema,
  email: stringSchema.email(),
  organizationId: customValidation.ObjectId.nullish(),
});

export type User = z.infer<typeof userSchema>;

export const userWithOrgSchema = userSchema.extend({
  organizationId: customValidation.ObjectId,
});

export type UserWithOrg = z.infer<typeof userWithOrgSchema>;
