import { processService } from "@/services/process.service";
import { ObjectId } from "bson";

class ProcessQuery {
  keys = {
    getByAgentId: (agentId: ObjectId) => ["process", "agent", agentId],
    getById: (processId: ObjectId) => ["process", processId],
    getByIdWithRules: (processId: ObjectId) => ["process", processId, "rules"],
  };

  getByAgentIdQueryOptions = (agentId: ObjectId) => {
    return {
      queryKey: this.keys.getByAgentId(agentId),
      queryFn: () => processService.getByAgentId(agentId),
    };
  };

  getByIdQueryOptions = (processId: ObjectId) => {
    return {
      queryKey: this.keys.getById(processId),
      queryFn: () => processService.getById(processId),
    };
  };

  getByIdWithRulesQueryOptions = (processId: ObjectId) => {
    return {
      queryKey: this.keys.getByIdWithRules(processId),
      queryFn: () => processService.getByIdWithRules(processId),
    };
  };
}

export const processQuery = new ProcessQuery();
