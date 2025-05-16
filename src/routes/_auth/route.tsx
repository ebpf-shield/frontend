import { createFileRoute, Navigate, Outlet, redirect } from "@tanstack/react-router";
import axios from "axios";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
  beforeLoad(ctx) {
    if (!ctx.context.auth.isAuthenticated || !ctx.context.auth.user || !ctx.context.auth.token) {
      // https://tanstack.com/router/latest/docs/framework/react/guide/authenticated-routes#redirecting
      throw redirect({
        to: "/login",
        search: {
          redirect: location.pathname,
        },
      });
    }

    // We have to be explicit.
    return {
      auth: {
        user: ctx.context.auth.user,
        token: ctx.context.auth.token,
        isAuthenticated: ctx.context.auth.isAuthenticated,
      },
    };
  },
  errorComponent: ({ error }) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        return <Navigate to="/home" />;
      }
    }

    return "hello";
  },
});

function AuthLayout() {
  // Don't render <Outlet /> - Why did I say this?
  // return <Navigate to="/agents" />;
  return <Outlet />; // Render <Outlet /> to show the child routes
}
