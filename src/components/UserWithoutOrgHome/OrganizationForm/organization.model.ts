import { organizationSchema } from "@/models/organization.model";
import { z } from "zod";

export const organizationFormSchema = organizationSchema.pick({
  name: true,
  description: true,
});

export type OrganizationFormSchema = z.infer<typeof organizationFormSchema>;
