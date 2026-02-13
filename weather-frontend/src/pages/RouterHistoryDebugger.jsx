import { useLocation, useNavigationType } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function RouteHistoryDebugger() {
  const location = useLocation();
  const navType = useNavigationType();
  const historyRef = useRef([]);

  useEffect(() => {
    historyRef.current.push({
      path: location.pathname,
      type: navType,
      time: new Date().toLocaleTimeString(),
    });

    console.clear();

    console.log("======= ROUTE HISTORY =======");
    historyRef.current.forEach((entry, i) => {
      console.log(
        `${i + 1}. ${entry.path}  |  ${entry.type}  |  ${entry.time}`
      );
    });

    console.log("History length (browser):", window.history.length);
    console.log("=============================");
  }, [location, navType]);

  return null;
}
