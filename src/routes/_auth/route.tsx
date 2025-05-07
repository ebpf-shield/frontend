import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
  beforeLoad(ctx) {
    if (!ctx.context.auth.isAuthenticated) {
      return;
      // https://tanstack.com/router/latest/docs/framework/react/guide/authenticated-routes#redirecting
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function AuthLayout() {
  // Don't render <Outlet />
  return <Navigate to="/agents" />;
}
