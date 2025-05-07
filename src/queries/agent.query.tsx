import { agentService } from "@/services/agent.service";
import { queryOptions } from "@tanstack/react-query";
import { ObjectId } from "bson";

const PREFIX = "agent" as const;

class AgentQuery {
  keys = {
    getAll: [PREFIX],
    getAllWithProcesses: [PREFIX, "processes"],
    getById: (id: string) => [PREFIX, id],
    getByIdWithProcesses: (id: string) => [PREFIX, id, "processes"],
  };

  getAllQueryOptions = (embed_processes: boolean) => {
    return queryOptions({
      queryKey: this.keys.getAll,
      queryFn: () => agentService.getAll(embed_processes),
    });
  };

  getAllWithProcessesQueryOptions = () => {
    return queryOptions({
      queryKey: this.keys.getAllWithProcesses,
      queryFn: () => agentService.getAllWithProcesses(),
    });
  };

  getByIdQueryOptions = (agentId: ObjectId) => {
    return queryOptions({
      queryKey: this.keys.getByIdWithProcesses(agentId.toString()),
      queryFn: () => agentService.getById(agentId),
    });
  };

  getByIdWithProcessesQueryOptions = (agentId: ObjectId) => {
    return queryOptions({
      queryKey: this.keys.getByIdWithProcesses(agentId.toString()),
      queryFn: () => agentService.getByIdWithProcesses(agentId),
    });
  };
}

export const agentQuery = new AgentQuery();
