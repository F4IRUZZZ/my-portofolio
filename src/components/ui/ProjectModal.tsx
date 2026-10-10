"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { StatusBadge, type WorkStatus } from "./StatusBadge";
import { TechnologyTag } from "./TechnologyTag";

type ProjectModalProps = {
  open: boolean;
  title: string;
  category: string;
  summary: string;
  technologies: string[];
  workStatus: WorkStatus;
  period?: string;
  cover?: ReactNode;
  detailHref: string;
  onClose: () => void;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ProjectModal({
  open,
  title,
  category,
  summary,
  technologies,
  workStatus,
  period,
  cover,
  detailHref,
  onClose,
}: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;
    // Simpan pemicu untuk mengembalikan fokus saat tutup.
    triggerRef.current = document.activeElement;
    panelRef.current
      ?.querySelector<HTMLElement>(FOCUSABLE)
      ?.focus({ preventScroll: true });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      // Focus trap sederhana: putar Tab di dalam panel.
      if (event.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      (triggerRef.current as HTMLElement | null)?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Pratinjau ${title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-card border border-border bg-surface"
        onClick={(event) => event.stopPropagation()}
      >
        {cover ? (
          <div className="relative aspect-video w-full overflow-hidden bg-elevated">
            {cover}
          </div>
        ) : null}
        <div className="flex flex-col gap-3 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-muted">
              {category}
              {period ? ` • ${period}` : ""}
            </span>
            <StatusBadge status={workStatus} />
          </div>
          <h2 className="text-xl font-bold leading-snug text-foreground">
            {title}
          </h2>
          <p className="text-sm leading-relaxed text-muted">{summary}</p>
          {technologies.length > 0 ? (
            <ul aria-label="Teknologi" className="flex flex-wrap gap-1.5">
              {technologies.map((tech) => (
                <li key={tech}>
                  <TechnologyTag name={tech} />
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-2 flex flex-wrap gap-3">
            <Link
              href={detailHref}
              className="inline-flex items-center justify-center rounded-control bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-hover"
            >
              Detail lengkap
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-1.5 rounded-control border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-elevated"
            >
              <X aria-hidden="true" className="h-4 w-4" />
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
