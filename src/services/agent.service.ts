import { ObjectId } from "bson";
import { agentSchema, agentWithProcessesSchema } from "../models/agent.model";
import { axiosInstance } from "./index.service";

const PREFIX = "agent" as const;

export class AgentService {
  async getAll() {
    const agents = await axiosInstance.get(`${PREFIX}`);

    try {
      return agentSchema.array().parse(agents.data);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to parse agents");
    }
  }

  async getById(id: ObjectId) {
    const agent = await axiosInstance.get(`${PREFIX}/${id.toString()}`);

    try {
      return agentSchema.parse(agent.data);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to parse agent");
    }
  }

  async getByIdWithProcesses(id: ObjectId) {
    const agent = await axiosInstance.get(`${PREFIX}/${id.toString()}?embed_processes=true`);

    try {
      return agentWithProcessesSchema.parse(agent.data);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to parse agent with processes");
    }
  }
}

export const agentService = new AgentService();
