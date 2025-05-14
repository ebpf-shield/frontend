import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
  beforeLoad(ctx) {
    if (!ctx.context.auth.isAuthenticated) {
      // https://tanstack.com/router/latest/docs/framework/react/guide/authenticated-routes#redirecting
      throw redirect({
        to: "/login",
        search: {
          redirect: location.pathname,
        },
      });
    }
  },
});

function AuthLayout() {
  // Don't render <Outlet /> - Why did I say this?
  // return <Navigate to="/agents" />;
  return <Outlet />; // Render <Outlet /> to show the child routes
}
