import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function RouteDebugger() {
  const location = useLocation();

  useEffect(() => {
    console.log("ROUTE CHANGED →", location.pathname);
  }, [location]);

  return null;
}