import { ProcessesTable } from "@/components/ProcessesTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DATE_LOCALS, DATE_OPTIONS } from "@/constants/date.constants";
import { agentQuery } from "@/queries/agent.query";
import { customValidation } from "@/utils/zod.util";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/agents/$agentId")({
  component: AgentComponent,
  params: {
    parse: (params) => {
      const parsed = customValidation.ObjectId.safeParse(params.agentId);

      if (parsed.success) {
        return {
          agentId: parsed.data,
        };
      }

      throw new Error("Agent not found");
    },
    stringify: (params) => ({
      agentId: params.agentId.toString(),
    }),
  },
  loader(opts) {
    opts.context.queryClient.ensureQueryData(
      agentQuery.getByIdWithProcessesQueryOptions(opts.params.agentId)
    );
  },
});

function AgentComponent() {
  const params = Route.useParams();
  const getAgentByIdQuery = useSuspenseQuery(
    agentQuery.getByIdWithProcessesQueryOptions(params.agentId)
  );
  const agent = getAgentByIdQuery.data;
  const [showProcesses, setShowProcesses] = useState(true);

  return (
    <>
      <h2 className="text-2xl">Agent {agent.name}</h2>
      <div className="container mx-auto p-6 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{agent.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">
              Created: {agent.createdAt.toLocaleString(DATE_LOCALS, DATE_OPTIONS)}
            </p>
            <p className="text-gray-500">
              Updated: {agent.updatedAt.toLocaleString(DATE_LOCALS, DATE_OPTIONS)}
            </p>
          </CardContent>
        </Card>

        {agent.processes.length > 0 ? (
          <Button variant="outline" onClick={() => setShowProcesses((prev) => !prev)}>
            {showProcesses ? "Hide Processes" : "Show Processes"}
          </Button>
        ) : (
          <p>No processes found</p>
        )}

        {showProcesses && (
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Processes</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="rounded-md border">
                <ProcessesTable data={agent.processes} />
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
