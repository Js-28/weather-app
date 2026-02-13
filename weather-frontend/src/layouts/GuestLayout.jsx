import { Outlet } from "react-router-dom";
import AuthGate from "../components/AuthGate";

const GuestLayout = () => {
  return (
    <AuthGate requireAuth={false}>
      <Outlet />
    </AuthGate>
  );
};

export default GuestLayout;
