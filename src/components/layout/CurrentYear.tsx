"use client";

// Dibaca saat render client saja. Dipakai di dalam <Suspense> agar tidak
// dievaluasi saat prerender statis (Next.js blocking-prerender-current-time).
export function CurrentYear() {
  return <>{new Date().getFullYear()}</>;
}
