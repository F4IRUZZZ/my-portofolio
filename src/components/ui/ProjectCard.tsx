import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";
import type { ReactNode } from "react";
import { StatusBadge, type WorkStatus } from "./StatusBadge";
import { TechnologyTag } from "./TechnologyTag";

type ProjectCardProps = {
  title: string;
  summary: string;
  category: string;
  technologies: string[];
  workStatus: WorkStatus;
  href: string;
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
  cover,
}: ProjectCardProps) {
  const visibleTech = technologies.slice(0, MAX_VISIBLE_TECH);
  const hiddenCount = technologies.length - visibleTech.length;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface transition-colors duration-200 hover:bg-elevated">
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
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-muted">
            {category}
          </span>
          <StatusBadge status={workStatus} />
        </div>
        <h3 className="text-lg font-semibold leading-snug text-foreground">
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
  );
}
