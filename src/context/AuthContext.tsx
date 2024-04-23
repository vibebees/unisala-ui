import { getCache, setCache } from "@utils/cache";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IAuthData | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const userdata: IAuthData | null = getCache("authData");
    if (userdata) {
      setUser(userdata);
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const UpdateAuth = (data: IAuthData) => {
    let userdata = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      newUser: data.newUser,
      role: data.role,
    };
    setUser(userdata);
    setCache("authData", userdata);
    setAuthenticated(true);
  };

  const ClearAuth = () => {
    setUser(null);
    setCache("authData", null);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated,
        UpdateAuth,
        ClearAuth,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};
