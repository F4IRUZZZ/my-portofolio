"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className="inline-flex items-center gap-1.5 rounded-control border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors duration-200 hover:border-accent hover:text-foreground"
    >
      {copied ? (
        <>
          <Check aria-hidden="true" className="h-3.5 w-3.5 text-success" />
          Tersalin
        </>
      ) : (
        <>
          <Copy aria-hidden="true" className="h-3.5 w-3.5" />
          Salin email
        </>
      )}
    </button>
  );
}
