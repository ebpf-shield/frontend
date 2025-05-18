import { TokenUser, tokenUserSchema } from "@/models/auth.model";
import { Buffer } from "buffer";
import { PropsWithChildren, useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { AuthContext } from "./context";

const parseJwt = (token: string) => {
  try {
    const user = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    return tokenUserSchema.parse(user);
  } catch (_error: unknown) {
    return null;
  }
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useLocalStorage<string>("token", "");
  const [user, setUser] = useState<TokenUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (token && !isAuthenticated) {
      const user = parseJwt(token);
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      }
    }
  }, [token, isAuthenticated]);

  const handleLogin = (token: string) => {
    const user = parseJwt(token);
    if (user) {
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);

      return user;
    } else {
      throw new Error("Invalid token");
    }
  };

  const handleLogout = async () => {
    setToken("");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        handleLogin: handleLogin,
        handleLogout: handleLogout,
        token: token,
        user: user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
