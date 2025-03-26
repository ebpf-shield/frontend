import { z } from "zod";
import { customValidation, stringSchema } from "../utils/zod.util";
import { ruleSchema } from "./rule.model";
import { processSchema } from "./process.model";

export const agentSchema = z.object({
  _id: customValidation.ObjectId,
  name: stringSchema,
  createdAt: customValidation.dateLikeToDate,
  updatedAt: customValidation.dateLikeToDate,
  rules: z.array(ruleSchema).optional(),
  processes: z.array(processSchema).optional(),
});

export type Agent = z.infer<typeof agentSchema>;
