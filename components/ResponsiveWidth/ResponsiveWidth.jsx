"use client";
import { useState, useEffect } from "react";

export default function useResponsiveWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    // run once on mount
    handleResize();

    //run on window resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
