import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/agents/processes")({
  component: ProcessLayoutComponent,
});

function ProcessLayoutComponent() {
  return <div>Hello "/agents/proccesses"!</div>;
}
