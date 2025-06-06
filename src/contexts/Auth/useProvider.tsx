import { useContext } from "react";
import { AuthContext } from "./context";

export const useAuthContext = () => {
  // Please create something like
  // https://tanstack.com/router/latest/docs/framework/react/guide/router-context#invalidating-the-router-context

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return authContext;
};
