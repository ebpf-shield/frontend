import { UserWithoutOrgHome } from "@/components/UserWithoutOrgHome";
import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/home-without-org")({
  component: HomeComponent,
  beforeLoad(ctx) {
    if (ctx.context.auth.user.organizationId) {
      throw redirect({
        to: "/home-with-org",
      });
    }
  },
});

function HomeComponent() {
  const { auth } = Route.useRouteContext();

  // Don't think we need this.
  if (auth.user.organizationId) {
    return <Navigate to="/home-with-org" />;
  }

  return <UserWithoutOrgHome user={auth.user} />;
}
