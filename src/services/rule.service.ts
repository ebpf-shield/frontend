import { Rule, ruleSchema } from "@/models/rule.model";
import { axiosInstance } from "./index.service";

const PREFIX = "rule" as const;

export class RuleService {
  async create(rule: Rule) {
    const res = await axiosInstance.post(`${PREFIX}`, rule);

    try {
      return ruleSchema.parse(res.data);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to parse rule");
    }
  }
}

export const ruleService = new RuleService();
