import { AgentCard } from "@/components/AgentCard";
import { AgentHeader } from "@/components/AgentHeader";
import { agentQuery } from "@/queries/agent.query";
import { zodValidator } from "@tanstack/zod-adapter";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { z } from "zod";
import { AgentWithProcesses } from "@/models/agent.model";

const agentSearchParams = z.object({
  filter: z.string().optional(),
});

export const Route = createFileRoute("/agents/")({
  component: AgentsIndexComponent,
  validateSearch: zodValidator(agentSearchParams),
  loader({ context: { queryClient } }) {
    queryClient.ensureQueryData(agentQuery.getAllWithProcessesQueryOptions());
  },
});

const routeApi = getRouteApi("/agents/");

function AgentsIndexComponent() {
  const getAgentsQeury = useSuspenseQuery(agentQuery.getAllWithProcessesQueryOptions());
  const { filter } = routeApi.useSearch();

  const filterByName = (agent: AgentWithProcesses) => {
    if (!filter) return true;

    const lowerCaseFilter = filter.toLowerCase();
    const agentName = agent.name.toLowerCase();

    return agentName.includes(lowerCaseFilter);
  };

  const agents = getAgentsQeury.data
    .filter(filterByName)
    .map((agent) => <AgentCard agent={agent} />);

  return (
    <div
      className="flex flex-col items-center justify-start h-full w-full overflow-auto"
      style={{ outline: "red 1px solid" }}
    >
      <AgentHeader />
      <div className="container mx-auto py-8 px-4 ">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">{agents}</div>
      </div>
    </div>
  );
}
