"use client";

import { useEffect, useState } from "react";

export function useResize(width: number) {
  const [isResize, setIsResize] = useState(false);
  const handleResize = () => setIsResize(window.innerWidth < width);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isResize;
}
