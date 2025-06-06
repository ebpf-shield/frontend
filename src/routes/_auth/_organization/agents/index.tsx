import { AgentCard } from "@/components/AgentCard";
import { AgentHeader } from "@/components/AgentHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AgentWithProcesses } from "@/models/agent.model";
import { agentQuery } from "@/queries/agent.query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

const agentSearchParams = z.object({
  filter: z.string().optional(),
});

export const Route = createFileRoute("/_auth/_organization/agents/")({
  component: AgentsIndexComponent,
  // Please make sure you read the docs for the `validateSearch` function
  validateSearch: zodValidator(agentSearchParams),
  loader({ context: { queryClient } }) {
    queryClient.ensureQueryData(agentQuery.getAllWithProcessesQueryOptions());
  },
});

function AgentsIndexComponent() {
  const getAgentsQeury = useSuspenseQuery(agentQuery.getAllWithProcessesQueryOptions());
  const { filter } = Route.useSearch();

  const filterByName = (agent: AgentWithProcesses) => {
    if (!filter) return true;

    const lowerCaseFilter = filter.toLowerCase();
    const agentName = agent.name.toLowerCase();

    return agentName.includes(lowerCaseFilter);
  };

  const agents = getAgentsQeury.data
    .filter(filterByName)
    .map((agent) => <AgentCard key={agent._id.toHexString()} agent={agent} />);

  return (
    <ScrollArea className="flex flex-col items-center justify-start size-full">
      <AgentHeader />
      <div className="container mx-auto py-8 px-4 ">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">{agents}</div>
      </div>
    </ScrollArea>
  );
}
