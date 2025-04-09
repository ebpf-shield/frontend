import { ObjectId } from "bson";
import { axiosInstance } from "./index.service";
import { processSchema, processWithRulesSchema } from "@/models/process.model";

const PREFIX = "process" as const;

class ProcessService {
  async getByAgentId(agentId: ObjectId) {
    const res = await axiosInstance.get(`${PREFIX}/agent/${agentId.toString()}`);

    try {
      return processSchema.array().parse(res.data);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to parse processes");
    }
  }

  async getById(processId: ObjectId) {
    const res = await axiosInstance.get(`${PREFIX}/${processId.toString()}`);

    try {
      return processSchema.parse(res.data);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to parse process");
    }
  }

  async getByIdWithRules(processId: ObjectId) {
    const res = await axiosInstance.get(`${PREFIX}/${processId.toString()}?embed_rules=true`);

    try {
      return processWithRulesSchema.parse(res.data);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to parse process with rules");
    }
  }
}

export const processService = new ProcessService();
