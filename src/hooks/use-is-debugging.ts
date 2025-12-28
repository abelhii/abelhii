import { useEffect, useState } from "react";

export const useIsDebugging = () => {
  const [isDebugging, setIsDebugging] = useState(false);

  useEffect(() => {
    const update = () => setIsDebugging(window.location.hash === "#debug");
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  return { isDebugging };
};
