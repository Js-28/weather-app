import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMe } from "../features/auth/authThunks";

export default function AuthSuccess() {
  const dispatch = useDispatch();

  useEffect(() => {
    const completeLogin = async () => {

      // 1️⃣ load the cookie session
      await dispatch(fetchMe());

      // 2️⃣ now destroy ALL previous navigation history
      window.history.replaceState(null, "", "/dashboard");

      // 3️⃣ hard navigate (VERY IMPORTANT)
      window.location.assign("/dashboard");

    };

    completeLogin();
  }, [dispatch]);

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