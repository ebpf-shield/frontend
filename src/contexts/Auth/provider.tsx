import { TokenUser, userSchema } from "@/models/user.model";
import { PropsWithChildren, useState } from "react";
import { useLocalStorage } from "react-use";
import { AuthContext } from "./context";

const parseJwt = (token: string) => {
  try {
    const user = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    return userSchema.parse(user);
  } catch (_error: unknown) {
    return null;
  }
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useLocalStorage<string>("token", "");
  const [user, setUser] = useState<TokenUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async () => {
    console.log("handleLogin");
    const token = "1.1.1";
    parseJwt(token);
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
