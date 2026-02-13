// src/components/RouteGuard.jsx
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const RouteGuard = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handlePopState = () => {
      // Logged-in users cannot go back to login page
      if (isAuthenticated && location.pathname === "/") {
        navigate("/dashboard", { replace: true });
      }

      // Not logged-in users cannot go to dashboard
      if (!isAuthenticated && location.pathname === "/dashboard") {
        navigate("/", { replace: true });
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isAuthenticated, location.pathname, navigate]);

  return null;
};

export default RouteGuard;
