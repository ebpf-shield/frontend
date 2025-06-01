import { userSchema } from "@/models/user.model";
import { FileRouteTypes } from "@/routeTree.gen";
import { customValidation } from "@/utils/zod.util";
import { z } from "zod";

export const loginFormSchema = userSchema
  .pick({
    email: true,
  })
  .extend({
    password: customValidation.password,
  });

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export const loginFallbackRoute: FileRouteTypes["to"] = "/home-without-org" as const;
