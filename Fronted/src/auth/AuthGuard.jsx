import { useEffect } from "react";
import { useNavigate } from "react-router";
import { isAuthenticated } from "./useAuth";

const AuthGuard = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  if (!isAuthenticated()) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
