import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_organization/agents")({
  component: AgentLayoutComponent,
});

function AgentLayoutComponent() {
  return (
    <>
      <div className="flex flex-col items-center justify-start size-full">
        <Outlet />
      </div>
    </>
  );
}
