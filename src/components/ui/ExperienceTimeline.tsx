import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { TechnologyTag } from "./TechnologyTag";

export type ExperienceEntry = {
  organization: string;
  role: string;
  period: string;
  summary: string;
  contributions: string[];
  technologies?: string[];
  relatedProjectHref?: string;
  relatedProjectLabel?: string;
  evidenceUrl?: string;
};

type ExperienceTimelineProps = {
  entries: ExperienceEntry[];
};

export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  return (
    <ol className="relative flex flex-col gap-8 border-l border-border pl-6">
      {entries.map((entry) => (
        <li key={`${entry.organization}-${entry.role}`} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[31px] top-1 h-2.5 w-2.5 rounded-full border-2 border-accent bg-background"
          />
          <p className="text-xs font-medium uppercase tracking-wide text-accent">
            {entry.period}
          </p>
          <h3 className="mt-1 font-semibold text-foreground">
            {entry.role} — {entry.organization}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {entry.summary}
          </p>
          {entry.contributions.length > 0 ? (
            <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 text-sm leading-relaxed text-muted">
              {entry.contributions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {entry.technologies && entry.technologies.length > 0 ? (
            <ul aria-label="Teknologi" className="mt-3 flex flex-wrap gap-1.5">
              {entry.technologies.map((tech) => (
                <li key={tech}>
                  <TechnologyTag name={tech} />
                </li>
              ))}
            </ul>
          ) : null}
          {entry.relatedProjectHref || entry.evidenceUrl ? (
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {entry.relatedProjectHref ? (
                <Link
                  href={entry.relatedProjectHref}
                  className="text-sm font-medium text-accent hover:text-accent-hover"
                >
                  {entry.relatedProjectLabel ?? "Lihat proyek terkait"}
                </Link>
              ) : null}
              {entry.evidenceUrl ? (
                <a
                  href={entry.evidenceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
                >
                  Lihat bukti
                  <ExternalLink aria-hidden="true" className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
