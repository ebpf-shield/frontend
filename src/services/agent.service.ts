import { ObjectId } from "bson";
import { agentSchema, agentWithProcessesSchema } from "../models/agent.model";
import { authenticatedInstance } from "./index.service";

const PREFIX = "agent" as const;

export class AgentService {
  async getAll(embed_processes: boolean = false) {
    try {
      const res = await authenticatedInstance.get(`${PREFIX}?embed_processes=${embed_processes}`);

      if (embed_processes) {
        return agentWithProcessesSchema.array().parse(res.data);
      }

      return agentSchema.array().parse(res.data);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to parse agents");
    }
  }

  async getAllWithProcesses() {
    try {
      const res = await authenticatedInstance.get(`${PREFIX}?embed_processes=true`);

      return agentWithProcessesSchema.array().parse(res.data);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to parse agents with processes");
    }
  }

  async getById(id: ObjectId, embed_processes: boolean = false) {
    try {
      const res = await authenticatedInstance.get(
        `${PREFIX}/${id.toString()}?embed_processes=${embed_processes}`
      );

      if (embed_processes) {
        return agentWithProcessesSchema.parse(res.data);
      }

      return agentSchema.parse(res.data);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to parse agent with processes");
    }
  }

  async getByIdWithProcesses(id: ObjectId) {
    try {
      const res = await authenticatedInstance.get(
        `${PREFIX}/${id.toString()}?embed_processes=true`
      );
      return agentWithProcessesSchema.parse(res.data);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to parse agent with processes");
    }
  }
}

export const agentService = new AgentService();
