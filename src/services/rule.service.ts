import { RuleFormSchemaWithoutId } from "@/components/FirewallRuleDialog/FirewallRuleFormTabs/firewallRule.model";
import { ruleSchema } from "@/models/rule.model";
import { ObjectId } from "bson";
import { authenticatedInstance } from "./index.service";

const PREFIX = "rule" as const;

export class RuleService {
  async create(rule: RuleFormSchemaWithoutId) {
    try {
      const res = await authenticatedInstance.post(`${PREFIX}`, rule);
      return ruleSchema.parse(res.data);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to parse rule");
    }
  }

  async delete(ruleId: ObjectId) {
    try {
      const res = await authenticatedInstance.delete(`${PREFIX}/${ruleId.toString()}`);
      return res;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete rule");
    }
  }

  async update(ruleId: ObjectId, rule: RuleFormSchemaWithoutId) {
    try {
      const res = await authenticatedInstance.patch(`${PREFIX}/${ruleId.toString()}`, rule);
      return res;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update rule");
    }
  }
}

export const ruleService = new RuleService();
