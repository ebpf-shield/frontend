import {
  baseRuleSchema,
  inputRuleSchema,
  inputRuleSchemaWithoutId,
  outputRuleSchema,
  outputRuleSchemaWithoutId,
} from "@/models/rule.model";
import { z } from "zod";

const stringZeroValueToUndefined = (val: string | null | undefined) => {
  if (!val) {
    return undefined;
  }
  return val;
};

const numberZeroValueToUndefined = (val: number | null | undefined) => {
  if (!val) {
    return undefined;
  }
  return val;
};

export const outputRuleFormSchemaWithoutId = outputRuleSchemaWithoutId.extend({
  dport: baseRuleSchema.shape.dport.nullish(),

  priority: outputRuleSchema.shape.priority.transform(numberZeroValueToUndefined),

  comment: outputRuleSchema.shape.comment.transform(stringZeroValueToUndefined),
});

export type OutputRuleFormSchemaWithoutId = z.infer<typeof outputRuleSchemaWithoutId>;

export const inputRuleFormSchemaWithoutId = inputRuleSchemaWithoutId.extend({
  sport: baseRuleSchema.shape.sport.nullish(),

  priority: inputRuleSchema.shape.priority.transform(numberZeroValueToUndefined),

  comment: inputRuleSchema.shape.comment.transform(stringZeroValueToUndefined),
});

export type InputRuleFormSchemaWithoutId = z.infer<typeof inputRuleSchemaWithoutId>;

export type RuleFormSchemaWithoutId = InputRuleFormSchemaWithoutId | OutputRuleFormSchemaWithoutId;
