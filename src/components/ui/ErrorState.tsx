import { TriangleAlert } from "lucide-react";

type ErrorStateProps = {
  title: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
};

export function ErrorState({
  title,
  description,
  onRetry,
  retryLabel = "Coba lagi",
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-3 rounded-card border border-danger/40 bg-surface px-6 py-12 text-center"
    >
      <span
        aria-hidden="true"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-danger/10 text-danger"
      >
        <TriangleAlert className="h-6 w-6" strokeWidth={1.5} />
      </span>
      <p className="font-semibold text-foreground">{title}</p>
      {description ? (
        <p className="max-w-md text-sm leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 inline-flex items-center justify-center rounded-control border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-elevated"
        >
          {retryLabel}
        </button>
      ) : null}
    </div>
  );
}
