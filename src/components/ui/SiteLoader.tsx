"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useMounted } from "@/lib/use-mounted";

const COUNT_DURATION_MS = 1800;
const CURTAIN_DURATION_MS = 600;
// Jaring pengaman mutlak: apa pun yang terjadi, loader selesai maksimal
// sekian detik setelah mount dan scroll selalu dikembalikan.
const FORCE_DONE_MS = 4000;

/*
 * Intro loader dekoratif ala Lusion: logo + counter 0–100 + bar aksen,
 * lalu tirai tersibak membuka halaman. Murni hiasan — konten di bawahnya
 * sudah ter-render sejak awal sehingga SEO, LCP konten, dan tanpa-JS aman.
 * Dilewati total bila prefers-reduced-motion; bisa di-skip (klik, Escape,
 * Enter/Space saat overlay fokus).
 *
 * Mesin state 100% timer (tanpa bergantung event transisi) + safety net,
 * sehingga kunci scroll tidak pernah macet: setiap jalur keluar selalu
 * mengembalikan overflow dan meng-unmount overlay.
 */
export function SiteLoader() {
  const mounted = useMounted();
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);
  const timers = useRef<number[]>([]);
  const rafRef = useRef(0);

  // Hanya dibaca pasca-mount (klien), jadi aman dari SSR.
  const reducedMotion =
    mounted &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!mounted || reducedMotion) return;
    document.body.style.overflow = "hidden";

    const later = (fn: () => void, ms: number) => {
      timers.current.push(window.setTimeout(fn, ms));
    };

    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const ratio = Math.min(elapsed / COUNT_DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - ratio, 3);
      setProgress(Math.round(eased * 100));
      if (ratio < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setLeaving(true);
        // Tirai selesai sedikit setelah durasi CSS-nya.
        later(finish, CURTAIN_DURATION_MS + 150);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    // Safety net: paksa selesai apa pun kondisinya.
    later(finish, FORCE_DONE_MS);

    function finish() {
      cancelAnimationFrame(rafRef.current);
      for (const id of timers.current) window.clearTimeout(id);
      timers.current = [];
      document.body.style.overflow = "";
      setLeaving(true);
      setDone(true);
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") finish();
    }
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(rafRef.current);
      for (const id of timers.current) window.clearTimeout(id);
      timers.current = [];
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mounted, reducedMotion]);

  // Render pertama (SSR + hydration) selalu null agar identik.
  // Area admin dikecualikan (halaman publik saja, sesuai kesepakatan).
  if (!mounted || reducedMotion || done || pathname?.startsWith("/admin")) {
    return null;
  }

  function skip() {
    cancelAnimationFrame(rafRef.current);
    for (const id of timers.current) window.clearTimeout(id);
    timers.current = [];
    document.body.style.overflow = "";
    setDone(true);
  }

  return (
    <div
      role="presentation"
      aria-hidden="true"
      tabIndex={-1}
      onClick={skip}
      onKeyDown={(event) => {
        if (
          event.key === "Escape" ||
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          skip();
        }
      }}
      className={`site-loader${leaving ? " site-loader-leaving" : ""}`}
      style={{ ["--loader-curtain-ms" as string]: `${CURTAIN_DURATION_MS}ms` }}
    >
      <div className="site-loader-inner">
        <p className="site-loader-brand">
          Fairuz<span className="site-loader-accent">.dev</span>
        </p>
        <div className="site-loader-bar">
          <div
            className="site-loader-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="site-loader-count">{progress}</p>
      </div>
    </div>
  );
}
