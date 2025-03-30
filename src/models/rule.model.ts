import { z } from "zod";
import { customValidation, stringSchema } from "../utils/zod.util";

export const RULE_CHAIN = ["INPUT", "OUTPUT"] as const;
export type RuleChain = (typeof RULE_CHAIN)[number];

export const RULE_ACTION = ["ACCEPT", "DROP", "REJECT"] as const;
export type RuleAction = (typeof RULE_ACTION)[number];

export const ruleSchema = z.object({
  _id: customValidation.ObjectId,
  saddr: stringSchema.ip().optional(),
  daddr: stringSchema.ip().optional(),
  sport: z.number().int().min(0).max(65535),
  dport: z.number().int().min(0).max(65535),
  protocol: stringSchema.optional(),
  action: z.enum(RULE_ACTION).optional(),
  chain: z.enum(RULE_CHAIN).optional(),
  priority: z.number().int().min(0).max(100000),
  comment: stringSchema.optional(),
  created_at: customValidation.dateLikeToDate.optional(),
  updated_at: customValidation.dateLikeToDate.optional(),
  process_id: customValidation.ObjectId,
});

export type Rule = z.infer<typeof ruleSchema>;
