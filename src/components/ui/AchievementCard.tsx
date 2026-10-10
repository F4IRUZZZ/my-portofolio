import { Award, ExternalLink } from "lucide-react";

type AchievementCardProps = {
  rank: string;
  title: string;
  scope: string;
  year?: string;
  description?: string;
  evidenceUrl?: string;
  evidenceLabel?: string;
};

export function AchievementCard({
  rank,
  title,
  scope,
  year,
  description,
  evidenceUrl,
  evidenceLabel = "Lihat bukti",
}: AchievementCardProps) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-card border border-border bg-surface p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-accent/10 text-accent"
        >
          <Award className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-accent-hover">{rank}</p>
          <h3 className="mt-0.5 font-semibold leading-snug text-foreground">
            {title}
          </h3>
        </div>
      </div>
      <p className="text-xs text-muted">
        {scope}
        {year ? ` • ${year}` : null}
      </p>
      {description ? (
        <p className="text-sm leading-relaxed text-muted">{description}</p>
      ) : null}
      {evidenceUrl ? (
        <a
          href={evidenceUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-accent hover:text-accent-hover"
        >
          {evidenceLabel}
          <ExternalLink aria-hidden="true" className="h-4 w-4" />
        </a>
      ) : null}
    </article>
  );
}
