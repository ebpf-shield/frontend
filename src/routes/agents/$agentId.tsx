import { AgentDetailHeader } from "@/components/AgentDetailHeader";
import { AgentProcessesPanel } from "@/components/AgentProcessesPanel";
import { Separator } from "@/components/ui/separator";
import { agentQuery } from "@/queries/agent.query";
import { customValidation } from "@/utils/zod.util";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

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

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <AgentDetailHeader agent={agent} />

      <div className="container mx-auto py-6 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Agent Details</h1>
          <p className="text-gray-400">Manage and monitor this agent and its processes</p>
          <Separator className="mt-4 bg-gray-700" />
        </div>
      </div>

      <div className="grid lg:grid-cols-12">
        <div className="lg:col-span-8 lg:col-start-3">
          <AgentProcessesPanel agent={agent} />
        </div>
      </div>
    </div>
  );
}
