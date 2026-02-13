import { Outlet } from "react-router-dom";
import AuthGate from "../components/AuthGate";

const AuthLayout = () => {
  return (
    <AuthGate requireAuth={true}>
      <Outlet />
    </AuthGate>
  );
};

export default AuthLayout;
