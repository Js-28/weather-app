import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function GlobalHistoryListener() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const handlePop = () => {
      if (window.location.pathname === "/dashboard" && !isAuthenticated) {
        // Force redirect immediately if not authenticated
        navigate("/", { replace: true });
      }
      if (window.location.pathname === "/" && isAuthenticated) {
        // Prevent going back to login after login
        navigate("/dashboard", { replace: true });
      }
    };

    window.addEventListener("popstate", handlePop);

    return () => window.removeEventListener("popstate", handlePop);
  }, [isAuthenticated, navigate]);

  return null;
}
