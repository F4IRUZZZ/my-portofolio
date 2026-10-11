"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useMounted } from "@/lib/use-mounted";

const AmbientScene = dynamic(
  () => import("./AmbientScene").then((module) => module.AmbientScene),
  { ssr: false },
);

/*
 * Decorative background shell. Server and first client render always emit
 * only the static Obsidian Forge grid. WebGL mounts later, and only when
 * the browser supports it and the user has not requested reduced motion.
 */
export function WebglBackdrop() {
  const mounted = useMounted();
  const density = useMemo<"static" | "low" | "high">(() => {
    if (!mounted) return "static";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return "static";
    }
    try {
      const probe = document.createElement("canvas");
      const gl = probe.getContext("webgl2") ?? probe.getContext("webgl");
      if (!gl) return "static";
    } catch {
      return "static";
    }
    const smallViewport = window.innerWidth < 768;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    return smallViewport || coarsePointer ? "low" : "high";
  }, [mounted]);

  return (
    <div aria-hidden="true" className="webgl-backdrop">
      <div className="forge-grid" />
      {density === "static" ? null : <AmbientScene density={density} />}
    </div>
  );
}
