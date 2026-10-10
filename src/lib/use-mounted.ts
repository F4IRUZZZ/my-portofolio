import { useSyncExternalStore } from "react";

/*
 * true hanya setelah hydration klien; false saat SSR/prerender dan render
 * pertama. Dipakai agar markup sensitif-pathname identik di server dan
 * klien (hindari hydration mismatch), tanpa setState dalam effect.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
