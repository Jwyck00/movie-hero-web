import React, { useContext, useState, type FC, useEffect } from "react";

type AuthContextValue = {
  isLoggedIn: boolean;
  securityToken?: string;
  login: (securityToken: string) => void;
  logout: () => void;
};

export const SECURITY_TOKEN_KEY = "@securityToken";

export const AuthContext = React.createContext<AuthContextValue | null>(null);

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error("Missing parent <AuthProvider> component");
  }
  return ctx;
};

export const AuthProvider: FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [securityToken, setSecurityToken] = useState<undefined | string>(
    undefined
  );

  useEffect(() => {
    const token = localStorage.getItem(SECURITY_TOKEN_KEY);
    if (token) setSecurityToken(token);
  }, []);

  const login = (securityToken: string) => {
    setSecurityToken(securityToken);
    localStorage.setItem(SECURITY_TOKEN_KEY, securityToken);
  };

  const logout = () => {
    setSecurityToken(undefined);
    localStorage.removeItem(SECURITY_TOKEN_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: securityToken !== undefined,
        securityToken: securityToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
