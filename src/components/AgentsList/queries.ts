import { useQuery } from "@tanstack/react-query";
import { agentService } from "../../services/agent.service";

export const keys = {
  getAgents: ["agents"],
};

export const useGetAgentsQuery = () => {
  return useQuery({
    queryKey: keys.getAgents,
    queryFn: agentService.getAgents,
  });
};
