import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../bindings/User";
import { URI } from "../constants";

const AuthContext = createContext({
  isAuthenticated: false,
  isLoading: true,
  setAuthenticated: undefined,
  authUser: null,
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuth] = useState(false);
  const [authUser, setUser] = useState<string>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const res = await fetch(URI + "/users/checkAuth");
        setAuthenticated(await res.text());
      } catch {
        setAuthenticated(null);
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  function setAuthenticated(username: string) {
    if (username == null) {
      setAuth(false);
    } else {
      setAuth(true);
    }

    setUser(username);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        setAuthenticated,
        authUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const useIsAuthenticated = () => {
  const context = useAuth();
  return context.isAuthenticated;
};
