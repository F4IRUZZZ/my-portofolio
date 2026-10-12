type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  level?: 1 | 2 | 3;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  level = 2,
  align = "left",
}: SectionHeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3";
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow ? (
        <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <Tag className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {title}
      </Tag>
      {description ? (
        <p className="mt-3 leading-relaxed text-muted">{description}</p>
      ) : null}
    </div>
  );
}
