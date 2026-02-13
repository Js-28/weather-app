// import { useSelector } from "react-redux";
// import { Navigate, useLocation } from "react-router-dom";

// const AuthGate = ({ children, requireAuth }) => {
//   const { isAuthenticated, checkingAuth } = useSelector(
//     (state) => state.auth
//   );
//   const location = useLocation();

//   if (checkingAuth) {
//     return <div>Loading...</div>;
//   }

//   // 🔐 If route requires auth but user is NOT authenticated
//   if (requireAuth && !isAuthenticated) {
//     return <Navigate to="/" replace state={{ from: location }} />;
//   }

//   // 🚫 If route is public but user IS authenticated
//   if (!requireAuth && isAuthenticated) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return children;
// };

// export default AuthGate;


import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { fetchMe } from "../features/auth/authThunks";

const AuthGate = ({ children, requireAuth }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, checkingAuth } = useSelector(state => state.auth);
  const location = useLocation();

  // Only fetchMe if auth not known yet
  useEffect(() => {
    if (checkingAuth) {
      dispatch(fetchMe());
    }
  }, [dispatch, checkingAuth]);

  if (checkingAuth) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        Checking session...
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AuthGate;
