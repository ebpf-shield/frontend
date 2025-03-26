import { ObjectId } from "bson";
import { agentSchema } from "../models/agent.model";
import { axiosInstance } from "./index.service";

const PREFIX = "agent" as const;

export class AgentService {
  async getAgents() {
    const agents = await axiosInstance.get(`${PREFIX}`);

    try {
      return agentSchema.array().parse(agents.data);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to parse agents");
    }
  }

  async getAgentById(id: ObjectId) {
    const agent = await axiosInstance.get(`${PREFIX}/${id.toString()}`);

    try {
      return agentSchema.parse(agent.data);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to parse agent");
    }
  }
}

export const agentService = new AgentService();
