import { z } from "zod";
import { customValidation, stringSchema } from "../utils/zod.util";

export const processSchema = z.object({
  _id: customValidation.ObjectId,
  command: stringSchema.max(1000),
  pid: z.number().int().min(0).max(65535),
  agentId: customValidation.ObjectId,
});

export type Process = z.infer<typeof processSchema>;
