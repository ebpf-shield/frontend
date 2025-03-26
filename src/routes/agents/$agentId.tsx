import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DATE_LOCALS, DATE_OPTIONS } from "@/constants/date.constants";
import { getAgentByIdQueryOptions } from "@/queries/agent.query";
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
    opts.context.queryClient.ensureQueryData(getAgentByIdQueryOptions(opts.params.agentId));
  },
});

function AgentComponent() {
  const params = Route.useParams();
  const getAgentByIdQuery = useSuspenseQuery(getAgentByIdQueryOptions(params.agentId));
  const agent = getAgentByIdQuery.data;

  return (
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
    </div>
  );
}
