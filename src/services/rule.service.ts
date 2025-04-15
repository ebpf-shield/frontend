import { ruleSchema, RuleSchemaWithoutId } from "@/models/rule.model";
import { axiosInstance } from "./index.service";
import { ObjectId } from "bson";

const PREFIX = "rule" as const;

export class RuleService {
  async create(rule: RuleSchemaWithoutId) {
    try {
      const res = await axiosInstance.post(`${PREFIX}`, rule);
      return ruleSchema.parse(res.data);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to parse rule");
    }
  }

  async delete(ruleId: ObjectId) {
    try {
      const res = await axiosInstance.delete(`${PREFIX}/${ruleId.toString()}`);
      return res;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete rule");
    }
  }
}

export const ruleService = new RuleService();
