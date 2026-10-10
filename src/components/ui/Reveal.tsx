"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useMounted } from "@/lib/use-mounted";

type RevealProps = {
  children: ReactNode;
  /** Keterlambatan stagger dalam ms (kelipatan 60–80 untuk grid). */
  delay?: number;
  className?: string;
};

/*
 * Memunculkan konten setiap kali masuk viewport (replay dua arah: scroll
 * ke bawah maupun ke atas). Render pertama (SSR dan hydration) selalu
 * terlihat sehingga identik di server dan klien; status tersembunyi hanya
 * diterapkan pasca-mount. Tanpa-JS atau observer tak tersedia: konten
 * tetap terlihat.
 */
export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mounted = useMounted();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      // Fallback sekali saat mount untuk browser tanpa observer:
      // aman dari cascading render (satu panggilan, tanpa langganan).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((entry) => entry.isIntersecting);
        setInView((prev) => (prev === anyVisible ? prev : anyVisible));
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const hidden = mounted && !inView;

  return (
    <div
      ref={ref}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal${hidden ? " reveal-hidden" : ""}${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  );
}
