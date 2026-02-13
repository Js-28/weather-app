import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // THIS IS THE MAGIC LINE
    window.history.replaceState(null, "", "/dashboard");

    // then navigate
    navigate("/dashboard", { replace: true });
  }, [navigate]);

  return (
    <div style={{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
      Signing you in...
    </div>
  );
}