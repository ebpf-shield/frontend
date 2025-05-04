import { z } from "zod";
import { customValidation, stringSchema } from "../utils/zod.util";

export const RULE_CHAIN = {
  INPUT: "INPUT",
  FORWARD: "FORWARD",
  OUTPUT: "OUTPUT",
} as const;
export type RuleChain = (typeof RULE_CHAIN)[keyof typeof RULE_CHAIN];

export const RULE_ACTION = ["ACCEPT", "DROP", "REJECT"] as const;
export type RuleAction = (typeof RULE_ACTION)[number];

export const RULE_PROTOCOL = ["TCP", "UDP", "ICMP"] as const;
export type RuleProtocol = (typeof RULE_PROTOCOL)[number];

export const RULE_MIN_PORT_RANGE = 0;
export const RULE_MAX_PORT_RANGE = 65535;

export const baseRuleSchema = z.object({
  _id: customValidation.ObjectId,
  saddr: stringSchema.cidr().or(stringSchema.ip()),
  daddr: stringSchema.cidr().or(stringSchema.ip()),
  sport: z.number().int().min(RULE_MIN_PORT_RANGE).max(RULE_MAX_PORT_RANGE),
  dport: z.number().int().min(RULE_MIN_PORT_RANGE).max(RULE_MAX_PORT_RANGE),
  protocol: z.enum(RULE_PROTOCOL),
  action: z.enum(RULE_ACTION),
  chain: z.nativeEnum(RULE_CHAIN),
  priority: z.number().int().min(0).max(100000).optional(),
  comment: stringSchema.nullish(),
  createdAt: customValidation.dateLikeToDate.optional(),
  updatedAt: customValidation.dateLikeToDate.optional(),
  processId: customValidation.ObjectId,
});

export type BaseRuleSchema = z.infer<typeof baseRuleSchema>;

export const outputRuleSchema = baseRuleSchema
  .pick({
    _id: true,
    daddr: true,
    dport: true,
    protocol: true,
    action: true,
    priority: true,
    comment: true,
    createdAt: true,
    updatedAt: true,
    processId: true,
  })
  .extend({
    chain: z.literal(RULE_CHAIN.OUTPUT), // OUTPUT
  });

export type OutputRuleSchema = z.infer<typeof outputRuleSchema>;

export const inputRuleSchema = baseRuleSchema
  .pick({
    _id: true,
    saddr: true,
    sport: true,
    protocol: true,
    action: true,
    priority: true,
    comment: true,
    createdAt: true,
    updatedAt: true,
    processId: true,
  })
  .extend({
    chain: z.literal(RULE_CHAIN.INPUT), // INPUT
  });

export type InputRuleSchema = z.infer<typeof inputRuleSchema>;

export const ruleSchema = z.union([inputRuleSchema, outputRuleSchema]);

export type RuleSchema = z.infer<typeof ruleSchema>;

export const outputRuleSchemaWithoutId = outputRuleSchema.omit({
  _id: true,
});

export type OutputRuleSchemaWithoutId = z.infer<typeof outputRuleSchemaWithoutId>;

export const inputRuleSchemaWithoutId = inputRuleSchema.omit({
  _id: true,
});

export type InputRuleSchemaWithoutId = z.infer<typeof inputRuleSchemaWithoutId>;

export type RuleSchemaWithoutId = InputRuleSchemaWithoutId | OutputRuleSchemaWithoutId;
