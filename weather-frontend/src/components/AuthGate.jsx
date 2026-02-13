import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AuthGate = ({ children, requireAuth }) => {
  const { isAuthenticated, checkingAuth } = useSelector(
    (state) => state.auth
  );
  const location = useLocation();

  if (checkingAuth) {
    return <div>Loading...</div>;
  }

  // 🔐 If route requires auth but user is NOT authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // 🚫 If route is public but user IS authenticated
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AuthGate;
