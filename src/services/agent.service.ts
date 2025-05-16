import { ObjectId } from "bson";
import { agentSchema, agentWithProcessesSchema } from "../models/agent.model";
import { authenticatedInstance } from "./index.service";
import axios from "axios";
import { ZodError } from "zod";

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
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data);
        console.log(error.message);
        throw error;
      }

      if (error instanceof ZodError) {
        console.error("Zod error:", error.errors);
        throw new Error("Failed to parse agents");
      }

      throw new Error("Failed to parse agents");
    }
  }

  async getAllWithProcesses() {
    try {
      const res = await authenticatedInstance.get(`${PREFIX}?embed_processes=true`);

      return agentWithProcessesSchema.array().parse(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }

      if (error instanceof ZodError) {
        throw new Error("Failed to parse agents with processes");
      }

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
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data);
        console.log(error.message);
        throw error;
      }

      if (error instanceof ZodError) {
        console.error("Zod error:", error.errors);
        throw new Error("Failed to parse agent with id " + id.toString());
      }

      throw new Error(`Failed to parse agent with id ${id.toString()}`);
    }
  }

  async getByIdWithProcesses(id: ObjectId) {
    try {
      const res = await authenticatedInstance.get(
        `${PREFIX}/${id.toString()}?embed_processes=true`
      );
      return agentWithProcessesSchema.parse(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data);
        console.log(error.message);
        throw error;
      }

      if (error instanceof ZodError) {
        console.error("Zod error:", error.errors);
        throw new Error(`Failed to parse agent with processes with id ${id.toString()}`);
      }

      throw new Error(`Failed to parse agent with processes with id ${id.toString()}`);
    }
  }
}

export const agentService = new AgentService();
