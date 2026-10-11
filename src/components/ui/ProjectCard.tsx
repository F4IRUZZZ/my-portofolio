"use client";

import Link from "next/link";
import { ArrowRight, ImageIcon, ZoomIn } from "lucide-react";
import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { ProjectModal } from "./ProjectModal";
import { StatusBadge, type WorkStatus } from "./StatusBadge";
import { TechnologyTag } from "./TechnologyTag";

type ProjectCardProps = {
  title: string;
  summary: string;
  category: string;
  technologies: string[];
  workStatus: WorkStatus;
  href: string;
  period?: string;
  cover?: ReactNode;
};

const MAX_VISIBLE_TECH = 4;

export function ProjectCard({
  title,
  summary,
  category,
  technologies,
  workStatus,
  href,
  period,
  cover,
}: ProjectCardProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const rafRef = useRef(0);
  const visibleTech = technologies.slice(0, MAX_VISIBLE_TECH);
  const hiddenCount = technologies.length - visibleTech.length;

  // Dengan JS: buka modal. Tanpa JS: handler tak jalan, tautan ke detail.
  function openPreview(event: MouseEvent) {
    event.preventDefault();
    setPreviewOpen(true);
  }

  // Tilt 3D halus + spotlight mengikuti kursor. Hanya mouse presisi tanpa
  // reduced-motion; handler client-only sehingga aman untuk hydration.
  function motionAllowed() {
    return (
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function handleTilt(event: MouseEvent) {
    const node = cardRef.current;
    if (!node || !motionAllowed()) return;
    cancelAnimationFrame(rafRef.current);
    const rect = node.getBoundingClientRect();
    rafRef.current = requestAnimationFrame(() => {
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      node.style.transform = `perspective(900px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg)`;
      node.style.setProperty("--tilt-x", `${Math.round(px * 100)}%`);
      node.style.setProperty("--tilt-y", `${Math.round(py * 100)}%`);
    });
  }

  function resetTilt() {
    const node = cardRef.current;
    if (!node) return;
    cancelAnimationFrame(rafRef.current);
    node.style.transform = "";
  }

  return (
    <>
      <article
        ref={cardRef}
        onMouseMove={handleTilt}
        onMouseLeave={resetTilt}
        className="group/card relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface transition-[transform,background-color,border-color] duration-200 hover:border-[rgba(255,107,44,0.45)] hover:bg-elevated"
      >
        <div
          aria-hidden="true"
          className="tilt-spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover/card:opacity-100"
        />
        <div className="relative aspect-video w-full overflow-hidden bg-elevated">
          {cover ?? (
            <div
              aria-hidden="true"
              className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted"
            >
              <ImageIcon className="h-8 w-8" strokeWidth={1.5} />
              <span className="text-xs">Gambar menyusul</span>
            </div>
          )}
          <a
            href={href}
            onClick={openPreview}
            aria-label={`Pratinjau cepat ${title}`}
            className="group absolute inset-0 flex items-center justify-center bg-background/0 transition-colors duration-200 hover:bg-background/50 focus-visible:bg-background/50"
          >
            <span className="inline-flex items-center gap-1.5 rounded-control bg-surface/90 px-3 py-1.5 text-xs font-medium text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
              <ZoomIn aria-hidden="true" className="h-3.5 w-3.5" />
              Pratinjau cepat
            </span>
          </a>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-muted">
              {category}
            </span>
            <StatusBadge status={workStatus} />
          </div>
          <h3 className="text-lg font-semibold leading-snug text-foreground transition-transform duration-200 group-hover/card:translate-y-[2px]">
            <Link href={href} className="hover:text-accent-hover">
              {title}
            </Link>
          </h3>
          <p className="text-sm leading-relaxed text-muted">{summary}</p>
          {visibleTech.length > 0 ? (
            <ul aria-label="Teknologi" className="flex flex-wrap gap-1.5">
              {visibleTech.map((tech) => (
                <li key={tech}>
                  <TechnologyTag name={tech} />
                </li>
              ))}
              {hiddenCount > 0 ? (
                <li>
                  <TechnologyTag name={`+${hiddenCount}`} />
                </li>
              ) : null}
            </ul>
          ) : null}
          <div className="mt-auto pt-2">
            <Link
              href={href}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
            >
              Lihat detail
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>
      <ProjectModal
        open={previewOpen}
        title={title}
        category={category}
        summary={summary}
        technologies={technologies}
        workStatus={workStatus}
        period={period}
        cover={cover}
        detailHref={href}
        onClose={() => setPreviewOpen(false)}
      />
    </>
  );
}
