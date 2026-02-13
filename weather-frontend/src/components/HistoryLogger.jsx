import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HistoryLogger() {
  const navigate = useNavigate();

  useEffect(() => {
  console.log("HistoryLogger mounted"); // <- check this appears

  const handlePop = () => {
    console.log("POPSTATE detected, current path:", window.location.pathname);
  };

  window.addEventListener("popstate", handlePop);

  const originalPushState = window.history.pushState;
  window.history.pushState = function (state, title, url) {
    console.log("PUSHSTATE detected, navigating to:", url);
    return originalPushState.apply(this, arguments);
  };

  return () => {
    window.removeEventListener("popstate", handlePop);
    window.history.pushState = originalPushState;
  };
}, []);

  return null;
}
