import { z } from "zod";
import { customValidation, stringSchema } from "../utils/zod.util";
import { processSchema } from "./process.model";

export const agentSchema = z.object({
  _id: customValidation.ObjectId,
  name: stringSchema,
  createdAt: customValidation.dateLikeToDate,
  updatedAt: customValidation.dateLikeToDate,
  online: z.boolean(),
});

export type Agent = z.infer<typeof agentSchema>;

export const agentWithProcessesSchema = agentSchema.extend({
  processes: z.array(processSchema).default([]),
});

export type AgentWithProcesses = z.infer<typeof agentWithProcessesSchema>;
