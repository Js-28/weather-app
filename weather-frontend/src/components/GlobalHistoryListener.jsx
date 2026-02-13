// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// export default function GlobalHistoryListener() {
//   const { isAuthenticated } = useSelector((state) => state.auth);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handlePop = () => {
//       if (window.location.pathname === "/dashboard" && !isAuthenticated) {
//         // Force redirect immediately if not authenticated
//         console.log("User not authenticated, redirecting to login");
//     window.location.href = "/";
//       }
//       if (window.location.pathname === "/" && isAuthenticated) {
//         // Prevent going back to login after login
//         console.log("User is authenticated, redirecting to dashboard");
//     window.location.href = "/dashboard";
//       }
//     };

//     window.addEventListener("popstate", handlePop);

//     return () => window.removeEventListener("popstate", handlePop);
//   }, [isAuthenticated, navigate]);

//   return null;
// }


import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function GlobalHistoryListener() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && window.location.pathname === "/") {
      window.location.replace("/dashboard");
    }

    if (!isAuthenticated && window.location.pathname === "/dashboard") {
      window.location.replace("/");
    }
  }, [isAuthenticated]);

  return null;
}