import { ObjectId } from "bson";
import { axiosInstance } from "./index.service";
import { processSchema } from "@/models/process.model";

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
}

export const processService = new ProcessService();
