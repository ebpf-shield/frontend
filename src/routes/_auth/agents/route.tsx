import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/agents")({
  component: AgentLayoutComponent,
});

function AgentLayoutComponent() {
  console.log("AgentLayoutComponent");
  return (
    <>
      <div className="flex flex-col items-center justify-start size-full">
        <Outlet />
      </div>
    </>
  );
}
