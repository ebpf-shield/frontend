import { userSchema } from "@/models/user.model";
import { customValidation } from "@/utils/zod.util";
import { z } from "zod";

export const registerFormSchema = userSchema
  .pick({
    email: true,
    name: true,
    password: true,
  })
  .extend({
    confirmPassword: userSchema.shape.password,
    organizationId: customValidation.ObjectId.optional(),
    createOrganization: z.boolean().optional(),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;

export type RegisterFormRouteSchema = Omit<RegisterFormSchema, "confirmPassword">;
