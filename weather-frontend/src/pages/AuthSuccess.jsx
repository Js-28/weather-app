// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { fetchMe } from "../features/auth/authThunks";

// export default function AuthSuccess() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const completeLogin = async () => {

//       // 1️⃣ load the cookie session
//       await dispatch(fetchMe());

//       // 2️⃣ now destroy ALL previous navigation history
//       window.history.replaceState(null, "", "/dashboard");

//       // 3️⃣ hard navigate (VERY IMPORTANT)
//     //   window.location.assign("/dashboard");
//     window.location.replace("/dashboard");

//     };

//     completeLogin();
//   }, [dispatch]);

//   return (
//     <div style={{
//       height: "100vh",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       fontSize: "20px"
//     }}>
//       Signing you in securely...
//     </div>
//   );
// }


import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMe } from "../features/auth/authThunks";
import { useNavigate } from "react-router-dom";

export default function AuthSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

//   useEffect(() => {
//     const completeLogin = async () => {
//       // hydrate redux from cookie session
//       await dispatch(fetchMe());

//       // internal navigation (NOT browser reload)
//       navigate("/dashboard", { replace: true });
//     };

//     completeLogin();
//   }, [dispatch, navigate]);

  useEffect(() => {
    const completeLogin = async () => {
      await dispatch(fetchMe()); // hydrate redux from cookie
      // small delay to ensure cookie is set in the browser
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 500); // 50ms is enough in almost all cases
    };

    completeLogin();
  }, [dispatch, navigate]);

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "20px"
    }}>
      Signing you in securely...
    </div>
  );
}
