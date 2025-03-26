import { agentService } from "@/services/agent.service";
import { queryOptions } from "@tanstack/react-query";
import { ObjectId } from "bson";

export const keys = {
  getAgents: ["agents"],
  getAgentById: (id: string) => ["agents", id],
};

export const getAgentsQueryOptions = queryOptions({
  queryKey: keys.getAgents,
  queryFn: agentService.getAgents,
});

export const getAgentByIdQueryOptions = (agentId: ObjectId) =>
  queryOptions({
    queryKey: keys.getAgentById(agentId.toString()),
    queryFn: () => agentService.getAgentById(agentId),
  });
