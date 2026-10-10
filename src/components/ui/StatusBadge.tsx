export type WorkStatus = "In Progress" | "Completed" | "Archived";
export type PublicationStatus = "Draft" | "Published";
export type StatusValue = WorkStatus | PublicationStatus;

const statusStyles: Record<StatusValue, string> = {
  "In Progress": "border-warning/40 bg-warning/10 text-warning",
  Completed: "border-success/40 bg-success/10 text-success",
  Archived: "border-border bg-elevated text-muted",
  Draft: "border-border bg-elevated text-muted",
  Published: "border-accent/40 bg-accent/10 text-accent-hover",
};

const statusDots: Record<StatusValue, string> = {
  "In Progress": "bg-warning",
  Completed: "bg-success",
  Archived: "bg-muted",
  Draft: "bg-muted",
  Published: "bg-accent",
};

type StatusBadgeProps = {
  status: StatusValue;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${statusDots[status]}`}
      />
      {status}
    </span>
  );
}
