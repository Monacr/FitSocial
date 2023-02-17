import { createContext, useContext, useEffect, useState } from "react";
import { URI } from "../constants";

const AuthContext = createContext({
  isAuthenticated: false,
  isLoading: true,
  setAuthenticated: undefined,
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const res = await fetch(URI + "/users/checkAuth");
      setAuthenticated(res.ok);
      setLoading(false);
    };
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        setAuthenticated,
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
