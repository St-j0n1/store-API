import { createContext, useContext, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  return useContext(AdminAuthContext);
};

export const AdminAuthProvider = ({ children }) => {
  const [adminAuth, setAdminAuth] = useLocalStorage(
    "adminAuthentication",
    false
  );
  const [authenticated, setAuthenticated] = useState(adminAuth);
  const login = () => {
    setAdminAuth(true);
    setAuthenticated(true);
  };

  const logout = () => {
    setAuthenticated(false);
    setAdminAuth(false);
  };
  return (
    <AdminAuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
