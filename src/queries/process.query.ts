import { processService } from "@/services/process.service";
import { ObjectId } from "bson";

class ProcessQuery {
  keys = {
    getByAgentId: (agentId: ObjectId) => ["process", "agent", agentId],
  };

  getByAgentIdQueryOptions = (agentId: ObjectId) => {
    return {
      queryKey: this.keys.getByAgentId(agentId),
      queryFn: () => processService.getByAgentId(agentId),
    };
  };
}

export const processQuery = new ProcessQuery();
