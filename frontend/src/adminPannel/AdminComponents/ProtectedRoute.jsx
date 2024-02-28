import { useEffect } from "react";
import { useAdminAuth } from "../AdminContexts/AdminAuthContext";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ element }) => {
  const { authenticated } = useAdminAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate("/admin");
    }
  }, [authenticated, navigate]);

  return authenticated ? element : null;
};
