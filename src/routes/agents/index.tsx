import { AgentCard } from "@/components/AgentCard";
import { AgentHeader } from "@/components/AgentHeader";
import { agentQuery } from "@/queries/agent.query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/agents/")({
  component: AgentsIndexComponent,
  loader({ context: { queryClient } }) {
    queryClient.ensureQueryData(agentQuery.getAllWithProcessesQueryOptions());
  },
});

function AgentsIndexComponent() {
  const getAgentsQeury = useSuspenseQuery(agentQuery.getAllWithProcessesQueryOptions());
  return (
    <>
      <AgentHeader />
      <div className="container mx-auto py-8 px-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {getAgentsQeury.data.map((agent) => (
            <AgentCard agent={agent} />
          ))}
        </div>
      </div>
    </>
  );
}
