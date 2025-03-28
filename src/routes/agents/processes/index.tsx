import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/agents/processes/")({
  component: ProcessIndexComponent,
});

function ProcessIndexComponent() {
  return <div>Hello "/agents/proccesses/"!</div>;
}
