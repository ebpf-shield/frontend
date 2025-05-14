import { userSchema } from "@/models/user.model";
import { FileRouteTypes } from "@/routeTree.gen";
import { z } from "zod";

export const loginFormSchema = userSchema.pick({
  email: true,
  password: true,
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export const loginFallbackRoute: FileRouteTypes["to"] = "/agents" as const;
