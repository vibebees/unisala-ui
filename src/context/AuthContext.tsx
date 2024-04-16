import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string>("");
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{ user, authenticated, setAuthenticated, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
