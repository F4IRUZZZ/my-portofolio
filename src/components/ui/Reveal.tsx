"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Keterlambatan stagger dalam ms (kelipatan 60–80 untuk grid). */
  delay?: number;
  className?: string;
};

/*
 * Memunculkan konten sekali saat masuk viewport. Tanpa-JS atau observer
 * tak tersedia: konten tetap terlihat (tidak pernah disembunyikan di SSR).
 */
export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      // Fallback sekali saat mount untuk browser tanpa observer:
      // aman dari cascading render (satu panggilan, tanpa langganan).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal${visible ? " reveal-visible" : ""}${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  );
}
