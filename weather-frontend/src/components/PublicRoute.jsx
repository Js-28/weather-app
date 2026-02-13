// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// const PublicRoute = ({ children }) => {
//   const { isAuthenticated, checkingAuth } = useSelector(state => state.auth);

//   if (checkingAuth) return <div>Loading...</div>;

//   if (isAuthenticated) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return children;
// };

// export default PublicRoute;


// src/components/PublicRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, checkingAuth } = useSelector((state) => state.auth);

  if (checkingAuth) return <div>Loading...</div>;

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />; // replace prevents back
  }

  return children;
};

export default PublicRoute;
