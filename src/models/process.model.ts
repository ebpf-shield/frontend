import { z } from "zod";
import { customValidation, stringSchema } from "../utils/zod.util";
import { ruleSchema } from "./rule.model";

export const PROCESS_STATUS = ["RUNNING", "STOPPED", "ERROR"] as const;
export type ProcessStatus = (typeof PROCESS_STATUS)[number];

export const processSchema = z.object({
  _id: customValidation.ObjectId,
  command: stringSchema.max(1000),
  pid: z.number().int().min(0).max(1_000_000),
  agentId: customValidation.ObjectId,
  createdAt: customValidation.dateLikeToDate,
  status: z.enum(PROCESS_STATUS),
});

export type Process = z.infer<typeof processSchema>;

export const processWithRulesSchema = processSchema.extend({
  rules: z.array(ruleSchema).default([]),
});

export type ProcessWithRules = z.infer<typeof processWithRulesSchema>;
