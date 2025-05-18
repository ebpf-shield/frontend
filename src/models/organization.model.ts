import { customValidation, stringSchema } from "@/utils/zod.util";
import { z } from "zod";

export const organizationSchema = z.object({
  _id: customValidation.ObjectId,
  name: stringSchema.min(4).max(50),
  description: stringSchema.min(4).max(50).nullish(),
  createdAt: customValidation.dateLikeToDate,
  updatedAt: customValidation.dateLikeToDate,
});
