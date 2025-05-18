import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_organization")({
  component: OrganizationalLayout,
  beforeLoad(ctx) {
    if (!ctx.context.auth.user.organizationId) {
      // https://tanstack.com/router/latest/docs/framework/react/guide/authenticated-routes#redirecting
      throw redirect({
        to: "/home",
        search: {
          redirect: location.pathname,
        },
      });
    }

    return {
      auth: {
        user: {
          ...ctx.context.auth.user,
          organizationId: ctx.context.auth.user.organizationId,
        },
      },
    };
  },
});

function OrganizationalLayout() {
  // TODO: We can create an organization context.
  return <Outlet />;
}
