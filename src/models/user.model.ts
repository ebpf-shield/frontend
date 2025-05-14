import { customValidation, stringSchema } from "@/utils/zod.util";
import { z } from "zod";

export const userSchema = z.object({
  name: stringSchema,
  email: stringSchema.email(),
  password: stringSchema.min(8).max(100),
  organizationId: customValidation.ObjectId.nullish(),
});

export type User = z.infer<typeof userSchema>;
