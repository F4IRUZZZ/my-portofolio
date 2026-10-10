type LoadingSkeletonProps = {
  lines?: number;
  label?: string;
};

export function LoadingSkeleton({
  lines = 3,
  label = "Memuat konten…",
}: LoadingSkeletonProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className="flex flex-col gap-3 rounded-card border border-border bg-surface p-5 sm:p-6"
    >
      <span className="sr-only">{label}</span>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          aria-hidden="true"
          className="h-4 animate-pulse rounded bg-elevated"
          style={{ width: `${100 - index * 18}%` }}
        />
      ))}
    </div>
  );
}
