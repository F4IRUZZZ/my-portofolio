"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

/*
 * Smooth scroll global dengan Lenis. Lenis already honors
 * prefers-reduced-motion, so no custom gating is needed here.
 * The instance is destroyed on unmount to avoid leaked listeners.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
