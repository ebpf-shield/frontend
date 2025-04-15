import { z } from "zod";
import { customValidation, stringSchema } from "../utils/zod.util";

export const RULE_CHAIN = ["INPUT", "OUTPUT"] as const;
export type RuleChain = (typeof RULE_CHAIN)[number];

export const RULE_ACTION = ["ACCEPT", "DROP", "REJECT"] as const;
export type RuleAction = (typeof RULE_ACTION)[number];

export const RULE_PROTOCOL = ["TCP", "UDP", "ICMP"] as const;
export type RuleProtocol = (typeof RULE_PROTOCOL)[number];

export const RULE_MIN_PORT_RANGE = 0;
export const RULE_MAX_PORT_RANGE = 65535;

export const ruleSchema = z.object({
  _id: customValidation.ObjectId,
  saddr: stringSchema.ip().optional(),
  daddr: stringSchema.ip().optional(),
  sport: z.number().int().min(RULE_MIN_PORT_RANGE).max(RULE_MAX_PORT_RANGE),
  dport: z.number().int().min(RULE_MIN_PORT_RANGE).max(RULE_MAX_PORT_RANGE),
  protocol: z.enum(RULE_PROTOCOL).optional(),
  action: z.enum(RULE_ACTION).optional(),
  chain: z.enum(RULE_CHAIN).optional(),
  priority: z.number().int().min(0).max(100000),
  comment: stringSchema.optional(),
  createdAt: customValidation.dateLikeToDate.optional(),
  updatedAt: customValidation.dateLikeToDate.optional(),
  processId: customValidation.ObjectId,
});

export type RuleSchema = z.infer<typeof ruleSchema>;

export const ruleSchemaWithoutId = ruleSchema.omit({
  _id: true,
});

export type RuleSchemaWithoutId = z.infer<typeof ruleSchemaWithoutId>;
