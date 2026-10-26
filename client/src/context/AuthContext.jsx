import { createContext, useEffect, useMemo, useState } from "react";
import { authApi } from "@/api/authApi";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  // Restore the login state from the auth cookie on first load
  useEffect(() => {
    authApi
      .getMe()
      .then((data) => {
        setUser(data.user);
        setIsAuthorized(true);
      })
      .catch(() => setIsAuthorized(false))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({ user, setUser, isAuthorized, setIsAuthorized, loading }),
    [user, isAuthorized, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
