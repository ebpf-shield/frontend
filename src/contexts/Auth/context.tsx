/**
 * TODO?: We can use a framework for authentication without the need to implement it ourselves.
 * We all know that any client-side authentication is not secure, so we know that a person can 'see' the first page
 * without being authenticated.
 * */

import { TokenUser } from "@/models/user.model";
import { createContext } from "react";

export interface AuthContextProps {
  isAuthenticated: boolean;
  handleLogin: () => Promise<void>;
  handleLogout: () => Promise<void>;
  token: string | undefined;
  user: TokenUser | null;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  handleLogin: async () => {},
  handleLogout: async () => {},
  token: undefined,
  user: null,
});
