import {
  baseRuleSchema,
  inputRuleSchema,
  inputRuleSchemaWithoutId,
  outputRuleSchema,
  outputRuleSchemaWithoutId,
} from "@/models/rule.model";
import { z } from "zod";

const stringZeroValueToUndefinedOrNull = (val: string | null | undefined) => {
  if (val === null) {
    return null;
  }
  if (!val) {
    return undefined;
  }
  return val;
};

const numberZeroValueToUndefined = (val: number | undefined) => {
  if (!val) {
    return undefined;
  }
  return val;
};

export const outputRuleFormSchemaWithoutId = outputRuleSchemaWithoutId.extend({
  dport: baseRuleSchema.shape.dport.nullish(),

  priority: outputRuleSchema.shape.priority.transform(numberZeroValueToUndefined),

  comment: outputRuleSchema.shape.comment.transform(stringZeroValueToUndefinedOrNull),
});

export type OutputRuleFormSchemaWithoutId = z.infer<typeof outputRuleFormSchemaWithoutId>;

export const inputRuleFormSchemaWithoutId = inputRuleSchemaWithoutId.extend({
  sport: baseRuleSchema.shape.sport.nullish(),

  priority: inputRuleSchema.shape.priority.transform(numberZeroValueToUndefined),

  comment: inputRuleSchema.shape.comment.transform(stringZeroValueToUndefinedOrNull),
});

export type InputRuleFormSchemaWithoutId = z.infer<typeof inputRuleFormSchemaWithoutId>;

export type RuleFormSchemaWithoutId = InputRuleFormSchemaWithoutId | OutputRuleFormSchemaWithoutId;
