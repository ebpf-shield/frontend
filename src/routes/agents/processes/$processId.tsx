import { customValidation } from "@/utils/zod.util";
import { createFileRoute } from "@tanstack/react-router";

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
  component: ProcessComponent,
});

function ProcessComponent() {
  return <div>Hello "/agents/proccesses/$processId"!</div>;
}
