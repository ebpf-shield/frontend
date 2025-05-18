import { UserWithOrgHome } from "@/components/UserWithOrgHome";
import { UserWithoutOrgHome } from "@/components/UserWithoutOrgHome";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/home")({
  component: HomeComponent,
});

function HomeComponent() {
  const { auth } = Route.useRouteContext();
  if (auth.user.organizationId) {
    return <UserWithOrgHome user={{ ...auth.user, organizationId: auth.user.organizationId }} />;
  }

  return <UserWithoutOrgHome user={auth.user} />;
}
