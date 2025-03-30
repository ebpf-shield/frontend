import { agentService } from "@/services/agent.service";
import { queryOptions } from "@tanstack/react-query";
import { ObjectId } from "bson";

class AgentQuery {
  keys = {
    getAll: ["agents"],
    getById: (id: string) => ["agents", id],
    getByIdWithProcesses: (id: string) => ["agents", id, "processes"],
  };

  getAllQueryOptions = (embed_processes: boolean) => {
    return queryOptions({
      queryKey: this.keys.getAll,
      queryFn: () => agentService.getAll(embed_processes),
    });
  };

  getAllWithProcessesQueryOptions = () => {
    return queryOptions({
      queryKey: this.keys.getAll,
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
