import { AgentsTable } from "@/components/AgentsTable";
import { agentQuery } from "@/queries/agent.query";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/agents/")({
  component: AgentsIndexComponent,
  loader({ context: { queryClient } }) {
    queryClient.ensureQueryData(agentQuery.getAllQueryOptions());
  },
});

function AgentsIndexComponent() {
  const getAgentsQeury = useSuspenseQuery(agentQuery.getAllQueryOptions());
  return (
    <>
      <h2 className="text-2xl">Agents</h2>
      <ScrollArea className="rounded-md border overflow-x-auto">
        <AgentsTable data={getAgentsQeury.data} />
      </ScrollArea>
    </>
  );
}
