import { FirewallRuleDialog } from "@/components/FirewallRuleDialog";
import { ProcessFirewallRulesCard } from "@/components/ProcessFirewallRulesCard";
import { ProcessHeader } from "@/components/ProcessHeader";
import { processQuery } from "@/queries/process.query";
import { customValidation } from "@/utils/zod.util";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/agents/processes/$processId")({
  params: {
    parse: (params) => {
      const parsed = customValidation.ObjectId.safeParse(params.processId);

      if (parsed.success) {
        return {
          processId: parsed.data,
        };
      }

      throw new Error("Agent not found");
    },
    stringify: (params) => ({
      processId: params.processId.toString(),
    }),
  },
  loader(opts) {
    opts.context.queryClient.ensureQueryData(
      processQuery.getByIdWithRulesQueryOptions(opts.params.processId)
    );
  },
  component: ProcessComponent,
});

function ProcessComponent() {
  const params = Route.useParams();
  const getProcessByIdQuery = useSuspenseQuery(
    processQuery.getByIdWithRulesQueryOptions(params.processId)
  );
  const process = getProcessByIdQuery.data;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className="min-h-full w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-x-auto">
        <ProcessHeader setIsDialogOpen={setIsDialogOpen} process={getProcessByIdQuery.data} />

        <div className="container mx-auto py-6 px-4">
          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-9 lg:col-start-2">
              <ProcessFirewallRulesCard
                process={process}
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
              />
            </div>
          </div>
        </div>
      </div>
      <FirewallRuleDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
    </>
  );
}
