import { userSchema } from "@/models/user.model";
import { FileRouteTypes } from "@/routeTree.gen";
import { customValidation } from "@/utils/zod.util";
import { z } from "zod";

// TODO? We could have created an organization while registering.
// TODO? We decided to do it after registration.
export const registerFormSchema = userSchema
  .pick({
    email: true,
    name: true,
  })
  .extend({
    password: customValidation.password,

    confirmPassword: customValidation.password,
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

export const registerFallbackRoute: FileRouteTypes["to"] = "/home-without-org" as const;
