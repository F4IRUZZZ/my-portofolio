"use client";

import { useState, useTransition } from "react";
import { rotatePreviewToken } from "@/lib/actions/preview";
import { useMounted } from "@/lib/use-mounted";

type PreviewLinkBoxProps = {
  kind: "project" | "article";
  id: number;
  slug: string;
  initialToken: string | null;
  basePath: string;
};

/*
 * Link pratinjau draft + salin + acak ulang. Tanpa token tidak ada link
 * yang bisa ditebak: halaman pratinjau butuh token yang persis sama.
 */
export function PreviewLinkBox({
  kind,
  id,
  slug,
  initialToken,
  basePath,
}: PreviewLinkBoxProps) {
  const [token, setToken] = useState(initialToken);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const mounted = useMounted();

  // Dibaca hanya pasca-mount (klien) sehingga aman dari SSR.
  const url =
    mounted && token
      ? `${window.location.origin}${basePath}/${slug}?t=${token}`
      : null;

  function copy() {
    if (!url) return;
    void navigator.clipboard
      .writeText(url)
      .then(() => setMessage("Link tersalin."))
      .catch(() => setMessage("Gagal menyalin."));
  }

  function rotate() {
    setMessage(null);
    startTransition(async () => {
      const result = await rotatePreviewToken(kind, id);
      setMessage(result.message);
      if (result.ok && result.token) {
        setToken(result.token);
      }
    });
  }

  return (
    <div className="rounded-card border border-border bg-surface p-5">
      <h2 className="text-sm font-semibold text-foreground">
        Pratinjau draft
      </h2>
      <p className="mt-1 text-xs leading-relaxed text-muted">
        {token
          ? "Link rahasia di bawah membuka versi draft tanpa publish. Acak ulang untuk memutus link lama."
          : "Belum ada link pratinjau. Buat untuk mengintip tampilan publik draft ini."}
      </p>
      {url ? (
        <p className="mt-3 break-all rounded-control border border-border bg-background px-3 py-2 text-xs text-muted">
          {url}
        </p>
      ) : null}
      <div className="mt-3 flex flex-wrap gap-2">
        {url ? (
          <button
            type="button"
            onClick={copy}
            className="rounded-control border border-border px-4 py-2 text-xs font-medium text-foreground transition-colors duration-200 hover:bg-elevated"
          >
            Salin link
          </button>
        ) : null}
        <button
          type="button"
          onClick={rotate}
          disabled={pending}
          className="rounded-control bg-accent px-4 py-2 text-xs font-medium text-white transition-colors duration-200 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending
            ? "Memproses…"
            : token
              ? "Acak ulang link"
              : "Buat link pratinjau"}
        </button>
      </div>
      {message ? (
        <p role="status" className="mt-2 text-xs text-muted">
          {message}
        </p>
      ) : null}
    </div>
  );
}
