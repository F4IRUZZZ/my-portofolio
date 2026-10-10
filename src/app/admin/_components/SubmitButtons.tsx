"use client";

import { useFormStatus } from "react-dom";

export function SubmitButtons({
  draftLabel = "Simpan Draft",
  publishLabel = "Publikasikan",
}: {
  draftLabel?: string;
  publishLabel?: string;
}) {
  const { pending } = useFormStatus();

  const base =
    "inline-flex items-center justify-center rounded-control px-5 py-2.5 text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="submit"
        name="publicationStatus"
        value="draft"
        disabled={pending}
        className={`${base} border border-border text-foreground hover:bg-elevated`}
      >
        {pending ? "Menyimpan…" : draftLabel}
      </button>
      <button
        type="submit"
        name="publicationStatus"
        value="published"
        disabled={pending}
        className={`${base} bg-accent text-white hover:bg-accent-hover`}
      >
        {pending ? "Menyimpan…" : publishLabel}
      </button>
    </div>
  );
}
