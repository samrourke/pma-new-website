import { useState, useEffect } from "react";

export const useBrowserDetect = () => {
  const [browser, setBrowser] = useState("unknown");

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("chrome") && !userAgent.includes("edg"))
      setBrowser("Chrome");
    else if (userAgent.includes("firefox")) setBrowser("Firefox");
    else if (userAgent.includes("safari") && !userAgent.includes("chrome"))
      setBrowser("Safari");
    else if (userAgent.includes("edg")) setBrowser("Edge");
  }, []);

  return browser;
};
