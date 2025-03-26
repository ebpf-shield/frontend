import { AgentsTable } from "@/components/AgentsTable";
import { getAgentsQueryOptions } from "@/queries/agent.query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/agents/")({
  component: AgentsIndexComponent,
  loader({ context: { queryClient } }) {
    queryClient.ensureQueryData(getAgentsQueryOptions);
  },
});

function AgentsIndexComponent() {
  const getAgentsQeury = useSuspenseQuery(getAgentsQueryOptions);
  return (
    <>
      <h2 className="text-2xl">Agents</h2>
      <AgentsTable data={getAgentsQeury.data} />
    </>
  );
}
