import { UserWithOrgHome } from "@/components/UserWithOrgHome";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_organization/home-with-org")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    auth: { user },
  } = Route.useRouteContext();

  // We can refactor to just use the componentd
  return <UserWithOrgHome user={user} />;
}
